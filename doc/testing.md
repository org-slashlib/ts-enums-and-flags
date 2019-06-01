## Testing <code>ts-logging</code> ##

### Required packages ###

* <code>karma</code>
* <code>karma-chrome-launcher</code>
* <code>karma-cli</code>
* <code>karma-jasmine</code>
* <code>karma-jasmine-html-reporter</code>
* <code>karma-typescript</code>
* <code>jasmine</code>
* <code>jasmine-core</code>

Essential for writing tests with typescript:
* <code>typescript</code>
* <code>@types/node</code>
* <code>@types/jasmine</code>

Required for coverage reporting:
* <code>karma-coverage</code>

### Install ###
unit testing:  
<code>npm install karma karma-chrome-launcher karma-cli karma-jasmine karma-jasmine-html-reporter karma-typescript jasmine jasmine-core --save-dev</code><br />

code coverage:  
<code>npm install karma-coverage --save-dev</code>

### Configure ###
See: <code>./karma.conf.ts</code>  
Passing the file to karma is not required. Karma CLI will find the [configurationfile](https://karma-runner.github.io/4.0/config/configuration-file.html) on it's own

### run ###
<code> npm run test </code>  
See package.json [test]
