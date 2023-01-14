if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: [
    'http://localhost:3000/'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
}
const session = require('express-session')
app.use(session({
  secret: 'SESSION_SECRET',
  resave: false,
  saveUninitialized: false
}))

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
