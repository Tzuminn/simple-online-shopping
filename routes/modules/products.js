const express = require('express')
const router = express.Router()
const { authenticated, authenticatedAdmin } = require('../../middleware/auth')
const productController = require('../../controllers/product-controller')

router.get('/all/bestsell', authenticatedAdmin,productController.getBestSell)
router.get('/all/newest', productController.getNewest)
router.get('/all/sortbyprice', productController.getSortByPrice)

router.get('/detail/:id', productController.getProduct)

module.exports = router
