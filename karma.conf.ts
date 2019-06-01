// Karma configuration

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ "jasmine", "karma-typescript" ],

    // no reporting without plugins...
    plugins: [
      require( "karma-coverage" ),
      require( "karma-jasmine" ),
      require( "karma-typescript" ),
      require( "karma-chrome-launcher"       ),
      require( "karma-jasmine-html-reporter" )
    ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: "src/lib/**/*.ts",       included: true },
      { pattern: "src/test/**/*.spec.ts", included: true }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/lib/**/*.ts":        [ "karma-typescript", "coverage" ],
      "src/test/**/*.spec.ts":  [ "karma-typescript" ]
    },

    client: {
      clearContext: false,  // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false,      // don't do random order testing - sequences preferred
      }
    },

    coverageReporter: {
        includeAllSources: true,
        type : 'html',
        dir : 'coverage/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ "progress", "kjhtml", "coverage" ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ "Chrome" ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
