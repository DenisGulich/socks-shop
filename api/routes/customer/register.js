const users = require('../../fixtures/users')

function register(req, res) {
  // eslint-disable-next-line
  const { email, first_name, last_name, phone } = req.body

  const user = users.find(
    (user) => user.phone === phone || user.email === email
  )

  if (user) {
    const result = {
      message: 'The given data was invalid.',
      errors: {}
    }

    if (user.phone === phone) {
      result.errors.phone = ['The phone number has already been taken.']
    }

    if (user.email === email) {
      result.errors.email = ['The email has already been taken.']
    }

    res.status(409).jsonp(result)
  } else {
    const newUser = {
      id: users.length + 1,
      email,
      first_name,
      last_name,
      phone,
      status: 1
    }

    users.push(newUser)

    res.jsonp({
      message: 'Your account has been created successfully.'
    })
  }
}

module.exports = register
