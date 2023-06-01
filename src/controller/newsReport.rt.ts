import { Request, Response } from 'express'
import newsReportValidator from '../validator/newsReport.validator'
import newsReportServices from '../services/newsReport.services'

const { newsReportSchema } = newsReportValidator
const { postReport } = newsReportServices

const postNewsReport = async (req: Request, res: Response) => {
  try {
    const { error } = newsReportSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.message })
    }
    const result = await postReport(req.body)
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}
export default { postNewsReport }
