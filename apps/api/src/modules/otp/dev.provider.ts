import { env } from "../../config/env";
import type { DomainError } from "../../shared/errors";
import { ok, type Result } from "../../shared/result";
import type {
  OtpProvider,
  SendOtpInput,
  SendOtpResult,
  VerifyOtpInput,
  VerifyOtpResult,
} from "./otp.types";

export class DevOtpProvider implements OtpProvider {
  readonly name = "dev";

  async sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, DomainError>> {
    const code = input.otp ?? env.DEV_OTP;
    const sessionId = `dev-session-${crypto.randomUUID()}`;

    console.log(
      JSON.stringify({
        level: "info",
        msg: "dev_otp_sent",
        phone: input.phone,
        otp: code,
        sessionId,
        template: input.template,
      }),
    );

    return ok({
      success: true,
      code,
      sessionId,
      details: "Delivered via local console",
    });
  }

  async verifyOtp(input: VerifyOtpInput): Promise<Result<VerifyOtpResult, DomainError>> {
    const isMatch =
      input.code === env.DEV_OTP ||
      (Boolean(input.expectedCode) && input.code === input.expectedCode);
    return ok({
      valid: isMatch,
      message: isMatch ? "OTP Matched" : "OTP Mismatch",
    });
  }
}
