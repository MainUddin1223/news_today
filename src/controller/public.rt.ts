import { NextFunction, Request, Response } from 'express';
import NewsReport from '../models/newsReport.mo';
import catchAsync from '../errorHandler/catchAsync';
import { publicServices } from '../services/public.services';

const getAllNews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 25 } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;
    const result = await NewsReport.find({ status: 'approved' })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).send(result);
    next();
  }
);

const getNewsByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category, sub_category = 'all' } = req.query;
    const result = await publicServices.getNewsByCategoryService(
      category as string,
      sub_category as string
    );
    res.status(200).send(result);
    next();
  }
);

export const publicController = { getAllNews, getNewsByCategory };
