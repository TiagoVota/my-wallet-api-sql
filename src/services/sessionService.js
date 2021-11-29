import * as sessionRepository from '../repositories/sessionRepository.js'

const upsertSession = async ({ userId, token }) => {
	const session = await sessionRepository.findSessionByUserId(userId)
	const sessionId = session?.id
	
	const sessionInfo = sessionId
		? await sessionRepository.updateSession({ sessionId, token })
		: await sessionRepository.createSession({ userId, token })
	
	return sessionInfo
}

export {
	upsertSession,
}
