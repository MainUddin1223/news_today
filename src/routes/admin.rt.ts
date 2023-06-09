import express from 'express';
import { verifyAdmin } from '../middleware/verifyAuth';
import { andminRoutes } from '../controller/admin.ct';

const router = express.Router();

router.route('/get-stuff').get(verifyAdmin, andminRoutes.getStuffByRole);
router
  .route('/get-reports')
  .get(verifyAdmin, andminRoutes.getReportsByDateAndStatus);
router
  .route('/invitation')
  .put(verifyAdmin, andminRoutes.inviteEmployeeForRole);

router.route('/approval').put(verifyAdmin, andminRoutes.approveEmplyeeForRole);

export default { adminRouter: router };
