import { IRegisterUser } from '../interface/auth.interface'
import { RegisterModel } from '../models/auth.mo'

const userRegisterService = async (data: IRegisterUser) => {
  const { email, password, name } = data

  const registerUser = new RegisterModel({
    email,
    password,
    name,
  })
  const result = await registerUser.save()
  return result
}

export default { userRegisterService }
