import { ILoginUser, IRegisterUser } from '../interface/auth.interface'
import bcrypt from 'bcrypt'
import User from '../models/auth.mo'
import jwt from 'jsonwebtoken'
import config from '../config'
const saltRounds = 10
const { jwt_access_token } = config
const hashingPassword = async (password: string) => {
  const hashPassword = await bcrypt.genSalt(saltRounds)
  return bcrypt.hash(password, hashPassword)
}

const validateUser = async (email: string, password: string) => {
  const userData = await User.findOne({ email })
  if (!userData) {
    return { status: 400, success: false, message: 'Invalid email' }
  } else {
    const userPassword = userData.password
    const matchedPassword = await bcrypt.compare(password, userPassword)
    if (!matchedPassword) {
      return { status: 400, success: false, message: 'Invalid Password' }
    } else {
      userData.password = ''
      const { email, name, role, id } = userData
      const payload = { email, name, role, id }
      const token = jwt.sign(payload, jwt_access_token as string, {
        expiresIn: '1d',
      })
      return { status: 200, success: true, result: { userData, token } }
    }
  }
}

const userRegisterService = async (data: IRegisterUser) => {
  const { email, password, name } = data
  const hashPassword = await hashingPassword(password)
  const registerUser = new User({
    email,
    password: hashPassword,
    name,
  })
  const result = await registerUser.save()
  return result
}

const loginUserService = async (data: ILoginUser) => {
  const { email, password } = data
  const result = await validateUser(email, password)
  return result
}

export default { userRegisterService, loginUserService }
