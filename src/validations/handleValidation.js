const theValidationProceeded = (params) => {
	const {
		res, 
		status, 
		objectToValid, 
		objectValidation
	} = params

	const objectError = objectValidation.validate(objectToValid).error

	if (objectError) res.status(status).send(objectError.details[0].message)

	return !objectError
}


export default theValidationProceeded
