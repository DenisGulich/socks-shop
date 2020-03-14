const users = require('../../fixtures/users')

function forgotPassword(req, res) {
  const { email } = req.body
  const user = users.find((user) => user.email === email)

  if (user) {
    res.jsonp({
      message: 'We have e-mailed your password reset link!'
    })
  } else {
    res.status(404).jsonp({
      error: "We can't find a user with that e-mail address."
    })
  }
}

module.exports = forgotPassword
