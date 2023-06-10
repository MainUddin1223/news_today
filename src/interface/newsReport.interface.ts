import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';

export type IUserPaylod = {
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  _id: string;
  category?: string;
};

export type IUpdateReport = {
  reportId?: string;
  title: string;
  subtitle: string;
  photos: string[];
  description: string;
  user?: IUserPaylod;
};
export type INewsReport = IUpdateReport & {
  reporterId: mongoose.Types.ObjectId;
  publishedDate: Date;
  reviewerId: string;
  category: string;
  reporter: string;
  status: string;
  feedback: string;
  newsType: string;
  reporterEmail: string;
  user: IUserPaylod;
};

export type IReviewNews = {
  status: string;
  feedback: string;
  reportId: string;
  user: JwtPayload;
};
