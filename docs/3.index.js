webpackJsonp([3,12],{317:function(e,n,o){n=e.exports=o(315)(),n.push([e.i,".console{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);overflow:hidden;background:#eee;border-radius:3px;width:60%}.console div{padding:5px 8px;background:#223348;border-bottom:1px solid #404446;color:#fff}.console div span{color:hsla(0,0%,100%,.4);margin-right:5px}.console div.command{color:#8fb0bb}.console input{border:none;width:100%;background:#404446;padding:5px 10px;outline:none;color:#eee}.console .output{height:400px;overflow:auto}",""])},318:function(e,n,o){var t=o(317);"string"==typeof t&&(t=[[e.i,t,""]]);o(316)(t,{});t.locals&&(e.exports=t.locals)},323:function(e,n,o){"use strict";function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,n){for(var o=0;o<n.length;o++){var t=n[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,o,t){return o&&e(n.prototype,o),t&&e(n,t),n}}(),i=function(){function e(n){t(this,e),this.obj=this.data=n,this.watchers={},this.walk(this.obj)}return r(e,[{key:"observe",value:function(e,n,o){var t=this;this.walk(o),Object.defineProperty(e,n,{enumerable:!0,configurable:!1,get:function(){return console.log("你访问了 "+n),o},set:function(e){"object"===("undefined"==typeof e?"undefined":a(e))&&t.walk(e),console.log("你设置了 "+n+"，新的值为 "+e),t.watchers[n]&&t.watchers[n](e),o=e}})}},{key:"walk",value:function(e){var n=this;e&&"object"===("undefined"==typeof e?"undefined":a(e))&&Object.keys(e).forEach(function(o){n.observe(e,o,e[o])})}},{key:"$watch",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.watchers[e]=n}}]),e}();n.default=i},353:function(e,n){e.exports='<div class=console> <div class=output></div> <input type=text placeholder="仅支持 app1.data.xxx 或 app1.data.xxx = xx 命令"> </div>'},94:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var n=e.apply(this,arguments);return new Promise(function(e,o){function t(a,r){try{var i=n[a](r),l=i.value}catch(e){return void o(e)}return i.done?void e(l):Promise.resolve(l).then(function(e){t("next",e)},function(e){t("throw",e)})}return t("next")})}}function create(parent){var option=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];parent="string"==typeof parent?_gtool.g.$(parent):parent,parent.innerHTML=_template2.default;var oldConsole=console.log,outputList=[];console.log=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n?outputList.push('<div class="command"><span>> </span>'+e+"</div>"):outputList.push("<div><span>< </span>"+e+"</div>")},console.log("let app1 = new Observer({\n        name: 'youngwind',\n        age: 25,\n        cellphone: {\n            '1': 'iPhone 7',\n            '2': 'Pixel XL'\n        }\n    });",!0);var app1=new _Observer2.default({name:"youngwind",age:25,cellphone:{1:"iPhone 7",2:"Pixel XL"}});console.log("app1.$watch('name', newVal => {\n        console.log('[Watcher] ' + newVal);\n    });",!0),app1.$watch("name",function(e){console.log("[Watcher] "+e)}),console.log("app1.data.cellphone = {\n        '1': 'iPhone 7 plus',\n        '2': 'Pixel XL'\n    }",!0),app1.data.cellphone={1:"iPhone 7 plus",2:"Pixel XL"},console.log("app1.data.age = 100;",!0),app1.data.age=100,console.log("app1.data.name",!0),app1.data.name="Hai Su",playCommand(outputList),console.log=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];addList(n?'<div class="command"><span>> </span>'+e+"</div>":"<div><span>< </span>"+e+"</div>")};var input=_gtool.g.$(".console input");input.addEventListener("keyup",function(e){if(e.keyCode===_gtool.CONST.KEY_CODE.ENTER){var command=input.value;console.log(command,!0),/app1\.data\.(\w+)+?\s?=?('.*?')?/.test(command)?eval(command):console.log("[warning] Command illegal"),input.value=""}})}function addList(e){var n=_gtool.g.$(".console .output");n.innerHTML+=e,n.scrollTop=n.scrollHeight}Object.defineProperty(exports,"__esModule",{value:!0});var playCommand=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(n){var o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o=0;case 1:if(!(o<n.length)){e.next=9;break}return e.next=4,new Promise(function(e,n){setTimeout(function(){e()},200)});case 4:return e.next=6,addList(n[o]);case 6:o++,e.next=1;break;case 9:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}();exports.create=create;var _template=__webpack_require__(353),_template2=_interopRequireDefault(_template),_gtool=__webpack_require__(59);__webpack_require__(318);var _Observer=__webpack_require__(323),_Observer2=_interopRequireDefault(_Observer)}});
//# sourceMappingURL=3.index.js.map