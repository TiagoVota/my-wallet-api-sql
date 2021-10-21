import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import connection from "../database/database.js"


const login = async (req, res) => {
	const { body: { name, password } } = req

	try {
		const userPromise = await connection.query(`
			SELECT id, password
			FROM "usersTest"
				WHERE name = $1;
		`, [name])
		const user = userPromise.rows[0]

		const isValidPassword = bcrypt.compareSync(password, user?.password)

		if (user && isValidPassword) {
			const token = await makeSession(user.id)

			return res.send(token)
		} else return res.sendStatus(401)
		
	} catch (error) {

		console.log(error)
		res.sendStatus(500)
	}
}


const makeSession = async (userId) => {
	const token = uuid()

	await connection.query(`
		INSERT INTO "sessionsTest"
			("userId", token)
		VALUES
			($1, $2);
	`, [userId, token])

	return token
}


export { login }
