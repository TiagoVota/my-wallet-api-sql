import bcrypt from 'bcrypt'

import * as userRepository from '../repositories/userRepository.js'


const createUser = async ({ name, email, password }) => {
	const hash = bcrypt.hashSync(password, 12)
	const lowerEmail = email.toLowerCase()

	const userWithThatEmail = await userRepository.findUsersByEmail(lowerEmail)

	if (userWithThatEmail.length > 0) return null
	
	const userInfo = {
		name,
		email: lowerEmail,
		password: hash
	}
	const user = await userRepository.registerUser(userInfo)
	
	return user
}


export { createUser }
