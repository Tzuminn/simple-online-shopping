const express = require('express')
const router = express.Router()
const { OrderValidator } = require('../../middleware/validator')

const userController = require('../../controllers/user-controller')
// const { authenticated } = require('../../middleware/auth')

router.post('/orders', OrderValidator, userController.postOrders)
// 訂單查詢
router.get('/orders', userController.getOrders)

module.exports = router
