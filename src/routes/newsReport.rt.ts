import express from 'express'
import newsReport from '../controller/newsReport.rt'
import middleware from '../middleware/verifyAuth'

const { postNewsReport } = newsReport
const { verifyReporter } = middleware

const router = express.Router()

router.route('/post-news').post(verifyReporter, postNewsReport)

export default { newsRouter: router }
