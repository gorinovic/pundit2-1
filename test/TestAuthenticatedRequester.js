define([            
    "dojo/query",
    "pundit/AuthenticatedRequester"
], function(query, AuthenticatedRequester) {

    suite("Authenticated Requester", function() {
        var ar;
        
        setup(function() {
            delete _PUNDIT;
            ar = new AuthenticatedRequester({showLoginModalOnFail: false});
        });
        
        teardown(function() {
            ar.destroy();
            delete ar;
            delete _PUNDIT;
        });

        test('.HTTP_ERROR_FORBIDDEN sanity checks', function() {
            expect(ar.HTTP_ERROR_FORBIDDEN).to.be.a("number");
            expect(ar.HTTP_ERROR_FORBIDDEN).equal(403);
        });

        test('.HTTP_CONNECTION_ERROR sanity checks', function() {
            expect(ar.HTTP_CONNECTION_ERROR).to.be.a("number");
            expect(ar.HTTP_CONNECTION_ERROR).equal(0);
        });

        test('Callback onLogin()', function() {
            expect(ar.onLogin).to.be.a("function");
        });
        
        test('Callback onLogout()', function() {
            expect(ar.onLogout).to.be.a("function");
        });
        
        test('_handleLoginLoad() with empty json', function() {
            var json = {};
            ar._handleLoginLoad(json, function(b, data) {
                expect(b).equal(false);
            });
        });

        test('_handleLoginLoad() with .loginStatus: 1', function(done) {
            var json = {loginStatus: 1};
            ar._handleLoginLoad(json, function(b, data) {
                expect(b).equal(true);
                done();
            });
        });

        test('_handleLoginLoad() with .loginStatus: 0', function(done) {
            var json = {loginStatus: 0};
            ar._handleLoginLoad(json, function(b, data) {
                expect(b).equal(false);
                done();
            });
        });
        
        test('BlockedRequests must be empty', function() {
            expect(ar.blockedRequests.length).equal(0);
        });
        
        test('_setWrappingCallParams + redirect-to json must put an item in blockedRequests', function() {
            var redirectTo = 'test',
                fake = {
                    load: function() {},
                    error: function() {}
                },
                fake2 = ar._setWrappingCallParams(fake);
                fake2.load({redirectTo: redirectTo});
                
                expect(ar.blockedRequests.length).equal(1);
                expect(ar.redirectURL).equal(redirectTo);
        });

        test('xPut must call dojo.xPut adding withCredentials: true and modifing load()', function() {
            var fun = function() { return; },
                args = {load: fun, more: 'stuff'},
                foo = {xhrPut: args}

            // Overwrite xhrPut and just intercept the params
            dojo.xhrPut = function(p) { foo.xhrPut = p; }

            // Before the call: no .withCredentials, original .load function
            expect(foo.xhrPut.load.toString()).equal(fun.toString());
            expect(foo.xhrPut.withCredentials).equal(undefined);

            ar.xPut({load: fun, more: 'stuff'});

            expect(foo.xhrPut.withCredentials).equal(true);
            expect(foo.xhrPut.load.toString()).not.equal(fun.toString());
            expect(foo.xhrPut.more).equal('stuff');
        });

    });

});