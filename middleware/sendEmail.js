const nodemailer = require('nodemailer')

// GAMIL SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASS
  }
})

// 好像一定要寫，不寫就出現錯誤
const mailOptions = {
  from: 'your email',
  to: "customer's email",
  subject: '您的訂單已成立(請勿回覆，信件為自動寄送)',
  text: '您的訂單已成立，感謝您的訂購。'
}

module.exports = { transporter, mailOptions }
