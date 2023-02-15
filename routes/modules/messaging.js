const express = require('express')
const router = express.Router()
const { MessengerClient } = require('messaging-api-messenger')
const client = new MessengerClient({
  accessToken: process.env.MESSENGER_ACCESS_TOKEN
})

router.get('/messaging', (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.MESSENGER_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge'])
  } else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
})

router.post('/messaging', (req, res) => {
  const event = req.body.entry[0].messaging[0]
  const userId = event.sender.id
  let { text } = event.message

  if (text.includes('官網')) {
    text = '官網連結:https://beark0515.github.io/pets-store。'
  } else if (text.includes('訂單查詢')) {
    text = '訂單查詢連結:https://beark0515.github.io/pets-store，請輸入訂單編號查詢。'
  } else if (text.includes('其它問題')) {
    text = '此為自動回覆訊息，請留下您的問題並靜候客服人員回覆，謝謝。'
  } else {
    text = '您可以輸入"官網"、"訂單查詢"、"其它問題"...等關鍵字。'
  }
  client.sendText(userId, text)
  res.sendStatus(200)
})

module.exports = router
