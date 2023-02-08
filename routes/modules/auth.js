const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const jwt = require('jsonwebtoken')
const { authenticated } = require('../../middleware/auth')

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }), (req, res) => {
    console.log()
  }
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/api/auth/bad'
  }), (req, res) => {
    res.redirect('/api/auth/success')
    // const loginUser = req.user.dataValues
    // delete loginUser.password
    // delete loginUser.id
    // const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
    // return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
  }
)

// FB TOKEN
router.get('/facebook/token',
  passport.authenticate('facebook-token', {
    session: false,
    failureRedirect: '/api/auth/bad'
  }), async (req, res, next) => {
    // try {
    console.log(req)
    if (!req.user) {
      console.log('123fail')
    }
    if (req.user.err) {
      res.status(401).json({
        success: false,
        message: 'Auth failed',
        error: req.user.err
      })
    }
    const loginUser = req.user.dataValues
    delete loginUser.password
    const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
    // console.log('token驗證:', req.user.dataValues)
    return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
    // }
  }
)

// 原始做法的重新導向測試
//  '/facebook/callback'回傳的user資訊裡面有token。使用這個token會經由middleware/auth/authenticated，進入passport jwt解析驗證，再回到authenticated。由於解析完畢之後，會攜帶密碼，故在middleware/auth/authenticated將密碼移除。如果不加authenticated，拿不到使用者資料。但此處再產生一個token的必要性?
router.get('/success', authenticated, (req, res) => {
  const user = req.user
  delete user.password
  const token = jwt.sign(req.user, process.env.JWT_SECRET, { expiresIn: '20d' })
  return res.status(200).json({ status: 'success', data: { token, user } })
})

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/auth/bad'
  }), (req, res) => {
    const loginUser = req.user.dataValues
    delete loginUser.password
    delete loginUser.id
    const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
    return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
  }
)

router.get(
  '/line',
  passport.authenticate('line', { scope: ['profile', 'openid', 'email'] })
)

router.get(
  '/line/callback',
  passport.authenticate('line', {
    failureRedirect: '/api/auth/bad'
  }), (req, res) => {
    const loginUser = req.user.dataValues
    delete loginUser.password
    delete loginUser.id
    const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
    return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
  }
)

// // 測試用
router.get('/bad', (req, res) => {
  res.send('failed')
})

module.exports = router
