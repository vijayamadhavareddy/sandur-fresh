import type { DomainError } from "../../shared/errors";
import type { Result } from "../../shared/result";

export type SendOtpInput = {
  /** Recipient phone number (e.g. +919876543210) */
  phone: string;
  /** Generated OTP code to deliver */
  otp: string;
  /** Optional SMS template name or DLT template ID */
  template?: string;
  /** Optional custom sender header / DLT sender ID */
  senderId?: string;
};

export type SendOtpResult = {
  success: boolean;
  messageId?: string;
  details?: string;
};

export interface OtpProvider {
  readonly name: string;
  sendOtp(input: SendOtpInput): Promise<Result<SendOtpResult, DomainError>>;
}
