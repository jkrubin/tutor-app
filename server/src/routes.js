const express = require('express');
const authRoutes = require('../controllers/Auth')
let router = express.Router()

const app = express()

app.use('/auth', authRoutes )


module.exports = app
