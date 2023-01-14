const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const jwt = require('jsonwebtoken')

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/auth/bad'
  }), (req, res) => {
    const loginUser = req.user.dataValues

    delete loginUser.password
    delete loginUser.id
    const token = jwt.sign(req.user.dataValues, process.env.JWT_SECRET, { expiresIn: '20d' })
    console.log('user4:', loginUser)
    // 不知道為什麼FB的client_id會跑進去?
    return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
  }
)

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })

)

router.get(
  '/line',
  passport.authenticate('line', { scope: ['profile', 'openid'] })
)

router.post(
  '/line/redirect',
  passport.authenticate('line', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// // 測試用
router.get('/bad', (req, res) => {
  res.send('failed')
})

module.exports = router
