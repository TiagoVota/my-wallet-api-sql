import * as userService from '../services/userService.js'
import * as userValidation from '../validations/userValidation.js'
import theValidationProceeded from '../validations/handleValidation.js'


const errorStatusMessage = {
	409: 'E-mail já cadastrado!',
	401: 'E-mail e/ou senha incorretos(s)!',
}

const signUp = async (req, res) => {
	const { body: singUpInfo } = req
	const {
		name,
		email,
		password,
	} = singUpInfo

	// TODO: Criar middleware(?) para isso aqui
	const isValidSignUp = theValidationProceeded({
		res,
		status: 422,
		objectToValid: singUpInfo,
		objectValidation: userValidation.validateSignUp
	})

	if (!isValidSignUp) return
	
	try {
		const userInfo = { name, email, password }
		const user = await userService.createUser(userInfo)

		if (user === null) return res.status(409).send(errorStatusMessage[409])

		return res.status(201).send(user)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}


const login = async (req, res) => {
	const { body: loginInfo } = req

	// TODO: Criar middleware(?) para isso aqui
	const isValidLogin = theValidationProceeded({
		res,
		status: 422,
		objectToValid: loginInfo,
		objectValidation: userValidation.validateLogin
	})

	if (!isValidLogin) return

	try {
		const session = await userService.authenticate(loginInfo)

		if (session === null) return res.status(401).send(errorStatusMessage[401])
		
		return res.status(200).send(session)

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
}


export {
	signUp,
	login,
}
