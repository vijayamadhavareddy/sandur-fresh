import {
  getMessaging,
  isSupported,
  type MessagePayload,
  type Messaging,
  onMessage,
  onRegistered,
  onUnregistered,
  register,
  unregister,
} from "firebase/messaging";
import { readonly, ref } from "vue";
import { useFirebaseApp } from "vuefire";
import { request } from "@/api/client";
import {
  RegisterAdminDeviceDocument,
  UnregisterAdminDeviceDocument,
} from "@/api/generated/graphql";

/** Path of the dedicated FCM service worker (see public/firebase-messaging-sw.js). */
const FCM_SW_URL = "/firebase-messaging-sw.js";

/**
 * The FCM worker MUST be registered under its own scope. A service worker at
 * the site root defaults to scope "/", which is exactly where vite-plugin-pwa's
 * Workbox worker lives — registering both there makes each replace the other on
 * every load. This is the scope the Firebase SDK uses by default.
 */
const FCM_SW_SCOPE = "/firebase-cloud-messaging-push-scope";

export function useMessaging() {
  return getMessaging(useFirebaseApp());
}

export type NotificationPermissionState = NotificationPermission | "unsupported";

const permission = ref<NotificationPermissionState>(
  typeof Notification === "undefined" ? "unsupported" : Notification.permission,
);
/**
 * The Firebase Installation ID this browser is registered under. This is what
 * the backend targets when sending — it replaces the FCM registration token
 * that the deprecated getToken() used to return.
 */
const fid = ref<string | null>(null);
const busy = ref(false);
const error = ref<string | null>(null);

/**
 * Whether this browser can actually receive FCM web push.
 *
 * Worth checking before showing any UI: it is false on non-secure origins, in
 * private windows on some browsers, and on iOS unless the PWA has been added to
 * the home screen (iOS only permits web push for installed PWAs, 16.4+).
 */
export async function isMessagingSupported() {
  try {
    return await isSupported();
  } catch {
    return false;
  }
}

/**
 * Register the FCM service worker ourselves rather than letting the SDK do it,
 * so the registration is explicit and can be handed to register(). Without this
 * the SDK registers its own copy and we lose control over timing.
 */
async function registerMessagingServiceWorker() {
  // getRegistration() matches by scope coverage, not by script — the root
  // Workbox worker also covers this path, so the script has to be checked too.
  const existing = await navigator.serviceWorker.getRegistration(FCM_SW_SCOPE);
  if (existing?.active?.scriptURL.endsWith(FCM_SW_URL)) return existing;
  return navigator.serviceWorker.register(FCM_SW_URL, { scope: FCM_SW_SCOPE });
}

let listenersBound = false;

/**
 * register() resolves with void — the FID is delivered asynchronously through
 * onRegistered — so these listeners must be attached before registering, or the
 * FID is missed. Bound once for the lifetime of the app.
 */
function bindRegistrationListeners(messaging: Messaging) {
  if (listenersBound) return;
  listenersBound = true;

  onRegistered(messaging, (id) => {
    fid.value = id;
    // Store it against the signed-in admin so the API can target this device.
    // Requires an admin session; harmless to fail when signed out, since
    // enable() is only reachable from inside the authenticated shell.
    console.log("FID:", fid.value);
    request(RegisterAdminDeviceDocument, { fid: id, userAgent: navigator.userAgent })
      .then(() => {
        console.log("Registered FID:", fid.value);
      })
      .catch((cause) => {
        error.value = "Could not register this device for notifications.";
        console.error("[fcm] registerAdminDevice failed:", cause);
      });
  });

  onUnregistered(messaging, (id) => {
    fid.value = null;
    request(UnregisterAdminDeviceDocument, { fid: id })
      .then(() => {
        console.log("Un registered FID:", fid.value);
      })
      .catch((cause) => console.error("[fcm] unregisterAdminDevice failed:", cause));
  });
}

/**
 * Ask for notification permission (if not already decided) and register this
 * instance with FCM. Must be called from a user gesture — browsers reject
 * permission prompts that are not tied to one.
 *
 * Resolves true once registration has been *initiated*; the FID itself arrives
 * separately via onRegistered and lands in `fid`.
 */
export async function enableNotifications(messaging: Messaging): Promise<boolean> {
  busy.value = true;
  error.value = null;

  try {
    if (!(await isMessagingSupported())) {
      permission.value = "unsupported";
      error.value = "This browser cannot receive push notifications.";
      return false;
    }

    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    if (!vapidKey) {
      error.value = "VITE_FIREBASE_VAPID_KEY is not set.";
      return false;
    }

    const result = await Notification.requestPermission();
    permission.value = result;
    if (result !== "granted") {
      error.value = result === "denied" ? "Notifications are blocked for this site." : null;
      return false;
    }

    bindRegistrationListeners(messaging);
    const serviceWorkerRegistration = await registerMessagingServiceWorker();
    await register(messaging, { vapidKey, serviceWorkerRegistration });

    return true;
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : "Could not enable notifications.";
    return false;
  } finally {
    busy.value = false;
  }
}

/** Unregister this instance from FCM. `fid` is cleared via onUnregistered. */
export async function disableNotifications(messaging: Messaging): Promise<boolean> {
  busy.value = true;
  error.value = null;
  try {
    await unregister(messaging);
    return true;
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : "Could not disable notifications.";
    return false;
  } finally {
    busy.value = false;
  }
}

/**
 * Handle messages that arrive while the admin is focused. The service worker is
 * not involved for these, so nothing is shown unless we show it ourselves.
 * Returns the unsubscribe function.
 */
export function onForegroundMessage(
  messaging: Messaging,
  handler: (payload: MessagePayload) => void,
) {
  return onMessage(messaging, handler);
}

/**
 * Messages the FCM service worker forwards to open pages. Background pushes do
 * not reach onMessage(), so without this bridge an open-but-unfocused tab would
 * show the notification and never refresh its data.
 */
export function onServiceWorkerMessage(handler: (data: Record<string, string>) => void) {
  if (!("serviceWorker" in navigator)) return () => {};
  const listener = (event: MessageEvent) => {
    if (event.data?.source === "fcm") handler(event.data.payload ?? {});
  };
  navigator.serviceWorker.addEventListener("message", listener);
  return () => navigator.serviceWorker.removeEventListener("message", listener);
}

/**
 * Notification state + actions for components. Call from `setup()` so the
 * underlying `useFirebaseApp()` injection resolves.
 */
export function useNotifications() {
  const messaging = useMessaging();

  // Attach early so an FID from a registration that survived a reload is picked
  // up, not just one triggered by enable() in this session.
  bindRegistrationListeners(messaging);

  return {
    permission: readonly(permission),
    fid: readonly(fid),
    busy: readonly(busy),
    error: readonly(error),
    enable: () => enableNotifications(messaging),
    disable: () => disableNotifications(messaging),
    onForegroundMessage: (handler: (payload: MessagePayload) => void) =>
      onForegroundMessage(messaging, handler),
    onServiceWorkerMessage,
  };
}
