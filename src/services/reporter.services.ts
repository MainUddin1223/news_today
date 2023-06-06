import mongoose from 'mongoose'
import { INewsReport, IReviewNews } from '../interface/newsReport.interface'
import NewsReport from '../models/newsReport.mo'

const postReport = async (data: INewsReport) => {
  try {
    const { title, subtitle, photos, description, category, status, user } =
      data
    const report = new NewsReport({
      title,
      subtitle,
      reporterId: user.id,
      photos,
      description,
      category,
      reporter: `${user.name.firstName} ${user.name.lastName}`,
      status,
      reporterEmail: user.email,
    })
    const result = await report.save()
    return result
  } catch (error: unknown) {
    console.log(error)
    return error
  }
}

const reviewReportsService = async (data: IReviewNews) => {
  const { reportId, status, feedback, user } = data
  const objectIdReportId = new mongoose.Types.ObjectId(reportId)
  const result = await NewsReport.findOneAndUpdate(
    { _id: objectIdReportId, category: user.category },
    { $set: { status, feedback, reviewerId: user.id } },
    { new: true }
  )
  return result
}
export const reporterService = { postReport, reviewReportsService }
