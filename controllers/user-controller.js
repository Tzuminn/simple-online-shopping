const { User, Order, OrderDetail, Product, sequelize } = require('../models')
const dayjs = require('dayjs')

const userController = {
  postOrders: async (req, res, next) => {
    // 前端傳回的資料
    const { UserId, purchaserName, purchaserPhone, purchaserEmail, receiverName, receiverPhone, receiverAddress, comment, DeliveryId, PaymentId, products } = req.body
    // 模擬資料
    // let [UserId, PaymentId, purchaserName, purchaserPhone, purchaserEmail, DeliveryId, receiverName, receiverPhone, receiverAddress, comment] = [1, 1, 'eand', '0918283948', '123@123.123', 1, 'rers', '3949482834', '台北市萬華區合成里是林路11號4樓之3', '']
    // 模擬資料
    // const products = [{
    //   ProductId: 1,
    //   orderQuantity: 3
    // }, {
    //   ProductId: 4,
    //   orderQuantity: 5
    // }, {
    //   ProductId: 5,
    //   orderQuantity: 2
    // }]
    try {
      // 訂單重複送出  repeat request，尚未想出怎麼做。

      // 產生訂單編號
      const orderNumber = dayjs().format('YYYY-MM-DD-HH-MM-SS').split('-').join('0')
      // 小計
      const afterSubTotal = await OrderDetail.findAll({
        attributes: {
          include: [
            [sequelize.literal('(SELECT IFNULL(SUM(orderQuantity*Products.price),0) FROM Products WHERE OrderDetail.Product_id = Products.id)'), 'subTotal']
          ]
        },
        nest: true,
        raw: true
      })
      // 總額
      let totalAmount = 0
      afterSubTotal.forEach(i => {
        totalAmount += Number(i.subTotal)
        return totalAmount
      })

      // Order資料庫
      await Order.create({ UserId, PaymentId, purchaserName, purchaserPhone, purchaserEmail, DeliveryId, receiverName, receiverPhone, receiverAddress, comment, totalAmount, orderNumber })

      // 得到這個orderId
      const OrderId = await Order.max('id')
      for (let i = 0; i < products.length; i++) {
        products[i].OrderId = OrderId
      }

      // OrderDetail資料庫
      await OrderDetail.bulkCreate(products, { updateOnDuplicate: ['ProductId', 'orderQuantity', 'OrderId'] })
      return res.status(200).json({ status: 'success' })
    } catch (err) { next(err) }
  },
  getOrders: async (req, res, next) => {
    const user = req.user
    try {
      const userOrderDeatil = await 
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
