define([            
    "dojo/query",
    "pundit/AuthenticatedRequester"
], function(query, AuthenticatedRequester) {

    /*
    TODO: worth writing tests with fakeServer?
    
    suite("AJAX AR (sinon server)", function() {
        var ar, server;
            
        setup(function() {
            delete _PUNDIT;
            ar = new AuthenticatedRequester({});
            ar.placeAt(query('body')[0]);
            server = sinon.fakeServer.create();
        });
        
        teardown(function() {
            ar.destroy();
            delete ar;
            delete _PUNDIT;
        });
        
        test('LoginStatus = 1 from server', function(done) {
            var res = {
                loginStatus: 1,
                id: "b36f77b4",
                uri: "http://swickynotes.org/notebook/resource/12345678",
                openid: "https://www.google.com/accounts/o8/id?id=1234567890abcdef",
                firstName: "Fake",
                lastName: "User",
                fullName: "Fake User",
                email: "fake.user@gmail.com",
                loginServer: "http://fake.loginserver.foo/annotationserver/login.jsp"
            },
            callback = sinon.spy();
            
            server.respondWith('OPTIONS', _PUNDIT.ns.asUsersCurrent, [200,{}, '']);
            server.respondWith('GET', _PUNDIT.ns.asUsersCurrent, [200, { "Content-Type": "application/json" }, JSON.stringify(res)]);
            
            ar.isLoggedIn(function(a, b) {
                callback(a, b);
                sinon.assert.calledWith(callback, true, res);
                done();
            });

            server.respond();
        });
        
    });
    */

    suite("AJAX Authenticated Requester [Sinon.JS]", function() {
        var ar, xhr, request;

        setup(function() {
            delete _PUNDIT;

            xhr = sinon.useFakeXMLHttpRequest();
            // DEBUG: overwrite the global XMLHttpRequest with sinon's, since 
            // it does not under node :(
            XMLHttpRequest = sinon.FakeXMLHttpRequest;
            requests = [];
            xhr.onCreate = function(xhr) { requests.push(xhr); };
            
            ar = new AuthenticatedRequester({});
            ar.placeAt(query('body')[0]);
        });
        
        teardown(function() {
            ar.destroy();
            delete ar;
            delete _PUNDIT;
        });
        
        test('LoginStatus = 1 from server', function(done) {
            var res = {
                loginStatus: 1,
                id: "b36f77b4",
                uri: "http://swickynotes.org/notebook/resource/12345678",
                openid: "https://www.google.com/accounts/o8/id?id=1234567890abcdef",
                firstName: "Fake",
                lastName: "User",
                fullName: "Fake User",
                email: "fake.user@gmail.com",
                loginServer: "http://fake.loginserver.foo/annotationserver/login.jsp"
            },
            callback = sinon.spy();
                        
            ar.isLoggedIn(function(a, b) {
                callback(a, b);
                sinon.assert.calledWith(callback, true, res);
                done();
            });
            
            requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(res));
        });
        
    });

});