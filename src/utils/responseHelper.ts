import { Response } from 'express';
import { ApiResponse } from '../types';

export class ResponseHelper {
  /**
   * Send success response
   */
  static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send error response
   */
  static error(res: Response, error: string, statusCode: number = 500, details?: any): Response {
    const response: ApiResponse = {
      success: false,
      error,
      timestamp: new Date().toISOString(),
      ...(details && { details })
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Send validation error response
   */
  static validationError(res: Response, error: string, details?: any): Response {
    return this.error(res, error, 400, details);
  }

  /**
   * Send not found response
   */
  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  /**
   * Send unauthorized response
   */
  static unauthorized(res: Response, message: string = 'Unauthorized'): Response {
    return this.error(res, message, 401);
  }

  /**
   * Send forbidden response
   */
  static forbidden(res: Response, message: string = 'Forbidden'): Response {
    return this.error(res, message, 403);
  }
}