import type { DomainError } from "../../shared/errors";
import { ok, type Result } from "../../shared/result";
import type {
  OtpProvider,
  SendOtpInput,
  SendOtpResult,
  VerifyOtpInput,
  VerifyOtpResult,
} from "./otp.types";

export type RecordedMockOtp = SendOtpInput & {
  code: string;
  sessionId: string;
};

export class MockOtpProvider implements OtpProvider {
  readonly name = "mock";
  private readonly sentOtps: RecordedMockOtp[] = [];

  async sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, DomainError>> {
    const code = input.otp ?? String(100000 + this.sentOtps.length);
    const sessionId = `mock-session-${this.sentOtps.length + 1}`;
    const record: RecordedMockOtp = { ...input, code, sessionId };
    this.sentOtps.push(record);
    return ok({
      success: true,
      code,
      sessionId,
      messageId: sessionId,
      details: "Mock delivery successful",
    });
  }

  async verifyOtp(input: VerifyOtpInput): Promise<Result<VerifyOtpResult, DomainError>> {
    const isMatch =
      input.code === "000000" ||
      (Boolean(input.expectedCode) && input.code === input.expectedCode) ||
      this.sentOtps.some(
        (o) =>
          o.phone === input.phone &&
          o.code === input.code &&
          (!input.sessionId || o.sessionId === input.sessionId),
      );

    return ok({
      valid: isMatch,
      message: isMatch ? "OTP Matched" : "OTP Mismatch",
    });
  }

  getSentOtps(): readonly RecordedMockOtp[] {
    return [...this.sentOtps];
  }

  clear(): void {
    this.sentOtps.length = 0;
  }
}
