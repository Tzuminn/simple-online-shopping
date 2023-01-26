const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user-controller')
// const authenticated = require('../../middleware/auth')

router.post('/orders', userController.postOrders)
// 訂單查詢
router.get('/orders/', userController.getOrders)

module.exports = router
