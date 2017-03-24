webpackJsonp([2,15],{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.create = create;

var _template = __webpack_require__(378);

var _template2 = _interopRequireDefault(_template);

var _gtool = __webpack_require__(59);

__webpack_require__(361);

var _Markdown = __webpack_require__(328);

var _Markdown2 = _interopRequireDefault(_Markdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(parent) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    parent = typeof parent === 'string' ? _gtool.g.$(parent) : parent;

    parent.innerHTML = _template2.default;

    new _Markdown2.default('.markdown .editor', '.markdown .out');
}

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LNote = function () {
    function LNote(parent, callback) {
        var defaultVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Edit here';

        _classCallCheck(this, LNote);

        this.parent = typeof parent === 'string' ? document.querySelector(parent) : parent;
        this.section = {
            lineNums: null,
            textarea: null
        };
        this.callback = callback;

        this.lineCounter = 0;
        this.defaultVal = defaultVal;

        this.init();
    }

    _createClass(LNote, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var lines = this.section.lineNums = document.createElement('div');
            var textarea = this.section.textarea = document.createElement('div');

            lines.classList.add('line-nums');
            textarea.classList.add('textarea');
            textarea.setAttribute('contenteditable', true);

            this.parent.appendChild(lines);
            this.parent.appendChild(textarea);

            this.mutation = new MutationObserver(function (mutations) {

                var newContent = _this.getContent();

                _this.callback(newContent.text);
                _this.updateNums(newContent.nums);
                _this.saveContent(newContent.html);
            });

            this.mutation.observe(textarea, {
                childList: true,
                characterData: true,
                subtree: true
            });

            textarea.addEventListener('keydown', function (e) {
                if (_this.lineCounter > 1) {
                    return;
                }
                if (textarea.innerText.length === 1 && e.keyCode === 8) {
                    e.preventDefault();
                }
            });

            var defaultVal = this.loadContent();
            if (defaultVal) {
                this.setContent(defaultVal, true);
            } else {
                this.setContent(this.defaultVal);
            }

            this.callback(defaultVal);
        }
    }, {
        key: 'updateNums',
        value: function updateNums(newCounter) {

            if (newCounter === this.lineCounter) {
                return;
            }

            if (newCounter > this.lineCounter) {
                var fragment = document.createDocumentFragment();

                for (var i = this.lineCounter; i < newCounter; i++, this.lineCounter++) {
                    fragment.appendChild(this.newNum(i + 1));
                }

                this.section.lineNums.appendChild(fragment);
            }

            if (newCounter < this.lineCounter) {

                var rmAmount = this.lineCounter - newCounter;

                if (rmAmount < 50) {
                    for (var _i = 0; _i < rmAmount; _i++, this.lineCounter--) {
                        this.section.lineNums.lastChild.remove();
                    }
                    return;
                }

                this.section.lineNums.innerHTML = '';
                var _fragment = document.createDocumentFragment();

                for (var _i2 = 1; _i2 <= newCounter; _i2++, this.lineCounter++) {
                    _fragment.appendChild(this.newNum(_i2));
                }
                this.section.lineNums.appendChild(_fragment);
            }
        }
    }, {
        key: 'newNum',
        value: function newNum(index) {

            var num = document.createElement('p');

            num.classList.add('line-num');
            num.dataset.index = index;
            num.innerText = index;

            return num;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            var lines = Array.from(this.section.textarea.querySelectorAll('p'));
            var text = lines.reduce(function (str, line2) {
                return str + line2.innerText + '\n';
            }, '');

            return {
                nums: lines.length,
                text: text,
                html: this.section.textarea.innerHTML
            };
        }
    }, {
        key: 'saveContent',
        value: function saveContent(content) {
            localStorage.setItem('GMD_content', content);
        }
    }, {
        key: 'setContent',
        value: function setContent(content, isHTML) {
            if (isHTML) {
                this.section.textarea.innerHTML = content;
            } else {
                this.section.textarea.innerHTML = content.split('\n').map(function (line) {
                    return '<p>' + line + '</p>';
                }).join('');
            }
        }
    }, {
        key: 'loadContent',
        value: function loadContent() {
            return localStorage.getItem('GMD_content') || false;
        }
    }]);

    return LNote;
}();

exports.default = LNote;

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gtool = __webpack_require__(59);

var _gmdMarkdownParser = __webpack_require__(370);

