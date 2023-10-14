import express from 'express';
import  { createEmployee, getAllEmployees, getEmployeeByID, getEmployeeByEmail, updateEmployeeInfo, updateEmployeePassword, updateEmployeeCompanyFields } from '../controllers/employeesController.js';

const router = express.Router();

router.route('/')
    .post(createEmployee)
    .get(getEmployeeByEmail)

router.route('/all')
    .get(getAllEmployees)

router.route('/:employee_id')
    .get(getEmployeeByID)
    .get(updateEmployeeCompanyFields)

router.route('/info')
    .patch(updateEmployeeInfo)

router.route('/password')
    .patch(updateEmployeePassword)

router.route('/companyfields')
    .patch(updateEmployeeCompanyFields)
    



export default router;   