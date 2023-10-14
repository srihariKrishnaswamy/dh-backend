import express from 'express';
import  { createEmployer, getAllEmployers } from '../controllers/employersController.js';

const router = express.Router();

router.route('/')
    .post(createEmployer)

router.route('/all')
    .get(getAllEmployers)

export default router;   