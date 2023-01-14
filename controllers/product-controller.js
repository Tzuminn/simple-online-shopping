const { Product } = require('../models')
const productController = {
  getBestSell: async (req, res, next) => {
  },
  getNewest: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = 10
      const offset = (page - 1) * limit
      const products = await Product.findAll({
        order: [['createdAt', 'DESC'], ['id', 'ASC']],
        limit,
        offset,
        raw: true,
        nest: true
      })
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  },
  getSortByPrice: async (req, res, next) => {

  },
  getProduct: async (req, res, next) => {

  }
}

module.exports = productController
