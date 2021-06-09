const express = require('express');
const AuthenticationController = require('./AuthenticationController')
const AuthenticationControllerPolicy = require('../../policies/AuthenticationControllerPolicy')
let router = express.Router();

	router.get('/', (req, res)=> res.send('/Users Base'))
	//Register User
	router.post('/register',
		AuthenticationControllerPolicy.register,
		AuthenticationController.register)
	//Login User
	router.post('/login',
		AuthenticationController.login)
	//Update User
	router.post('/updateUser',
		AuthenticationController.matchUserToken,
		AuthenticationController.updateUser)
	router.post('/resetPassword',
		AuthenticationController.resetPassword)
	router.post('/createNewPassword',
		AuthenticationController.createNewPassword)
	router.post('/requestEmailVerification',
		AuthenticationController.requestEmailVerification)
	router.get('/verifyEmail/:token',
		AuthenticationController.verifyEmail)

module.exports = router
