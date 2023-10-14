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
    INSERT INTO employee (full_name, passcode, email, gender, job_title, years_with_comp)
    VALUES (?, ?, ?, ?, ?, ?)
    `, [full_name, passcode, email, gender, job_title, years_with_comp])
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