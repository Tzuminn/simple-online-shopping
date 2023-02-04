const express = require('express')
const router = express.Router()
const { OrderValidator } = require('../../middleware/validator')

const userController = require('../../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../../middleware/auth')

router.post('/orders', OrderValidator, userController.postOrders)
// 訂單查詢
router.get('/orders', authenticated, authenticatedUser, userController.getOrders)

// 確認token是否存在
router.get('/token', authenticated, userController.getUserTokenStatus)


module.exports = router
