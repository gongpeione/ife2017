webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// const F1_KEYCODE = 112;
// const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var key = {
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "UP": 38,
    "DOWN": 40,
    "LEFT": 37,
    "RIGHT": 39,
    "BACKSPACE": 8,
    "TAB": 9,
    "ENTER": 13,
    "SHIFT": 16,
    "CTRL": 17,
    "ALT": 18,
    "SPACE": 32,
    "DELETE": 46,
    "a": 97,
    "b": 98,
    "c": 99,
    "d": 100,
    "e": 101,
    "f": 102,
    "g": 103,
    "h": 104,
    "i": 105,
    "j": 106,
    "k": 107,
    "l": 108,
    "m": 109,
    "n": 110,
    "o": 111,
    "p": 112,
    "q": 113,
    "r": 114,
    "s": 115,
    "t": 116,
    "u": 117,
    "v": 118,
    "w": 119,
    "x": 120,
    "y": 121,
    "z": 122,
    "A": 65,
    "B": 66,
    "C": 67,
    "D": 68,
    "E": 69,
    "F": 70,
    "G": 71,
    "H": 72,
    "I": 73,
    "J": 74,
    "K": 75,
    "L": 76,
    "M": 77,
    "N": 78,
    "O": 79,
    "P": 80,
    "Q": 81,
    "R": 82,
    "S": 83,
    "T": 84,
    "U": 85,
    "V": 86,
    "W": 87,
    "X": 88,
    "Y": 89,
    "Z": 90,
    "F1": 112,
    "F2": 113,
    "F3": 114,
    "F4": 115,
    "F5": 116,
    "F6": 117,
    "F7": 118,
    "F8": 119,
    "F9": 120,
    "F10": 121,
    "F11": 122,
    "F12": 123
};
// Array.from(letters, letter => {
//     key[letter] = letter.charCodeAt(0);
// });
// Array(12).fill().forEach((val, index) => {
//     key['F' + (index + 1)] = F1_KEYCODE + index;
// });
var CONST = exports.CONST = {
    USE_CAPTURE: {
        BUBBLING: false,
        CAPTURE: true
    },
    KEY_CODE: key
};
// console.log(JSON.stringify(CONST, null, '    '));

