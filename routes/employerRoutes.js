import express from 'express';
import  { getSignularEmployer, getAllEmployeesInComp, updateFormFreq, createEmployer, getAllEmployers } from '../controllers/employersController.js';

const router = express.Router();

router.route('/')
    .post(createEmployer)
    .get(getSignularEmployer)

router.route('/all')
    .get(getAllEmployers)

router.route('/employees')
    .get(getAllEmployeesInComp)

router.route('/formfreq')
    .patch(updateFormFreq)

export default router;   