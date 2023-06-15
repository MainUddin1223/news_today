import express from 'express';
import { verifyReporter } from '../middleware/verifyAuth';
import { ReporterController } from '../controller/reporter.ct';

const router = express.Router();

router.route('/report').post(verifyReporter, ReporterController.createReport);
router
  .route('/report/:id')
  .get(verifyReporter, ReporterController.getReportById)
  .put(verifyReporter, ReporterController.updateReport);
router
  .route('/reports')
  .get(verifyReporter, ReporterController.getMyAllReports);
router.route('/invitation').put(verifyReporter, ReporterController.invitation);
router.route('/statics').get(verifyReporter, ReporterController.getStatics);
router.route('/history').get(verifyReporter, ReporterController.getHistory);

export default { newsRouter: router };
