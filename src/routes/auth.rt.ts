import express from 'express'
import auth from '../controller/auth.ct'

const { registerUser } = auth

const router = express.Router()

router.route('/register').post(registerUser)

export default { authRouter: router }
