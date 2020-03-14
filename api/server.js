const jsonServer = require('json-server')

const db = require('./db')
const registerRoutes = require('./routes')

const IS_TEST = process.env.NODE_ENV === 'test'
const PORT = 7000

function logRoutes(db, routes) {
  /* eslint-disable no-console */
  console.log('\nRoutes\n')

  const resources = [...Object.keys(db), ...routes]

  resources.forEach((route) => {
    console.log(`http://localhost:${PORT}/${route}`)
  })

  console.log()
  /* eslint-enable no-console */
}

function startServer(onServerStarted) {
  const server = jsonServer.create()
  const router = jsonServer.router(db)
  const middlewares = jsonServer.defaults()

  // Set default middlewares (logger, static, cors and no-cache)
  server.use(middlewares)

  // To handle POST, PUT and PATCH you need to use a body-parser
  // You can use the one used by JSON Server
  server.use(jsonServer.bodyParser)

  server.use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
  })

  // Use response delay to simulate "real" server
  server.use((req, res, next) => setTimeout(next, 1000))

  // Use default router
  server.use(jsonServer.rewriter({ '/api/*': '/$1' }))

  // Custom routes
  const routes = registerRoutes(server)

  server.use(router)

  // Modify GET responses
  router.render = (req, res) => {
    if (req.method === 'GET' && !req.params.id) {
      if (res.statusCode >= 200 && res.statusCode <= 300) {
        const obj = {}

        const queryString = req.originalUrl.split('?')[1]
        const queryParams = queryString
          ? new URLSearchParams(queryString)
          : null

        obj.data = res.locals.data
        obj.links = {}
        obj.meta = {
          current_page:
            queryParams && queryParams.get('_page')
              ? Number(queryParams.get('_page'))
              : 1,
          total: db.products.length / 24
        }

        res.jsonp(obj)
      } else {
        res.sendStatus(res.statusCode)
      }
    } else {
      res.jsonp(res.locals.data)
    }
  }

  server.listen(PORT, () => {
    if (!IS_TEST) {
      logRoutes(db, routes)
    }

    if (typeof onServerStarted === 'function') {
      onServerStarted()
    }
  })
}

module.exports = startServer
