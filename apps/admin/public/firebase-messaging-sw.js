/*
 * Firebase Cloud Messaging service worker.
 *
 * This is deliberately SEPARATE from the Workbox service worker that
 * vite-plugin-pwa generates (`sw.js`). The two register at different scopes and
 * do not conflict:
 *   - sw.js                     -> scope "/"  (precaching, offline shell)
 *   - firebase-messaging-sw.js  -> scope "/firebase-cloud-messaging-push-scope"
 *
 * Because files in `public/` are copied verbatim and never processed by Vite,
 * this file cannot import from `src/`. The config below must therefore be kept
 * in sync by hand with `src/firebase.ts`, and the SDK is loaded from the CDN
 * with importScripts (Firebase's documented approach for this file).
 *
 * `vite.config.ts` excludes this file from the Workbox precache manifest —
 * precaching a service worker would pin it to a stale revision.
 */

importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.0/firebase-messaging-compat.js");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMvzgvmtGs6udBJ_HJTk7D99gFzc9rn2A",
  authDomain: "sandur-fresh-2e53d.firebaseapp.com",
  projectId: "sandur-fresh-2e53d",
  storageBucket: "sandur-fresh-2e53d.firebasestorage.app",
  messagingSenderId: "238470682380",
  appId: "1:238470682380:web:5e027cf079359000a9db29",
  measurementId: "G-GVDXM73F6Z"
};

// Keep in sync with src/firebase.ts
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

/**
 * Fires only for "data"-only pushes, or when the page is not in the foreground.
 * A push carrying a `notification` block is displayed by the browser itself, so
 * handling it here as well would show the notification twice.
 */
messaging.onBackgroundMessage((payload) => {
  console.log("Background notifiation", JSON.stringify(payload.data));
  if (payload.notification) return;

  const data = payload.data ?? {};
  const title = data.title || "Sandur Fresh Admin";

  // Let any open (but unfocused) admin tab refresh itself. Background pushes
  // never reach the page's onMessage handler, so this is the only way an
  // already-loaded tab learns about the new order without a click.
  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => {
      for (const client of clients) client.postMessage({ source: "fcm", payload: data });
    })
    .catch(() => {});

  self.registration.showNotification(title, {
    body: data.body || "",
    icon: data.icon || "/icons/icon.svg",
    badge: "/icons/icon.svg",
    // Collapses repeat pushes about the same entity into one notification.
    tag: data.tag || undefined,
    data: { url: data.url || "/" },
  });
});

/** Focus an already-open admin tab if there is one, otherwise open a new one. */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const target = new URL(event.notification.data?.url || "/", self.location.origin);

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (new URL(client.url).origin === target.origin && "focus" in client) {
          client.navigate(target.href);
          return client.focus();
        }
      }
      return self.clients.openWindow(target.href);
    }),
  );
});
