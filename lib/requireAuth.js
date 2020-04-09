module.exports = (req, res, next) => {
  if(req.session.loggedIn) {
    next()
  } else {
    req.session.message = "Create an account if you wanna do that!"
    res.redirect('/auth/login')    
  }
}
