import bcrypt from 'bcrypt'

import connection from "../database/database.js"


const register = (req, res) => {
	const { body: { name, email, password, confirmation } } = req

	const hash = bcrypt.hashSync(password, 12)

	try {

		connection.query(`
			INSERT INTO "usersTest"
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
