expect = require('chai').expect;
jsdom = require('jsdom');
window = jsdom.jsdom().createWindow();
document = window.document;
navigator = window.navigator;

_PUNDIT = {};

dojoConfig = {
    isDebug: 1,
    parseOnLoad: true,
    selectorEngine: "acme",
    async: true,
    waitSeconds: 10,
    has: {
        "dojo-debug-messages": true
    },

    packages: [
        { name: 'myTest', location: '../../../test' },
        { name: 'dojo', location: '../../../lib/dojo/dojo' },
        { name: 'dijit', location: '../../../lib/dojo/dijit' },
        { name: 'bootstrap', location: '../../../lib/dojo-bootstrap' }
    ],
    deps: ["myTest/Test"],
    pundit: {
        annotationServer: 'foo.foo:8080'
    }
};

if (process.env.COVERAGE) {
    dojoConfig.packages.push({ name: 'pundit', location: '../../../cov' });
} else {
    dojoConfig.packages.push({ name: 'pundit', location: '../../../src' });
}

require('../lib/dojo/dojo/dojo.js');