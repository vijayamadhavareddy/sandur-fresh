import { env } from "../../config/env";
import { DevOtpProvider } from "./dev.provider";
import { MockOtpProvider } from "./mock.provider";
import type { OtpProvider } from "./otp.types";
import { type FetchLike, TwoFactorOtpProvider } from "./two-factor.provider";

export type CreateOtpProviderOptions = {
  provider?: "2factor" | "dev" | "mock";
  apiKey?: string;
  template?: string;
  fetchFn?: FetchLike;
};

export const createOtpProvider = (options?: CreateOtpProviderOptions): OtpProvider => {
  const apiKey = options?.apiKey ?? env.OTP_API_KEY ?? env.TWO_FACTOR_API_KEY;
  const configuredProvider = options?.provider ?? env.OTP_PROVIDER;

  // Resolve provider: explicit option/env, or auto-detect based on API key, else dev
  const targetProvider = configuredProvider ?? (apiKey ? "2factor" : "dev");

  switch (targetProvider) {
    case "2factor": {
      if (!apiKey) {
        console.warn(
          "[otp] OTP provider is set to '2factor' but neither OTP_API_KEY nor TWO_FACTOR_API_KEY is configured. Falling back to DevOtpProvider.",
        );
        return new DevOtpProvider();
      }
      return new TwoFactorOtpProvider({
        apiKey,
        defaultTemplate: options?.template ?? env.OTP_TEMPLATE,
        fetchFn: options?.fetchFn,
      });
    }
    case "mock":
      return new MockOtpProvider();
    default:
      return new DevOtpProvider();
  }
};
