import express from 'express';
import { verifyAdmin } from '../middleware/verifyAuth';
import { andminRoutes } from '../controller/admin.ct';
import { inviteApiValidation } from '../apiValidator/adminValidator';

const router = express.Router();

router.route('/get-stuff').get(verifyAdmin, andminRoutes.getStuffByRole);
router.route('/get-reports').get(verifyAdmin, andminRoutes.getReportsByStatus);
router
  .route('/invitation')
  .put(verifyAdmin, inviteApiValidation, andminRoutes.inviteEmployeeForRole);

export default { adminRouter: router };
