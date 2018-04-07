'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CORE_HOST: '"https://boresha.live"',
<<<<<<< HEAD
  CORE_PORT: 18443
=======
  CORE_PORT: 18443,
>>>>>>> master
})
