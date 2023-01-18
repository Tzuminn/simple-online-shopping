const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')

const userController = require('../../controllers/user-controller')
const { authenticated } = require('../../middleware/auth')

router.post('/login', passport.authenticate('local', { session: false }), userController.login)
router.post('/orders', authenticated, userController.postOrders)

module.exports = router
