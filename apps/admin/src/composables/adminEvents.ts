import { useQueryClient } from "@tanstack/vue-query";
import { onScopeDispose, readonly, ref } from "vue";
import { apiBase } from "@/api/client";

/**
 * Live admin updates over Server-Sent Events, with polling as a safety net.
 *
 * SSE rather than WebSockets: the traffic is one-way (server → admin),
 * EventSource reconnects on its own, and it rides plain HTTP with no upgrade.
 * Auth is the existing HTTP-only session cookie, which is why `withCredentials`
 * is set — EventSource cannot attach an Authorization header.
 *
 * This complements FCM rather than replacing it. SSE only reaches an admin who
 * has the console open; FCM is what reaches a closed browser or phone. Together
 * the open-console case needs no notification permission and no Firebase.
 */

/** How often to refetch while the stream is down. */
const FALLBACK_POLL_MS = 15_000;
/** Ceiling for reconnect backoff after repeated failures. */
const MAX_RECONNECT_MS = 30_000;

export type AdminEvent = { type: string; orderId?: string; status?: string; total?: number };

export function useAdminEvents(onEvent?: (event: AdminEvent) => void) {
  const queryClient = useQueryClient();
  const connected = ref(false);

  let source: EventSource | null = null;
  let pollTimer: ReturnType<typeof setInterval> | undefined;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  let attempts = 0;
  let disposed = false;

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["orders"] });
    void queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };

  /**
   * Only runs while SSE is down, so the console still updates (just less
   * promptly) behind a proxy that strips streaming, or if the API restarts.
   */
  const startPolling = () => {
    if (pollTimer) return;
    pollTimer = setInterval(refresh, FALLBACK_POLL_MS);
  };

  const stopPolling = () => {
    clearInterval(pollTimer);
    pollTimer = undefined;
  };

  const scheduleReconnect = () => {
    if (disposed || reconnectTimer) return;
    // Back off so a downed API is not hammered by every open console.
    const delay = Math.min(1000 * 2 ** attempts++, MAX_RECONNECT_MS);
    reconnectTimer = setTimeout(() => {
      reconnectTimer = undefined;
      connect();
    }, delay);
  };

  const handle = (event: MessageEvent, type: string) => {
    let payload: AdminEvent = { type };
    try {
      payload = { ...JSON.parse(event.data), type };
    } catch {
      // Keep the bare type — a malformed payload should still trigger a refresh.
    }
    refresh();
    onEvent?.(payload);
  };

  function connect() {
    if (disposed) return;
    source?.close();

    source = new EventSource(`${apiBase}/api/v1/admin/events`, { withCredentials: true });

    source.addEventListener("ready", () => {
      connected.value = true;
      attempts = 0;
      stopPolling();
      // Catch up on anything missed while disconnected.
      refresh();
    });

    source.addEventListener("ORDER_PLACED", (e) => handle(e as MessageEvent, "ORDER_PLACED"));
    source.addEventListener("ORDER_STATUS", (e) => handle(e as MessageEvent, "ORDER_STATUS"));

    source.onerror = () => {
      connected.value = false;
      startPolling();
      // EventSource retries on its own, but not once the connection is CLOSED
      // (e.g. the 401 after a session expires) — reconnect explicitly then.
      if (source?.readyState === EventSource.CLOSED) {
        source.close();
        scheduleReconnect();
      }
    };
  }

  const stop = () => {
    disposed = true;
    connected.value = false;
    source?.close();
    source = null;
    stopPolling();
    clearTimeout(reconnectTimer);
  };

  connect();
  onScopeDispose(stop);

  return { connected: readonly(connected), stop };
}
