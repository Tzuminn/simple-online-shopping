const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const admin = require('./modules/admin')
const products = require('./modules/products')
const blogs = require('./modules/blogs')
// const auth = require('./modules/auth')

router.use('/admin', admin)
router.use('/users', users)
router.use('/products', products)
router.use('/blogs', blogs)
// router.use('/auth', auth)

module.exports = router
