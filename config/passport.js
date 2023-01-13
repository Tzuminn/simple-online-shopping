const passport = require('passport')
const facebook = require('passport-facebook')
const LocalStrategy = require('passport-local').Strategy
const google = require('passport-google-oauth')
const line = require('passport-line-auth')
const bcrypt = require('bcryptjs')
const passportJWT = require('passport-jwt')
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const User = require('../models')

passport.use(new LocalStrategy({
  usernameField: 'email', passReqToCallback: true
}, async (email, password, cb) => {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) throw new Error('帳號不存在!')
    const passwordChecked = await bcrypt.compare(password, user.password)
    if (!passwordChecked) throw new Error('帳號或密碼錯誤!')
    return cb(null, user)
  } catch (err) {
    cb(err)
  }
}
))

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
    cb(err)
  }
}))




module.exports = passport
