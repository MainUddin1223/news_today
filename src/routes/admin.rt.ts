import express from 'express';
import { verifyAdmin } from '../middleware/verifyAuth';
import { andminRoutes } from '../controller/admin.ct';
import { inviteApiValidation } from '../apiValidator/adminValidator';

const router = express.Router();

router.route('/reporters').get(verifyAdmin, andminRoutes.getReporters);
router.route('/editors').get(verifyAdmin, andminRoutes.getEditors);
router.route('/reports').get(verifyAdmin, andminRoutes.getReportsByStatus);
router
  .route('/invitation')
  .put(verifyAdmin, inviteApiValidation, andminRoutes.inviteEmployeeForRole);

router.route('/statics').get(verifyAdmin, andminRoutes.overallStatics);
router.route('/history').get(verifyAdmin, andminRoutes.getoneWeekHistory);

export default { adminRouter: router };
