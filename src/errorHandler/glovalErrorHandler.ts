import { ErrorRequestHandler } from 'express';
import ApiError from './ApiError';
import config from '../config';
type IGenericMessages = {
  path: string | number;
  message: string;
};

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';
  let errorMessages: IGenericMessages[] = [];
  console.log('--------------error---------------', error);

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;
