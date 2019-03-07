/* eslint-disable @typescript-eslint/no-var-requires */
// filename: karma.es5.config.js
const merge = require('webpack-merge')
const es5Settings = require('@open-wc/testing-karma/es5-settings.js')
const karmaConf = require('./karma.conf.js')

module.exports = config => {
  config.set(merge(es5Settings(config), karmaConf(config), {
    files: [
      {
        pattern: 'test/_polyfills.js'
      }
    ]
  }));
  return config;
};