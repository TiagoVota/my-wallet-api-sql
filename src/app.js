import cors from 'cors'
import express from 'express'

import { login } from './controllers/signIn.js'
import { register } from './controllers/signUp.js'


const app = express()

app.use(cors())
app.use(express.json())


// SIGN IN
app.post('/sign-in', login)

// SIGN UP
app.post('/sign-up', register)

// ENTRY
app.post('/entry')

// OUTFLOW
app.post('/outflow')

// STATEMENT
app.get('/statement')


app.listen(4000)
