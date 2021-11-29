import connection from '../database/database.js'


const insertTransaction = async ({ userId, value, description }) => {
	const query = `
		INSERT INTO statements
			(user_id, value, description)
		VALUES
			($1, $2, $3)
		RETURNING
			id as "transactionId", user_id AS "userId", value, description;
	`
	const transactionPromise = await connection.query(
		query,
		[userId, value, description]
	)

	return transactionPromise.rows[0]
}


export { 
	insertTransaction,
}
