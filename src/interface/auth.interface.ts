export interface IRegisterUser {
  email: string
  password: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
}

export interface ILoginUser {
  email: string
  password: string
}
