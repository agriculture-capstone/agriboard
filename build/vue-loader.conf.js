'use strict'

const utils = require('./utils')
const config = require('../config')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = function(env) {
  const ts = env == 'test' ? 'ts-loader' : 'ts-loader!tslint-loader';
  return {
    ts,
    loaders: {
      ...utils.cssLoaders({
        sourceMap: isProduction
          ? config.build.productionSourceMap
          : config.dev.cssSourceMap,
        extract: isProduction,
      }),
    },
    esModule: true,
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}
