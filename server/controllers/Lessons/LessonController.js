let {Lesson, Purchase, Attachment, PurchaseLesson, users} = require('../../models')
let Joi = require('joi')
const {extractUserFromToken} = require('../Auth/AuthenticationController')
const {parseLesson} = require('./helpers')
module.exports = {
    async index(req, res){
        try{
            let lessons = await Lesson.findAll({})
            return res.send(lessons)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Could not get Lessons'})
        }
    },
    async getLesson(req, res){
        try{
            let {LessonId} = req.params
            const token = req.headers['x-access-token']
            let user = await extractUserFromToken(token)
            if(user){
                let isOwned = await Purchase.findOne({
                    where:{userId: user.id, status: 1},
                    include: {
                        model: Lesson,
                        through:{
                            model: PurchaseLesson,
                            required: true,
                            where:{LessonId, userId: user.id},
                            attributes: []
                        },
                        attributes:['id']
                    }
                })
                let lesson = await Lesson.findOne({
                    where:{id:LessonId},
                    include:[
                        {
                            model:Purchase,
                            required: true,
                            where:{userId: user.id, status: 1},
                            attributes:['id'],
                            through: {
                                PurchaseLesson,
                                where:{LessonId, userId: user.id},
                                attributes:[]
                            }
                        },
                        {
                            model: Attachment
                        }
                    ]
                })
                parseLesson(lesson)
                return res.send(lesson)
            }else{
                lesson = await Lesson.findOne({
                    where: {id: LessonId},
                    include:[
                        {model: Attachment, attributes:['id', 'name', 'description']}
                    ]
                })
                return res.send(lesson)
            }
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
            let {name, description, data, price, categoryId, userId} = req.body
            //ToDo : Get attachments and store in seperate table
            const schema = {
                name: Joi.string(),
                description: Joi.string(),
                price: Joi.number().min(0),
            }
            const {error, value} = Joi.validate({name,description,price}, schema)
            if(error) {
                let errorRes = ''
                switch(error.details[0].context.key) {
                    case 'name':
                        errorRes = 'name must be a string'
                        break
                    case 'description':
                        errorRes = 'name must be a string'
                        break
                    case 'price':
                        errorRes = 'price must be a number'
                        break
                    case 'default':
                        errorRes = 'error validating'
                }
                return res.status(500).send({error: errorRes})   
            }
            let lesson = await Lesson.create({
                name: name,
                description: description,
                data: data,
                price: price,
                // categoryId,
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
            let {name, description, data, price} = req.body
            let lesson = await Lesson.findOne({where: {id}})
            if(!lesson){
                return res.status(404).send({error: 'Lesson not found'})
            }
            lesson = await lesson.update({name, description, data, price})
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