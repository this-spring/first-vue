(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Seed"] = factory();
	else
		root["Seed"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
    prefix: 'sd'
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-11-18 17:04:35
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-11-18 17:19:43
 */
var config     = __webpack_require__(0),
    watchArray = __webpack_require__(6)

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
                handler = handler.bind(this.seed)
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
        bind: function () {
            this.el['sd-block'] = true
            this.prefixRE = new RegExp('^' + this.arg + '.')
            var ctn = this.container = this.el.parentNode
            this.marker = document.createComment('sd-each-' + this.arg + '-marker')
            ctn.insertBefore(this.marker, this.el)
            ctn.removeChild(this.el)
            this.childSeeds = []
        },
        update: function (collection) {
            console.log(collection);
            if (this.childSeeds.length) {
                this.childSeeds.forEach(function (child) {
                    child.destroy()
                })
                this.childSeeds = []
            }
            watchArray(collection, this.mutate.bind(this))
            var self = this
            collection.forEach(function (item, i) {
                self.childSeeds.push(self.buildItem(item, i, collection))
            })
        },
        mutate: function (mutation) {
            console.log(mutation)
        },
        buildItem: function (data, index, collection) {
            var node = this.el.cloneNode(true),
                spore = new Seed(node, data, {
                    eachPrefixRE: this.prefixRE,
                    parentScope: this.seed.scope
                })
            this.container.insertBefore(node, this.marker)
            collection[index] = spore.scope
            return spore
        }
    }

}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {

    capitalize: function (value) {
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
    },

    uppercase: function (value) {
        return value.toUpperCase()
    },

    delegate: function (handler, args) {
        var selector = args[0]
        return function (e) {
            if (e.target.webkitMatchesSelector(selector)) {
                handler.apply(this, arguments)
            }
        }
    }

}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var config     = __webpack_require__(0),
    Seed       = __webpack_require__(4),
    directives = __webpack_require__(1),
    filters    = __webpack_require__(2)

Seed.config = config

Seed.extend = function (opts) {
    var Spore = function () {
        Seed.apply(this, arguments)
        for (var prop in this.extensions) {
            var ext = this.extensions[prop]
            this.scope[prop] = (typeof ext === 'function')
                ? ext.bind(this)
                : ext
        }
    }
    Spore.prototype = Object.create(Seed.prototype)
    Spore.prototype.extensions = {}
    for (var prop in opts) {
        Spore.prototype.extensions[prop] = opts[prop]
    }
    return Spore
}

Seed.directive = function (name, fn) {
    directives[name] = fn
}

Seed.filter = function (name, fn) {
    filters[name] = fn
}

module.exports = Seed

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var config      = __webpack_require__(0),
    Directive   = __webpack_require__(5)

var map  = Array.prototype.map,
    each = Array.prototype.forEach

function Seed (el, data, options) {

    if (typeof el === 'string') {
        el = document.querySelector(el)
    }

    this.el         = el
    this.scope      = {}
    this._bindings  = {}
    this._options   = options || {}

    // process nodes for directives
    this._compileNode(el)

    // initialize all variables by invoking setters
    for (var key in this._bindings) {
        this.scope[key] = data[key]
    }

}

Seed.prototype._compileNode = function (node) {
    var self = this

    if (node.nodeType === 3) {
        // text node
        self._compileTextNode(node)
    } else if (node.attributes && node.attributes.length) {
        // clone attributes because the list can change
        var attrs = map.call(node.attributes, function (attr) {
            return {
                name: attr.name,
                value: attr.value
            }
        })
        attrs.forEach(function (attr) {
            var directive = Directive.parse(attr)
            if (directive) {
                self._bind(node, directive)
            }
        })
    }

    if (!node['sd-block'] && node.childNodes.length) {
        each.call(node.childNodes, function (child) {
            self._compileNode(child)
        })
    }
}

Seed.prototype._compileTextNode = function (node) {
    
}

Seed.prototype._bind = function (node, directive) {

    directive.seed = this
    directive.el = node

    node.removeAttribute(directive.attr.name)

    var key = directive.key,
        epr = this._options.eachPrefixRE
    if (epr) {
        key = key.replace(epr, '')
    }

    var binding  = this._bindings[key] || this._createBinding(key)

    // add directive to this binding
    binding.directives.push(directive)

    // invoke bind hook if exists
    if (directive.bind) {
        directive.bind.call(directive, binding.value)
    }

}

Seed.prototype._createBinding = function (key) {

    var binding = {
        value: undefined,
        directives: []
    }

    this._bindings[key] = binding
    console.log(' createBinding before:', binding, key);
    // bind accessor triggers to scope
    Object.defineProperty(this.scope, key, {
        get: function () {
            return binding.value
        },
        set: function (value) {
            binding.value = value
            console.log(' after before:', binding, key);
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
        delete this._bindings[key]
    }
    this.el.parentNode.removeChild(this.el)
    function unbind (directive) {
        if (directive.unbind) {
            directive.unbind()
        }
    }
}

module.exports = Seed

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var config     = __webpack_require__(0),
    Directives = __webpack_require__(1),
    Filters    = __webpack_require__(2)

var KEY_RE          = /^[^\|]+/,
    FILTERS_RE      = /\|[^\|]+/g,
    FILTER_TOKEN_RE = /[^\s']+|'[^']+'/g,
    QUOTE_RE        = /'/g

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
            var tokens = filter.slice(1)
                .match(FILTER_TOKEN_RE)
                .map(function (token) {
                    return token.replace(QUOTE_RE, '').trim()
                })
            return {
                name  : tokens[0],
                apply : Filters[tokens[0]],
                args  : tokens.length > 1
                        ? tokens.slice(1)
                        : null
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
        if (!filter.apply) throw new Error('Unknown filter: ' + filter.name)
        filtered = filter.apply(filtered, filter.args)
    })
    return filtered
}

module.exports = {

    // make sure the directive and value is valid
    parse: function (attr) {

        var prefix = config.prefix
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
/* 6 */
/***/ (function(module, exports) {

var proto = Array.prototype,
    slice = proto.slice,
    mutatorMethods = [
        'pop',
        'push',
        'reverse',
        'shift',
        'unshift',
        'splice',
        'sort'
    ]

module.exports = function (arr, callback) {

    mutatorMethods.forEach(function (method) {
        arr[method] = function () {
            proto[method].apply(this, arguments)
            callback({
                event: method,
                args: slice.call(arguments),
                array: arr
            })
        }
    })

}

/***/ })
/******/ ]);
});