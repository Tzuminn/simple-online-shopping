const express = require('express')
const router = express.Router()

const upload = require('../../middleware/multer')
// const passport = require('../../config/passport')
const adminController = require('../../controllers/admin-controller')
// const { authenticated, authenticatedAdmin } = require('../../middleware/auth')

// router.post('/login', passport.authenticate('local', { session: false }), adminController.login)

router.put('/products/edit/:id', adminController.putProduct)
router.delete('/products/delete/:id', adminController.deleteProduct)
router.post('/products', upload.array('url', 6), adminController.postProduct)

router.get('/orders ', adminController.getOrders)

module.exports = router
