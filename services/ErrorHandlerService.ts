import {Response} from 'express';
import logger from './LoggerService';

export interface CustomErrorRequestHandler {
  statusCode: number;
  message: string;
  error: any;
}

class ErrorHandler extends Error {
  private statusCode;
  private error;
  constructor(statusCode: number, message: string, error?: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    if (error) this.error = error;
  }

  static handleError = (err: CustomErrorRequestHandler, res: Response) => {
    const {statusCode, message, error} = err;
    logger.error('Error:', error);
    res.status(statusCode || 500).json({
      error: true,
      statusCode: statusCode || 500,
      message,
    });
  };
}

export default ErrorHandler;
