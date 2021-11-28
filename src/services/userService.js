import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import * as sessionService from './sessionService.js'
import * as userRepository from '../repositories/userRepository.js'


const createUser = async ({ name, email, password }) => {
	const hash = bcrypt.hashSync(password, 12)
	const lowerEmail = email.toLowerCase()

	const userWithThatEmail = await userRepository.findUserByEmail(lowerEmail)

	if (userWithThatEmail.length > 0) return null
	
	const userInfo = {
		name,
		email: lowerEmail,
		password: hash
	}
	const user = await userRepository.registerUser(userInfo)
	
	return user
}

const authenticate = async ({ email, password }) => {
	const lowerEmail = email.toLowerCase()
	const user = await userRepository.findUserByEmail(lowerEmail)
	
	const hash = user?.password || ''
	const isValidPassword = bcrypt.compareSync(password, hash)
	
	if (!user || !isValidPassword) return null

	const token = uuid()

	const sessionBody = {
		userId: user.id,
		token,
	}
	const session = await sessionService.upsertSession(sessionBody)

	return makeSessionInfo({ user, session })
}

const makeSessionInfo = ({ user, session }) => {
	const sessionInfo = {
		userId: user.id,
		name: user.name,
		email: user.email,
		sessionId: session.id,
		token: session.token,
	}

	return sessionInfo
}


export {
	createUser,
	authenticate,
}
