import joi from 'joi'


const validateEntry =  joi.object({
	value: joi.number().precision(2).sign('positive').max(999999999).required(),
	description: joi.string().alphanum().min(3).max(30).required(),
}).length(2)


export { validateEntry }
