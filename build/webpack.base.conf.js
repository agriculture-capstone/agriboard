'use strict'

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

module.exports = function baseConfig(env) {
  return {
    entry: {
      app: './src/main.ts'
    },
    output: {
      path: config.build.assetsRoot,
      filename: '[name].js',
      publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': utils.resolve('src/'),
        '@root': utils.resolve('./'),
        '@test': utils.resolve('test/')
      }
    },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        // Source map loader to map typescript and babel source-maps
        // for debugging and coverage purposes
        {
          enforce: 'pre',
          test: /\.js%/,
          loader: 'source-map-loader'
        },
        // tslint loader to lint files during build
        {
          test: /\.ts$/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            typeCheck: true,
            configFile: utils.resolve('tslint.json'),
            tsConfigFile: utils.resolve('tsconfig.json'),
            // We do not want linting to break the build during development
            // but we do want it to break in testing/production environments
            emitErrors: true,
            failOnHint: (env !== 'development')
          }
        },
        // ts-loader to compile typescript using tsc. We cannot use
        // awesome-typescript-loader due to low support for Vue
        {
          test: /\.ts$/,
          use: [
            // Pipe into babel-loader
            {
              loader: 'babel-loader'
            },
            // Process using ts-loader first
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
              }
            }
          ],
          exclude: /node_modules|vue\/src/,
        },
        // vue-loader for Vue components
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig(env)
        },
        // Use url-loader for images, fonts, audio, video, etc
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
    }
  };
}
