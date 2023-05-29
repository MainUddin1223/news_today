import mongoose from 'mongoose'
import { IRegisterUser } from '../interface/auth.interface'
const Schema = mongoose.Schema

const RegisterUserSchema = new Schema<IRegisterUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
})

export const RegisterModel = mongoose.model('User', RegisterUserSchema)
