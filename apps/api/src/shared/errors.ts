import { GraphQLError } from "graphql";

export const ErrorCode = {
  NOT_FOUND: "NOT_FOUND",
  VALIDATION: "VALIDATION",
  CONFLICT: "CONFLICT",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INTERNAL: "INTERNAL",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

export type DomainError = {
  code: ErrorCode;
  message: string;
  details?: unknown;
};

export const domainError = (code: ErrorCode, message: string, details?: unknown): DomainError => ({
  code,
  message,
  ...(details !== undefined ? { details } : {}),
});

export const notFound = (message = "Resource not found", details?: unknown): DomainError =>
  domainError(ErrorCode.NOT_FOUND, message, details);

export const validationError = (message: string, details?: unknown): DomainError =>
  domainError(ErrorCode.VALIDATION, message, details);

export const conflict = (message: string, details?: unknown): DomainError =>
  domainError(ErrorCode.CONFLICT, message, details);

export const outOfStock = (message = "Item is out of stock", details?: unknown): DomainError =>
  domainError(ErrorCode.OUT_OF_STOCK, message, details);

export const unauthorized = (message = "Unauthorized", details?: unknown): DomainError =>
  domainError(ErrorCode.UNAUTHORIZED, message, details);

export const forbidden = (message = "Forbidden", details?: unknown): DomainError =>
  domainError(ErrorCode.FORBIDDEN, message, details);

export const internal = (message = "Internal server error", details?: unknown): DomainError =>
  domainError(ErrorCode.INTERNAL, message, details);

const statusByCode: Record<ErrorCode, number> = {
  NOT_FOUND: 404,
  VALIDATION: 400,
  CONFLICT: 409,
  OUT_OF_STOCK: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL: 500,
};

export const toHttpStatus = (error: DomainError): number => statusByCode[error.code];

export const toErrorBody = (error: DomainError, requestId?: string) => ({
  error: {
    code: error.code,
    message: error.message,
    ...(error.details !== undefined ? { details: error.details } : {}),
  },
  ...(requestId !== undefined ? { requestId } : {}),
});

export const toGraphQLError = (error: DomainError): GraphQLError =>
  new GraphQLError(error.message, {
    extensions: {
      code: error.code,
      ...(error.details !== undefined ? { details: error.details } : {}),
    },
  });
