import { Request, Response } from 'express'
import userService from '../services/auth.services'
import { registerUserSchema } from '../validator/auth.validator'

const { userRegisterService } = userService

const registerUser = async (req: Request, res: Response) => {
  try {
    const { error } = registerUserSchema.validate(req.body)
    if (error) {
      return res.status(400).send({ error: error.message })
    }
    const result = await userRegisterService(req.body)
    res.status(200).send({ result })
  } catch (error) {
    console.log(error)
  }
}

export default { registerUser }
