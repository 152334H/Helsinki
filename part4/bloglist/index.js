const conf = require('./util/conf')
const app = require('./app.js')
const log = require('./util/logger')

app.listen(conf.PORT, () => {
  log.info(`Server running on port ${conf.PORT}`)
})
