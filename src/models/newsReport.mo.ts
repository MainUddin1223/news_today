import mongoose from 'mongoose'
import { INewsReport } from '../interface/newsReport.interface'

const Schema = mongoose.Schema

const newsReportSchema = new Schema<INewsReport>({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
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
  category: {
    type: String,
    required: true,
  },
  reporter: {
    type: String,
    required: true,
  },
  reporterEmail: {
    type: String,
    required: true,
  },
})

const NewsReport = mongoose.model('news-report', newsReportSchema)

export default NewsReport
