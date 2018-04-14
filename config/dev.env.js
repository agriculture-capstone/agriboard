'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CORE_HOST: '"http://localhost"',
  CORE_PORT: 9081,
})
