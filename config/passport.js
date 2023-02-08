const passport = require('passport')
const FacebookStrategy = require('passport-facebook')
const FacebookTokenStrategy = require('passport-facebook-token')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LineStrategy = require('passport-line-auth')
const bcrypt = require('bcryptjs')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const { User } = require('../models')

// 本地驗證
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, cb) => {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      const err = new Error('帳號或密碼錯誤!')
      err.status = 401
      throw err
    }
    const passwordChecked = await bcrypt.compare(password, user.password)
    if (!passwordChecked) {
      const err = new Error('帳號或密碼錯誤!')
      err.status = 401
      throw err
    }
    return cb(null, user)
  } catch (err) {
    return cb(err, false)
  }
}))

// FB驗證
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK,
  profileFields: ['email', 'displayName']
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const { name, email } = profile._json
    const user = await User.findOne({ where: { email }, raw: true })
    // const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '20d' })
    // user.token = token
    // delete user.password
    // console.log(accessToken)
    // if (user) return cb(null, user)
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '20d' })
      user.token = token
      delete user.password
      console.log('existUsersToken:', accessToken)
      return cb(null, user)
    }
    const randomPassword = Math.random.toString(36).slice(-8)
    const password = await bcrypt.hash(randomPassword, 10)
    const userRegistered = await User.create({ name, email, password })
    const newToken = jwt.sign(userRegistered.toJSON(), process.env.JWT_SECRET, { expiresIn: '20d' })
    userRegistered.token = newToken
    delete userRegistered.password
    console.log('newUsersToken:', accessToken)
    return cb(null, userRegistered)
  } catch (err) {
    cb(err)
  }
})
)

// FB token 驗證
passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  fbGraphVersion: 'v3.0'
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const { name, email } = profile._json
    const user = await User.findOne({ where: { email } })
    if (user) return cb(null, user)
    const randomPassword = Math.random.toString(36).slice(-8)
    const password = await bcrypt.hash(randomPassword, 10)
    const userRegistered = await User.create({ name, email, password })
    return cb(null, userRegistered)
  } catch (err) {
    console.log('12err3:', err)
    cb(err)
  }
})
)

// GOOGLE驗證
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    const { name, email } = profile._json
    const user = await User.findOne({ where: { email } })
    if (user) return cb(null, user)
    const randomPassword = Math.random.toString(36).slice(-8)
    const password = await bcrypt.hash(randomPassword, 10)
    const userRegistered = await User.create({ name, email, password })
    return cb(null, userRegistered)
  } catch (err) {
    cb(err)
  }
})
)

// LINE驗證
passport.use(new LineStrategy({
  channelID: process.env.LINE_ID,
  channelSecret: process.env.LINE_SECRET,
  callbackURL: process.env.LINE_CALLBACK,
  state: '12345',
  scope: ['profile', 'openid', 'email'],
  botPrompt: 'normal',
  uiLocales: 'zh-TW'
}, async (accessToken, refreshToken, params, profile, cb) => {
  try {
    const userDetails = await jwt.decode(params.id_token)
    const { name, email } = userDetails
    const user = await User.findOne({ where: { email } })
    if (user) return cb(null, user)
    const randomPassword = Math.random.toString(36).slice(-8)
    const password = await bcrypt.hash(randomPassword, 10)
    const userRegistered = await User.create({ name, email, password })
    return cb(null, userRegistered)
  } catch (err) {
    cb(err)
  }
}))

// 解開token的必要資訊
const jwtOptions = {
  // 指定從哪裡取得token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 使用密鑰來檢查 token 是否經過纂改
  secretOrKey: process.env.JWT_SECRET
}

// 驗證並解開token
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, cb) => {
  try {
    const user = await User.findByPk(jwtPayload.id)
    if (user) return cb(null, user)
  } catch (err) {
    return cb(err, false)
  }
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})
passport.deserializeUser((id, cb) => {
  return cb(null, id)
})

module.exports = passport
