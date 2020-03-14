const users = require('../../fixtures/users')
const { createToken } = require('../../helpers/token')

function login(req, res) {
  const { email } = req.body

  const user = users.find((user) => user.email === email)

  if (user) {
    res.jsonp({
      token: createToken(email),
      message: 'Logged in successfully!'
    })
  } else {
    res.status(404).jsonp({
      error: 'Invalid e-mail address or password!'
    })
  }
}

module.exports = login
