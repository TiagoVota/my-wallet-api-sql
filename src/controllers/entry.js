import connection from "../database/database.js"
import { validateEntry } from '../validation/entry.js'

const postEntry = async (req, res) => {
	const {
		body: { value, description },
		headers: { authorization }
	} = req
	const token = authorization?.replace('Bearer ', '')
	const date = makeTodayDate()
	
	if (!token) return res.sendStatus(401)

	const inputErrors = validateEntry.validate({value, description}).error
	if (inputErrors) return res.status(400).send('Inputs inválidos!')

	try {
		const userPromise = await connection.query(`
			SELECT users.id FROM sessions
			JOIN users
			ON sessions."userId" = users.id
			WHERE sessions.token = $1;
		`, [token])
		const user = userPromise.rows[0]

		if (!user) return res.sendStatus(401)
		
		const userId = user.id

		await connection.query(`
			INSERT INTO statements
				("userId", value, description, date)
			VALUES
				($1, $2, $3, $4)
		`, [userId, value, description, date])

		res.sendStatus(204)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

const makeTodayDate = () => {
	const date = new Date()
	return `${date.getDate()}/${date.getMonth()+1}`
}

export { postEntry }