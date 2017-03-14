webpackJsonp([0,15],{127:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?s.g.$(e):e,e.innerHTML=o.default,new c.default(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.create=r;var a=n(376),o=i(a),s=n(59);n(361);var l=n(328),c=i(l)},324:function(e,t,n){e.exports=n.p+"f0122547efbcc6600c978835e2f8c808.eot"},328:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=n(331),o=i(a),s='\n<figure class="player-wrap">\n    <div class="player">\n        <div class="cover">\n            <img g-src="cover" g-alt="title">\n            <div class="start"></div>\n        </div>\n        <div class="content">\n            <figcaption>\n                <h3>{{ title }}</h3>\n                <div class="info">\n                    <span class="singer">{{ singer }}</span>\n                    <span class="album">{{ album }}</span>\n                </div>\n            </figcaption>\n            <div class="control">\n                <span class="icon-backward"></span>\n                <span class="icon-play"></span>\n                <span class="icon-forward"></span>\n                <span class="icon-loop"></span>\n                <label class="icon-list" for="listSwitch"></label>\n                <span class="icon-like"></span>\n            </div>\n            <div class="progress">\n                <div class="volume">\n                    <span class="icon-volume"></span>\n                    <div class="volume-prgress">\n                        <div class="current" g-style="volumeStyle"></div>\n                    </div>\n                </div>\n                <div class="time">\n                    <time class="total">{{ time.total }}</time><time class="durtion">{{ time.durtion }}</time>\n                </div>\n                <div class="progress-bar">\n                    <div class="current" g-style="progressStyle"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <input type="checkbox" id="listSwitch"/>\n    <section class="list">\n        <ul>\n            <li>\n                <img g-src="cover" g-alt="title">\n                <span class="info">\n                    <span class="title">{{ title }}</span>\n                    <span class="singer">{{ singer }}</span>\n                </span>\n                <span class="icon-delete"></span>\n            </li>\n            <li>\n                <img g-src="cover" g-alt="title">\n                <span class="info">\n                    <span class="title">{{ title }}</span>\n                    <span class="singer">{{ singer }}</span>\n                </span>\n                <span class="icon-delete"></span>\n            </li>\n            <li>\n                <img g-src="cover" g-alt="title">\n                <span class="info">\n                    <span class="title">{{ title }}</span>\n                    <span class="singer">{{ singer }}</span>\n                </span>\n                <span class="icon-delete"></span>\n            </li>\n        </ul>\n    </section>\n</figure>',l=function e(t){var n=this;r(this,e),this.parent=t="string"==typeof t?document.querySelector(t):t,this.parent.innerHTML=s,this.vm=new o.default({el:"figure.player-wrap",data:{title:"歌曲名",singer:"歌手",album:"专辑",cover:"https://ww4.sinaimg.cn/large/006tNc79gy1fdk3zs7r9nj308c08cdi7.jpg",time:{total:236,durtion:23},progressStyle:"width: 50%"}}),window.vm=this.vm;var i=void 0;i="https://node.geeku.net/music",fetch(i).then(function(e){return e.json()}).then(function(e){var t=e[1];console.log(t),n.vm.data.title=t.title,n.vm.data.singer=t.singer,n.vm.data.cover=t.albumBig})};t.default=l},329:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(){i(this,e),this.changeMethods={}}return a(e,[{key:"onChange",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.changeMethods[e]=t}},{key:"callChangeMethods",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e in this.changeMethods&&this.changeMethods[e](t)}},{key:"bubbling",value:function(e,t){var n=this,i=e.slice(0,e.length-1).split("."),r=i.length;if(this.callChangeMethods(e,t),r){i.forEach(function(e){n.callChangeMethods(e,t)});for(var a=i.length-1;a>=2;a--){var o=i.slice(0,a);this.callChangeMethods(o.join("."),t)}}}}]),e}(),s=function(){function e(t,n){i(this,e),this.originalData=this.data=t,this.publisher=n,this.handler=new o,this.observe(this.originalData)}return a(e,[{key:"observe",value:function(e){this.checkData(e)}},{key:"checkData",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"object"===("undefined"==typeof e?"undefined":r(e))&&Object.keys(e).forEach(function(i){t.initProperty(e,i,e[i],n)})}},{key:"initProperty",value:function(e,t,n,i){var r=this;i+=t+".",this.checkData(n,i),Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get:function(){return n},set:function(e){e!==n&&(r.checkData(e,parent),r.handler.bubbling(i,e),n=e,console.log(n,e),r.publisher.update(i))}})}},{key:"$watch",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.handler.onChange(e,t)}}]),e}();t.default=s},330:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function e(){i(this,e),this.subscribers=[]}return r(e,[{key:"add",value:function(e){this.subscribers.push(e)}},{key:"update",value:function(e){this.subscribers.forEach(function(t){t.update(e)})}}]),e}();t.default=a},331:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(329),s=i(o),l=n(332),c=i(l),p=n(330),u=i(p),f={element:1,text:3,comment:8},d=/({{(.*?)}})/,h=/g-(.*?)/,m=function(){function e(t){r(this,e),this.data=t.data,this.el="string"==typeof t.el?document.querySelector(t.el):t.el,this.publisher=new u.default,this.observer=new s.default(this.data,this.publisher),this.parseHTML(this.el)}return a(e,[{key:"parseHTML",value:function(e){for(var t=document.createDocumentFragment(),n=(e.children.length,null);n=e.firstChild;)t.appendChild(n),this.parseNode(n);this.el.appendChild(t)}},{key:"parseNode",value:function(e){var t=this,n="";if(e.nodeType===f.element){Array.from(e.attributes).forEach(function(n){var i=n.name,r=n.nodeValue;h.test(i)&&new c.default({node:e,type:c.default.TYPE.BIND,name:r,context:t,attrName:i})});var i=Array.from(e.children);i.length?i.forEach(function(e){t.parseNode(e)}):(n=e.innerText,d.test(n)&&new c.default({node:e,type:c.default.TYPE.NODE,context:this}))}e.nodeType===f.text&&(n=e.nodeValue,d.test(n)&&new c.default({node:e,type:c.default.TYPE.TEXT,context:this}))}},{key:"$watch",value:function(e,t){this.observer.$watch(e,t)}}]),e}();t.default=m},332:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=/({{(.*?)}})/g,o=function(){function e(t){i(this,e),this.node=t.node||this.error("Node is required"),this.context=t.context||this.error("Context is required"),this.data=this.context.data,this.publisher=this.context.publisher,this.type=t.type||e.TYPE.NODE,this.type===e.TYPE.BIND&&(this.attrName=t.attrName||this.error("Attribute Name is missing"),this.name=t.name||this.error("Attribute Value is missing")),this.curVal=[],this.init(),this.publisher.add(this)}return r(e,[{key:"error",value:function(e){throw new Error(e)}},{key:"init",value:function(){var t=this;if(this.type===e.TYPE.NODE||this.type===e.TYPE.TEXT){this.name=[],this.originalText=this.type===e.TYPE.NODE?this.node.innerText:this.node.nodeValue;var n=this.originalText.match(a);n&&n.length&&n.forEach(function(e){e.match(a);var n=RegExp.$1.trim(),i=RegExp.$2.trim();t.curVal[i]=n,t.name.push(i)})}this.update("init")}},{key:"update",value:function(e){(e&&this.name.indexOf(e.slice(0,-1))>=0||"init"===e)&&this.render()}},{key:"render",value:function(){switch(this.type){case e.TYPE.TEXT:this.node.nodeValue=this.replaceContent(this.originalText);break;case e.TYPE.NODE:this.node.innerText=this.replaceContent(this.originalText);break;case e.TYPE.BIND:this.node.removeAttribute(this.attrName),this.node.setAttribute(this.attrName.replace("g-",""),this.getData(this.name))}}},{key:"replaceContent",value:function(e){var t=this,n=e;return this.name.forEach(function(e){var i=t.getData(e);t.originalText=n=n.replace(t.curVal[e],i),t.curVal[e]=i,console.log(e,i)}),n}},{key:"getData",value:function(e){var t=this;try{var n=e.trim().split(".");return 1===n.length?this.data[n[0]]:n.reduce(function(e,n){return t.data[e][n]})}catch(e){return""}}}]),e}();o.TYPE={TEXT:"text",NODE:"node",BIND:"bind"},t.default=o},348:function(e,t,n){t=e.exports=n(318)(),t.i(n(352),""),t.push([e.i,'.player-wrap{display:inline-flex;position:relative;flex-wrap:wrap;flex-direction:column;align-items:center;font-size:.12rem;color:#295a8e;line-height:1}.player-wrap *{box-sizing:border-box}.player-wrap .player{display:inline-flex;flex-direction:row;box-shadow:1px 1px 5px 1px rgba(46,120,231,.16);border-radius:.03rem;overflow:hidden}.player-wrap .info{display:inline-block;color:#a6c3d4}.player-wrap .cover,.player-wrap .cover img{height:1rem;width:1rem}.player-wrap figcaption{padding:0 .1rem;padding-top:.1rem;white-space:nowrap;text-overflow:ellipsis;width:80%;overflow:hidden}.player-wrap .control{padding:0 .1rem}.player-wrap .control [class*=icon]{font-size:.16rem;margin:0 .08rem}.player-wrap .control [class*=icon]:first-child{margin-left:0}.player-wrap .control .icon-like{position:absolute;right:.1rem;top:.1rem;margin:0}.player-wrap .control .icon-like.liked,.player-wrap .control .icon-like:hover{color:#e85543}.player-wrap h3{margin:0;font-size:.16rem;display:inline-block}.player-wrap .content{display:flex;flex-direction:column;width:2rem;height:1rem;justify-content:space-between;min-width:3rem;background:#fff;position:relative}.player-wrap .progress{display:flex;justify-content:space-between;flex-wrap:wrap}.player-wrap .progress-bar{height:.02rem;width:100%;background:#a6c3d4;margin-top:.05rem}.player-wrap .progress-bar .current{width:20%;height:100%;background:#2e87e7}.player-wrap .volume{padding:0 .1rem;display:flex;align-items:center}.player-wrap .volume-prgress{height:.02rem;width:.5rem;background:#a6c3d4;margin:.05rem}.player-wrap .volume-prgress .current{width:20%;height:100%;background:#2e87e7}.player-wrap .time{padding:0 .1rem;color:#a6c3d4;transform:scale(.8)}.player-wrap .total:after{content:"/";margin:0 .05rem}.player-wrap .list{width:90%;max-height:3rem;overflow-y:auto;border:.01rem solid #e7f1f7;border-top:.03rem solid rgba(46,120,231,.16);border-radius:0 0 .03rem .03rem;transform:scaleY(0);transform-origin:top center;transition:transform .1s ease-in-out}.player-wrap ul{padding:0;margin:0;list-style:none;padding:.1rem 0}.player-wrap li{display:flex;align-items:center;border-bottom:.01rem solid #e7f1f7}.player-wrap li:hover{background:#e7f1f7}.player-wrap li img{width:.3rem;height:.3rem}.player-wrap li .info{margin:0 .1rem;flex:1;white-space:nowrap;text-overflow:ellipsis;width:80%;overflow:hidden}.player-wrap li .info .title{color:#295a8e}.player-wrap li .icon-delete{width:.25rem;line-height:.25rem}.player-wrap li:first-child{border-top:.01rem solid #e7f1f7}.player-wrap #listSwitch{display:none}.player-wrap #listSwitch:checked+.list{transform:scaleY(1)}.player-wrap [class*=icon]{line-height:1;font-size:.12rem;cursor:pointer;color:#a6c3d4}.player-wrap [class*=icon]:hover{color:#2e87e7}',""])},352:function(e,t,n){t=e.exports=n(318)(),t.push([e.i,"@font-face{font-family:icomoon;src:url("+n(324)+");src:url("+n(324)+'#iefix) format("embedded-opentype"),url('+n(365)+') format("truetype"),url('+n(366)+') format("woff"),url('+n(367)+'#icomoon) format("svg");font-weight:400;font-style:normal}[class*=" icon-"],[class^=icon-]{font-family:icomoon!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-pc:before{content:"\\E956"}.icon-delete:before{content:"\\E9AC"}.icon-list:before{content:"\\E9BA"}.icon-lyric:before{content:"\\E9BD"}.icon-link:before{content:"\\E9CB"}.icon-like:before{content:"\\E9DA"}.icon-play:before{content:"\\EA1C"}.icon-pause:before{content:"\\EA1D"}.icon-backward:before{content:"\\EA1F"}.icon-forward:before{content:"\\EA20"}.icon-volume:before{content:"\\EA27"}.icon-volume-mute:before{content:"\\EA2A"}.icon-loop:before{content:"\\EA2D"}.icon-shuffle:before{content:"\\EA30"}.icon-share:before{content:"\\1F32B"}',""])},361:function(e,t,n){var i=n(348);"string"==typeof i&&(i=[[e.i,i,""]]);n(319)(i,{});i.locals&&(e.exports=i.locals)},365:function(e,t,n){e.exports=n.p+"814ee47a7bfa61193af15d0ceea56807.ttf"},366:function(e,t,n){e.exports=n.p+"1070c58cc710edcca465a8465b35ae2a.woff"},367:function(e,t,n){e.exports=n.p+"static/icomoon.svg"},376:function(e,t){e.exports="<div class=player> </div>"}});
//# sourceMappingURL=0.index.js.map