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
	const queryArgs = [userId, value, description]
	
	const transactionPromise = await connection.query(query, queryArgs)

	return transactionPromise.rows[0]
}

const getTransactionsList = async (userId) => {
	const query = `
		SELECT
			user_id AS "userId", id AS "transactionId", value, description, date
		FROM statements
			WHERE user_id = $1;
	`
	const transactionsListPromise = await connection.query(query, [userId])

	return transactionsListPromise.rows
}

const getBalance = async (userId) => {
	const query = `
		SELECT SUM(value) AS balance
		FROM statements
			WHERE user_id = $1
		GROUP BY user_id;
	`
	const balancePromise = await connection.query(query, [userId])

	return balancePromise.rows[0]
}


export { 
	insertTransaction,
	getTransactionsList,
	getBalance,
}
