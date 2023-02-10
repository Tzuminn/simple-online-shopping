const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const admin = require('./modules/admin')
const products = require('./modules/products')
const blogs = require('./modules/blogs')
const auth = require('./modules/auth')
const messaging = require('./modules/messaging')
const FB = require('./modules/FB')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/fbtest', (req, res) => {
  res.send(`
    <!-- Messenger 洽談外掛程式 Code -->
<div id="fb-root"></div>

<!-- Your 洽談外掛程式 code -->
<div id="fb-customer-chat" class="fb-customerchat">
</div>

<script>
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox.setAttribute("page_id", "104074335938384");
  chatbox.setAttribute("attribution", "biz_inbox");
</script>

<!-- Your SDK code -->
<script>
  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: 'v16.0'
    });
  };

  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/zh_TW/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>
  `)
})

router.use('/admin', admin)
router.use('/users', users)
router.use('/products', products)
router.use('/blogs', blogs)
router.use('/auth', auth)
router.use('/chatbot', messaging)
router.use('/test', FB)

router.use('/', (_, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Page not found'
  })
  next()
})

router.use('/', generalErrorHandler)

module.exports = router
