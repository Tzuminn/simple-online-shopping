const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const admin = require('./modules/admin')
const products = require('./modules/products')
const blogs = require('./modules/blogs')

router.use('/api/admin', admin)
router.use('/api/users', users)
router.use('/api/products', products)
router.use('/api/blogs', blogs)

module.exports = router
