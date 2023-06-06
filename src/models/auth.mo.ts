import mongoose from 'mongoose'
import { IRegisterUser } from '../interface/auth.interface'
const Schema = mongoose.Schema

const RegisterUserSchema = new Schema<IRegisterUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'reporter', 'editor'],
    default: 'user',
  },

  category: {
    type: String,
    default: '',
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

const User = mongoose.model('User', RegisterUserSchema)
export default User
