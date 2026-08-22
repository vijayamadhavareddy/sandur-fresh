import type { DomainError } from "../../shared/errors";
import { ok, type Result } from "../../shared/result";
import type { OtpProvider, SendOtpInput, SendOtpResult } from "./otp.types";

export class MockOtpProvider implements OtpProvider {
  readonly name = "mock";
  private readonly sentOtps: SendOtpInput[] = [];

  async sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, DomainError>> {
    this.sentOtps.push({ ...input });
    return ok({
      success: true,
      messageId: `mock-${this.sentOtps.length}`,
      details: "Mock delivery successful",
    });
  }

  getSentOtps(): readonly SendOtpInput[] {
    return [...this.sentOtps];
  }

  clear(): void {
    this.sentOtps.length = 0;
  }
}
