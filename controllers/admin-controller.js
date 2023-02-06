const jwt = require('jsonwebtoken')
const { Product, Image, User, Order, OrderDetail, sequelize, Payment, Delivery } = require('../models')
const imgurFileHandler = require('../helpers/file-helpers')

const adminController = {
  login: async (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  },
  
}

module.exports = adminController
