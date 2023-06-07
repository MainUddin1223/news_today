import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'
export type IRegisterUser = {
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

export type ILoginUser = {
  email: string
  password: string
}

export type AuthenticatedRequest = Request & {
  user?: JwtPayload | undefined
}
