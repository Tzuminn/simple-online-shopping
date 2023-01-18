const express = require('express')
const router = express.Router()

const productController = require('../../controllers/product-controller')
const { authenticated } = require('../../middleware/auth')

router.get('/all/bestsell', authenticated, productController.getBestSell)
router.get('/all/newest', productController.getNewest)
router.get('/all/sortbyprice', productController.getSortByPrice)

router.get('/detail/:id', productController.getProduct)

module.exports = router
