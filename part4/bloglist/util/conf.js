require('dotenv').config()
const {NODE_ENV,PORT,MONGO_URI,MONGO_TEST_URI,MONGO_USER,MONGO_PASS} = process.env

module.exports = {
  PORT, MONGO_USER, MONGO_PASS, MONGO_URI:
    NODE_ENV==='test' ? MONGO_TEST_URI : MONGO_URI,
  NODE_ENV
}
