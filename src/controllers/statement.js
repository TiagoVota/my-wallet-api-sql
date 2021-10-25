import connection from "../database/database.js"


const getStatements = async (req, res) => {
	const {
		headers: { authorization }
	} = req
	const token = authorization?.replace('Bearer ', '')

	if (!token) return res.sendStatus(401)

	try {
		const statementsPromise = await connection.query(`
			SELECT statements.* FROM statements
			JOIN sessions
			ON sessions."userId" = statements."userId"
			WHERE sessions.token = $1;
		`, [token])
		const statementsList = statementsPromise.rows

		return res.status(200).send(statementsList)
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

export { getStatements }