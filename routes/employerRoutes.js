import express from 'express';
import  { updateFormFreq, createEmployer, getAllEmployers } from '../controllers/employersController.js';

const router = express.Router();

router.route('/')
    .post(createEmployer)

router.route('/all')
    .get(getAllEmployers)

router.route('/formfreq')
    .patch(updateFormFreq)
    
export default router;   