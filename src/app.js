import cors from 'cors'
import express from 'express'

import auth from './middlewares/auth.js'
import * as userController from './controllers/userController.js'
import * as transactionsController from './controllers/transactionsController.js'


const app = express()

app.use(cors())
app.use(express.json())

app.get('/status', (_, res) => res.sendStatus(200))

app.post('/sign-up', userController.signUp)
app.post('/login', userController.login)

app.post('/transaction', auth, transactionsController.postTransaction)
app.get('/statements', auth, transactionsController.getStatements)


export default app
