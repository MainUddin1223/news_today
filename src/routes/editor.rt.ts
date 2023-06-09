import express from 'express';
import { verifyEditor } from '../middleware/verifyAuth';
import { editorController } from '../controller/editor.ct';

const router = express.Router();

router
  .route('/review-report/:id')
  .put(verifyEditor, editorController.reviewReportsByEditor);

export default { editorRouter: router };
