const express = require('express');
let router = express.Router();
let PurchaseController = require('./PurchaseController')
let AuthenticationController = require('../Auth/AuthenticationController')

router.get('/', PurchaseController.userGetPurchases)

router.get('/admin', 
    AuthenticationController.isAdmin,
    PurchaseController.adminGetPurchases)

router.get('/admin/:code',
    AuthenticationController.isAdmin,
    PurchaseController.adminGetPurchaseByCode)

router.get('/lessons', PurchaseController.getPurchasedLessons)

router.post('/', PurchaseController.createPurchase)

router.put('/:id', PurchaseController.updatePurchase)

router.put('/:code/validate', 
    AuthenticationController.isAdmin,
    PurchaseController.validatePurchase)

module.exports = router