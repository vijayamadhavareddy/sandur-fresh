/**
 * In-process pub/sub for live admin updates.
 *
 * This backs the SSE stream at GET /api/v1/admin/events. It is deliberately
 * in-memory and therefore single-process: if the API is ever run as more than
 * one instance, a client connected to instance A will not see events published
 * on instance B, and this needs replacing with a shared bus (Redis pub/sub,
 * Postgres LISTEN/NOTIFY, etc.). Everything else about the design stays the same.
 */

export type AdminEvent =
  | { type: "ORDER_PLACED"; orderId: string; total: number }
  | { type: "ORDER_STATUS"; orderId: string; status: string };

type Listener = (event: AdminEvent) => void;

const listeners = new Set<Listener>();

/** Returns an unsubscribe function. */
export const subscribeAdminEvents = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/**
 * Fan out to every connected admin. Never throws: one broken subscriber must
 * not affect the others, nor the business operation that published the event.
 */
export const publishAdminEvent = (event: AdminEvent) => {
  // Copy first — a listener may unsubscribe while we iterate.
  for (const listener of [...listeners]) {
    try {
      listener(event);
    } catch (cause) {
      console.error("[events] listener failed:", cause);
    }
  }
};

export const adminEventListenerCount = () => listeners.size;
