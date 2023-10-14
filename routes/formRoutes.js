import express from 'express';
import  { getAllQuestionsForOneForm, getAllFormsForCompany, getFormByID, createForm, getAllForms, getAllQuestions, getAllResponses } from '../controllers/formController.js';

const router = express.Router();

router.route('/')
    .post(createForm)
    .get(getFormByID)

router.route('/all')
    .get(getAllForms)

router.route('/questions/all')
    .get(getAllQuestions)

router.route('/questions')
    .get(getAllQuestionsForOneForm)

router.route('/employer')
    .get(getAllFormsForCompany)

router.route('/responses/all')
    .get(getAllResponses)

export default router;   