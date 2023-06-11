import { NextFunction, Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';

const catchAsync = (fn: RequestHandler) => {
  console.log('----------', 'catchAsync');
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
