const passport = require('../config/passport')
const helpers = require('../helpers/auth-helpers')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user) return res.status(401).json({ status: 'error', message: 'Unauthorized' })
    if (err) return next(err)
    next()
  })(req, res, next)
}

const authenticatedUser = (req, res, next) => {
  if (helpers.getUser(req)?.isAdmin === 0) return next()
  return res.status(403).json({ status: 'error', message: 'Permission denied' })
}
const authenticatedAdmin = (req, res, next) => {
  if (helpers.getUser(req)?.isAdmin === 1) return next()
  return res.status(403).json({ status: 'error', message: 'Permission denied' })
}

module.exports = {
  authenticated,
  authenticatedUser,
  authenticatedAdmin
}
