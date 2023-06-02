import express from 'express'
import { verifyReporter } from '../middleware/verifyAuth'
import { postNewsReport } from '../controller/newsReport.rt'

const router = express.Router()

router.route('/post-news').post(verifyReporter, postNewsReport)

export default { newsRouter: router }
