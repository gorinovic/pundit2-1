expect = require('chai').expect;
jsdom = require('jsdom');

XMLHttpRequest = function(){};

sinon = require("sinon");
require("sinon/lib/sinon/util/event")
require("sinon/lib/sinon/util/fake_xml_http_request");

window = jsdom.jsdom().createWindow();
document = window.document;
navigator = window.navigator;

_PUNDIT = {};

dojoConfig = {
    isDebug: 1,
    parseOnLoad: true,
    selectorEngine: "acme",
    async: 0,
    waitSeconds: 10,
    has: {
        "dojo-debug-messages": 1,
        /*
        "native-xhr2": 0,
        "native-xhr": 1
        */
    },

    packages: [
        { name: 'myTest', location: '../../../test' },
        { name: 'dojo', location: '../../../lib/dojo/dojo' },
        { name: 'dijit', location: '../../../lib/dojo/dijit' },
        { name: 'bootstrap', location: '../../../lib/dojo-bootstrap' }
    ],
    deps: ["myTest/Test"],
    pundit: {
        annotationServer: 'foo.foo.bar:8080/'
    }
};

if (process.env.COVERAGE) {
    dojoConfig.packages.push({ name: 'pundit', location: '../../../cov' });
} else {
    dojoConfig.packages.push({ name: 'pundit', location: '../../../src' });
}

require('../lib/dojo/dojo/dojo.js');