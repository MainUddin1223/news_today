import express from 'express';
import { publicController } from '../controller/public.rt';

const router = express.Router();
router.route('/all-news').get(publicController.getAllNews);
router.route('/').get(publicController.getNewsByCategory);

export default { publicRouter: router };
