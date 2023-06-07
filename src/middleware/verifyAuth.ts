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
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as IRegisterUser
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const verifyRole = (allowedRoles: string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(' ')[1] // Assuming token is sent in the 'Authorization' header

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_access_token as string
      ) as IRegisterUser
      req.user = decoded
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}

const verifyReporter = verifyRole(['reporter'])
const verifyEditor = verifyRole(['subeditor', 'editor', 'admin'])
const verifyChiefEditor = verifyRole(['editor', 'admin'])
const verifyAdmin = verifyRole(['admin'])

export {
  verifyAuth,
  verifyReporter,
  verifyEditor,
  verifyChiefEditor,
  verifyAdmin,
}
