import { Request, Response } from 'express'
import userService from '../services/auth.services'
import authValidatorSchema from '../validator/auth.validator'
import User from '../models/auth.mo'
import { AuthenticatedRequest } from '../interface/auth.interface'

const { userRegisterService, loginUserService } = userService
const { registerUserSchema, loginUserSchema } = authValidatorSchema

const registerUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = registerUserSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.message })
    }
    const email = req.body.email
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: 'User already exists with this email.',
      })
    }
    const result = await userRegisterService(req.body)
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const { error } = loginUserSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.message })
    }
    const result = await loginUserService(req.body)
    res.status(result.status).send(result)
  } catch (error) {
    console.log(error)
  }
}
const afterLoginAuth = async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email || ''
  const existingUser = await User.findOne({ email }).select(
    '_id name email role'
  )
  res.status(200).send(existingUser)
}

export default { registerUser, loginUser, afterLoginAuth }
