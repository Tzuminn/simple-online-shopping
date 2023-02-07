const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const admin = require('./modules/admin')
const products = require('./modules/products')
const blogs = require('./modules/blogs')
const auth = require('./modules/auth')
const messaging = require('./modules/messaging')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)
router.use('/users', users)
router.use('/products', products)
router.use('/blogs', blogs)
router.use('/auth', auth)
router.use('/chatbot', messaging)

router.use('/', (_, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Page not found'
  })
  next()
})

router.use('/', generalErrorHandler)

module.exports = router
