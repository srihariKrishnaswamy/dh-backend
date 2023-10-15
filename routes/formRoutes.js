import express from 'express';
import  {submitForm, getAllQuestionsForOneForm, getAllFormsForCompany, getFormByID, createForm, getAllForms, getAllQuestions, getAllResponses, updateTitle, updateDescription, updateCurrentDate } from '../controllers/formController.js';

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

router.route('/updatetitle')
    .patch(updateTitle)

router.route('/updatedescription')
    .patch(updateDescription)

router.route('/updatecurrentdate')
    .patch(updateCurrentDate)

router.route('/submit')
    .post(submitForm)
export default router;