'use strict'

// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const vueLoaderConfig = require('./vue-loader.conf');
const config = require('../config');

function webpackTestConfig() {
  return {
    output: {
      path: config.build.assetsRoot,
      filename: '[name].js'
    },

    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': utils.resolve('src'),
        '@root': utils.resolve('.')
      }
    },

    module: {
      rules: [
        // Source map loader to map typescript source-maps
        {
          enforce: 'pre',
          test: /\.js%/,
          exclude: /node_modules/,
          loader: 'source-map-loader'
        },
        // ts-loader to compile typescript using tsc
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules|vue\/src/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        },
        // Vue loader to handle single file components
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig('test')
        },
        // Babel loader to compile typescript/vue output down to es5 (for browser support)
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [utils.resolve('node_modules')]
        },
        // use inline sourcemap for karma-sourcemap-loader
        ...utils.styleLoaders(),
        // Url loaders to handle files
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    devtool: 'inline-source-map',
    resolveLoader: {
      alias: {
        // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
        // see discussion at https://github.com/vuejs/vue-loader/issues/724
        'scss-loader': 'sass-loader'
      }
    },
    node: {
      fs: "empty"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': require('../config/test.env')
      })
    ]
  };
}

module.exports = webpackTestConfig;
