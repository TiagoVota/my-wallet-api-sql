import bcrypt from 'bcrypt'

import connection from "../database/database.js"
import { validateRegister } from '../validation/signUp.js'


const register = async (req, res) => {
	const { body: userInfo } = req
	const { name, email, password } = userInfo
	
	const inputErrors = validateRegister.validate(userInfo).error
	if (inputErrors) return res.status(400).send('Inputs inválidos!')

	const hash = bcrypt.hashSync(password, 12)

	try {
		const alreadyRegistered = await haveExistentEmail(email)
		if (alreadyRegistered) return res.status(409).send('E-mail já cadastrado!')

		await connection.query(`
			INSERT INTO users
				(name, email, password)
			VALUES
				($1, $2, $3);
		`, [name, email, hash])

		return res.send({name, email, password, hash})

	} catch (error) {
		console.log(error)
		return res.send(500)
	}
}


const haveExistentEmail = async (email) => {
	const searchEmailPromise = await connection.query(`
		SELECT *
		FROM users
		WHERE email = $1;
	`, [email])

	return searchEmailPromise.rowCount !== 0
}


export { register }
