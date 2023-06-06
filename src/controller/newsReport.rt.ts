import { Response } from 'express'
import newsReportValidator from '../validator/newsReport.validator'
import { AuthenticatedRequest } from '../interface/auth.interface'
import { reporterService } from '../services/reporter.services'
import NewsReport from '../models/newsReport.mo'

const { newsReportSchema } = newsReportValidator

const postNewsReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = newsReportSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.message })
    }
    const result = await reporterService.postReport({
      ...req.body,
      user: req.user,
    })
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}

const getMyAllReports = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reporterId = req.user?.id
    const result = await NewsReport.find({ reporterId })
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}

const getReportsCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const category = 'sports'
    // const category = req.body.category
    const result = await NewsReport.find({ category })
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
  }
}

const reviewReportsByEditor = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const result = await reporterService.reviewReportsService({
      ...req.body,
      user: req.user,
    })
    if (!result) {
      res.status(400).send({ success: false, message: 'Something went wrong' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const ReportsController = {
  postNewsReport,
  getMyAllReports,
  getReportsCategory,
  reviewReportsByEditor,
}
