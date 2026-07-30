import { existsSync, readFileSync } from "node:fs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { env } from "../config/env";

/**
 * Firebase Cloud Messaging sender.
 *
 * Push is strictly best-effort: every entry point swallows its errors so a
 * messaging outage can never fail the business operation that triggered it
 * (most importantly, checkout).
 */

export type PushMessage = {
  title: string;
  body: string;
  /** Extra string values delivered to the client. All FCM data values are strings. */
  data?: Record<string, string>;
};

/**
 * A push destination. The two client SDKs give us different identifiers:
 * the web SDK yields Firebase Installation IDs, the Flutter SDK yields legacy
 * registration tokens. FCM accepts both, on different fields.
 */
export type PushTarget = { value: string; kind: "FID" | "TOKEN" };

/** Targets FCM tells us are gone, so the caller can prune them. */
export type PushResult = { sent: number; failed: number; staleTargets: string[] };

const EMPTY: PushResult = { sent: 0, failed: 0, staleTargets: [] };

/**
 * Error codes meaning "this destination no longer exists".
 *
 * FID-targeted sends report a dead installation as
 * `messaging/installation-id-not-registered`, which is a different code from
 * the token-targeted equivalent — both must be listed or stale rows never get
 * pruned and every send keeps failing against them.
 */
const GONE_CODES = new Set([
  "messaging/installation-id-not-registered",
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
  "messaging/invalid-argument",
]);

/** Diagnostics are logged once per process, not once per push. */
let warned = false;
const warnOnce = (message: string) => {
  if (warned) return;
  warned = true;
  console.warn(`[push] ${message} — push notifications disabled.`);
};

const loadCredential = () => {
  const raw = env.FIREBASE_SERVICE_ACCOUNT?.trim();
  if (!raw) {
    warnOnce("FIREBASE_SERVICE_ACCOUNT is not set");
    return null;
  }

  // The value is either inline JSON or a path to the key file. Tell those two
  // cases apart up front, so a missing file reports as missing rather than as
  // unparseable JSON.
  const isInlineJson = raw.startsWith("{");
  if (!isInlineJson && !existsSync(raw)) {
    warnOnce(`FIREBASE_SERVICE_ACCOUNT points at "${raw}", which does not exist`);
    return null;
  }

  try {
    const json = isInlineJson ? raw : readFileSync(raw, "utf8");
    return cert(JSON.parse(json));
  } catch (cause) {
    const reason = cause instanceof Error ? cause.message : String(cause);
    warnOnce(`FIREBASE_SERVICE_ACCOUNT is not a valid service account key (${reason})`);
    return null;
  }
};

const getMessagingClient = () => {
  const credential = loadCredential();
  if (!credential) return null;
  const app = getApps().find((a) => a.name === "push") ?? initializeApp({ credential }, "push");
  return getMessaging(app);
};

/**
 * Send a data-only message to the given Firebase Installation IDs.
 *
 * Deliberately data-only: a payload carrying a `notification` block is rendered
 * by the browser itself and never reaches the service worker's message handler,
 * so the admin client could not react to it (e.g. refetch orders).
 */
export const sendPush = async (
  targets: PushTarget[],
  message: PushMessage,
): Promise<PushResult> => {
  if (targets.length === 0) return EMPTY;

  const messaging = getMessagingClient();
  if (!messaging) return EMPTY;

  const payload = {
    data: { title: message.title, body: message.body, ...message.data },
    webpush: {
      headers: { Urgency: "high" },
      fcmOptions: { link: message.data?.url ?? "/orders" },
    },
  };

  // FIDs and registration tokens go on different fields, so they need
  // separate calls even though the payload is identical.
  const groups: Array<{ kind: PushTarget["kind"]; values: string[] }> = [
    { kind: "FID", values: targets.filter((t) => t.kind === "FID").map((t) => t.value) },
    { kind: "TOKEN", values: targets.filter((t) => t.kind === "TOKEN").map((t) => t.value) },
  ];

  const result: PushResult = { sent: 0, failed: 0, staleTargets: [] };

  for (const group of groups) {
    if (group.values.length === 0) continue;
    try {
      // Called in separate branches so each object literal matches one
      // sendEachForMulticast overload; a union argument matches neither.
      const response =
        group.kind === "FID"
          ? await messaging.sendEachForMulticast({ ...payload, fids: group.values })
          : await messaging.sendEachForMulticast({ ...payload, tokens: group.values });
      console.log(
        "Notification Response",
        JSON.stringify(response.responses),
        JSON.stringify(group),
      );
      result.sent += response.successCount;
      result.failed += response.failureCount;
      for (const [i, r] of response.responses.entries()) {
        const value = group.values[i];
        if (!r.success && value && GONE_CODES.has(r.error?.code ?? "")) {
          result.staleTargets.push(value);
        }
      }
    } catch (cause) {
      console.error(`[push] send failed for ${group.kind} targets:`, cause);
      result.failed += group.values.length;
    }
  }

  console.log("Notification Result", result);

  console.info(
    `[push] sent=${result.sent} failed=${result.failed} stale=${result.staleTargets.length}`,
  );
  return result;
};

export type PushSender = typeof sendPush;
