const express = require('express')
const router = express.Router()
const { OrderValidator } = require('../../middleware/validator')

const userController = require('../../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../../middleware/auth')

// 登入
router.post('/login', userController.usersLogin)
// 訂單查詢，不用驗證，使用訂單編號做查詢。
router.get('/orders', userController.getOrders)

router.post('/orders', OrderValidator, authenticated, authenticatedUser, userController.postOrders)

// 確認token是否存在
router.get('/token', authenticated, userController.getUserTokenStatus)

module.exports = router
