/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL?: string;
  readonly VITE_API_URL?: string;
  /**
   * Web Push certificate key pair from Firebase console →
   * Project settings → Cloud Messaging → Web configuration.
   * Required for FCM getToken().
   */
  readonly VITE_FIREBASE_VAPID_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
