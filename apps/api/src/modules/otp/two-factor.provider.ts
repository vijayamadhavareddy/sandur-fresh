import { internal } from "../../shared/errors";
import { err, ok, type Result } from "../../shared/result";
import type {
  OtpProvider,
  SendOtpInput,
  SendOtpResult,
  VerifyOtpInput,
  VerifyOtpResult,
} from "./otp.types";

export type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export type TwoFactorOtpProviderOptions = {
  apiKey: string;
  defaultTemplate?: string;
  baseUrl?: string;
  fetchFn?: FetchLike;
  timeoutMs?: number;
};

type TwoFactorApiResponse = {
  Status?: string;
  Details?: string;
  OTP?: string;
};

export class TwoFactorOtpProvider implements OtpProvider {
  readonly name = "2factor";
  private readonly apiKey: string;
  private readonly defaultTemplate?: string;
  private readonly baseUrl: string;
  private readonly fetchFn: FetchLike;
  private readonly timeoutMs: number;

  constructor(options: TwoFactorOtpProviderOptions) {
    if (!options.apiKey.trim()) {
      throw new Error("TwoFactorOtpProvider requires a non-empty apiKey");
    }
    this.apiKey = options.apiKey.trim();
    this.defaultTemplate = options.defaultTemplate?.trim();
    this.baseUrl = (options.baseUrl ?? "https://2factor.in/API/V1").replace(/\/+$/, "");
    const customFetch = options.fetchFn;
    this.fetchFn = customFetch
      ? (input, init) => customFetch(input, init)
      : (input, init) => globalThis.fetch(input, init);
    this.timeoutMs = options.timeoutMs ?? 10_000;
  }

  async sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, ReturnType<typeof internal>>> {
    const normalizedPhone = this.normalizePhone(input.phone);
    const encodedPhone = encodeURIComponent(normalizedPhone).replace(/%2B/gi, "+");
    const template = input.template?.trim() || this.defaultTemplate;

    let url = `${this.baseUrl}/${encodeURIComponent(this.apiKey)}/SMS/${encodedPhone}/AUTOGEN2`;
    if (template) {
      url += `/${encodeURIComponent(template)}`;
    }

    try {
      const response = await this.fetchFn(url, {
        method: "GET",
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      const data = (await response.json()) as TwoFactorApiResponse;

      if (response.ok && data?.Status === "Success") {
        return ok({
          success: true,
          code: data.OTP ?? "",
          sessionId: data.Details,
          messageId: data.Details,
          details: data.Details,
        });
      }

      const errorMessage = data?.Details || `HTTP ${response.status} ${response.statusText}`;
      console.error(`[otp:2factor] Send failed for ${normalizedPhone}:`, errorMessage);
      return err(
        internal(`Failed to deliver OTP: ${errorMessage}`, {
          provider: this.name,
          details: data?.Details,
          status: response.status,
        }),
      );
    } catch (cause) {
      const reason = cause instanceof Error ? cause.message : String(cause);
      console.error(`[otp:2factor] Network/service error for ${normalizedPhone}:`, reason);
      return err(
        internal(`Failed to deliver OTP due to network error: ${reason}`, {
          provider: this.name,
          reason,
        }),
      );
    }
  }

  async verifyOtp(
    input: VerifyOtpInput,
  ): Promise<Result<VerifyOtpResult, ReturnType<typeof internal>>> {
    let url: string;
    if (input.sessionId?.trim()) {
      url = `${this.baseUrl}/${encodeURIComponent(this.apiKey)}/SMS/VERIFY/${encodeURIComponent(
        input.sessionId.trim(),
      )}/${encodeURIComponent(input.code.trim())}`;
    } else {
      const normalizedPhone = this.normalizePhone(input.phone);
      const encodedPhone = encodeURIComponent(normalizedPhone).replace(/%2B/gi, "+");
      url = `${this.baseUrl}/${encodeURIComponent(this.apiKey)}/SMS/VERIFY3/${encodedPhone}/${encodeURIComponent(
        input.code.trim(),
      )}`;
    }

    try {
      const response = await this.fetchFn(url, {
        method: "GET",
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      const data = (await response.json()) as TwoFactorApiResponse;

      if (response.ok && data?.Status === "Success") {
        return ok({
          valid: true,
          message: data.Details ?? "OTP Matched",
        });
      }

      if (data?.Status === "Error") {
        return ok({
          valid: false,
          message: data.Details ?? "OTP Mismatch",
        });
      }

      const errorMessage = data?.Details || `HTTP ${response.status} ${response.statusText}`;
      console.error(`[otp:2factor] Verification failed for ${input.phone}:`, errorMessage);
      return err(
        internal(`OTP verification service failure: ${errorMessage}`, {
          provider: this.name,
          details: data?.Details,
          status: response.status,
        }),
      );
    } catch (cause) {
      const reason = cause instanceof Error ? cause.message : String(cause);
      console.error(`[otp:2factor] Verification network error for ${input.phone}:`, reason);
      return err(
        internal(`OTP verification failed due to network error: ${reason}`, {
          provider: this.name,
          reason,
        }),
      );
    }
  }

  private normalizePhone(phone: string): string {
    return phone.trim().replace(/[^\d+]/g, "");
  }
}
