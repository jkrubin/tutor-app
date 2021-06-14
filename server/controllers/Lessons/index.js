const express = require('express');
let router = express.Router();
let LessonController = require('./LessonController')

router.get('/', LessonController.index)

router.get('/:id')

router.post('/', LessonController.createLesson)

router.put('/:id', LessonController.updateLesson)

router.delete('/:id', LessonController.deleteLesson)

module.exports = router