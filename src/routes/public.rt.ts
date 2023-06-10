import express from 'express';
import { publicController } from '../controller/public.rt';

const router = express.Router();
router.route('/all-news').get(publicController.getAllNews);

export default { publicRouter: router };
