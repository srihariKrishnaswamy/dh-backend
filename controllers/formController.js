import mysql from "mysql2";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
dotenv.config();

const pool = mysql
  .createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b20faf36a67e9d",
    password: "08436b24",
    database: "heroku_6d605fac4ae93ca",
  })
  .promise();

const questions = {
  "work-life-balance": ["How do you rate the WLB at your job?"],
  transparency: [
    "How easily can you find out about projects outside of your scope?",
    "How transparent is your company?",
  ],
  culture: ["How would you rate your company culture?"],
  overall: [
    "How happy are you at your current job?",
    "How much do you like your current job?",
  ],
};

const parseCats = (categories) => {
  var res = [];
  var currCat = "";
  for (let i = 0; i < categories.length; i++) {
    if (categories[i] === ",") {
      res.push(currCat);
      currCat = "";
    } else {
      currCat += categories[i];
    }
  }
  if (currCat !== "") res.push(currCat);
  return res;
};

export const createForm = asyncHandler(async (req, res) => {
  const { title, curr_date, form_description, employer_id, categories } =
    req.body;
  const catsList = parseCats(categories);
  const [result] = await pool.query(
    `
    INSERT INTO form (title, curr_date, form_description, employer_id)
    VALUES (?, ?, ?, ?)
    `,
    [title, curr_date, form_description, employer_id]
  );
  const id = result.insertId;
  for (let i = 0; i < catsList.length; i++) {
    if (questions.hasOwnProperty(catsList[i])) {
      for (let j = 0; j < questions[catsList[i]].length; j++) {
        await pool.query(
          `
                INSERT INTO question (average, text, category, num_responses, form_id)
                VALUES (0, ?, ?, 0, ?)
                `,
          [questions[catsList[i]][j], catsList[i], id]
        );
      }
    }
  }
  // create questions with that result.insertId
  const [rows] = await pool.query(
    `
    SELECT *
    FROM form
    WHERE form_id = ?
    `,
    [id]
  );
  res.status(200).json(rows[0]);
});

export const getAllFormsForCompany = asyncHandler(async (req, res) => {
  const { employer_id } = req.query;
  const [rows] = await pool.query(
    `
    SELECT *
    FROM form
    WHERE employer_id = ?
    `,
    [employer_id]
  );
  res.status(200).json(rows);
});

export const getFormByID = asyncHandler(async (req, res) => {
  const { form_id } = req.query;
  const [rows] = await pool.query(
    `
    SELECT *
    FROM form
    WHERE form_id = ?
    `,
    [form_id]
  );
  res.status(200).json(rows[0]);
});

export const getAllQuestionsForOneForm = asyncHandler(async (req, res) => {
  const { form_id } = req.query;
  const [rows] = await pool.query(
    `
    SELECT *
    FROM question
    WHERE form_id = ?
    `,
    [form_id]
  );
  res.status(200).json(rows);
});

export const getAllForms = asyncHandler(async (req, res) => {
  console.log("getting all forms");
  const [rows] = await pool.query(
    `
    SELECT *
    FROM form
    `,
    []
  );
  res.status(200).json(rows);
});

export const getAllQuestions = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM question
    `,
    []
  );
  res.status(200).json(rows);
});

export const getAllResponses = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM response
    `,
    []
  );
  res.status(200).json(rows);
});

export const submitForm = asyncHandler(async (req, res) => {
  const { employee_id, answers } = req.body; // no form_id needed, kinda sketch
  // answers = {question_id: number, question_id: number}
  for (let key of Object.keys(answers)) {
    var keyInt = parseInt(key)
    await pool.query(
      `
            INSERT INTO response (answer, question_id, employee_id)
            VALUES (?, ?, ?)
        `,
      [answers[key], keyInt, employee_id]
    );
    await pool.query(
      `
        UPDATE question 
        SET num_responses = num_responses + 1
        WHERE question_id = ?
    `,
      [keyInt]
    );
  }
  res.status(200).json({message: "Form filled!"});
});

export const findIfEmployeeFilledForm = asyncHandler(async (req, res) => {
  const { employee_id, form_id } = req.body;
  const [qIDs] = await pool.query(`
    SELECT question_id FROM question WHERE form_id = ?
  `, [form_id])

  for (qID in qIDs) {
    const [found] = await pool.query(`
    SELECT * FROM response WHERE question_id = ?, employee_id = ?
    `, [qID, employee_id])
    if (found.length > 0) {
        res.status(200).json({found: true});
    }
  }
  res.status(200).json({found: false});
});

export const updateTitle = asyncHandler(async (req, res) => {
    const {form_id, title} = req.body;
    await pool.query('UPDATE form SET title = ? WHERE form_id = ?', [title, form_id])
    const [rows] = await pool.query('SELECT * FROM form WHERE form_id = ?', [form_id])
    res.status(200).json(rows[0])
})

export const updateDescription = asyncHandler(async (req, res) => {
    const {form_id, form_description} = req.body;
    await pool.query('UPDATE form SET form_description = ? WHERE form_id = ?', [form_description, form_id])
    const [rows] = await pool.query('SELECT * FROM form WHERE form_id = ?', [form_id])
    res.status(200).json(rows[0])
})

export const updateCurrentDate = asyncHandler(async (req, res) => {
    const {form_id, curr_date} = req.body;
    await pool.query('UPDATE form SET curr_date = ? WHERE form_id = ?', [curr_date, form_id])
    const [rows] = await pool.query('SELECT * FROM form WHERE form_id = ?', [form_id])
    res.status(200).json(rows[0])
})