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
        { name: 'pundit', location: '/src' },
        { name: 'cov', location: '/cov' },
        { name: 'bootstrap', location: '/lib/dojo-bootstrap' },
        { name: 'myTest', location: '/test' },
        { name: 'mocha', location: '/node_modules/mocha' },
        { name: 'chai', location: '/node_modules/chai' }
    ],
    
    pundit: {
        // Instance of the annotation server to query
        annotationServer: "http://demo.as.thepund.it:8080/annotationserver/",
    }
    
};