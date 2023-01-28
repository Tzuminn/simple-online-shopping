const { body } = require('express-validator')

module.exports = {
  OrderValidator: [
    body('receiverName').isLength({ min: 2, max: 10 }).withMessage('收件人不可為空白，字數限制2~10字'),
    body('receiverPhone').isNumeric().isLength({ min: 10, max: 10 }).withMessage('收件人電話不可為空白。必須為十碼數字。')
      .bail().custom(receiverPhone => {
        if (isNaN(receiverPhone)) { throw new Error('必須輸入數字') }
      }),
    body('receiverAddress').isLength({ min: 6, max: 50 }).withMessage('收件人地址不可為空白。長度在6~50字之間。')
  ],
  // 新增商品的錯誤驗證，但似乎MIN寫的方式不能用這個
  CreateValidator: [
    body('name').isLength({ min: 2, max: 10 }).withMessage('輸入無效'),
    body('price').isNumeric().withMessage('輸入無效')
      .bail().custom(price => {
        if (isNaN(price)) { throw new Error('必須輸入數字') }
      }),
    body('description').isLength({ min: 6, max: 50 }).withMessage('輸入無效'),
    body('CategoryId').not().isEmpty().withMessage('種類必填')
  ]
}
