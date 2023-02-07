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
  putProduct: async (req, res, next) => {
    try {
      const theProductId = req.params.id
      const price = req.body.price ? req.body.price.trim() : 0
      if (!price) throw new Error('所有資料都是必填')
      const theProduct = await Product.findByPk(theProductId)
      if (!theProduct) throw new Error('此產品不存在!')
      const updatedProduct = await theProduct.update({
        price
      })
      const updatedProductData = updatedProduct.toJSON()

      res.status(200).json({ product: updatedProductData })
    } catch (err) {
      next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const theProductId = req.params.id
      // 下架產品
      const theProduct = await Product.findByPk(theProductId)
      if (!theProduct) throw new Error('此產品不存在!')
      await theProduct.update({
        isOnShelves: 0
      })

      res.status(200).json({ status: 'success' })
    } catch (err) {
      next(err)
    }
  },
  postProduct: async (req, res, next) => {
    try {      
      const name = req.body.name ? req.body.name.trim() : 0
      const price = req.body.price ? req.body.price.trim() : 0
      const description = req.body.description ? req.body.description.trim() : 0
      const CategoryId = req.body.CategoryId ? req.body.CategoryId.trim() : 0
      if (!name || !price || !description || !CategoryId) throw new Error('所有資料都是必填')
      const newProduct = await Product.create({
        name,
        price,
        description,
        CategoryId
      })
      const productData = newProduct.toJSON()

      const { files } = req
      const ProductImgUpload = []
      for (let i = 0; i < 6; i++) {
        ProductImgUpload.push(await imgurFileHandler(files[i]))
      }
      // console.log('ProductImgUpload', ProductImgUpload)
      let productImgData = []
      // await ProductImgUpload.map(file => {
      //   const newProductImg = Image.bulkCreate([{
      //     url: ProductImgUpload[file],
      //     ProductId: productData.id
      //   }])
      //   productImgData = newProductImg
      //   return productImgData
      // })
      productImgData = await Image.bulkCreate([{
        url: ProductImgUpload[0],
        ProductId: productData.id,
        isCover: 1
      }, {
        url: ProductImgUpload[1],
        ProductId: productData.id,
        isCover: 0
      }, {
        url: ProductImgUpload[2],
        ProductId: productData.id,
        isCover: 0
      }, {
        url: ProductImgUpload[3],
        ProductId: productData.id,
        isCover: 0
      }, {
        url: ProductImgUpload[4],
        ProductId: productData.id,
        isCover: 0
      }, {
        url: ProductImgUpload[5],
        ProductId: productData.id,
        isCover: 0
      }])

      res.status(200).json({ product: productData, image: productImgData })
    } catch (err) {
      next(err)
    }
  },
  getOrder: async (req, res, next) => {
    try {
      const orderNumber = req.query.orderNumber
      const user = await Order.findOne({
        where: { orderNumber },
        attributes: { exclude: ['PaymentId', 'DeliveryId', 'UserId'] },
        include: [{ model: User, attributes: ['name'] },
          { model: Payment, attributes: ['type'] },
          { model: Delivery, attributes: ['type'] }],
        raw: true,
        nest: true
      })
      if (!user) throw new Error('訂單不存在')

      const products = await OrderDetail.findAll({
        where: {
          OrderId: user.id
        },
        attributes: {
          exclude: ['OrderId', 'ProductId'],
          include: [
            [sequelize.literal('(SELECT IFNULL(SUM(orderQuantity*Products.price),0) FROM Products WHERE OrderDetail.Product_id = Products.id)'), 'subTotal']
          ]
        },
        include: [
          { model: Product, attributes: ['name', 'price'] }],
        raw: true,
        nest: true
      })
      user.products = products
      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  },
  getOrders: async (req, res, next) => {
    try {
      const allOrders = await Order.findAll({
        attributes: ['id', 'orderNumber', 'createdAt'],
        raw: true,
        nest: true
      })
      res.status(200).json({ orders: allOrders })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
