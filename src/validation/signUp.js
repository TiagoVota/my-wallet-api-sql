import joi from 'joi'


const validateRegister =  joi.object({
	name: joi.string().alphanum().min(3).max(30).required(),
	email: joi.string().email().required(),
	password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
	repeatPassword: joi.ref('password')
}).length(4)


export { validateRegister }
