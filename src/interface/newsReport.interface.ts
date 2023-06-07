import { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

export type INewsReport = {
  title: string
  reporterId: mongoose.Types.ObjectId
  subtitle: string
  photos: string[]
  description: string
  publisedDate: Date
  reviewerId: string
  category: string
  reporter: string
  status: string
  feedback: string
  newsType: string
  reporterEmail: string
  user: {
    email: string
    name: {
      firstName: string
      lastName: string
    }
    id: string
  }
}

export type IReviewNews = {
  status: string
  feedback: string
  reportId: string
  user: JwtPayload
}
