const { verifyToken } = require('../../helpers/token.js')

function get(req, res) {
  try {
    const [, token] = req.headers.authorization.split(' ')
    const user = verifyToken(token)

    if (user) {
      res.jsonp({
        data: user
      })
    } else {
      throw new Error('Invalid Token')
    }
  } catch (err) {
    res.jsonp({
      data: null
    })
  }
}

module.exports = get
