import joi from 'joi'


const validateLogin =  joi.object({
	email: joi.string().email().required(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).length(2)


export { validateLogin }
