const { sequelize, Product, Category, Image } = require('../models')
const productController = {
  getBestSell: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = 10
      const offset = (page - 1) * limit
      const products = await Product.findAll({
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'ProductId', 'url', 'isCover'], where: { isCover: true } }
        ],
        attributes: ['id', 'name', 'price', 'createdAt', [sequelize.literal('(SELECT IFNULL(SUM(order_quantity),0) FROM OrderDetails WHERE Product_id = Product.id )'), 'orderQuantity']],
        order: [[sequelize.literal('orderQuantity'), 'DESC'], ['id', 'DESC']],
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
  getNewest: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = 10
      const offset = (page - 1) * limit
      const products = await Product.findAll({
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'ProductId', 'url', 'isCover'], where: { isCover: true } }
        ],
        attributes: ['id', 'name', 'price', 'createdAt', [sequelize.literal('(SELECT IFNULL(SUM(order_quantity),0) FROM OrderDetails WHERE Product_id = Product.id )'), 'orderQuantity']],
        order: [['createdAt', 'DESC'], ['id', 'DESC']],
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
    try {
      const page = Number(req.query.page) || 1
      const limit = 10
      const offset = (page - 1) * limit
      const products = await Product.findAll({
        include: [
          { model: Category, attributes: ['id', 'name'] },
          { model: Image, attributes: ['id', 'ProductId', 'url', 'isCover'], where: { isCover: true } }
        ],
        attributes: ['id', 'name', 'price', 'createdAt', [sequelize.literal('(SELECT IFNULL(SUM(order_quantity),0) FROM OrderDetails WHERE Product_id = Product.id )'), 'orderQuantity']],
        order: [['price', 'DESC'], ['id', 'DESC']],
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
  getProduct: async (req, res, next) => {
    try {
      const productId = req.params.id
      const product = await Product.findByPk(productId, {
        include: [
          { model: Category, attributes: ['id', 'name'] }
        ],
        attributes: ['id', 'name', 'price', 'createdAt'],
        raw: true,
        nest: true
      })
      const images = await Image.findAll({ where: { ProductId: productId }, attributes: ['id', 'url'], raw: true, nest: true })
      product.Image = images
      if (!product) throw new Error('此商品不存在')
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = productController
