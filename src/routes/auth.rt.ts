import express from 'express'
import auth from '../controller/auth.ct'
import { verifyAuth } from '../middleware/verifyAuth'

const { registerUser, loginUser, afterLoginAuth } = auth

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser).get(verifyAuth, afterLoginAuth)

export default { authRouter: router }
