webpackJsonp([1,15],{133:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?u.g.$(e):e,e.innerHTML=r.default;var t=new s.default({el:"#vue-content",data:{user:{name:"Geeku",age:24},click:0}});window.app=t,u.g.$("#clickme").addEventListener("click",function(e){t.data.click+=1})}Object.defineProperty(t,"__esModule",{value:!0}),t.create=a;var o=n(385),r=i(o),u=n(59);n(365);var c=n(323),l=(i(c),n(339)),s=i(l)},323:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){i(this,e),this.changeMethods={}}return o(e,[{key:"onChange",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.changeMethods[e]=t}},{key:"callChangeMethods",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e in this.changeMethods&&this.changeMethods[e](t)}},{key:"bubbling",value:function(e,t){var n=this,i=e.slice(0,e.length-1).split("."),a=i.length;if(this.callChangeMethods(e,t),a){i.forEach(function(e){n.callChangeMethods(e,t)});for(var o=i.length-1;o>=2;o--){var r=i.slice(0,o);this.callChangeMethods(r.join("."),t)}}}}]),e}(),u=function(){function e(t,n){i(this,e),this.originalData=this.data=t,this.publisher=n,this.handler=new r,this.observe(this.originalData)}return o(e,[{key:"observe",value:function(e){this.checkData(e)}},{key:"checkData",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"object"===("undefined"==typeof e?"undefined":a(e))&&Object.keys(e).forEach(function(i){t.initProperty(e,i,e[i],n)})}},{key:"initProperty",value:function(e,t,n,i){var a=this;i+=t+".",this.checkData(n,i),Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get:function(){return n},set:function(e){a.checkData(e,parent),a.handler.bubbling(i,e),n=e,a.publisher.update()}})}},{key:"$watch",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.handler.onChange(e,t)}}]),e}();t.default=u},338:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(){i(this,e),this.watchers=[]}return a(e,[{key:"add",value:function(e){this.watchers.push(e)}},{key:"update",value:function(){this.watchers.forEach(function(e){e.update()})}}]),e}();t.default=o},339:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(59),u=n(323),c=i(u),l=n(340),s=i(l),h=n(338),f=i(h),d={element:1,text:3,comment:8},p=/({{(.*?)}})/g,v=function(){function e(t){a(this,e),this.data=t.data,this.el="string"==typeof t.el?r.g.$(t.el):t.el,this.publisher=new f.default,this.observer=new c.default(this.data,this.publisher),this.parseHTML(this.el)}return o(e,[{key:"parseHTML",value:function(e){for(var t=document.createDocumentFragment(),n=void 0;n=e.firstChild;){var i="";n.nodeType===d.element&&(i=n.innerText),n.nodeType===d.text&&(i=n.nodeValue);var a=p.test(i);a&&new s.default(this.data,n,this.publisher),t.appendChild(n)}this.el.appendChild(t)}},{key:"$watch",value:function(e,t){this.observer.$watch(e,t)}}]),e}();t.default=v},340:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=/({{(.*?)}})/g,r={element:1,text:3,comment:8},u=function(){function e(t,n,a){i(this,e),this.node=n,this.name=[],this.oldVal={},this.data=t,this.publisher=a,this.nodeType=n.nodeType,this.publisher.add(this),this.init()}return a(e,[{key:"init",value:function(){var e=this,t="";this.nodeType===r.element&&(t=this.node.innerText),this.nodeType===r.text&&(t=this.node.nodeValue);var n=t.match(o);n&&n.length&&n.forEach(function(t){var n=RegExp.$1.trim(),i=RegExp.$2.trim();e.oldVal[i]=n,e.name.push(i)}),this.update()}},{key:"update",value:function(){this.render()}},{key:"render",value:function(){this.nodeType===r.element&&(this.node.innerText=this.replaceContent(this.node.innerText)),this.nodeType===r.text&&(this.node.nodeValue=this.replaceContent(this.node.nodeValue))}},{key:"replaceContent",value:function(e){var t=this;return this.name.forEach(function(n){var i=t.getData(n);e=e.replace(t.oldVal[n],i),t.oldVal[n]=i}),e}},{key:"getData",value:function(e){var t=this;try{var n=e.trim().split(".");return 1===n.length?this.data[n[0]]:n.reduce(function(e,n){return t.data[e][n]})}catch(e){return""}}}]),e}();t.default=u},352:function(e,t,n){t=e.exports=n(318)(),t.push([e.i,"#vue-content{text-align:center;font-size:.3rem;position:absolute;width:100%;top:50%;transform:translateY(-50%)}",""])},365:function(e,t,n){var i=n(352);"string"==typeof i&&(i=[[e.i,i,""]]);n(319)(i,{});i.locals&&(e.exports=i.locals)},385:function(e,t){e.exports="<div id=vue-content> <div class=name>Name: {{ user.name }}</div> <div class=age>Age: {{ user.age }}</div> <div class=click>Clicked: {{ click }} times</div> <button id=clickme>Click Me!</button> </div>"}});
//# sourceMappingURL=1.index.js.map