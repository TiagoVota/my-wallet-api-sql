
import * as userService from '../services/userService.js'

import theValidationProceeded from '../validations/handleValidation.js'
import validateSignUp from '../validations/validation.signUp.js'


const signUp = async (req, res) => {
	const { body: singUpInfo } = req
	const {
		name,
		email,
		password,
	} = singUpInfo

	// TODO: Criar middleware(?) para isso aqui :3
	const isValidSignUp = theValidationProceeded({
		res,
		status: 422,
		objectToValid: singUpInfo,
		objectValidation: validateSignUp
	})

	if (!isValidSignUp) return
	
	try {
		const user = await userService.createUser({ name, email, password })

		if (user === null) return res.status(409).send('E-mail já cadastrado!')

		return res.status(201).send(user)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}


export { signUp }
