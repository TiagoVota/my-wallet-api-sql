import cors from 'cors'
import express from 'express'

import { login } from './controllers/signIn.js'
import { register } from './controllers/signUp.js'


const app = express()

app.use(cors())
app.use(express.json())


app.post('/sign-in', login)

app.post('/sign-up', register)

app.post('/entry')

app.post('/outflow')

app.get('/statement')


export default app
