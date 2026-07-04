import { logger } from "../logging";
import { captureException } from "../monitoring";
import { toAppError } from "./classes";

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function handleApiError(error: unknown): ApiErrorResponse {
  const appError = toAppError(error);

  logger.error("API Error", {
    code: appError.code,
    message: appError.message,
    statusCode: appError.statusCode,
    stack: appError.stack,
  });

  if (!appError.isOperational) {
    captureException(appError, {
      code: appError.code,
      statusCode: appError.statusCode,
    });
  }

  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: appError.code,
      message: appError.isOperational ? appError.message : "An unexpected error occurred",
    },
  };

  if (appError instanceof Error && "fieldErrors" in appError) {
    response.error.fieldErrors = (
      appError as { fieldErrors: Record<string, string[]> }
    ).fieldErrors;
  }

  return response;
}

export function createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

export function handleClientError(error: unknown): string {
  const appError = toAppError(error);

  logger.error("Client Error", {
    code: appError.code,
    message: appError.message,
  });

  if (!appError.isOperational) {
    captureException(appError);
  }

  return appError.isOperational ? appError.message : "Something went wrong. Please try again.";
}
