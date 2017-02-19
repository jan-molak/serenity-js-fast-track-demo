const crew = require('serenity-js/lib/stage_crew');

exports.config = {

    allScriptsTimeout: 110000,

    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),

    specs: ['features/**/*.feature'],

    cucumberOpts: {
        require: ['features/**/*.ts'],
        format: 'pretty',
        compiler: 'ts:ts-node/register'
    },

    // directConnect: true,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                'incognito'
                // , 'disable-extensions'
            ]
        }
    }
};
