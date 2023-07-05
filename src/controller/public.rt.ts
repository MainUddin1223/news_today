import { NextFunction, Request, Response } from 'express';
import catchAsync from '../errorHandler/catchAsync';
import { publicServices } from '../services/public.services';
import pick from '../utilis/pick';
import { newsFiltarableFields, paiganationFields } from '../constant/constant';

const getAllNews = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paignationOptions = pick(req.query, paiganationFields);
    const filters = pick(req.query, newsFiltarableFields);
    const data = await publicServices.getAllNews(paignationOptions, filters);
    res.status(200).send({ meta: data.meta, result: data.data });
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
