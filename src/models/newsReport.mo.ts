import mongoose from 'mongoose';
import { INewsReport } from '../interface/newsReport.interface';

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
      enum: ['pending', 'approved', 'rejected', 'hidden'],
      default: 'pending',
    },
    photos: {
      type: String,
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
    newsType: {
      type: String,
      enum: ['featured', 'spotlight', 'normal', 'top'],
      default: 'normal',
    },
    publisedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const NewsReport = mongoose.model('news-report', newsReportSchema);

export default NewsReport;
