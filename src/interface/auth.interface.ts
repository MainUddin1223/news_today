import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
export interface IRegisterUser {
  email: string
  password: string
  role: string
  token?: string
  category?: string
  name: {
    firstName: string
    lastName: string
  }
}

export interface ILoginUser {
  email: string
  password: string
}
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload | undefined
}