var _gmdMarkdownParser2 = _interopRequireDefault(_gmdMarkdownParser);

var _LNote = __webpack_require__(327);

var _LNote2 = _interopRequireDefault(_LNote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultVal = '# h1\n\n\n## h2\n\n### h3\n\n#### h4\n\n##### h5\n\n###### h6\n\n---\n\nCode: `code`, em: *em*, strong: **strong**, strike through: ~~through~~\n\n---\n\n[Link](https://google.com)\n\n![img](https://ww4.sinaimg.cn/large/006tNc79gy1fdk3zs7r9nj308c08cdi7.jpg)\n\n> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis veniam recusandae maiores aperiam? Vero amet iste aliquam, architecto sapiente ipsum provident, adipisci molestiae. Incidunt natus, tempora ratione atque praesentium \n> assumenda!\n\n---\n\npre:\n\n```javascript\nalert(1)\n```\n\n---\n\n- unordered list1\n- list1\n- list1\n- list1\n\n1. ordered list\n2. ordered list\n3. ordered list\n4. ordered list';

var MarkDown = function () {
    function MarkDown(editor, output) {
        var _this = this;

        _classCallCheck(this, MarkDown);

        this.editor = typeof editor === 'string' ? _gtool.g.$(editor) : editor;
        this.output = typeof output === 'string' ? _gtool.g.$(output) : output;

        this.gmd = new _gmdMarkdownParser2.default();
        this.lnote = new _LNote2.default(this.editor, function (newVal) {
            _this.update(newVal);
        }, defaultVal);

        this.init();
    }

    _createClass(MarkDown, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'update',
        value: function update(newVal) {
            this.output.innerHTML = this.gmd.parse(newVal);
        }
    }]);

    return MarkDown;
}();

exports.default = MarkDown;

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(318)();
// imports


// module
exports.push([module.i, ".markdown{height:100%;overflow:auto;display:flex}.markdown .content{flex:1}.markdown .content textarea{width:100%;height:100%;max-width:100%;max-height:100%;border:none;background:#2a2f31;color:#eee;padding:.1rem;outline:none}.markdown .cover{flex:1;height:100%;overflow:auto}.markdown .out{min-height:100%;overflow:auto;padding:.2rem .3rem;font-size:.12rem}.markdown .out a{color:#1d71c0;text-decoration:underline}.markdown .out h1,.markdown .out h2,.markdown .out h3,.markdown .out h4,.markdown .out h5,.markdown .out h6{margin:.1rem 0}.markdown .out blockquote{border-left:5px solid #f0f5f7;padding:0 .3rem;color:#666;margin:.4rem 0;font-size:.14rem;overflow:hidden}.markdown .out ol{margin:.2rem}.markdown .out ul{margin:.2rem 0;list-style:none}.markdown .out ul li:before{content:\"\\2022\";color:#1d71c0;margin-right:.1rem}.markdown .out ul li.task-list-item:before{content:\"\"}.markdown .out code{background:#f0f5f7;padding:.02rem .08rem;border-radius:3px}.markdown .out pre{padding:.2rem;margin:.2rem 0;background:#f0f5f7;overflow-x:auto;border-radius:3px;line-height:1.5}.markdown .out hr{border:none;border-top:.02rem solid #f0f5f7}.markdown .editor{display:flex;flex:1;min-height:100%}.markdown .editor p{margin:0;font-size:.14rem;white-space:nowrap;height:.21rem;letter-spacing:.01rem}.markdown .line-nums{min-width:.4rem;background:#30363a;padding:.15rem .05rem;text-align:right;color:#6f8b9c;border-right:1px dashed #535e63}.markdown .textarea{flex:1;background:#30363a;outline:none;padding:.15rem;color:#ddd}@media print{body,html{height:auto!important;overflow:auto!important}#disqus,.entries,.github,.markdown .cover:first-child{display:none!important}.container,.out{width:100%}.out{display:block!important;padding:0!important}}", ""]);

// exports


/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(348);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(319)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?minimize!../../../node_modules/sass-loader/index.js!./style.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?minimize!../../../node_modules/sass-loader/index.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

const GMD = __webpack_require__(371);
module.exports = GMD;

/***/ }),

