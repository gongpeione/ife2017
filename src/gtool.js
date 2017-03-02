// const F1_KEYCODE = 112;
// const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const key = {
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
export const CONST = {
    USE_CAPTURE: {
        BUBBLING: false,
        CAPTURE: true
    },
    KEY_CODE: key
};
// console.log(JSON.stringify(CONST, null, '    '));

export const g = {
    /**
     * Get single element by selector
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
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
    $$: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelectorAll(selector);
            });
        }
        return context.querySelectorAll(selector);
    },

    warn: (...msg) => {
        console.warn(msg);
    },

    /**
     * Create a new element
     * 
     * @param {string} [tagName='div']
     * @param {Object} [attrs={}]
     * @returns {Element} new element
     */
    create: (tagName = 'div', attrs = {}) => {
        const node = document.createElement(tagName);
        for (let key in attrs) {
            node.setAttribute(key, attrs[key]);
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
    attr: (node, attr, newVal = null) => {
        if (newVal) {
            node.setAttribute(attr, newVal);
            return;
        }

        return node.getAttribute(attr);
    },
    /**
     * Return a array of all element's attributes
     * 
     * @param {Element} node
     * @returns [{Attribute Name: Attribute Value},...]
     */
    attrs: node => {
        const attrs = {};
        Array.from(node.attributes).forEach(attr => {
            const attrName = attr.nodeName;
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
    class: (node, className, remove = false) => {
        if (remove) {
            node.classList.remove(className);
            return;
        }
        if (Array.isArray(className)) {
            node.classList.add(...className);
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
    css: (node, styles) => {
        node.style.cssText = node.style.cssText ? node.style.cssText += styles : styles;
    },

    width: (node) => {
        return node.getBoundingClientRect().width;
    },

    height: (node) => {
        return node.getBoundingClientRect().height;
    },

    merge: (template, ...objs) => {
        const retObj = template;
        objs.forEach(obj => {
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    retObj[key] = g.merge(retObj[key], obj[key]);
                } else {
                    retObj[key] = obj[key];
                }
                
            }
        });
        return retObj;
    },

    vdom: class VDOM {
        /**
         * Creates an instance of VDOM.
         * 
         * @param {string} [tagName='div'] element tag name
         * @param {Object} [attrs={}] element's attributes like id,class,name etc
         * @param {VDOM} [children=[]] children nodes
         */
        constructor (tagName = 'div', attrs = {}, children = []) {
            this.tagName = tagName;
            this.attrs = attrs;
            this.children = Array.isArray(children) ? children : Array.from(children);

            this.event = [];
        }

        render () {
            const node = document.createElement(this.tagName);
            const attrs = this.attrs;

            for (let attr in attrs) {
                node.setAttribute(attr, attrs[attr]);
            }

            // console.log(this.event);
            if (this.event.length) {
                this.event.forEach(eachEvent => {
                    node.addEventListener(eachEvent.eventName, eachEvent.callback);
                });
            }

            const children = this.children;

            Array.from(children).forEach(child => {
                const childEl = (child instanceof VDOM) ? child.render() : document.createTextNode(child);

                node.appendChild(childEl);
            });

            return node;
        }

        addEvent (eventName, callback, useCapture = CONST.USE_CAPTURE.BUBBLING) {
            this.event.push({
                eventName: eventName,
                callback: callback,
            });
            return this;
        }

        addChildren (children) {
            this.children.push(...children);
        }
    },
};