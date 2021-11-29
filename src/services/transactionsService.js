import * as transactionsRepository from '../repositories/transactionsRepository.js'


const makeStatements = async (userId) => {
	const transactionsList = await transactionsRepository
		.getTransactionsList(userId)

	const balance = await transactionsRepository.getBalance(userId)
	
	return sanitizeStatements({ transactionsList, balance })
}

const sanitizeStatements = ({ transactionsList, balance }) => {
	const info = {
		transactionsList,
		...balance
	}

	return info
}


export {
	makeStatements,
}
