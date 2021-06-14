const express = require('express');
const authRoutes = require('../controllers/Auth')
const lessonRoutes = require('../controllers/Lessons')
const purchaseRoutes = require('../controllers/Purchases')
let router = express.Router()

const app = express()

app.use('/auth', authRoutes )
app.use('/lesson', lessonRoutes)
app.use('/purchase', purchaseRoutes)

module.exports = app
