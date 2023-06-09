import express from 'express';
import { verifyEditor } from '../middleware/verifyAuth';
import { editorController } from '../controller/editor.ct';

const router = express.Router();

router
  .route('/review-report/:id')
  .put(verifyEditor, editorController.reviewReportsByEditor);
router.route('/get-reports').get(verifyEditor, editorController.getallReports);
export default { editorRouter: router };
