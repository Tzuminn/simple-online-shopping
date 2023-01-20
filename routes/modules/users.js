const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user-controller')
const { authenticated, authenticatedUser } = require('../../middleware/auth')

router.post('/login', userController.login)
router.post('/orders', authenticated, authenticatedUser, userController.postOrders)

module.exports = router
