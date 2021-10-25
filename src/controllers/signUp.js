import bcrypt from 'bcrypt'

import connection from "../database/database.js"
import { validateRegister } from '../validation/signUp.js'


const register = (req, res) => {
	const { body: userInfo } = req
	const { name, email, password } = userInfo
	
	const inputErrors = validateRegister.validate(userInfo).error
	console.log(inputErrors)
	if (inputErrors) return res.status(400).send('Inputs inválidos!')

	const hash = bcrypt.hashSync(password, 12)

	try {

		connection.query(`
			INSERT INTO users
				(name, email, password)
			VALUES
				($1, $2, $3);
		`, [name, email, hash])

		res.send({name, email, password, hash})
	} catch (error) {
		
		console.log(error)
		res.send(500)
	}
	
}


export { register }
