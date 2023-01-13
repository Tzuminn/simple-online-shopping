const express = require('express')
const router = express.Router()

const blogController = require('../../controllers/blog-controller')

router.get('/', blogController.getBlogs)

module.exports = router
