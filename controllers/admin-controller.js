const jwt = require('jsonwebtoken')

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
  putProduct: async (req, res, next) => {

  },
  deleteProduct: async (req, res, next) => {

  },
  getProducts: async (req, res, next) => {

  },
  postProduct: async (req, res, next) => {

  },
  getOrders: async (req, res, next) => {

  }
}

module.exports = adminController
