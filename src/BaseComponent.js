/**
    Provides common facilities used by other pundit
    components, such as callback creation, initialization, logging, etc.
    
    Every component extending this class will be able to use these methods,
    and the options passed to the constructor.
    
    If the component has an .opts field, it will be used as defaults for the
    component, overwritable when calling new
    @class pundit.baseComponent
    @module pundit
    @constructor
    @example
        var x = new pundit.BaseComponent({
                debug: true,
                libName: 'myComponent'
            });
    @param options {object} See object properties
**/
define([
        "dojo/query",
        "dojo/_base/declare"
    ],
    
    function(
        query,
        declare
    ) {

    return declare("pundit.BaseComponent", [], {

    defaultOpts: {
        /**
            Enables debug messages for the component
            @property debug
            @type Boolean
            @default false
        **/
        debug: false,

        /**
            Name of the component, shown in debug messages
            @property libName
            @type String
            @default this.declaredClass
        **/
        libName: ''
    },

    /**
    * Initializes the component
    * @method constructor
    * @param options {object}
    * @param options.debug {boolean} wether or not to activate debug mode for the component
    * @param options.libName {string} component name visualized in debug messages. If not 
    * assigned explicitly dojo's 'declaredClass' field will be used.
    */
    constructor: function(options) {
        var self = this,
            i;

        // If the class extending us doesnt have an .opts field, create it
        if (typeof(self.opts) === 'undefined') { self.opts = {}; }

        // Copy in the baseComponent defaults, if the given .opts doesnt have it
        for (i in self.defaultOpts) {
            if (typeof(self.opts[i]) === 'undefined') {
                self.opts[i] = self.defaultOpts[i];
            }
        }

        // TODO: rename to PUNDIT without _ ? .. why not?

        // If there's no _PUNDIT, or there's no namespace, create it
        // A jshint rule enforces that this is the only place where it is 
        // allowed to create pundit's global object
        if (typeof(_PUNDIT) === 'undefined') {
            /*jshint -W020*/
            _PUNDIT = {};
            /*jshint +W020*/
        }
        if (typeof(_PUNDIT.ns) === 'undefined') {
            require(["pundit/NameSpace"], function(PunditNS) {
                _PUNDIT.ns = new PunditNS();
            });
        }
        
        // If _PUNDIT, _PUNDIT.config and _PUNDIT.config.modules.THISMODULENAME are
        // defined, get that configuration and initialize the component
        if (typeof(_PUNDIT.config) !== 'undefined' && typeof(_PUNDIT.config.modules[self.declaredClass]) !== 'undefined') {
            var configOpts = _PUNDIT.config.modules[self.declaredClass];
            for (i in configOpts) { self.opts[i] = configOpts[i]; }
        }

        // Finally overwrite any given field coming from options parameter
        for (i in options) { self.opts[i] = options[i]; }
        
        self.log('BaseConstructor built opts for '+self.declaredClass);

    }, // constructor

    /**
    * @method createCallback
    * @description Creates one or more callbacks for the component. For each 'name' passed
    * as parameter two methods will be created:<br>
    * onName(f) (first letter is automatically capitalized): used by other components to
    * subscribe a function to be called when the event hits. Optional parameters. <br>
    * fireOnName(data) (first letter is automatically capitalized): fires the event 
    * calling all of the subscribed callbacks passing data as parameter. This 
    * function must be called by the component when needed.
    * @param names {string or array of strings} Names of the callbacks to be created.
    */
    createCallback: function(name) {
        var self = this,
            addCB = function(cbName) {
                return function(f) {
                    if (typeof(f) === 'function') {
                        self[cbName].push(f);
                    }
                };
            },
            addFire = function(cbName) {
                return function() {
                    for (var i = self[cbName].length; i--;) {
                        self[cbName][i].apply(self, arguments);
                    }
                };
            };

        // If it's not an array already, create one
        if (typeof(name) === 'string') { name = [name]; }


        for (var n = name.length; n--;) {

            var currentName = name[n].substr(0,1).toUpperCase() + name[n].substr(1),
                callbacksArrayName = 'on' + currentName + 'Callbacks',
                callbacksName = 'on' + currentName,
                callbacksFireName = 'fireOn' + currentName;

            if (typeof(self[callbacksArrayName]) === 'undefined') {
                self[callbacksArrayName] = [];
            }

            // The onNAME method adds the passed in function among
            // the callbacks for that NAME
            self[callbacksName] = addCB(callbacksArrayName);

            // the fireOnNAME function will take the arguments
            // passed in, and call each of the registered callbacks
            // with those same parameters
            self[callbacksFireName] = addFire(callbacksArrayName);

        } // for n in name
    }, // createCallback

    /**
    * @method log
    * @description Logs a debug message in the browser console or (if not
    * present) in a debug div appended to the document.
    * @param options {string} message to be logged.
    * @return boolean true if something has been logged, false otherwise
    */
    log: function(w) {
        var foo = this.opts.debug;
        
        // If there's an user supplied object and it says not to log, dont log.
        if (typeof(punditConfig) !== 'undefined' && punditConfig.debugAllModules === true) {
            foo = true;
        }

        if (foo === false) { return false; }
        
        var libName = (this.opts.libName !== "") ? this.opts.libName : this.declaredClass;
        if (typeof console === "undefined" || true) {
            if (query('#debug_foo').length === 0) {
                query("body").append(
                    "<div id='debug_foo' style='position: absolute; overflow-y: auto; \
                     max-height: 300px; bottom: 0px; right: 0px; padding: 5px; border: 1px solid #666; \
                     font-size: 0.9em;'>Pundit debug:</div>"
                );
            }
            query("#debug_foo").append("<div>#"+libName+"# "+w+"</div>");
            return true;
        } else {
            // This is the only place where jshint should not complain about
            // a global use of console
            /* global console: false */
            console.log('#'+libName+'# '+w);
            /* global console: true */
            return true;
        }
    } // log()

    });
});