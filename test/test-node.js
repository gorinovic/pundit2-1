expect = require('chai').expect;
jsdom = require('jsdom');
window = jsdom.jsdom().createWindow();
document = window.document;
navigator = window.navigator;

_PUNDIT = {};

dojoConfig = {
    async: 1,
    parseOnLoad: true,
    isDebug: true, 

    packages: [
        { name: 'myTest', location: '../../../test' },
        { name: 'dojo', location: '../../../lib/dojo/dojo' },
        { name: 'dijit', location: '../../../lib/dojo/dijit' },
        { name: 'bootstrap', location: '../../../lib/dojo-bootstrap' }
    ],
    deps: ["myTest/Test"]
};

if (process.env.COVERAGE) {
    dojoConfig.packages.push({ name: 'pundit', location: '../../../cov' });
} else {
    dojoConfig.packages.push({ name: 'pundit', location: '../../../src' });
}


/*
## TODO : test-cov.html deve caricare pundit col codice di coverage
## TODO : configurare jscoverage ?
## TODO : .gitignore di tutta sta roba ?
*/

require('../lib/dojo/dojo/dojo.js');