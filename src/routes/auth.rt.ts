import express from 'express';
import { verifyAuth } from '../middleware/verifyAuth';
import { authApi } from '../controller/auth.ct';

const router = express.Router();

router.route('/signup').post(authApi.registerUser);
router
  .route('/login')
  .post(authApi.loginUser)
  .get(verifyAuth, authApi.afterLoginAuth);

export default { authRouter: router };
