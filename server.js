import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import employeeRoutes from './routes/employeeRoutes.js'
import employerRoutes from './routes/employerRoutes.js'
import formRoutes from './routes/formRoutes.js'
import authRoutes from './routes/authRoutes.js'
import corsOptions from './config/corsOptions.js'

dotenv.config()
const PORT = 8080

const app = express()
app.use(express.json())
app.use(cookieParser()) 
app.use(cors(corsOptions))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!")
})

app.use('/employee', employeeRoutes)
app.use('/employer', employerRoutes)
app.use('/form', formRoutes)
app.use('/auth', authRoutes)
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`)
})


/*
mysql://b20faf36a67e9d:08436b24@us-cdbr-east-06.cleardb.net/heroku_6d605fac4ae93ca?reconnect=true
user: "b20faf36a67e9d"
password: "08436b24"
host: "us-cdbr-east-06.cleardb.net"
database: "heroku_6d605fac4ae93ca"
*/ 