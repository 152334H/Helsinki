const conf = require('./conf')

const info = (...params) => {
  if (conf.NODE_ENV !== 'test')
    console.log(...params);
}
const error = (...params) => {
  //if (conf.NODE_ENV !== 'test')
    console.log(...params);
}

module.exports = {info, error};
