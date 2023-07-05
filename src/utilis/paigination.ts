import { SortOrder } from 'mongoose';

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total: number;
  };
  data: T;
};
export type filterType = {
  searchTerm?: string | number;
  minPrice?: number;
  maxPrice?: number;
};

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};
type IOptionResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const calculatePaignation = (options: IOptions): IOptionResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const paginationHelpers = {
  calculatePaignation,
};
