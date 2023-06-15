import express from 'express';
import { verifyEditor, verifyReporter } from '../middleware/verifyAuth';
import { subEditorController } from '../controller/subEditor.ct';

const router = express.Router();

router.route('/').get(verifyEditor, subEditorController.getReports);

router
  .route('/:id')
  .get(verifyEditor, subEditorController.getReportById)
  .put(verifyEditor, subEditorController.reviewReportsBySubEditor);

router.route('/reporters').get(verifyReporter);

router.route('/reporter/:id').get(verifyEditor);

router.route('/statics').get(verifyEditor);

export default { subEditorRoute: router };
