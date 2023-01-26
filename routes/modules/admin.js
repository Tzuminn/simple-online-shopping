const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
// const authenticatedAdmin = require('../../middleware/auth')

router.post('/login', adminController.login)

router.put('/products/edit/:id',  adminController.putProduct)
router.delete('/products/delete/:id',  adminController.deleteProduct)
router.get('/products',  adminController.getProducts)
router.post('/products',  adminController.postProduct)

router.get('/orders ',  adminController.getOrders)

module.exports = router
