const {Attachment} = require('../../models')

const processFile = (file, type) =>{
    let base64 = file.data.toString('base64')
    let {encoding, mimetype, name} = file
    let [fname, ext] = name.split('.')
    return {
        data: base64,
        metaData: {
            encoding,
            mimetype,
            type,
            fname,
            ext
        }
    }
    
}
module.exports = { 
    async createAttachment(req, res){
        try{
            const {LessonId} = req.params
            const {name, description, type} = req.body
            let addedFile = false
            if(req.files){
                let file = req.files.file
                let fileStorage = processFile(file,type)
                addedFile = await Attachment.create({
                    ...fileStorage,
                    name,
                    description,
                    LessonId
                })
            }
            return res.send({attachment: addedFile})
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error making attachment'})
        }
    },
    async encodeTest(req, res){
        try{
            let fs = require('fs')

            let addedFile = false
            if(req.files){
                let file = req.files.file
                console.log(file)
            }
            return res.send('completed')
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error making attachment'})
        }
    },
    async deleteAttachment(req, res){
        try{
            const {LessonId, AttachmentId} = req.params
            let attachment = Attachment.findOne({where: {id: AttachmentId, LessonId}})
            if(!attachment){
                return res.status(500).send({error: 'Attachment not found in database'})
            }
            await attachment.destroy()
            return res.send('completed')
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error deleting attachment'})
        }
    }
}