function registerRoutes(server) {
  const routes = [
    { method: 'get', path: 'customer/get' },
    { method: 'post', path: 'customer/login' },
    { method: 'post', path: 'customer/forgot-password' },
    { method: 'get', path: 'customer/logout' },
    { method: 'post', path: 'customer/register' }
  ]

  routes.forEach((route) => {
    const path = `/${route.path}`
    const filename = `./${route.path}`
    const handler = require(filename)

    server[route.method](path, handler)
  })

  return routes.map(({ path }) => path)
}

module.exports = registerRoutes
