import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth';
import { authApi } from '../controller/auth.ct';
import {
  loginApiValidator,
  registerUserApiValidator,
} from '../apiValidator/authValidator';

const router = express.Router();

router.route('/signup').post(registerUserApiValidator, authApi.registerUser);
router
  .route('/login')
  .post(loginApiValidator, authApi.loginUser)
  .get(verifyAuth, authApi.afterLoginAuth);

export default { authRouter: router };
