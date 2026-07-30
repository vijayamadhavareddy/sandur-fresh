import { compareSync, hash } from "bcrypt-ts";

const SALT_ROUNDS = 10;

/**
 * Universal password hashing compatible with Cloudflare Workers (WebCrypto),
 * Bun, and Node.js.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password: string, hashString: string): Promise<boolean> => {
  console.log("password", password);
  console.log("hashString", hashString);
  const r = compareSync(password, hashString);
  console.log("r", r);
  return r;
};
