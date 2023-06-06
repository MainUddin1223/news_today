import { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

export interface INewsReport {
  title: string
  reporterId: mongoose.Types.ObjectId
  subtitle: string[]
  photos: string[]
  description: string
  publisedDate: Date
  reviewerId: string
  category: string
  reporter: string
  status: string
  feedback: string
  reporterEmail: string
  user: JwtPayload
}

export interface IReviewNews {
  status: string
  feedback: string
  reportId: string
  user: JwtPayload
}
