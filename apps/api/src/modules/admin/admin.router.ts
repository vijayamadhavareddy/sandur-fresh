import type { Context } from "hono";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { env, isProduction } from "../../config/env";
import { requireAdmin } from "../../shared/middleware/auth";
import { LocalStorageService, R2StorageService, type StorageService } from "../../shared/storage";
import type { AppEnv } from "../../types/hono";

const extensions: Readonly<Record<string, string>> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const matchesImageType = (type: string, bytes: Uint8Array) => {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") {
    return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every(
      (value, index) => bytes[index] === value,
    );
  }
  return (
    type === "image/webp" &&
    new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
    new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
  );
};

const getStorage = (c: Context<AppEnv>): StorageService => {
  const contextStorage = c.get("storage");
  if (contextStorage) return contextStorage;
  if (c.env?.BUCKET) return new R2StorageService(c.env.BUCKET);
  return new LocalStorageService(env.UPLOAD_DIR);
};

export const createAdminRouter = () => {
  const router = new Hono<AppEnv>();

  router.get("/setup/status", async (c) => {
    const services = c.get("services");
    if (!services) return c.json({ data: { isRequired: false } });
    const result = await services.admin.isSetupRequired();
    if (!result.ok) return c.json({ error: result.error }, 400);
    return c.json({ data: result.value });
  });

  router.post("/setup", async (c) => {
    const services = c.get("services");
    if (!services) {
      return c.json({ error: { code: "SERVICE_UNAVAILABLE", message: "Services not ready" } }, 503);
    }
    const secret = c.env?.ADMIN_SETUP_SECRET ?? env.ADMIN_SETUP_SECRET;
    const body = await c.req.json().catch(() => ({}));
    const result = await services.admin.setup(body, secret);
    if (!result.ok) {
      const status =
        result.error.code === "UNAUTHORIZED" ? 401 : result.error.code === "CONFLICT" ? 409 : 400;
      return c.json({ error: result.error }, status);
    }

    setCookie(c, env.ADMIN_SESSION_COOKIE, result.value.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "Lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return c.json({ data: result.value }, 201);
  });

  router.use("/uploads/*", requireAdmin);

  router.post("/uploads/product-image", async (c) => {
    const maxBytes = Number(c.env?.UPLOAD_MAX_BYTES ?? env.UPLOAD_MAX_BYTES);
    const contentLength = Number(c.req.header("content-length"));
    if (Number.isFinite(contentLength) && contentLength > maxBytes + 64_000) {
      return c.json(
        { error: { code: "VALIDATION", message: "Request exceeds upload size limit" } },
        413,
      );
    }
    const form = await c.req.raw.formData();
    const image = form.get("image");
    if (!(image instanceof File)) {
      return c.json(
        { error: { code: "VALIDATION", message: "Multipart field image is required" } },
        400,
      );
    }
    const extension = extensions[image.type];
    if (!extension) {
      return c.json(
        { error: { code: "VALIDATION", message: "Only JPEG, PNG, and WebP images are allowed" } },
        400,
      );
    }
    if (image.size > maxBytes) {
      return c.json(
        { error: { code: "VALIDATION", message: "Image exceeds upload size limit" } },
        413,
      );
    }
    const bytes = new Uint8Array(await image.arrayBuffer());
    if (!matchesImageType(image.type, bytes)) {
      return c.json(
        { error: { code: "VALIDATION", message: "Image content does not match its type" } },
        400,
      );
    }

    const filename = `${crypto.randomUUID()}.${extension}`;
    const storage = getStorage(c);
    const url = await storage.put(filename, bytes, image.type);
    return c.json({ data: { url } }, 201);
  });
  return router;
};

export const createUploadsRouter = () => {
  const router = new Hono<AppEnv>();
  router.get("/:filename", async (c) => {
    const filename = c.req.param("filename");
    if (!/^[0-9a-f-]{36}\.(?:jpg|png|webp)$/.test(filename)) return c.notFound();
    const storage = getStorage(c);
    const object = await storage.get(filename);
    if (!object) return c.notFound();
    return new Response(object.body as BodyInit, {
      headers: {
        "Content-Type": object.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  });
  return router;
};
