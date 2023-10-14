import express from 'express';
import  { createEmployee, getAllEmployees, getEmployeeByID, getEmployeeByEmail } from '../controllers/employeesController.js';

const router = express.Router();

router.route('/')
    .post(createEmployee)
    .get(getEmployeeByEmail)

router.route('/all')
    .get(getAllEmployees)

router.route('/:employee_id')
    .get(getEmployeeByID)

export default router;   