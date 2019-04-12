/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const defaultSettings = require('@open-wc/testing-karma/default-config')
const merge = require('webpack-merge')

module.exports = (config) => {
  config.set(
    merge(defaultSettings(config), {
      files: [
        // allows running single tests with the --grep flag
        config.grep ? config.grep : 'elements/**/*.test.js',
        {
          pattern: 'test/assets/*.png',
          included: false,
          served: true,
          watched: false,
        },
      ],

      // your custom config
      coverageIstanbulReporter: {
        reports: ['json'],
      },
    }),
  )

  delete config.coverageIstanbulReporter.thresholds

  return config
}
