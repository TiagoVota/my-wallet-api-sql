import connection from '../database/database.js'


const findUsersByEmail = async (email) => {
	const query = `
		SELECT * FROM users
			WHERE email = $1;
	`
	const otherUsersPromise = await connection.query(query, [email])
	
	return otherUsersPromise.rows
}

const registerUser = async ({ name, email, password }) => {
	const query = `
		INSERT INTO users
			(name, email, password)
		VALUES
			($1, $2, $3)
		RETURNING *;
	`
	const userPromise = await connection.query(query, [name, email, password])

	return userPromise.rows[0]
}


export {
	findUsersByEmail,
	registerUser,
}
