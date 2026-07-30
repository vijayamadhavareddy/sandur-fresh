import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { subscribeAdminEvents } from "../../shared/events";
import { requireAdmin } from "../../shared/middleware/auth";
import type { AppEnv } from "../../types/hono";

/**
 * Proxies and load balancers commonly drop idle connections around 30-60s, and
 * a client cannot tell "quiet" from "dead" without traffic. A periodic ping
 * keeps the stream warm and lets the browser notice a broken pipe and reconnect.
 */
const HEARTBEAT_MS = 25_000;

/**
 * Live admin event stream (SSE).
 *
 * Chosen over WebSockets because the traffic is strictly one-way (server →
 * admin), EventSource reconnects on its own, and it needs no protocol upgrade.
 * Auth works because the admin session is an HTTP-only cookie — EventSource
 * cannot set an Authorization header, so a Bearer-only scheme would not work here.
 */
export const createEventsRouter = () => {
  const router = new Hono<AppEnv>();
  router.use("*", requireAdmin);

  router.get("/", (c) =>
    streamSSE(c, async (stream) => {
      let open = true;
      let id = 0;

      const unsubscribe = subscribeAdminEvents((event) => {
        if (!open) return;
        // Queued, not awaited: publishers are synchronous and must not block.
        void stream
          .writeSSE({ event: event.type, data: JSON.stringify(event), id: String(++id) })
          .catch(() => {
            open = false;
          });
      });

      const stop = () => {
        open = false;
        unsubscribe();
      };
      stream.onAbort(stop);

      // Tell the client it is connected, so it can drop its polling fallback.
      await stream.writeSSE({ event: "ready", data: JSON.stringify({ ok: true }) });

      while (open && !stream.aborted && !stream.closed) {
        await stream.sleep(HEARTBEAT_MS);
        if (!open || stream.aborted || stream.closed) break;
        try {
          await stream.writeSSE({ event: "ping", data: String(Date.now()) });
        } catch {
          break;
        }
      }

      stop();
    }),
  );

  return router;
};
