import joi from 'joi'


const validateOutflow =  joi.object({
	value: joi.number().precision(2).sign('negative').min(-999999999).required(),
	description: joi.string().alphanum().min(3).max(30).required(),
}).length(2)


export { validateOutflow }
