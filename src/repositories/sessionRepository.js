import connection from '../database/database.js'


const findSessionByUserId = async (userId) => {
	const query = `
		SELECT id, user_id AS "userId", token
		FROM sessions
			WHERE user_id = $1;
	`
	const sessionPromise = await connection.query(query, [userId])

	return sessionPromise.rows[0]
}

const updateSession = async ({ sessionId, token }) => {
	const query = `
		UPDATE sessions
		SET token = $1
			WHERE id = $2
		RETURNING *;
	`
	const updateSessionPromise = await connection.query(query, [token, sessionId])

	return updateSessionPromise.rows[0]
}

const createSession = async ({ userId, token }) => {
	const query = `
		INSERT INTO sessions
			(user_id, token)
		VALUES
			($1, $2)
		RETURNING *;
	`
	const insertSessionPromise = await connection.query(query, [userId, token])

	return insertSessionPromise.rows[0]
}

const findSessionByToken = async (token) => {
	const query = `
		SELECT id, user_id AS "userId", token
		FROM sessions
			WHERE token = $1;
	`
	const sessionPromise = await connection.query(query, [token])

	return sessionPromise.rows[0]
}


export {
	findSessionByUserId,
	updateSession,
	createSession,
	findSessionByToken,
}
