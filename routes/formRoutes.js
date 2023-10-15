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

// {
//     "question_id": 84,
//     "average": "0",
//     "text": "How do you feel about working at google?",
//     "category": "culture",
//     "num_responses": 0,
//     "form_id": 34
// },
// {
//     "question_id": 94,
//     "average": "0",
//     "text": "How transparent do you think google is?",
//     "category": "transparency",
//     "num_responses": 0,
//     "form_id": 34
// },
// {
//     "question_id": 104,
//     "average": "0",
//     "text": "What is wrong with you?",
//     "category": "overall",
//     "num_responses": 0,
//     "form_id": 34
// }