import mongoose from 'mongoose';
import { INewsReport } from '../interface/newsReport.interface';
import { news_status_enum, news_type_enum } from '../constant/constant';

const Schema = mongoose.Schema;

const newsReportSchema = new Schema<INewsReport>(
  {
    title: {
      type: String,
      required: true,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: news_status_enum,
      default: 'pending',
    },
    photos: {
      type: [],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviewerId: {
      type: String,
      default: '',
    },
    feedback: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
    },
    sub_category: {
      type: String,
      required: true,
    },
    newsType: {
      type: String,
      enum: news_type_enum,
      default: 'normal',
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const NewsReport = mongoose.model('news-report', newsReportSchema);

export default NewsReport;
