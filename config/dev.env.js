'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CORE_HOST: '"https://boresha.live"',
  CORE_PORT: 18443
})
