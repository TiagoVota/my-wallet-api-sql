import theValidationProceeded from '../validations/handleValidation.js'
import * as transactionsValidation from '../validations/transactionsValidation.js'
import * as transactionsService from '../services/transactionsService.js'
import * as transactionsRepository from '../repositories/transactionsRepository.js'


const postTransaction = async (req, res) => {
	const { userId, body: transactionInfo } = req
	const { value, description } = transactionInfo

	// TODO: Criar middleware(?) para isso aqui
	const isValidTransaction = theValidationProceeded({
		res,
		status: 422,
		objectToValid: transactionInfo,
		objectValidation: transactionsValidation.validateTransaction
	})

	if (!isValidTransaction) return

	try {
		const transactionBody = {
			userId,
			value,
			description,
		}
		const transaction = await transactionsRepository
			.insertTransaction(transactionBody)

		return res.status(201).send(transaction)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}

const getStatements = async (req, res) => {
	const { userId } = req
	try {
		const statements = await transactionsService.makeStatements(userId)

		return res.status(200).send(statements)
		
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}





export {
	postTransaction,
	getStatements,
}
