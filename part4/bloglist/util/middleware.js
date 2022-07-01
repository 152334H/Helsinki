const log = require('./logger')

const requestLogger = (request, response, next) => {
  log.info('Method:', request.method)
  log.info('Path:  ', request.path)
  log.info('Body:  ', request.body)
  log.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, res, next) => {
  log.error(error.message)

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' })
    case 'ValidationError':
      return res.status(400).json({ error: error.message })
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid JWT'})
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'JWT expired'})
  }

  next(error)
}

const tokenExtractor = (req, _, nxt) => {
  const auth = req.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer '))
    req.token = auth.substring(7);
  nxt()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
