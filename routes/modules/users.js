const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user-controller')
// const authenticated = require('../../middleware/auth')

// router.post('/orders', authenticated, userController.postOrders)
// 訂單查詢
// router.get('/orders/', authenticated, userController.getOrders)
router.post('/orders', userController.postOrders)
router.get('/orders/', userController.getOrders)

module.exports = router
