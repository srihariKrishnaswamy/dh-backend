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

export const createEmployer = asyncHandler(async (req, res) => {
    const {employer_name, passcode, email, size, industry, categories, form_freq} = req.body
    const [result] = await pool.query(`
    INSERT INTO employer (employer_name, passcode, email, size, industry, categories, form_freq)
    VALUES (?, ?, ?, ?, ?, ?)
    `, [employer_name, passcode, email, size, industry, categories, form_freq])
    const id = result.insertId
    const [rows] = await pool.query(`
    SELECT *
    FROM employer
    WHERE employer_id = ?
    `, [id])
    res.status(200).json(rows[0])
})

export const getAllEmployers = asyncHandler(async (req, res) => {
    console.log("WORKING WORKING")
    const [rows] = await pool.query(`
    SELECT *
    FROM employer
    `, [])
    res.status(200).json(rows)
})