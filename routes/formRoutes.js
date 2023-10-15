import express from 'express';
import  {inviteEmployees, getEmployerAverages, getCatAverages, findIfEmployeeFilledForm, submitForm, getAllQuestionsForOneForm, getAllFormsForCompany, getFormByID, createForm, getAllForms, getAllQuestions, getAllResponses, updateTitle, updateDescription, updateCurrentDate } from '../controllers/formController.js';

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

router.route('/filled')
    .get(findIfEmployeeFilledForm)

router.route('/averages')
    .get(getCatAverages)

router.route('/empaverages')
    .get(getEmployerAverages)

router.route('/invite')
    .post(inviteEmployees)

export default router;