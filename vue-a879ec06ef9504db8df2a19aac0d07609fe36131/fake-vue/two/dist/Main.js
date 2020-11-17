(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Main"] = factory();
	else
		root["Main"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {

    text: function (value) {
        this.el.textContent = value || ''
    },

    show: function (value) {
        this.el.style.display = value ? '' : 'none'
    },

    class: function (value) {
        this.el.classList[value ? 'add' : 'remove'](this.arg)
    },

    on: {
        update: function (handler) {
            var event = this.arg
            if (!this.handlers) {
                this.handlers = {}
            }
            var handlers = this.handlers
            if (handlers[event]) {
                this.el.removeEventListener(event, handlers[event])
            }
            if (handler) {
                handler = handler.bind(this.el)
                this.el.addEventListener(event, handler)
                handlers[event] = handler
            }
        },
        unbind: function () {
            var event = this.arg
            if (this.handlers) {
                this.el.removeEventListener(event, this.handlers[event])
            }
        }
    },

    each: {
        update: function () {
            // augmentArray(collection, this)
            // console.log('collection updated')
        }
        // mutate: function (mutation) {
            
        // }
    }

}

// function augmentArray (collection, directive) {
    
// }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var prefix      = 'sd',
    Directive   = __webpack_require__(2),
    Directives  = __webpack_require__(0),
    selector    = Object.keys(Directives).map(function (d) {
        return '[' + prefix + '-' + d + ']'
    }).join()

function Seed (opts) {

    var self = this,
        root = this.el = document.getElementById(opts.id),
        els  = root.querySelectorAll(selector)

    self.bindings = {}
    self.scope = {}

    // process nodes for directives
    ;[].forEach.call(els, this.compileNode.bind(this))
    this.compileNode(root)

    // initialize all variables by invoking setters
    for (var key in self.bindings) {
        self.scope[key] = opts.scope[key]
    }

}

Seed.prototype.compileNode = function (node) {
    var self = this
    cloneAttributes(node.attributes).forEach(function (attr) {
        var directive = Directive.parse(attr, prefix)
        if (directive) {
            self.bind(node, directive)
        }
    })
}

Seed.prototype.bind = function (node, directive) {

    directive.el = node
    node.removeAttribute(directive.attr.name)

    var key      = directive.key,
        binding  = this.bindings[key] || this.createBinding(key)

    // add directive to this binding
    binding.directives.push(directive)

    // invoke bind hook if exists
    if (directive.bind) {
        directive.bind(node, binding.value)
    }

}

Seed.prototype.createBinding = function (key) {

    var binding = {
        value: undefined,
        directives: []
    }

    this.bindings[key] = binding

    // bind accessor triggers to scope
    Object.defineProperty(this.scope, key, {
        get: function () {
            return binding.value
        },
        set: function (value) {
            binding.value = value
            binding.directives.forEach(function (directive) {
                directive.update(value)
            })
        }
    })

    return binding
}

Seed.prototype.dump = function () {
    var data = {}
    for (var key in this._bindings) {
        data[key] = this._bindings[key].value
    }
    return data
}

Seed.prototype.destroy = function () {
    for (var key in this._bindings) {
        this._bindings[key].directives.forEach(unbind)
    }
    this.el.parentNode.remove(this.el)
    function unbind (directive) {
        if (directive.unbind) {
            directive.unbind()
        }
    }
}

// clone attributes so they don't change
function cloneAttributes (attributes) {
    return [].map.call(attributes, function (attr) {
        return {
            name: attr.name,
            value: attr.value
        }
    })
}

module.exports = {
    create: function (opts) {
        return new Seed(opts)
    },
    directive: function () {
        // create dir
    },
    filter: function () {
        // create filter
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Directives = __webpack_require__(0),
    Filters    = __webpack_require__(3)

var KEY_RE = /^[^\|]+/,
    FILTERS_RE = /\|[^\|]+/g

function Directive (def, attr, arg, key) {

    if (typeof def === 'function') {
        this._update = def
    } else {
        for (var prop in def) {
            if (prop === 'update') {
                this['_update'] = def.update
                continue
            }
            this[prop] = def[prop]
        }
    }

    this.attr = attr
    this.arg  = arg
    this.key  = key
    
    var filters = attr.value.match(FILTERS_RE)
    if (filters) {
        this.filters = filters.map(function (filter) {
            // TODO test performance against regex
            var tokens = filter.replace('|', '').trim().split(/\s+/)
            return {
                apply: Filters[tokens[0]],
                args: tokens.length > 1 ? tokens.slice(1) : null
            }
        })
    }
}

Directive.prototype.update = function (value) {
    // apply filters
    if (this.filters) {
        value = this.applyFilters(value)
    }
    this._update(value)
}

Directive.prototype.applyFilters = function (value) {
    var filtered = value
    this.filters.forEach(function (filter) {
        filtered = filter.apply(filtered, filter.args)
    })
    return filtered
}

module.exports = {

    // make sure the directive and value is valid
    parse: function (attr, prefix) {
        
        if (attr.name.indexOf(prefix) === -1) return null

        var noprefix = attr.name.slice(prefix.length + 1),
            argIndex = noprefix.indexOf('-'),
            arg = argIndex === -1
                ? null
                : noprefix.slice(argIndex + 1),
            name = arg
                ? noprefix.slice(0, argIndex)
                : noprefix,
            def = Directives[name]

        var key = attr.value.match(KEY_RE)

        return def && key
            ? new Directive(def, attr, arg, key[0].trim())
            : null
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {

    capitalize: function (value) {
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    },

    uppercase: function (value) {
        return value.toUpperCase()
    },

    delegate: function (handler, selectors) {
        return function (e) {
            var match = selectors.every(function (selector) {
                return e.target.webkitMatchesSelector(selector)
            })
            if (match) handler.apply(this, arguments)
        }
    }

}

/***/ })
/******/ ]);
});