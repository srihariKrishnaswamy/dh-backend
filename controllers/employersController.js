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
    VALUES (?, ?, ?, ?, ?, ?, ?)
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
    const [rows] = await pool.query(`
    SELECT *
    FROM employer
    `, [])
    res.status(200).json(rows)
})

// no patch route for categories as of now

export const updateFormFreq = asyncHandler(async (req, res) => {
    const {employer_id, form_freq} = req.body
    const [rows] = await pool.query(`
    UPDATE employer
    SET form_freq = ?
    WHERE employer_id = ?
    `, [form_freq, employer_id])
    const [emper] = await pool.query(`
    SELECT *
    FROM employer
    WHERE employer_id = ?
    `, [employer_id])
    res.status(200).json(emper[0])
})

// export const getAverages = asyncHandler(async (req, res) => {


// })

// export const inviteEmployees = asyncHandler(async (req, res) => {

// })