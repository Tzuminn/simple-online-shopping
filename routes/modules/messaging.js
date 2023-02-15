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
    console.log('req.query:', req.query)
  } else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
})

router.post('/messaging', async (req, res) => {
  const event = req.body.entry[0].messaging[0]
  const userId = event.sender.id
  const { text } = event.message

  if (text.includes('官網')) {
    client.sendText(userId, '官網連結:https://beark0515.github.io/pets-store。')
    res.status(200)
  } else if (text.includes('訂單查詢')) {
    client.sendText(userId, '訂單查詢連結:https://beark0515.github.io/pets-store，請輸入訂單編號。')
    res.status(200)
  } else if (text.includes('其它問題')) {
    client.sendText(userId, '此為自動回覆訊息，請留下您的問題並靜候客服人員回覆，謝謝。')
    res.status(200)
  } else {
    client.sendText(userId, '您可以輸入"官網"、"訂單查詢"、"其它問題"......等關鍵字。')
    res.status(200)
  }
})

module.exports = router
