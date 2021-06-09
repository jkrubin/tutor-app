const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')

module.exports = {
	register (req, res, next) {
		const schema = {
			email: Joi.string().email(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
			admin: Joi.number().integer().min(0).max(1),
			name: Joi.string()
		}
		const {error, value} = Joi.validate(req.body, schema)
		if(error) {
			switch(error.details[0].context.key) {
				case 'email':
					res.status(400).send({
						error: 'invalid email address'
					})
					break
				case 'password':
					res.status(400).send({
						error: 'password must be between 3 and 30 characters'
					})
					break
				case 'name':
					res.status(400).send({
						error: 'invalid name'
					})
					break
				default:
					res.status(400).send({
						error: 'invalid registration'
					})
			}
		}else{
			console.log("no error")

			next()
		}
	}
}