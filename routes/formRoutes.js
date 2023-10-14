import express from 'express';
import  { createForm, getAllForms, getAllQuestions, getAllResponses } from '../controllers/formController.js';

const router = express.Router();

router.route('/')
    .post(createForm)

router.route('/all')
    .get(getAllForms)

router.route('/questions/all')
    .get(getAllQuestions)

router.route('/responses/all')
    .get(getAllResponses)

export default router;   