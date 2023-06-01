import express from 'express'
import newsReport from '../controller/newsReport.rt'

const { postNewsReport } = newsReport

const router = express.Router()

router.route('/post-news').post(postNewsReport)

export default { newsRouter: router }
