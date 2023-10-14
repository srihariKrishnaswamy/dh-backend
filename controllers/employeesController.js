import mysql from 'mysql2'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
dotenv.config()


const pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b20faf36a67e9d",
    password: "08436b24",
    database: "heroku_6d605fac4ae93ca"
}).promise()

export const createEmployee = asyncHandler(async (req, res) => {
    const {full_name, passcode, email, gender, job_title, years_with_comp} = req.body
    // missing employer_id
    const [result] = await pool.query(`
    INSERT INTO employee (full_name, passcode, email, gender, job_title, years_with_comp, employer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [full_name, passcode, email, gender, job_title, years_with_comp, employer_id])
    const id = result.insertId
    const [rows] = await pool.query(`
    SELECT *
    FROM employee
    WHERE employee_id = ?
    `, [id])

    res.status(200).json(rows[0])
})

export const getAllEmployees = asyncHandler(async (req, res) => {
    console.log("WORKING WORKING")
    const [rows] = await pool.query(`
    SELECT *
    FROM employee
    `, [])
    res.status(200).json(rows)
})

export const getEmployeeByID = asyncHandler(async (req, res) => {
    const {employee_id} = req.params;
    const [rows] = await pool.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id])
    res.status(200).json(rows[0])
})

export const getEmployeeByEmail = asyncHandler(async (req, res) => {
    const {email} = req.query;
    const [rows] = await pool.query('SELECT * FROM employee WHERE email = ?', [email])
    res.status(200).json(rows[0])
})

export const updateEmployeeInfo = asyncHandler(async (req, res) => {
    const {employee_id, gender, job_title} = req.body;
    await pool.query('UPDATE employee SET gender = ?, job_title = ? WHERE employee_id = ?', [gender, job_title, employee_id])
    const [rows] = await pool.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id])
    res.status(200).json(rows[0])
})

export const updateEmployeePassword = asyncHandler(async (req, res) => {
    const {employee_id, password} = req.body;
    await pool.query('UPDATE employee SET passcode = ? WHERE employee_id = ?', [password, employee_id])
    const [rows] = await pool.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id])
    res.status(200).json(rows[0])
})

export const updateEmployeeCompanyFields = asyncHandler(async (req, res) => {
    const {employee_id, date_joined, job_title} = req.body;
    await pool.query('UPDATE employee SET date_joined = ?, job_title = ? WHERE employee_id = ?', [date_joined, job_title, employee_id])
    const [rows] = await pool.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id])
    res.status(200).json(rows[0])
})