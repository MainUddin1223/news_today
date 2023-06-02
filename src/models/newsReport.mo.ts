import mongoose from 'mongoose'
import { INewsReport } from '../interface/newsReport.interface'

const Schema = mongoose.Schema

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
      type: [],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'hidden'],
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
    category: {
      type: String,
      required: true,
    },
    reporter: {
      type: String,
      required: true,
    },
    publisedDate: {
      type: Date,
    },
    reporterEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const NewsReport = mongoose.model('news-report', newsReportSchema)

export default NewsReport
