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
  const { text } = event.message
  console.log('event:', event)
  console.log('userId:', userId)
  console.log('text:', text)
  client.sendText(userId, text)
  res.sendStatus(200)
})

module.exports = router
