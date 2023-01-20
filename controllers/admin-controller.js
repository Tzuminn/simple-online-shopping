const jwt = require('jsonwebtoken')
const { Product, Image } = require('../models')
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

  },
  deleteProduct: async (req, res, next) => {

  },
  postProduct: async (req, res, next) => {
    try {
      const { name, price, description, CategoryId } = req.body
      if (!name.trim() || !price.trim() || !description.trim() || !CategoryId.trim()) throw new Error('所有資料都是必填')
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
        ProductId: productData.id
      }, {
        url: ProductImgUpload[2],
        ProductId: productData.id
      }, {
        url: ProductImgUpload[3],
        ProductId: productData.id
      }, {
        url: ProductImgUpload[4],
        ProductId: productData.id
      }, {
        url: ProductImgUpload[5],
        ProductId: productData.id
      }])

      res.status(200).json({ product: productData, image: productImgData })
    } catch (err) {
      next(err)
    }
  },
  getOrders: async (req, res, next) => {

  }
}

module.exports = adminController
