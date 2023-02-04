const express = require('express')
const router = express.Router()
const { OrderValidator } = require('../../middleware/validator')

const userController = require('../../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../../middleware/auth')

router.post('/orders', OrderValidator, authenticated, authenticatedUser, userController.postOrders)
// 訂單查詢
router.get('/orders', authenticated, authenticatedUser, userController.getOrders)

module.exports = router
