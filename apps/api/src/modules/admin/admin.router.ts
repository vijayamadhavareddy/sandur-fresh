import { resolve } from "node:path";
import { Hono } from "hono";
import { env } from "../../config/env";
import { requireAdmin } from "../../shared/middleware/auth";
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

export const createAdminRouter = () => {
  const router = new Hono<AppEnv>();
  router.use("/uploads/*", requireAdmin);
  router.post("/uploads/product-image", async (c) => {
    const contentLength = Number(c.req.header("content-length"));
    if (Number.isFinite(contentLength) && contentLength > env.UPLOAD_MAX_BYTES + 64_000) {
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
    if (image.size > env.UPLOAD_MAX_BYTES) {
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

    await Bun.$`mkdir -p ${env.UPLOAD_DIR}`.quiet();
    const filename = `${crypto.randomUUID()}.${extension}`;
    await Bun.write(resolve(env.UPLOAD_DIR, filename), bytes);
    return c.json({ data: { url: `/uploads/${filename}` } }, 201);
  });
  return router;
};

export const createUploadsRouter = () => {
  const router = new Hono<AppEnv>();
  router.get("/:filename", async (c) => {
    const filename = c.req.param("filename");
    if (!/^[0-9a-f-]{36}\.(?:jpg|png|webp)$/.test(filename)) return c.notFound();
    const uploadRoot = resolve(env.UPLOAD_DIR);
    const path = resolve(uploadRoot, filename);
    if (!path.startsWith(`${uploadRoot}/`)) return c.notFound();
    const file = Bun.file(path);
    if (!(await file.exists())) return c.notFound();
    return new Response(file, {
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  });
  return router;
};
