import connection from "../database/database.js"
import { validateTransaction } from '../validation/transaction.js'

const postTransaction = async (req, res) => {
	const {
		body: { value, description },
		headers: { authorization }
	} = req
	const token = authorization?.replace('Bearer ', '')
	
	if (!token) return res.sendStatus(401)

	const inputErrors = validateTransaction.validate({value, description}).error
	if (inputErrors) return res.status(400).send('Inputs inválidos!')

	try {
		const userPromise = await connection.query(`
			SELECT users.id FROM sessions
				JOIN users
					ON sessions.user_id = users.id
				WHERE sessions.token = $1;
		`, [token])
		const user = userPromise.rows[0]

		if (!user) return res.sendStatus(401)
		
		const userId = user.id

		await connection.query(`
			INSERT INTO statements
				(user_id, value, description)
			VALUES
				($1, $2, $3)
		`, [userId, value, description])

		return res.sendStatus(204)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}


export { postTransaction }