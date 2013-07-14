define(["pundit/BaseComponent", "myTest/TestExtendedBaseComponent"], function(BaseComponent, TestExtendedBaseComponent) {

    suite("BaseComponent", function() {
        var comp; 
        
        setup(function() {
            delete _PUNDIT;
            comp = new BaseComponent();
        });

        test('No _PUNDIT before, _PUNDIT after!', function() {
            delete _PUNDIT;
            expect(typeof(_PUNDIT) === 'undefined').equals(true);
            var foo = new BaseComponent();
            expect(_PUNDIT).to.be.a("object");
        });

        test('_PUNDIT.ns: pundit\'s namespace object', function() {
            expect(_PUNDIT.ns).to.be.a("object");
            expect(_PUNDIT.ns.rdf).to.be.a("object");
            expect(_PUNDIT.ns.rdf.type).equal("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
            expect(_PUNDIT.ns.rdfs).to.be.a("object");
            expect(_PUNDIT.ns.items).to.be.a("object");
            expect(_PUNDIT.ns.items.label).equal(_PUNDIT.ns.rdfs.label);
            expect(_PUNDIT.ns.notebooks).to.be.a("object");
            expect(_PUNDIT.ns.as).to.be.a("string");
            expect(_PUNDIT.ns.asApi).to.be.a("string");
        });

        test('Well formed BaseComponent with defaults', function() {
            expect(comp.opts).to.be.a("object");
            expect(comp.opts.debug).equal(comp.defaultOpts.debug);
            expect(comp.opts.libName).equal(comp.defaultOpts.libName);
            expect(comp.declaredClass).equal("pundit.BaseComponent");
        });

        test('Well formed BaseComponent with user configuration', function() {
            var compName = "TestComponentUserConf",
                comp1 = new BaseComponent({
                    debug: false,
                    libName: compName
                });
                
            expect(comp1.opts).to.be.a("object");
            expect(comp1.opts.debug).equal(false);
            expect(comp1.opts.libName).equal(compName);
        });

        test('Extended BaseComponent creates _PUNDIT object', function() {
            delete _PUNDIT;
            expect(typeof(_PUNDIT) === 'undefined').equals(true);
            var compE0 = new TestExtendedBaseComponent();
            expect(_PUNDIT).to.be.a("object");
        });

        test('Extended BaseComponent with defaults', function() {
            var compE1 = new TestExtendedBaseComponent();

            // Should be an object and inherit properties from BaseComponent
            expect(compE1).to.be.a("object");
            expect(compE1.opts).to.be.a("object");
            expect(compE1.opts.debug).equal(compE1.defaultOpts.debug);
            expect(compE1.opts.libName).equal(compE1.opts.libName);

            // The declared class should be the one extending BaseComponent
            expect(compE1.declaredClass).equal("TestExtendedBaseComponent");
        });

        test('Extended BaseComponent inline configuration', function() {
            // Create a new TestExtendedBaseComponent passing in some
            // option, then check them
            var compName = "TestExtendedComponent1",
                compE2 = new TestExtendedBaseComponent({
                    libName: compName,
                    debug: false
            });
            expect(compE2.opts).to.be.a("object");
            expect(compE2.opts.debug).equal(false);
            expect(compE2.opts.libName).equal(compName);
        });

        test('Extended BaseComponent pundit configuration', function() {
            var compE3; 

            // Create the global configuration variable, and test the
            // component against supplied custom options
            var foo = _PUNDIT;
            _PUNDIT = {config: {modules: {}}};
            _PUNDIT.config.modules['TestExtendedBaseComponent'] = {
                myOption: 'myValue',
                myOption2: 'myValue2'
            };
                
            compE3 = new TestExtendedBaseComponent();

            expect(compE3.opts).to.be.a("object");
            expect(compE3.opts.myOption).equal("myValue");
            expect(compE3.opts.myOption2).equal("myValue2");
            delete _PUNDIT.config.modules.TestExtendedBaseComponent;
            _PUNDIT = foo;
        });

        
        test('Create one callback (string)', function() {
            var cbName = 'MyCallbackName',
                arrayName = "on"+cbName+"Callbacks",
                fireOn = "fireOn"+cbName;

            // Before creating, there should not be anything there
            expect(comp['on' + cbName]).to.be.a("undefined");

            comp.createCallback(cbName);

            // Now we can check for 3 things:
            // - a function to subscribe callbacks
            // - a function to fire callbacks
            // - an empty array to store the callbacks
            expect(comp['on' + cbName]).to.be.a("function");
            expect(comp[fireOn]).to.be.a("function");
            expect(comp[arrayName].length).equal(0);
        });
        
        test('Create multiple callbacks (array)', function() {
            var cbNames = ["MyFirstCB", "MySecondCB"];
            
            // Before creating, there should not be anything there
            for (var l=cbNames.length; l--;)
                expect(comp['on' + cbNames[l]]).to.be.a("undefined");
                
            comp.createCallback(cbNames);

            // Now we can check for 3 things:
            // - a function to subscribe callbacks
            // - a function to fire callbacks
            // - an empty array to store the callbacks
            for (var j=cbNames.length; j--;) {
                var arrayName = "on"+cbNames[j]+"Callbacks",
                    fireOn = "fireOn"+cbNames[j];

                expect(comp['on' + cbNames[j]]).to.be.a("function");
                expect(comp[fireOn]).to.be.a("function");
                expect(comp[arrayName].length).equal(0);
            }
            
        });
        
        test('Subscribe a callback', function() {
            var cbName = 'SubscribeTest',
                arrayName = "on"+cbName+"Callbacks";

            comp.createCallback(cbName);

            // Subscribe something and check for a function
            comp["on" + cbName](function(){ });
            expect(comp[arrayName].length).equal(1);
            expect(comp[arrayName][0]).to.be.a("function");
        });

        test('Fire a callback', function() {
            var cbName = 'FireTest',
                arrayName = "on"+cbName+"Callbacks",
                fireOn = "fireOn"+cbName;

            comp.createCallback(cbName);
            
            // Subscribe our function, which will overwrite our secret
            var mySecret = "xyz",
                newSecret = "123";
                
            comp["on" + cbName](function(param){
                mySecret = param;
            });

            // Test the secret is still the old one, then fire all of the callbacks
            // and see if the secret has been overwritten
            expect(mySecret).equal("xyz");
            comp[fireOn](newSecret);
            expect(mySecret).equal(newSecret);
        });

        test('Fire multiple callbacks', function() {
            var cbName = 'FireTest',
                arrayName = "on"+cbName+"Callbacks",
                fireOn = "fireOn"+cbName;

            comp.createCallback(cbName);
            
            // Subscribe our functions, which will overwrite our secrets
            var mySecret = "xyz",
                myPassword = "password",
                newContent = "omghacked";
                
            comp["on" + cbName](function(param){
                mySecret = param;
            });
            comp["on" + cbName](function(param){
                myPassword = param;
            });

            // Test the secrets are still the old one, then fire all of the callbacks
            // and see if the secrets have been overwritten
            expect(mySecret).equal("xyz");
            expect(myPassword).equal("password");
            comp[fireOn](newContent);
            expect(mySecret).equal(newContent);
            expect(myPassword).equal(newContent);
        });
        
        test('log() function', function() {
            expect(comp.log).to.be.a("function");
        });

        test('debug option true: call log()', function() {
            comp.opts.debug = true;
            expect(comp.log('Test log!')).equal(true);
        });

        test('debug option false: call log()', function() {
            comp.opts.debug = false;
            expect(comp.log('This will not be logged')).equal(false);
        });
        

    });

});