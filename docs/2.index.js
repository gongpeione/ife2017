webpackJsonp([2,14],{321:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=function(){function e(){a(this,e),this.changeMethods={}}return i(e,[{key:"onChange",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.changeMethods[e]=t}},{key:"callChangeMethods",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e in this.changeMethods&&this.changeMethods[e](t)}},{key:"bubbling",value:function(e,t){var n=this,a=e.slice(0,e.length-1).split("."),o=a.length;if(this.callChangeMethods(e,t),o){a.forEach(function(e){n.callChangeMethods(e,t)});for(var i=a.length-1;i>=2;i--){var r=a.slice(0,i);this.callChangeMethods(r.join("."),t)}}}}]),e}(),u=function(){function e(t){a(this,e),this.originalData=this.data=t,this.handler=new r,this.observe(this.originalData)}return i(e,[{key:"observe",value:function(e){this.checkData(e)}},{key:"checkData",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"object"===("undefined"==typeof e?"undefined":o(e))&&Object.keys(e).forEach(function(a){t.initProperty(e,a,e[a],n)})}},{key:"initProperty",value:function(e,t,n,a){var o=this;a+=t+".",this.checkData(n,a),Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get:function(){return n},set:function(e){o.checkData(e,parent),o.handler.bubbling(a,e),n=e}})}},{key:"$watch",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.handler.onChange(e,t)}}]),e}();t.default=u},328:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(59),u=n(321),c=a(u),l={element:1,text:3,comment:8},s=function(){function e(t){o(this,e),this.data=t.data,this.el="string"==typeof t.el?r.g.$(t.el):t.el,this.moustache=/({{(.*?)}})/g,new c.default(this.data),this.parseHTML(this.el)}return i(e,[{key:"render",value:function(e){e.nodeType===l.element&&(e.innerText=this.replaceContent(e.innerText)),e.nodeType===l.text&&(e.nodeValue=this.replaceContent(e.nodeValue))}},{key:"replaceContent",value:function(e){var t=this,n=e.match(this.moustache);if(n&&n.length){var a=e;return n.forEach(function(e){e.match(t.moustache);var n=RegExp.$1.trim(),o=RegExp.$2.trim(),i=t.stringToData(o);a=a.replace(n,i)}),a}}},{key:"parseHTML",value:function(e){for(var t=document.createDocumentFragment(),n=void 0;n=e.firstChild;)this.render(n),t.appendChild(n);this.el.appendChild(t)}},{key:"stringToData",value:function(e){var t=this;try{var n=e.trim().split(".");return 1===n.length?this.data[n[0]]:n.reduce(function(e,n){return t.data[e][n]})}catch(e){return""}}}]),e}();t.default=s},340:function(e,t,n){t=e.exports=n(317)(),t.push([e.i,"#vue-content{text-align:center;font-size:.3rem;position:absolute;width:100%;top:50%;transform:translateY(-50%)}",""])},350:function(e,t,n){var a=n(340);"string"==typeof a&&(a=[[e.i,a,""]]);n(318)(a,{});a.locals&&(e.exports=a.locals)},363:function(e,t){e.exports="<div id=vue-content> <div class=name>Name: {{ user.name }}</div> <div class=age>Age: {{ user.age }}</div> </div>"},97:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?u.g.$(e):e,e.innerHTML=r.default;var t=new s.default({el:"#vue-content",data:{user:{name:"youngwind",age:25}}});console.log(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.create=o;var i=n(363),r=a(i),u=n(59);n(350);var c=n(321),l=(a(c),n(328)),s=a(l)}});
//# sourceMappingURL=2.index.js.map