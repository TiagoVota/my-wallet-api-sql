import supertest from 'supertest'
import app from '../src/app.js'
import connection from '../src/database/database.js'


afterAll(async () => connection.end())

describe('POST /sign-in', () => {
	const invalidBody = {
		email: 'tiago@teste.com',
		password: ''
	}
	
	const incorrectBody = {
		email: 'tiago@teste.com',
		password: 'incorrectPassword'
	}

	const validBody = {
		email: 'tiago@teste.com',
		password: 'senha'
	}
	
	test('Return 400 for invalid body', async () => {

		const result = await supertest(app)
			.post('/sign-in')
			.send(invalidBody)

		expect(result.status).toEqual(400)
	})

	test('Return 401 for incorrect password', async () => {
		const result = await supertest(app)
			.post('/sign-in')
			.send(incorrectBody)

		expect(result.status).toEqual(401)
	})

	test('Returns 200 for correct information', async () => {
		const result = await supertest(app)
			.post('/sign-in')
			.send(validBody)
		
		expect(result.status).toEqual(200)
	})
})

