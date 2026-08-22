import type { DomainError } from "../../shared/errors";
import { ok, type Result } from "../../shared/result";
import type { OtpProvider, SendOtpInput, SendOtpResult } from "./otp.types";

export class DevOtpProvider implements OtpProvider {
  readonly name = "dev";

  async sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, DomainError>> {
    console.log(
      JSON.stringify({
        level: "info",
        msg: "dev_otp_sent",
        phone: input.phone,
        otp: input.otp,
        template: input.template,
      }),
    );
    return ok({
      success: true,
      details: "Delivered via local console",
    });
  }
}
