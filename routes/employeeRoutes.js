import express from 'express';
import  { createEmployee, getAllEmployees } from '../controllers/employeesController.js';

const router = express.Router();

router.route('/')
    .post(createEmployee)

router.route('/all')
    .get(getAllEmployees)

export default router;   