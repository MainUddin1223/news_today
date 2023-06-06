import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import {
  AuthenticatedRequest,
  IRegisterUser,
} from '../interface/auth.interface'

const verifyAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1] // Assuming token is sent in the 'Authorization' header
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, config.jwt_access_token as string)
    req.user = decoded as object
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const verifyReporter = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1] // Assuming token is sent in the 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, config.jwt_access_token as string)
    req.user = decoded as IRegisterUser
    if (req.user.role !== 'reporter') {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const verifyEditor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const decoded = jwt.verify(token, config.jwt_access_token as string)
    req.user = decoded as IRegisterUser
    const role = 'subeditor' || 'editor'
    if (req.user.role !== role) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export { verifyAuth, verifyReporter, verifyEditor }
