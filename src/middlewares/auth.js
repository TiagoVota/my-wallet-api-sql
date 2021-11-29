import * as sessionRepository from '../repositories/sessionRepository.js'


const auth = async (req, res, next) => {
	const { authorization } = req.headers
	const token = authorization?.replace('Bearer ', '')

	try {
		const session = await sessionRepository.findSessionByToken(token)

		if (!session) return res.sendStatus(401)

		req.userId = session.userId

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}

	next()
}


export default auth
