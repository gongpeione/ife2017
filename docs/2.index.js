webpackJsonp([2,12],{317:function(e,n,t){n=e.exports=t(315)(),n.push([e.i,".console{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);overflow:hidden;background:#eee;border-radius:3px;width:60%}.console div{padding:5px 8px;background:#223348;border-bottom:1px solid #404446;color:#fff}.console div span{color:hsla(0,0%,100%,.4);margin-right:5px}.console div.command{color:#8fb0bb}.console input{border:none;width:100%;background:#404446;padding:5px 10px;outline:none;color:#eee}.console .output{height:400px;overflow:auto}",""])},318:function(e,n,t){var o=t(317);"string"==typeof o&&(o=[[e.i,o,""]]);t(316)(o,{});o.locals&&(e.exports=o.locals)},324:function(e,n,t){"use strict";function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}(),i=function(){function e(){o(this,e),this.changeMethods={}}return r(e,[{key:"onChange",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.changeMethods[e]=n}},{key:"callChangeMethods",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e in this.changeMethods&&this.changeMethods[e](n)}},{key:"bubbling",value:function(e,n){var t=this,o=e.slice(0,e.length-1).split("."),a=o.length;if(this.callChangeMethods(e,n),a){o.forEach(function(e){t.callChangeMethods(e,n)});for(var r=o.length-1;r>=2;r--){var i=o.slice(0,r);this.callChangeMethods(i.join("."),n)}}}}]),e}(),l=function(){function e(n){o(this,e),this.originalData=this.data=n,this.handler=new i,this.observe(this.originalData)}return r(e,[{key:"observe",value:function(e){this.checkData(e)}},{key:"checkData",value:function(e){var n=this,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"object"===("undefined"==typeof e?"undefined":a(e))&&Object.keys(e).forEach(function(o){n.initProperty(e,o,e[o],t)})}},{key:"initProperty",value:function(e,n,t,o){var a=this;o+=n+".",this.checkData(t,o),Object.defineProperty(e,n,{enumerable:!0,configurable:!1,get:function(){return t},set:function(e){a.checkData(e,parent),a.handler.bubbling(o,e),t=e}})}},{key:"$watch",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.handler.onChange(e,n)}}]),e}();n.default=l},354:function(e,n){e.exports='<div class=console> <div class=output></div> <input type=text placeholder="仅支持 app1.data.xxx 或 app1.data.xxx = xx 命令"> </div>'},95:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var n=e.apply(this,arguments);return new Promise(function(e,t){function o(a,r){try{var i=n[a](r),l=i.value}catch(e){return void t(e)}return i.done?void e(l):Promise.resolve(l).then(function(e){o("next",e)},function(e){o("throw",e)})}return o("next")})}}function create(parent){var option=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];parent="string"==typeof parent?_gtool.g.$(parent):parent,parent.innerHTML=_template2.default;var oldConsole=console.log,outputList=[];console.log=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];n?outputList.push('<div class="command"><span>> </span>'+e+"</div>"):outputList.push("<div><span>< </span>"+e+"</div>")},console.log("let app1 = new Observer({\n        name: {\n            firstName: 'shaofeng',\n            lastName: 'liang'\n        },\n        age: 25\n    });",!0);var app1=new _Observer2.default({name:{firstName:"shaofeng",lastName:"liang"},age:25});console.log("app1.$watch('name', function (newName) {\n        console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')\n    });",!0),app1.$watch("name",function(e){console.log("我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。新值为："+e)}),console.log("app1.data.name.firstName = 'hahaha';",!0),app1.data.name.firstName="hahaha",console.log("app1.data.name.lastName = 'blablabla';",!0),app1.data.name.lastName="blablabla",playCommand(outputList),console.log=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];addList(n?'<div class="command"><span>> </span>'+e+"</div>":"<div><span>< </span>"+e+"</div>")};var input=_gtool.g.$(".console input");input.addEventListener("keyup",function(e){if(e.keyCode===_gtool.CONST.KEY_CODE.ENTER){var command=input.value;console.log(command,!0),/app1\.data\.(\w+)+?\s?=?('.*?')?/.test(command)?eval(command):console.log("[warning] Command illegal"),input.value=""}})}function addList(e){var n=_gtool.g.$(".console .output");n.innerHTML+=e,n.scrollTop=n.scrollHeight}Object.defineProperty(exports,"__esModule",{value:!0});var playCommand=function(){var e=_asyncToGenerator(regeneratorRuntime.mark(function e(n){var t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=0;case 1:if(!(t<n.length)){e.next=9;break}return e.next=4,new Promise(function(e,n){setTimeout(function(){e()},200)});case 4:return e.next=6,addList(n[t]);case 6:t++,e.next=1;break;case 9:case"end":return e.stop()}},e,this)}));return function(n){return e.apply(this,arguments)}}();exports.create=create;var _template=__webpack_require__(354),_template2=_interopRequireDefault(_template),_gtool=__webpack_require__(59);__webpack_require__(318);var _Observer=__webpack_require__(324),_Observer2=_interopRequireDefault(_Observer)}});
//# sourceMappingURL=2.index.js.map