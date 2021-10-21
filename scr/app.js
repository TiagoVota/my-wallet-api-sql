import cors from 'cors'
import express from 'express'


const app = express()

app.use(cors())
app.use(express.json())


// SIGN IN
app.post('/sign-in')

// SIGN UP
app.post('/sign-up')

// ENTRY
app.post('/entry')

// OUTFLOW
app.post('/outflow')

// STATEMENT
app.get('/statement')


app.listen(4000)
