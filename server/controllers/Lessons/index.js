const express = require('express');
let router = express.Router();
let LessonController = require('./LessonController')
let AuthenticationController = require('../Auth/AuthenticationController')
let AttachmentController = require('./AttachmentController')
router.get('/', LessonController.index)

router.get('/:LessonId', LessonController.getLesson)

router.post('/',
    AuthenticationController.isAdmin,
    LessonController.createLesson)

router.put('/:id', LessonController.updateLesson)

router.delete('/:id', LessonController.deleteLesson)

let attachmentRouter = express.Router({mergeParams: true})

attachmentRouter.post('/', AttachmentController.createAttachment)

router.use('/:LessonId/attachment', attachmentRouter)
module.exports = router