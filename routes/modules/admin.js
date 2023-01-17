const express = require('express')
const router = express.Router()

const passport = require('../../config/passport')
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')

router.post('/login', passport.authenticate('local', { session: false }), adminController.login)

router.put('/products/edit/:id', authenticatedAdmin, adminController.putProduct)
router.delete('/products/delete/:id', authenticatedAdmin, adminController.deleteProduct)
router.get('/products', authenticatedAdmin, adminController.getProducts)
router.post('/products', authenticatedAdmin, adminController.postProduct)

router.get('/orders ', authenticatedAdmin, adminController.getOrders)

module.exports = router
