import cors from 'cors'
import express from 'express'

import auth from './middlewares/auth.js'
import * as userController from './controllers/userController.js'
import { postTransaction } from './controllers/transaction.js'
import { getStatements } from './controllers/statement.js'


const app = express()

app.use(cors())
app.use(express.json())

app.get('/status', (_, res) => res.sendStatus(200))

app.post('/sign-up', userController.signUp)
app.post('/login', userController.login)

app.post('/transaction', auth, postTransaction)

app.get('/statement', auth, getStatements)


export default app
