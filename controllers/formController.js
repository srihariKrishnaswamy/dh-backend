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

const questions = {
    "work-life-balance" : ["How do you rate the WLB at your job?"],
    "transparency" : ["How easily can you find out about projects outside of your scope?", "How transparent is your company?"],
    "culture": ["How would you rate your company culture?"],
    "overall": ["How happy are you at your current job?", "How much do you like your current job?"]
}

const parseCats = (categories) => {
    var res = []
    var currCat = ""
    for (let i = 0; i < categories.length; i++) {
        if (categories[i] === ",") {
            res.push(currCat)
            currCat = ""
        } else {
            currCat += categories[i];
        }
    }
    if (currCat !== "") res.push(currCat)
    return res
}

export const createForm = asyncHandler(async (req, res) => {
    const {title, curr_date, form_description, employer_id, categories} = req.body;
    const catsList = parseCats(categories);
    const [result] = await pool.query(`
    INSERT INTO form (title, curr_date, form_description, employer_id)
    VALUES (?, ?, ?, ?)
    `, [title, curr_date, form_description, employer_id])
    const id = result.insertId
    for (let i = 0; i < catsList.length; i++) {
        if (questions.hasOwnProperty(catsList[i])) {
            for (let j = 0; j < questions[catsList[i]].length; j++) {
                await pool.query(`
                INSERT INTO question (average, text, category, num_responses, form_id)
                VALUES (0, ?, ?, 0, ?)
                `, [questions[catsList[i]][j], catsList[i], id])
            }
        }
    }
    // create questions with that result.insertId
    const [rows] = await pool.query(`
    SELECT *
    FROM form
    WHERE form_id = ?
    `, [id])
    res.status(200).json(rows[0])
})

export const getAllFormsForCompany = asyncHandler(async (req, res) => {
    const {employer_id} = req.query;
    const [rows] = await pool.query(`
    SELECT *
    FROM form
    WHERE employer_id = ?
    `, [employer_id])
    res.status(200).json(rows)
})

export const getFormByID = asyncHandler(async (req, res) => {
    const {form_id} = req.query;
    const [rows] = await pool.query(`
    SELECT *
    FROM form
    WHERE form_id = ?
    `, [form_id])
    res.status(200).json(rows[0])
})

export const getAllQuestionsForOneForm = asyncHandler(async (req, res) => {
    const {form_id} = req.query;
    const [rows] = await pool.query(`
    SELECT *
    FROM question
    WHERE form_id = ?
    `, [form_id])
    res.status(200).json(rows)
})


export const getAllForms = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
    SELECT *
    FROM form
    `, [])
    res.status(200).json(rows)
})

export const getAllQuestions = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
    SELECT *
    FROM question
    `, [])
    res.status(200).json(rows)
})

export const getAllResponses = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
    SELECT *
    FROM response
    `, [])
    res.status(200).json(rows)
})