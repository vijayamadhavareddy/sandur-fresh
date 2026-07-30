import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { R2Bucket } from "@cloudflare/workers-types";

export type StoredObject = {
  body: ReadableStream | ArrayBuffer | Uint8Array | Blob;
  contentType?: string;
  size?: number;
};

export interface StorageService {
  put(filename: string, bytes: Uint8Array, contentType: string): Promise<string>;
  get(filename: string): Promise<StoredObject | null>;
}

export class R2StorageService implements StorageService {
  constructor(private readonly bucket: R2Bucket) {}

  async put(filename: string, bytes: Uint8Array, contentType: string): Promise<string> {
    await this.bucket.put(filename, bytes, {
      httpMetadata: { contentType },
    });
    return `/uploads/${filename}`;
  }

  async get(filename: string): Promise<StoredObject | null> {
    const object = await this.bucket.get(filename);
    if (!object) return null;
    return {
      body: object.body as unknown as ReadableStream,
      contentType: object.httpMetadata?.contentType || "application/octet-stream",
      size: object.size,
    };
  }
}

export class LocalStorageService implements StorageService {
  constructor(private readonly uploadDir: string) {}

  async put(filename: string, bytes: Uint8Array, _contentType: string): Promise<string> {
    const uploadRoot = resolve(this.uploadDir);
    await mkdir(uploadRoot, { recursive: true });
    const targetPath = resolve(uploadRoot, filename);
    await writeFile(targetPath, bytes);
    return `/uploads/${filename}`;
  }

  async get(filename: string): Promise<StoredObject | null> {
    const uploadRoot = resolve(this.uploadDir);
    const targetPath = resolve(uploadRoot, filename);
    if (!targetPath.startsWith(`${uploadRoot}/`)) return null;

    try {
      await stat(targetPath);
      const data = await readFile(targetPath);
      const ext = filename.split(".").pop()?.toLowerCase();
      let contentType = "application/octet-stream";
      if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg";
      else if (ext === "png") contentType = "image/png";
      else if (ext === "webp") contentType = "image/webp";

      return {
        body: data,
        contentType,
        size: data.byteLength,
      };
    } catch {
      return null;
    }
  }
}