/***/ 371:
/***/ (function(module, exports) {

class GMD {
    constructor () {
        this.diffLines = [];
        this.init();
    }

    init () {
        this.markPattern = {
            separator: {
                regex: /^[\-=\*]{3,}/,
                template: '<hr>',
                singleLine: true,
                lineStart: true,
            },
            emphasis: {
                regex: /[\*_]([^\*_]+?)[\*_](?!\*)/,
                template: '<em>$1</em>',
                singleLine: false
            },
            strongEm: {
                regex: /[\*_]{2}(.*?)[\*_]{2}/,
                template: '<strong>$1</strong>',
                singleLine: false
            },
            strikeThrough: {
                regex: /~{2}(.*?)~{2}/,
                template: '<del>$1</del>',
                singleLine: false
            },
            ul: {
                regex: /^[\*\-\+]\s([^\n]+)/,
                template: '<ul>$1</ul>',
                singleLine: false,
                lineStart: true
            },
            ol: {
                regex: /^\d+\.\s([^\n]+)/,
                template: '<ol>$1</ol>',
                singleLine: false,
                lineStart: true
            },
            link: {
                regex: /(?:[^!]|^)\[([^\]]+?)\]\(([^\)]+?)\)/,
                template: '<a href="$2">$1</a>',
                singleLine: false
            },
            img: {
                regex: /!\[([^\]]*?)\]\(([^\)]+?)\)/,
                template: '<img alt="$1" src="$2">',
                singleLine: false
            },
            blockquote: {
                regex: /^\>\s([^\n]+)/,
                template: '<blockquote>$1</blockquote>',
                singleLine: false,
                lineStart: true
            },
            code: {
                regex: /`([^`\n]+)`/,
                template: '<code>$1</code>',
                singleLine: false
            },
            pre: {
                regex: /```(\w+)([^`]+?)```/,
                template: '<pre class="$1">$2</pre>',
                singleLine: false
            },
        }

        // Add h1-h6 regex
        for (let i = 1; i <= 6; i++) {
            const reg = '^\s*?' + '#'.repeat(i) + '\\s([^\\n]+)';
            this.markPattern['h' + i] = {
                regex: new RegExp(reg),
                template: `<h${i}>$1</h${i}>`,
                singleLine: false,
                lineStart: true
            };
        }

        // console.log(this.markPattern);
    }

    update () {
        return this.parse(this.textarea.value);
    }

    parse (val) {
        const lines = val.split(/\n{2,}/);

        const linesParsed = lines.map(line => {
            return this.parseLine(line);
        });

        const result = linesParsed.join('\n');

        return result;
    }

    parseLine (line) {

        let isBlockEle = false;
        let isQuote = false; 

        for (let key in this.markPattern) {

            const pattern = this.markPattern[key];

            if (!pattern.regex.test(line)) {
                continue;
            }

            if (pattern.singleLine) {
                line = line.replace(pattern.regex, pattern.template);
                return line;
            }
            
            if (pattern.lineStart) {

                if (['blockquote', 'ol', 'ul'].indexOf(key) >= 0) {
                    const list = [];
                    // const matches = line.match(new RegExp(pattern.regex, 'g'));
                    const matches = line.split('\n');
                    
                    matches.forEach(match => {

                        if (key === 'blockquote') {
                            const filtered = match.replace(/>\s/, '');
                            list.push(this.parseLine(filtered));
                        } else {
                            const filtered = match.replace(/[\*\-\+]\s|\d+\.\s/, '');
                            list.push(`<li>${filtered}</li>`);
                        }
                    });

                    // console.log(list.join('\n'), pattern.template, key);

                    line = pattern.template.replace('$1', list.join(''));

                    continue;
                }

                const filtered = pattern.template.replace('{data}', RegExp.$1);
                
                // line = line.replace(RegExp.$_, filtered);
                line = line.replace(new RegExp(pattern.regex), pattern.template);

                isBlockEle = true;

                continue;
                // line = line.replace(match[0], newContent);
            }

            line = line.replace(new RegExp(pattern.regex, 'g'), pattern.template);
        }

        if (!isBlockEle) {
            return `<p>${line}</p>`;
        } else {
            return line;
        }
    }

    diff () {

    }

}

module.exports = GMD;

/***/ }),

/***/ 378:
/***/ (function(module, exports) {

module.exports = "<div class=markdown> <div class=cover> <div class=editor></div> </div> <div class=cover> <div class=out></div> </div> </div>";

/***/ })

});
//# sourceMappingURL=2.index.js.map