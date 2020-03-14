const jwt = require('jsonwebtoken')

const users = require('../fixtures/users')

const SECRET_KEY = 'secret_key'

exports.createToken = function createToken(email) {
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '5m' })
  return token
}

exports.verifyToken = function verifyToken(token) {
  try {
    const { email } = jwt.verify(token, SECRET_KEY)
    const user = users.find((user) => user.email === email)
    return user
  } catch (err) {
    return false
  }
}
