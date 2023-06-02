import { Response } from 'express'
import newsReportValidator from '../validator/newsReport.validator'
import { AuthenticatedRequest } from '../interface/auth.interface'
import { postReport } from '../services/reporter.services'
import NewsReport from '../models/newsReport.mo'

const { newsReportSchema } = newsReportValidator

const postNewsReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = newsReportSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.message })
    }
    const result = await postReport({ ...req.body, user: req.user })
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}

const getMyAllReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reporterId = req.user?.id
    const result = await NewsReport.find({ reporterId })
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}

export { postNewsReport, getMyAllReport }
