const {users} = require('../../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/authConfig')
// const nodemailer = require('nodemailer')

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}
function jwtSignReset(user){
	const ONE_HOUR = 60 * 60
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_HOUR
	})
}
module.exports = {
	async register(req, res) {
		try{
			const user = await users.create(req.body)
			const userJson = user.toJSON()
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			})
		}catch(err){
			res.status(400).send({
				error: "This Email is already in use"
			})
		}
	},
	async login(req, res) {
		try{
			const {email, password} = req.body
			const user = await users.findOne({
				where: {
					email: email
				}
			})
			if(!user) {
				return res.status(403).send({
					error: 'Could not find this account'
				})
			}
			const isPasswordValid = await user.comparePassword(password)
			if (!isPasswordValid){
				return res.status(403).send({
					error: 'Incorrect password'
				})
			}
			const userJson = user.toJSON()
			res.send({
				user: userJson,
				token: jwtSignUser(userJson)
			})
		}catch(err){
			res.status(500).send({
				error: "Login error"
			})
		}
	},
	async me (req, res) {
		res.status(200).send({message: 'admin function reached'})
	},
	async isAdmin (req, res, next) {
		const token = req.headers['x-access-token']
		if (!token) {
			res.status(401).send({ auth: false, message: 'You are not logged in'})
		}
		jwt.verify(token, config.authentication.jwtSecret, async function(err, token){
			if(err){
				return res.status(500).send({message: 'Invalid Account'})
			}else{
				const user = await users.findById(token.id)
				if(user.admin != 1){
					return res.status(403).send({message: 'Unauthorized to perform this action'})
				}
				next()
			}
		})
	},
	async getAllUsers(req, res) {
		try{
			const userArr = await users.findAll({
				attributes: ['id','name', 'email']
			})
			const parsedUsers = JSON.parse(JSON.stringify(userArr))
			res.send(parsedUsers)
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to retrieve Users"
			})
		}
	},
	async updateUser(req, res) {
		try{
			const {id} = req.body
			const user = await users.findOne({where:{id: id}})
			const {name, email} = req.body
			user.update({
			    name: name,
			    email: email
			}).then(function(){
				res.send({user: user.toJSON()})
			})
		}catch(err){
			console.log(err)
			res.status(500).send({
				error: "Failed to update User"
			})
		}
	},
	async deleteUser(req, res){
		try{
			const {id} = req.body
			const user = await users.findOne({
				where:{
					id: id
				}
			})
			user.destroy()
				.then(function(){
					res.send({message: 'User deleted'})
				})
		}catch(err){
			res.status(500).send({
				error: "Failed to delete user"
			})
		}
	},
	async matchUserToken(req, res, next) {
		const {id} = req.body
		const token = req.headers['x-access-token']
		if (!token) {
			res.status(401).send({ auth: false, message: 'You are not logged in'})
		}
		jwt.verify(token, config.authentication.jwtSecret, async function(err, token){
			if(err){
				return res.status(500).send({message: 'Invalid Account'})
			}else{
				const tmpuser = await users.findById(token.id)
				if(tmpuser.id != id){
					return res.status(403).send({message: 'Unauthorized to perform this action'})
				}
				next()
			}
		})
	},
	async resetPassword(req, res){
		try{
			const {email} = req.body
			const user = await users.findOne({
				where: {
					email: email
				}
			})
			if(!user){
				return res.status(400).send({"message": "user not found"})
			}
			let userJson = user.toJSON()
			delete userJson.resetToken
			const resetToken = jwtSignReset(userJson)
			user.update({
				resetToken: resetToken
			}).then(() => {
				let url = `url/reset/${resetToken}`
				let message = `reset password ${url}`
				try{
					// let transporter = nodemailer.createTransport({
					//     sendmail: true,
					//     newline: 'unix',
					//     path: '/usr/sbin/sendmail'
					// });
					// transporter.sendMail({
					//     from: 'noreply@wordza.app',
					//     to: email,
					//     subject: 'Password reset for Worza account',
					//     html: message
					// }, (err, info) => {
					//     console.log(info.envelope);
					//     console.log(info.messageId);
					// });

					return res.send({message: `An email has been sent tp ${email}`})
				}catch(err){
					console.log(err)
					res.status(500).send({error: "Server Error"})
					return -1
				}
			})
		}catch(err){
			console.log(err)
			res.status(500).send({"error" : "Server Error"})
		}
	}, 
	async createNewPassword(req, res){
		try{
			const {password} = req.body
			const resetToken = req.headers['x-access-token']
			jwt.verify(resetToken, config.authentication.jwtSecret, async function(err, token){
				if(err){
					return res.status(500).send({message: 'Invalid Account'})
				}else{
					const tmpuser = await users.findById(token.id)
					console.log({usr: tmpuser.resetToken})
					console.log({sent: resetToken})
					if(tmpuser.resetToken != resetToken){
						return res.status(403).send({message: 'Token has expired'})
					}
					tmpuser.update({
						password: password,
						resetToken: -1,
					}).then(() => {
						res.send({tmpuser})
					})
					
				}
			})			
		}catch(err){
			console.log(err)
			res.status(500).send({"error": "Server error setting new password"})
		}
	},
	async requestEmailVerification(req,res){
		try{
			const {email} = req.body
			const user = await users.findOne({
				where: {
					email: email
				}
			})
			if(!user){
				return res.status(400).send({"message": "user not found"})
			}
			let userJson = user.toJSON()
			delete userJson.resetToken
			const resetToken = jwtSignReset(userJson)
			user.update({
				resetToken: resetToken
			}).then(() => {
				try{
					let url = 'api.wordza.app/verifyEmail/' + resetToken
					let message = `verify email at ${url}`
					// let transporter = nodemailer.createTransport({
					//     sendmail: true,
					//     newline: 'unix',
					//     path: '/usr/sbin/sendmail'
					// });
					// transporter.sendMail({
					//     from: 'noreply@wordza.app',
					//     to: email,
					//     subject: 'Email Verification for Worza account',
					//     html: message
					// }, (err, info) => {
					//     console.log(info.envelope);
					//     console.log(info.messageId);
					// });

					return res.send({message: `An email has been sent to ${email}`})
				}catch(err){
					console.log(err)
					res.status(500).send({error: "Server Error"})
					return -1
				}
			})
		}catch(err){
			console.log(err)
			return res.status(500).send({error: "Could not request email verification"})
		}
	},
	async verifyEmail(req, res){
		try{
			const resetToken = req.params.token
			console.log({params: req.params, token: resetToken})
			jwt.verify(resetToken, config.authentication.jwtSecret, async function(err, token){
				if(err){
					return res.status(500).send({message: 'Invalid Account'})
				}else{
					const tmpuser = await users.findById(token.id)
					console.log({usr: tmpuser.resetToken})
					console.log({sent: resetToken})
					if(tmpuser.resetToken != resetToken){
						return res.status(403).send({message: 'Token has expired'})
					}
					console.log("VERIFICATION SUCCESS")
					tmpuser.update({
						verified: 1
					}).then(() => {
						return res.send({message: "Email has been verified"})
					})
					
				}
			})			
		}catch(err){
			console.log(err)
			res.status(500).send({"error": "Server error setting new password"})
		}		
	}

}
