function logout(req, res) {
  res.jsonp({
    message: 'Logged out successfully!'
  })
}

module.exports = logout
