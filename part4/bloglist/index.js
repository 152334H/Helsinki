const conf = require('./util/conf')
const app = require('./app.js')

app.listen(conf.PORT, () => {
  console.log(`Server running on port ${conf.PORT}`)
})
