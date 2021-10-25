const getStatements = async (req, res) => {
	const {
		headers: { authorization }
	} = req
	const token = authorization?.replace('Bearer ', '')

	if (!token) return res.sendStatus(401)
}

export { getStatements }