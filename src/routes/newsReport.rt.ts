import express from 'express'
import { verifyReporter, verifyEditor } from '../middleware/verifyAuth'
import { ReportsController } from '../controller/newsReport.rt'

const router = express.Router()

router
  .route('/post-news')
  .post(verifyReporter, ReportsController.postNewsReport)
router
  .route('/my-all-reports')
  .get(verifyReporter, ReportsController.getMyAllReports)
router
  .route('/my-editor-reports')
  .get(verifyReporter, ReportsController.getReportsCategory)
  .put(verifyEditor, ReportsController.reviewReportsByEditor)
export default { newsRouter: router }
