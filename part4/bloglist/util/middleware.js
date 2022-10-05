const log = require('./logger')
const jwt = require('jsonwebtoken')

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
      return res.status(400).send({ error: error.message })
    case 'JsonWebTokenError':
      return res.status(401).send({ error: 'invalid JWT'})
    case 'TokenExpiredError':
      return res.status(401).send({ error: 'JWT expired'})
  }

  next(error)
}

const tokenVerifier = (req, res, nxt) => {
  const auth = req.get('authorization')
  if (!auth || !auth.toLowerCase().startsWith('bearer '))
    return res.status(401).send({error: 'authorization not provided'})

  const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
  if (!decodedToken.id)
    return res.status(401).send({error: 'JWT provided was invalid'})
  req.token = decodedToken;
  nxt()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenVerifier,
}
