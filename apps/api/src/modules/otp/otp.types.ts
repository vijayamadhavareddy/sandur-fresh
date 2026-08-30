import type { DomainError } from "../../shared/errors";
import type { Result } from "../../shared/result";

export type SendOtpInput = {
  /** Recipient phone number (e.g. +919876543210) */
  phone: string;
  /** Optional SMS template name or DLT template ID */
  template?: string;
  /** Optional custom sender header / DLT sender ID */
  senderId?: string;
  /** Optional custom OTP code if provider supports manual code delivery */
  otp?: string;
};

export type SendOtpResult = {
  success: boolean;
  /** The OTP code generated or delivered */
  code: string;
  /** Session identifier returned by provider (e.g. 2factor session ID) */
  sessionId?: string;
  messageId?: string;
  details?: string;
};

export type VerifyOtpInput = {
  phone: string;
  code: string;
  sessionId?: string;
  expectedCode?: string;
};

export type VerifyOtpResult = {
  valid: boolean;
  message?: string;
};

export interface OtpProvider {
  readonly name: string;
  sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, DomainError>>;
  verifyOtp(input: VerifyOtpInput): Promise<Result<VerifyOtpResult, DomainError>>;
}
