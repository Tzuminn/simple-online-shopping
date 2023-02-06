const { User, Order, OrderDetail, Product, sequelize, Payment, Delivery } = require('../models')
const dayjs = require('dayjs')
const { validationResult } = require('express-validator')
const { transporter } = require('../middleware/sendEmail')

const userController = {
  postOrders: async (req, res, next) => {
    // 前端傳回的資料
    const { UserId, purchaserName, purchaserPhone, purchaserEmail, receiverName, receiverPhone, receiverAddress, comment, DeliveryId, PaymentId, products } = req.body

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessage = errors.errors.map(e => e.msg)
        throw new Error(errorMessage)
      }
      // 訂單重複送出  repeat request，尚未想出怎麼做。

      // 產生訂單編號
      const orderNumber = dayjs().format('YYYY-MM-DD-HH-mm-ss').split('-').join('0')
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

      // Email寄送
      await transporter.sendMail(({
        from: process.env.EMAIL_ACCOUNT,
        to: purchaserEmail,
        subject: '您的訂單已成立(請勿回覆，信件為自動寄送)',
        html: `<p>親愛的顧客 ${purchaserName} 您好，您的訂單<b>${orderNumber}</b>已成立。</p>` + '<br>' + '<span>感謝您訂購<b>寵物購物網</b>的商品，歡迎您再度光臨！test 1</span>'
      }), (err, info) => {
        if (err) {
          return console.log(err)
        }
        console.log('Message %s sent: %s', info.response)
      })

      return res.status(200).json({ status: 'success', orderNumber })
    } catch (err) { next(err) }
  },
  getOrders: async (req, res, next) => {
    try {
      const orderNumber = req.query.id
      const user = await Order.findOne({
        where: { orderNumber },
        attributes: { exclude: ['PaymentId', 'DeliveryId', 'UserId'] },
        include: [{ model: User, attributes: ['name'] },
          { model: Payment, attributes: ['type'] },
          { model: Delivery, attributes: ['type'] }],
        raw: true,
        nest: true
      })
      // 訂單不存在
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
  getUserTokenStatus: async (_, res) => {
    res.status(200).json({ status: 'success' })
  }
}
module.exports = userController
