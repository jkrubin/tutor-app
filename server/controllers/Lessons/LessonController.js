let {Lesson, users} = require('../../models')

module.exports = {
    async index(req, res){
        try{
            let lessons = await Lesson.findAll({})
            //ToDo: trim lessons to match user access
            return res.send(lessons)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Could not get Lessons'})
        }
    },
    async getLesson(req, res){
        try{
            let {id} = req.params
            let lesson = await Lesson.findOne({where:{id}})
            if(!lesson){
                return res.status(404).send({error: 'Lesson Not found'})
            }
            return res.send(lesson)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Could not get Lesson'})
        }
    },
    async createLesson(req, res){
        try{
            let {name, description, data, categoryId, userId} = req.body
            //ToDo : Get attachments and store in seperate table
            let lesson = await Lesson.create({
                name: name,
                description: description,
                data: data,
                categoryId,
                userId
            })
            return res.send(lesson)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Could not create Lesson'})
        }
    },
    async updateLesson(req, res){
        try{
            let {id} = req.params
            let {name, description, data} = req.body
            let lesson = await Lesson.findOne({where: {id}})
            if(!lesson){
                return res.status(404).send({error: 'Lesson not found'})
            }
            lesson = await lesson.update({name, description, data})
            return res.send(lesson)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Could not update Lesson'})
        }
    },
    async deleteLesson(req, res){
        try{
            let {id} = req.params
            let lesson = await Lesson.findOne({where: {id}})
            if(!lesson){
                return res.status(404).send({error: 'Lesson not found'})
            }
            await lesson.destroy()
            return res.send({message: 'Lesson destroyed'})
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Could not delete Lesson'})
        }
    }
}