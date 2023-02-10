const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')
const jwt = require('jsonwebtoken')
const { authenticated } = require('../../middleware/auth')

router.get('/facebook', function (req, res, next) {
  const facebook_oauth_url = 'https://www.facebook.com/dialog/oauth?' +
    'redirect_uri=http://localhost:3000/api/auth/facebook/callback' +
    '&client_id=' + process.env.FACEBOOK_ID +
    '&scope=public_profile' +
    '&response_type=code'
  console.log('facebook_oauth_url:', facebook_oauth_url)
  // res.send(JSON.stringify({ redirect_url: facebook_oauth_url }))
  res.redirect(facebook_oauth_url)
})
router.get('/facebook/callback', function (req, res, next) {
  const code = req.query.code
  console.log('code:', code)
  const token_option = {
    url: 'https://graph.facebook.com/v2.3/oauth/access_token?' +
      'client_id=' + process.env.FACEBOOK_ID +
      '&client_secret=' + process.env.FACEBOOK_SECRET +
      '&code=' + code +
      '&redirect_uri=' + 'http://local.example.com:3000/facebook/callback',
    method: 'GET'
  }
  console.log('token_option:', token_option)
  // facebook_console_id參考附著
  // request(token_option, function (err, resposne, body) {
  //   const access_token = JSON.parse(body).access_token
  //   console.log('access_token:', access_token)
  //   const info_option = {
  //     url: 'https://graph.facebook.com/debug_token?' +
  //       'input_token=' + access_token +
  //       '&access_token=' + facebook_console_id,
  //     method: 'GET'
  //   }
  //   // Keep the user_id in DB as uni-key
  //   request(info_option, function (err, response, body) {
  //     if (err) {
  //       res.send(err)
  //     }

  //     // Get user info
  //     request({ url: 'https://graph.facebook.com/me?access_token=' + access_token }, function (err, response, body) {
  //       if (err) {
  //         res.send(err)
  //       } else {
  //         console.log('body:', body)
  //         res.send(body)
  //       }
  //     })
  //   })
  // })
  console.log('req:', request(token_option))
})

// router.get(
//   '/facebook',
//   passport.authenticate('facebook', { scope: ['email', 'public_profile'] }), (req, res) => {
//   }
// )

// router.get(
//   '/facebook/callback',
//   passport.authenticate('facebook', {
//     session: false,
//     failureRedirect: '/api/auth/bad'
//   }), (req, res) => {
//     // res.redirect('/api/auth/success')
//     console.log(req.query)
//     const loginUser = req.user
//     const token = jwt.sign(loginUser, process.env.JWT_SECRET, { expiresIn: '20d' })
//     return res.status(200).json({ status: 'success', data: { token, user: loginUser } })
//   }
// )

// FB TOKEN
router.get('/facebook/token',
  passport.authenticate('facebook-token', {
    session: false
    // failureRedirect: '/api/auth/bad'
  }), async (req, res, next) => {
    // try {
    console.log('tokenreq:', req)
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
