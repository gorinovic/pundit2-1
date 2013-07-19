define([            
    "dojo/query",
    "pundit/AuthenticatedRequester"
], function(query, AuthenticatedRequester) {

    suite("AJAX Authenticated Requester", function() {
        var ar, 
            xhr, 
            requests,
            resLogin0 = {
                "loginStatus": 0,
                "loginServer": "http://foo.foo.bar/login.jsp"
            },
            resLogin1 = {
                loginStatus: 1,
                id: "b36f77b4",
                uri: "http://swickynotes.org/notebook/resource/12345678",
                openid: "https://www.google.com/accounts/o8/id?id=1234567890abcdef",
                firstName: "Fake",
                lastName: "User",
                fullName: "Fake User",
                email: "fake.user@gmail.com",
                loginServer: "http://fake.loginserver.foo/annotationserver/login.jsp"
            };
            
        // DEBUG: overwrite the global XMLHttpRequest with sinon's, since 
        // it does not under node :(
        // Dont think browser's tests will ever notice this, otherwise
        // wrap in some if typeof global or something
        xhr = sinon.useFakeXMLHttpRequest();
        XMLHttpRequest = sinon.FakeXMLHttpRequest;
        xhr.onCreate = function(xhr) { requests.push(xhr); };

        setup(function() {
            delete _PUNDIT;
            ar = new AuthenticatedRequester({});
            ar.placeAt(query('body')[0]);
            ar.startup();
            requests = [];
        });
        
        teardown(function() {
            ar.destroy();
            delete ar;
            delete _PUNDIT;
        });
        
        test('LoginStatus = 1 from server', function(done) {
            var callback = sinon.spy();
                        
            ar.isLoggedIn(function(a, b) {
                callback(a, b);
                sinon.assert.calledWith(callback, true, resLogin1);
                done();
            });
            
            requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify(resLogin1));
        });
        
        test('LoginStatus = 0 from server', function(done) {
            var callback = sinon.spy();
                        
            ar.isLoggedIn(function(a, b) {
                callback(a, b);
                sinon.assert.calledWith(callback, false, resLogin0);
                done();
            });
            
            requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify(resLogin0));
        });
        
    });

});