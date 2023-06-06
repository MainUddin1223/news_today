import express from 'express'
import { verifyAdmin } from '../middleware/verifyAuth'
import { andminRoutes } from '../controller/admin.ct'

const router = express.Router()

router.route('/get-stuff').get(verifyAdmin, andminRoutes.getStuffByRole)
router
  .route('/get-reports')
  .get(verifyAdmin, andminRoutes.getReportsByDateAndStatus)

export default { adminRouter: router }
