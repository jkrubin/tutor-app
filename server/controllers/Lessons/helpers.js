const {parseJSON} = require('../../helpers')
module.exports ={
    parseLesson(lesson){
        lesson.data = parseJSON(lesson.data)
        if(lesson.Attachments.length){
            for(let i = 0; i < lesson.Attachments.length; i++){
                lesson.Attachments[i].metaData = parseJSON(lesson.Attachments[i].metaData)
            }
        }
        return lesson
    },
}