var g = {
    /**
     * Get single element by selector
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $: function $(selector) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        if (context instanceof NodeList) {
            return Array.from(context, function (node) {
                return node.querySelector(selector);
            });
        }
        return context.querySelector(selector);
    },

    /**
     * Get elements by selector
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Array} elements list
     */
    $$: function $$(selector) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

        if (context instanceof NodeList) {
            return Array.from(context, function (node) {
                return node.querySelectorAll(selector);
            });
        }
        return context.querySelectorAll(selector);
    },

    warn: function warn() {
        for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
            msg[_key] = arguments[_key];
        }

        console.warn(msg);
    },

    /**
     * Create a new element
     * 
     * @param {string} [tagName='div']
     * @param {Object} [attrs={}]
     * @returns {Element} new element
     */
    create: function create() {
        var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
        var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var node = document.createElement(tagName);
        for (var _key2 in attrs) {
            node.setAttribute(_key2, attrs[_key2]);
        }

        return node;
    },

    /**
     * Get or set element's attribute
     * 
     * @param {Element} node
     * @param {String} attr
     * @param {String} [newVal=null]
     * @returns {String} element's attribute value or null
     */
    attr: function attr(node, _attr) {
        var newVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

        if (newVal) {
            node.setAttribute(_attr, newVal);
            return;
        }

        return node.getAttribute(_attr);
    },
    /**
     * Return a array of all element's attributes
     * 
     * @param {Element} node
     * @returns [{Attribute Name: Attribute Value},...]
     */
    attrs: function attrs(node) {
        var attrs = {};
        Array.from(node.attributes).forEach(function (attr) {
            var attrName = attr.nodeName;
            attrs[attrName] = node.getAttribute(attrName);
        });

        return attrs;
    },

    /**
     * Add or remove element's class name
     * 
     * @param {Element} node
     * @param {String} className
     * @param {boolean} [remove=false]
     * @returns
     */
    class: function _class(node, className) {
        var remove = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (remove) {
            node.classList.remove(className);
            return;
        }
        if (Array.isArray(className)) {
            var _node$classList;

            (_node$classList = node.classList).add.apply(_node$classList, _toConsumableArray(className));
            return;
        }
        node.classList.add(className);
    },

    /**
     * Set style
     * 
     * @param {Element} node
     * @param {String} styles
     */
    css: function css(node, styles) {
        node.style.cssText = node.style.cssText ? node.style.cssText += styles : styles;
    },

    width: function width(node) {
        return node.getBoundingClientRect().width;
    },

    height: function height(node) {
        return node.getBoundingClientRect().height;
    },

    vdom: function () {
        /**
         * Creates an instance of VDOM.
         * 
         * @param {string} [tagName='div'] element tag name
         * @param {Object} [attrs={}] element's attributes like id,class,name etc
         * @param {VDOM} [children=[]] children nodes
         */
        function VDOM() {
            var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
            var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            _classCallCheck(this, VDOM);

            this.tagName = tagName;
            this.attrs = attrs;
            this.children = Array.isArray(children) ? children : Array.from(children);

            this.event = [];
        }

        _createClass(VDOM, [{
            key: "render",
            value: function render() {
                var node = document.createElement(this.tagName);
                var attrs = this.attrs;

                for (var attr in attrs) {
                    node.setAttribute(attr, attrs[attr]);
                }

                // console.log(this.event);
                if (this.event.length) {
                    this.event.forEach(function (eachEvent) {
                        node.addEventListener(eachEvent.eventName, eachEvent.callback);
                    });
                }

                var children = this.children;

                Array.from(children).forEach(function (child) {
                    var childEl = child instanceof VDOM ? child.render() : document.createTextNode(child);

                    node.appendChild(childEl);
                });

                return node;
            }
        }, {
            key: "addEvent",
            value: function addEvent(eventName, callback) {
                var useCapture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CONST.USE_CAPTURE.BUBBLING;

                this.event.push({
                    eventName: eventName,
                    callback: callback
                });
                return this;
            }
        }, {
            key: "addChildren",
            value: function addChildren(children) {
                var _children;

                (_children = this.children).push.apply(_children, _toConsumableArray(children));
            }
        }]);

        return VDOM;
    }()
};
exports.g = g;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createEntries;

var _gtool = __webpack_require__(0);

var _gtool2 = _interopRequireDefault(_gtool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _gtool2.default.$;
var $$ = _gtool2.default.$$;

var entries = [{
    title: '百度糯米前端技术学院',
    tasks: [{
        title: '自定义checkbox， radio样式',
        completed: false
    }, {
        title: '自定义网页右键菜单',
        completed: false
    }]
}];
function createEntries(parent) {
    parent = typeof parent === 'string' ? $(parent) : parent;

    var entriesList = [];
    entries.forEach(function (topLevel) {

        var topLevelList = [];
        var ul = new _gtool2.default.vdom('ul');
        var title = new _gtool2.default.vdom('li', {}, [topLevel.title]);

        topLevel.tasks.forEach(function (task) {
            var taskList = new _gtool2.default.vdom('li', {}, [task.title]);
            topLevelList.push(taskList);
        });

        ul.addChildren(topLevelList);
        entriesList.push(title, ul);
    });

    var ul = new _gtool2.default.vdom('ul', {}, entriesList);
    parent.appendChild(url);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gtool = __webpack_require__(0);

var _gtool2 = _interopRequireDefault(_gtool);

var _createEntries = __webpack_require__(1);

var _createEntries2 = _interopRequireDefault(_createEntries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = _gtool2.default.$;
var $$ = _gtool2.default.$$;

(0, _createEntries2.default)('.entries nav');

/***/ })
],[2]);
//# sourceMappingURL=index.js.map