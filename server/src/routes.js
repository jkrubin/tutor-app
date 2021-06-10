const express = require('express');
const authRoutes = require('../controllers/Auth')
const lessonRoutes = require('../controllers/Lessons')
let router = express.Router()

const app = express()

app.use('/auth', authRoutes )
app.use('/lesson', lessonRoutes)


module.exports = app
