import express from 'express'
import { verifyReporter } from '../middleware/verifyAuth'
import { getMyAllReport, postNewsReport } from '../controller/newsReport.rt'

const router = express.Router()

router.route('/post-news').post(verifyReporter, postNewsReport)
router.route('/get-all-news').get(verifyReporter, getMyAllReport)

export default { newsRouter: router }
