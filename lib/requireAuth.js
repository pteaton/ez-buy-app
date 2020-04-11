module.exports = (req, res, next) => {
  if(req.session.loggedIn) {
    next()
  } else {
    req.session.message = "Create an account or login to continue!"
    res.redirect('/auth/login')
  }
}
