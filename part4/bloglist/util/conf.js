require('dotenv').config()
const {PORT,MONGO_URI,MONGO_USER,MONGO_PASS} = process.env

module.exports = {PORT,MONGO_URI,MONGO_USER,MONGO_PASS}
