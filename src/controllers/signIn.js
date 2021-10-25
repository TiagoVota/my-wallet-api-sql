import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import connection from "../database/database.js"
import { validateLogin } from '../validation/signIn.js'


const login = async (req, res) => {
	const { body: { email, password } } = req

	const inputErrors = validateLogin.validate({email, password}).error
	if (inputErrors) return res.status(400).send('Inputs inválidos!')

	try {
		const userPromise = await connection.query(`
			SELECT id, name, password
			FROM users
				WHERE email = $1;
		`, [email])
		const user = userPromise.rows[0]

		const isValidPassword = bcrypt.compareSync(password, user?.password)

		if (user && isValidPassword) {
			const token = await makeSession(user.id)

			return res.send({token, name: user.name})
		} else return res.sendStatus(401)
		
	} catch (error) {

		console.log(error)
		res.sendStatus(500)
	}
}


const makeSession = async (userId) => {
	const token = uuid()

	await connection.query(`
		INSERT INTO sessions
			("userId", token)
		VALUES
			($1, $2);
	`, [userId, token])

	return token
}


export { login }
