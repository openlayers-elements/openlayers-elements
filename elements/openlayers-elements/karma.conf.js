/* eslint-disable import/no-extraneous-dependencies */
const defaultSettings = require('@open-wc/testing-karma/default-settings.js');
const merge = require('webpack-merge');

module.exports = config => {
    config.set(
        merge(defaultSettings(config), {
            files: [
                // allows running single tests with the --grep flag
                config.grep ? config.grep : 'test/**/*.test.js',
                {
                    pattern: 'test/assets/*.png',
                    included: false, served: true, watched: false
                }
            ],

            // your custom config
            coverageIstanbulReporter: {
                reports: ['json']
            }
        }),
    );

    delete config.coverageIstanbulReporter.thresholds;

    return config;
};
