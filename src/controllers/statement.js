import connection from "../database/database.js"


const getStatements = async (req, res) => {
	const {
		headers: { authorization }
	} = req
	const token = authorization?.replace('Bearer ', '')

	if (!token) return res.sendStatus(401)

	try {
		const statementsPromise = await connection.query(`
			SELECT statements.*
			FROM statements
			JOIN sessions
			ON sessions."userId" = statements."userId"
			WHERE sessions.token = $1;
		`, [token])
		const statementsList = statementsPromise.rows
		const { userId } = statementsList[0]

		if (!userId) return res.status(200).send(makeStatement())
		
		const balancePromise = await connection.query(`
			SELECT SUM(value) AS balance
			FROM statements
			WHERE "userId" = $1
			GROUP BY "userId";
		`, [userId])
		const balance = balancePromise.rows[0]

		return res.status(200).send(makeStatement(statementsList, balance))
		
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}


const makeStatement = (statementList=[], balanceDict={}) => {
	const info = {
		statementList,
		...balanceDict
	}

	return info
}


export { getStatements }