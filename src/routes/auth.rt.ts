import express from 'express'
import auth from '../controller/auth.ct'

const { registerUser, loginUser } = auth

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').get(loginUser)

export default { authRouter: router }
