if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

const line = require('@line/bot-sdk')
const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

const lineConfig = {
  channelAccessToken: process.env.LINE_BOT_TOKEN,
  channelSecret: process.env.LINE_BOT_SECRET
}
// const client = new line.Client(lineConfig)
// app.post('/callback', line.middleware(lineConfig), (req, res) => {
//   Promise
//     .all(req.body.events.map(handleEvent))
//     .then(result => res.json(result))
//     .catch(err => {
//       console.error(err)
//       res.status(500).end()
//     })
// })
// async function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     // ignore non-text-message event
//     return Promise.resolve(null)
//   }
//   const completion = await openai.createCompletion({
//     model: 'text-ada-001',
//     prompt: event.message.text,
//     max_tokens: 50
//   })
// // create a echoing text message
// const echo = { type: 'text', text: completion.data.choices[0].text.trim() }
// // use reply API
// return client.replyMessage(event.replyToken, echo)
// }

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

const allowedOrigins = ['https://beark0515.github.io', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))
app.use(express.json({ limit: '5000mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
