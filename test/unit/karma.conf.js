// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['mocha', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: ['./index.ts'],
    preprocessors: {
      './index.ts': ['webpack', 'sourcemap']
    },
    mime: {
			'text/x-typescript': ['ts','ts']
    },
    webpack: webpackConfig(),
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
