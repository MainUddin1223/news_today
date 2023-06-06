import { Response } from 'express'
import { AuthenticatedRequest } from '../interface/auth.interface'
import User from '../models/auth.mo'
import NewsReport from '../models/newsReport.mo'

const getStuffByRole = async (req: AuthenticatedRequest, res: Response) => {
  const role = req.query
  try {
    const result = await User.find({ role })
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
  }
}

const getReportsByDateAndStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { status, date } = req.query
  try {
    const result = await NewsReport.find({ status, createdAT: date })
    res.status(200).send(result)
  } catch (error) {
    console.log(error)
  }
}

export const andminRoutes = { getStuffByRole, getReportsByDateAndStatus }
