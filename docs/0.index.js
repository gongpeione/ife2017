webpackJsonp([0,14],{126:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?s.g.$(e):e,e.innerHTML=o.default,new u.default(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.create=r;var a=n(370),o=i(a),s=n(59);n(356);var c=n(326),u=i(c)},323:function(e,t,n){e.exports=n.p+"bd86b39250df5f0d2bb3db45bae6775e.eot"},326:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=n(328),o=i(a),s='\n<figure class="player-wrap">\n    <div class="cover">\n        <img g-src="cover" g-alt="title" g-style="progressStyle">>\n        <div class="start"></div>\n    </div>\n    <figcaption>\n        <h3>{{ title }} - {{ singer }}</h3>\n        <div class="info">\n            <span class="singer">{{ singer }}</span>\n            <span class="album">{{ album }}</span>\n        </div>\n    </figcaption>\n    <div class="control">\n        <span class="icon-previous"></span>\n        <span class="icon-start"></span>\n        <span class="icon-next"></span>\n        <span class="icon-cycle"></span>\n        <span class="icon-list"></span>\n        <span class="icon-unlike"></span>\n    </div>\n    <div class="progress">\n        <div class="volume">\n            <span class="icon-volume"></span>\n            <div class="volume-prgress" style="{{ volumeStyle }}"></div>\n        </div>\n        <div class="time">\n            <time class="total">{{ time.total }}</time>\n            <time class="durtion">{{ time.durtion }}</time>\n        </div>\n        <div class="progress-bar">\n            <div class="current" g-style="progressStyle"></div>\n        </div>\n    </div>\n    \n</figure>',c=function e(t){r(this,e),this.parent=t="string"==typeof t?document.querySelector(t):t,this.parent.innerHTML=s,this.vm=new o.default({el:"figure.player-wrap",data:{title:"歌曲名",singer:"歌手",album:"专辑",cover:"https://ww3.sinaimg.cn/large/006tKfTcgy1fczj3tzyrqj31kw0vwh2a.jpg",time:{total:236,durtion:23},progressStyle:"background: #000"}}),console.log(this.vm)};t.default=c},327:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function e(){i(this,e),this.subscribers=[]}return r(e,[{key:"add",value:function(e){this.subscribers.push(e)}},{key:"update",value:function(){this.subscribers.forEach(function(e){e.update()})}}]),e}();t.default=a},328:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(329),s=i(o),c=n(327),u=i(c),l={element:1,text:3,comment:8},f=/({{(.*?)}})/,d=/g-(.*?)/,p=function(){function e(t){r(this,e),this.data=t.data,this.el="string"==typeof t.el?document.querySelector(t.el):t.el,this.publisher=new u.default,this.parseHTML(this.el)}return a(e,[{key:"parseHTML",value:function(e){for(var t=document.createDocumentFragment(),n=(e.children.length,null);n=e.firstChild;)t.appendChild(n),this.parseNode(n);this.el.appendChild(t)}},{key:"parseNode",value:function(e){var t=this,n="";if(e.nodeType===l.element){Array.from(e.attributes,function(n){var i=n.name,r=n.nodeValue;d.test(i)&&new s.default({node:e,type:s.default.TYPE.BIND,name:r,context:t,attrName:i})});var i=Array.from(e.children);i.length?i.forEach(function(e){t.parseNode(e)}):(n=e.innerText,f.test(n)&&new s.default({node:e,type:s.default.TYPE.NODE,context:this}))}e.nodeType===l.text&&(n=e.nodeValue,f.test(n)&&new s.default({node:e,type:s.default.TYPE.TEXT,context:this}))}},{key:"$watch",value:function(e,t){this.observer.$watch(e,t)}}]),e}();t.default=p},329:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=/({{(.*?)}})/g,o=function(){function e(t){i(this,e),this.node=t.node||this.error("Node is required"),this.context=t.context||this.error("Context is required"),this.data=this.context.data,this.publisher=this.context.publisher,this.type=t.type||e.TYPE.NODE,this.type===e.TYPE.BIND&&(this.attrName=t.attrName||this.error("Attribute Name is missing"),this.name=t.name||this.error("Attribute Value is missing")),this.curVal=[],this.init(),this.publisher.add(this)}return r(e,[{key:"error",value:function(e){throw new Error(e)}},{key:"init",value:function(){var t=this;if(this.type===e.TYPE.NODE||this.type===e.TYPE.TEXT){this.name=[],this.originalText=this.type===e.TYPE.NODE?this.node.innerText:this.node.nodeValue;var n=this.originalText.match(a);n&&n.length&&n.forEach(function(e){e.match(a);var n=RegExp.$1.trim(),i=RegExp.$2.trim();t.curVal[i]=n,t.name.push(i)})}this.update()}},{key:"update",value:function(){this.render()}},{key:"render",value:function(){switch(this.type){case e.TYPE.TEXT:this.node.nodeValue=this.replaceContent(this.originalText);break;case e.TYPE.NODE:this.node.innerText=this.replaceContent(this.originalText);break;case e.TYPE.BIND:this.node.removeAttribute(this.attrName),this.node.setAttribute(this.attrName.replace("g-",""),this.getData(this.name))}}},{key:"replaceContent",value:function(e){var t=this,n=e;return this.name.forEach(function(e){var i=t.getData(e);n=n.replace(t.curVal[e],i),t.curVal[e]=i}),n}},{key:"getData",value:function(e){var t=this;try{var n=e.trim().split(".");return 1===n.length?this.data[n[0]]:n.reduce(function(e,n){return t.data[e][n]})}catch(e){return""}}}]),e}();o.TYPE={TEXT:"text",NODE:"node",BIND:"bind"},t.default=o},344:function(e,t,n){t=e.exports=n(317)(),t.i(n(348),""),t.push([e.i,"",""])},348:function(e,t,n){t=e.exports=n(317)(),t.push([e.i,"@font-face{font-family:iconfont;src:url("+n(323)+");src:url("+n(323)+'#iefix) format("embedded-opentype"),url('+n(361)+') format("woff"),url('+n(360)+') format("truetype"),url('+n(362)+'#iconfont) format("svg")}[class*=icon]{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-close:before{content:"\\E641"}.icon-unlike:before{content:"\\E643"}.icon-delete:before{content:"\\E645"}.icon-volumn:before{content:"\\E64C"}.icon-list:before{content:"\\E655"}.icon-next:before{content:"\\E65F"}.icon-previous:before{content:"\\E660"}.icon-like:before{content:"\\E684"}',""])},356:function(e,t,n){var i=n(344);"string"==typeof i&&(i=[[e.i,i,""]]);n(318)(i,{});i.locals&&(e.exports=i.locals)},360:function(e,t,n){e.exports=n.p+"68ad099a8cf8387adb3b91569383877d.ttf"},361:function(e,t,n){e.exports=n.p+"8ed19a6deb6943cd7e3efb25aa040bbb.woff"},362:function(e,t,n){e.exports=n.p+"static/iconfont.svg"},370:function(e,t){e.exports="<div class=player> </div>"}});
//# sourceMappingURL=0.index.js.map