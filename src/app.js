import cors from 'cors'
import express from 'express'

import { login } from './controllers/signIn.js'
import { register } from './controllers/signUp.js'
import { postEntry } from './controllers/entry.js'
import { postOutflow } from './controllers/outflow.js'
import { getStatements } from './controllers/statement.js'


const app = express()

app.use(cors())
app.use(express.json())


app.post('/sign-in', login)

app.post('/sign-up', register)

app.post('/entry', postEntry)

app.post('/outflow', postOutflow)

app.get('/statement', getStatements)


export default app
