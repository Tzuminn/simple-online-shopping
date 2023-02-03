const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const jwt = require('jsonwebtoken')
const { authenticated } = require('../../middleware/auth')

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/api/auth/bad'
  }), (req, res) => {
    console.log('loginUser:', req.user.dataValues)
    res.redirect('/api/auth/success')
    // const loginUser = req.user.dataValues
    // delete loginUser.password
    // delete loginUser.id
    // const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
    // return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
  }
)
router.get('/success', authenticated, (req, res) => {
  // console.log('text1:', req.headers)
  console.log('test:', req.user)
  const user = req.user
  // res.send('success')
  // const loginUser = req.user.dataValues
  // const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
  return res.status(200).json({ status: 'success', user })
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
