const express = require('express')
const router = express.Router()

const upload = require('../../middleware/multer')
const passport = require('../../config/passport')
const adminController = require('../../controllers/admin-controller')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth')

router.post('/login', passport.authenticate('local', { session: false }), adminController.login)

router.put('/products/edit/:id', authenticatedAdmin, adminController.putProduct)
router.delete('/products/delete/:id',  authenticatedAdmin, adminController.deleteProduct)
router.post('/products', upload.array('url', 6), authenticatedAdmin, adminController.postProduct)

router.get('/orders', adminController.getOrders)
router.get('/detail/', adminController.getOrder)

module.exports = router
