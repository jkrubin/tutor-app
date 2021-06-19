let {Purchase, Lesson, PurchaseLesson, users} = require('../../models')
const jwt = require('jsonwebtoken')
const config = require('../../config/authConfig')
const {generateCode, parseJSON} = require('../../helpers')
const extractUserFromToken = async(token) =>{
    return new Promise((resolve, reject)=>{
        if(!token){
            resolve(false)
        }
        jwt.verify(token, config.authentication.jwtSecret, async function(err, decrypted){
            if(err){
                resolve(false)
            }else{
                const user = await users.findById(decrypted.id)
                resolve(user)
            }
        })
    })
}
const parsePurchase = (purchase)=>{
    try{
        if(!purchase){
            return false
        }
        purchase.history = parseJSON(purchase.history)
        purchase.lessons = parseJSON(purchase.lessons)
        return purchase
    }catch(err){
        console.log(err)
        return purchase
    }
}
module.exports = {
    async index(req, res){
        try{
            const token = req.headers['x-access-token']
            let user = await extractUserFromToken(token)
            let purchases = await Purchase.findAll({
                where:{userId: user.id},
                include:{
                    model:Lesson,
                    attributes: ['id'],
                    through:{PurchaseLesson, attributes: []}
                }
            }) 
            return res.send(purchases)
            
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error'})
        }
    },
    async getPurchasedLessons(req, res){
        try{
            const token = req.headers['x-access-token']
            let user = await extractUserFromToken(token)
            let lessons = await Lesson.findAll({
                attributes:['id'],
                include:{
                    model:Purchase,
                    where:{status: 1, userId: user.id},
                    attributes: ['id'],
                    through:{PurchaseLesson, attributes: []}
                }
            }) 
            return res.send(lessons)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error'})
        }
    },
    async createPurchase(req, res){
        try{
            const token = req.headers['x-access-token']
            const user = await extractUserFromToken(token)
            const {lessons} = req.body
            let price = 0
            let purchaseLessonJSON = []
            for(let i = 0; i < lessons.length; i++){
                let lesson = await Lesson.findOne({where: {id: lessons[i]}})
                if(lesson){
                    purchaseLessonJSON.push({
                        LessonId: lesson.id,
                        userId: user.id
                    })
                    price += lesson.price
                }
            }
            let historyInit = {
                action: 'created',
                lessons: lessons,
                status: 0
            }
            console.log(purchaseLessonJSON)
            let purchase = await Purchase.create({
                lessons: {ids: lessons},
                history: {history:[{...historyInit}]},
                userId: user.id,
                status: 0,
                code: generateCode()
            })
            for(let i = 0; i < purchaseLessonJSON.length; i++){
                let assoc = await PurchaseLesson.create({
                    ...purchaseLessonJSON[i],
                    PurchaseId: purchase.id
                })
            }
            purchase = await Purchase.findOne({
                where:{userId: user.id},
                include:{
                    model:Lesson,
                    attributes: ['id'],
                    through:{PurchaseLesson, attributes: []}
                }
            }) 
            return res.send(purchase)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error'})
        }
    },
    async updatePurchase(req, res){
        try{

        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error'})
        }
    },
    async validatePurchase(req, res){
        try{
            let {code} = req.params
            let purchase = await Purchase.findOne({
                where:{code},
                include:{
                    model:Lesson,
                    attributes: ['id'],
                    through:{PurchaseLesson, attributes: []}
                }
            })
            if(!purchase){
                return res.status(404).send({error: 'No purchase found with this code'})
            }
            let history = parseJSON(purchase.history)
            history.history.push({
                action: 'validated',
                status: 1
            })
            purchase = await purchase.update({
                history,
                status: 1
            })
            return res.send({purchase})
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server error'})
        }
    },
    async adminGetPurchases(req, res){
        try{
            let purchases = await Purchase.findAll({
                include:[
                    {
                        model:Lesson,
                        attributes: ['id'],
                        through:{PurchaseLesson, attributes: []}
                    },
                    {
                        model:users,
                    }
                ]
            })
            return res.send(purchases)
        }catch(err){
            console.log(err)
            res.status(500).send({error: 'Server Error Getting purchases'})
        }
    },
    async userGetPurchases(req, res){
        try{
            const token = req.headers['x-access-token']
            let user = await extractUserFromToken(token)
            if(!user){
                return res.status(401).send({error: 'User account not found. Please log in or check account status'})
            }

            let purchases = await Purchase.findAll({
                where: {userId: user.id},
                include:[
                    {
                        model:Lesson,
                        attributes: ['id'],
                        through:{PurchaseLesson, attributes: []}
                    },
                ]
            })
            for(let i = 0; i < purchases.length; i++){
                parsePurchase(purchases[i])
            }
            return res.send(purchases)
        }catch(err){
            console.log(err)
            res.status(500).send({error: 'Server Error Getting purchases'})
        }
    },
    async adminGetPurchaseByCode(req, res){
        try{
            const {code} = req.params
            let purchase = await Purchase.findOne({
                where:{code},
                include:[
                    {model: users}, 
                    {
                        model:Lesson,
                        attributes: ['id'],
                        through:{PurchaseLesson, attributes: []}
                    }
                ]
            })
            if(!purchase){
                return res.status(404).send({error: 'No purchase found with this code'})
            }
            return res.send(purchase)
        }catch(err){
            console.log(err)
            return res.status(500).send({error: 'Server Error getting purchase'})
        }
    }
}