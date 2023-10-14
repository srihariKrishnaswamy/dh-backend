import express from 'express';
import  { createForm, getAllForms } from '../controllers/formController.js';

const router = express.Router();

router.route('/')
    .post(createForm)

router.route('/all')
    .get(getAllForms)

export default router;   