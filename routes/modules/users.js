const express = require('express')
const router = express.Router()
const { OrderValidator } = require('../../middleware/validator')

const userController = require('../../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../../middleware/auth')

router.post('/orders', OrderValidator, authenticated, userController.postOrders)
router.get('/orders', userController.getOrders)

module.exports = router
