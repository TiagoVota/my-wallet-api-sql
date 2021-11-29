import joi from 'joi'


const validateTransaction =  joi.object({
	value: joi.number().precision(2).min(-999999999).max(999999999).required(),
	description: joi.string().min(3).max(42).required(),
}).length(2)


export {
	validateTransaction,
}
