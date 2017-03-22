webpackJsonp([0,15],{127:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?s.g.$(e):e,e.innerHTML=o.default,new c.default(e,!0)}Object.defineProperty(t,"__esModule",{value:!0}),t.create=r;var a=n(378),o=i(a),s=n(59);n(363);var l=n(330),c=i(l)},324:function(e,t,n){e.exports=n.p+"f0122547efbcc6600c978835e2f8c808.eot"},330:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(333),s=i(o),l='\n<figure class="player-wrap">\n    <div class="player">\n        <div class="cover">\n            <img g-src="cover" g-alt="title"><canvas id="freq" width="500" height="200"></canvas>\n            <div class="loading" g-style="loadingStyle"></div>\n        </div>\n        <div class="content">\n            <figcaption g-title="title">\n                <h3>{{ title }}</h3>\n                <div class="info">\n                    <span class="singer">{{ singer }}</span>\n                    <!--<span class="album">{{ album }}</span>-->\n                </div>\n            </figcaption>\n            \n            <div class="control">\n                <span id="previous" class="icon-backward"></span>\n                <span id="play" g-class="playOrPauseIcon"></span>\n                <span id="next" class="icon-forward"></span>\n                <span id="loop" g-class="loopIcon"></span>\n                <!--<label class="icon-list" for="listSwitch"></label>-->\n                <span class="icon-like"></span>\n            </div>\n            <div class="progress">\n                <div class="volume">\n                    <span g-class="volumeIcon"></span>\n                    <div class="volume-progress">\n                        <div class="current" g-style="volumeStyle"></div>\n                    </div>\n                </div>\n                <div class="time">\n                    <time class="current">{{ time.current }}</time><time class="duration">{{ time.duration }}</time>\n                </div>\n                <div class="progress-bar">\n                    <div class="current" g-style="progressStyle"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <input type="checkbox" id="listSwitch"/>\n    <section class="list">\n        <ul>\n            <li>\n                <img g-src="cover" g-alt="title">\n                <span class="info">\n                    <span class="title">{{ title }}</span>\n                    <span class="singer">{{ singer }}</span>\n                </span>\n                <span class="icon-delete"></span>\n            </li>\n            <li>\n                <img g-src="cover" g-alt="title">\n                <span class="info">\n                    <span class="title">{{ title }}</span>\n                    <span class="singer">{{ singer }}</span>\n                </span>\n                <span class="icon-delete"></span>\n            </li>\n            <li>\n                <img g-src="cover" g-alt="title">\n                <span class="info">\n                    <span class="title">{{ title }}</span>\n                    <span class="singer">{{ singer }}</span>\n                </span>\n                <span class="icon-delete"></span>\n            </li>\n        </ul>\n    </section>\n</figure>',c=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];r(this,e),this.parent=t="string"==typeof t?document.querySelector(t):t,this.parent.innerHTML=l,this._currentPlayList=0,this._duration=0,this._current=0,this._volume=1,this.isLoading=!0,this.enableFreq=n,this.init()}return a(e,[{key:"init",value:function(){var e=this;this.audio=new Audio,this.audio.crossOrigin="anonymous",this.audio.addEventListener("timeupdate",function(t){e.current=e.audio.currentTime}),this.audio.addEventListener("loadedmetadata",function(t){e.duration=e.audio.duration}),this.audio.addEventListener("ended",function(){e.next()}),this.parent.appendChild(this.audio);var t=this;this.vm=new s.default({el:"figure.player-wrap",data:{title:"歌曲名",singer:"歌手",cover:"https://ww4.sinaimg.cn/large/006tNc79gy1fdk3zs7r9nj308c08cdi7.jpg",time:{duration:"00:00",current:"00:00"},progress:0,playOrPause:"pause",isPlaying:!0,loop:"loop",volumeIcon:"icon-volume"},events:{click:{"#play":function(e){this.data.isPlaying?t.pause():t.play()},"#next":function(e){t.next()},"#previous":function(e){t.previous()},"#loop":function(e){this.data.loop="loop"===this.data.loop?"shuffle":"loop"},".volume-progress":function(e){var n=e.target.getBoundingClientRect(),i=(e.clientX,0),r=e.clientX-n.left;i=r<=0?0:r>=n.width?1:r/n.width,t.volume=i,this.publisher.update("volumeStyle")}}},watch:{isPlaying:function(){this.data.isPlaying?this.data.playOrPause="pause":this.data.playOrPause="play"}},computed:{loopIcon:function(){return"icon-"+this.data.loop},playOrPauseIcon:function(){return"icon-"+this.data.playOrPause},progressStyle:function(){return"width: "+this.data.progress+"%"},volumeStyle:function(){return"width: "+100*t.volume+"%"},loadingStyle:function(){if(!t.isLoading)return"display: none"}}}),window.GPlayerVM=this.vm,this.data=this.vm.data,this.fetch(),this.keybordCtrl(),this.enableFreq&&this.freq()}},{key:"keybordCtrl",value:function(){var e=this;window.addEventListener("keyup",function(t){switch(t.keyCode){case 38:e.volume+=.1;break;case 40:e.volume-=.1;break;case 37:e.previous();break;case 39:e.next();break;case 32:e.data.isPlaying?e.pause():e.play()}})}},{key:"fetch",value:function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=this,t=void 0;t="https://node.geeku.net/music",fetch(t).then(function(e){return e.json()}).then(function(t){e.playlist=t;var n=t[e.currentPlayList];e.vm.data.title=n.title,e.vm.data.singer=n.singer,e.vm.data.cover=n.albumBig,e.audio.setAttribute("src",n.original),e.play(),e.isLoading=!1,e.vm.publisher.update("loadingStyle")})})},{key:"randomList",value:function(){return Math.ceil(Math.random()*this.playlist.length)}},{key:"play",value:function(){this.audio.play(),this.data.isPlaying=!0}},{key:"pause",value:function(){this.audio.pause(),this.data.isPlaying=!1}},{key:"next",value:function(){"loop"===this.data.loop?this.currentPlayList+=1:this.currentPlayList=this.randomList()}},{key:"previous",value:function(){"loop"===this.data.loop?this.currentPlayList-=1:this.currentPlayList=this.randomList()}},{key:"secToTime",value:function(e){e=~~e;var t=~~(e/60),n=e%60;return(t>=10?t:"0"+t)+":"+(n>=10?n:"0"+n)}},{key:"freq",value:function(){function e(){t.analyser.getByteFrequencyData(t.frequencyData);var r=t.analyser.fftSize/3,a=n.width/r;i.clearRect(0,0,n.width,n.height);for(var o=0;o<r;o+=20)i.fillRect(o*a,n.height-t.frequencyData[o],15*a,t.frequencyData[o]);requestAnimationFrame(e)}this.audioContext=new AudioContext,this.analyser=this.audioContext.createAnalyser(),this.source=this.audioContext.createMediaElementSource(this.audio),this.source.connect(this.analyser),this.analyser.connect(this.audioContext.destination),this.frequencyData=new Uint8Array(this.analyser.frequencyBinCount);var t=this,n=document.querySelector("#freq"),i=n.getContext("2d");i.fillStyle="#2e87e7",e()}},{key:"currentPlayList",set:function(e){e<0&&(e=0),e>this.playlist.length-1&&(e=this.playlist.length-1),this._currentPlayList=e,this.pause();var t=this.playlist[this.currentPlayList];this.vm.data.title=t.title,this.vm.data.singer=t.singer,this.vm.data.cover=t.albumBig,this.audio.setAttribute("src",t.original),this.play()},get:function(){return this._currentPlayList}},{key:"duration",get:function(){return this._duration},set:function(e){this._duration=e,this.data.time.duration=this.secToTime(this.duration)}},{key:"current",get:function(){return this._current},set:function(e){this._current=e,this.data.time.current=this.secToTime(this.current),this.data.progress=this.current/this.duration*100}},{key:"volume",get:function(){return this._volume},set:function(e){e>=.99&&(e=1),e<=.01?(e=0,this.data.volumeIcon="icon-volume-mute"):this.data.volumeIcon="icon-volume",this._volume=e,this.audio.volume=this.volume,this.vm.publisher.update("volumeStyle")}}]),e}();t.default=c},331:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=function(){function e(){i(this,e),this.changeMethods={}}return a(e,[{key:"onChange",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.changeMethods[e]=t}},{key:"callChangeMethods",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";e in this.changeMethods&&this.changeMethods[e](t)}},{key:"bubbling",value:function(e,t){var n=this,i=e.slice(0,e.length-1).split("."),r=i.length;if(this.callChangeMethods(e,t),r){i.forEach(function(e){n.callChangeMethods(e,t)});for(var a=i.length-1;a>=2;a--){var o=i.slice(0,a);this.callChangeMethods(o.join("."),t)}}}}]),e}(),s=function(){function e(t,n){i(this,e),this.originalData=this.data=t,this.publisher=n,this.handler=new o,this.observe(this.originalData)}return a(e,[{key:"observe",value:function(e){this.checkData(e)}},{key:"checkData",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";"object"===("undefined"==typeof e?"undefined":r(e))&&Object.keys(e).forEach(function(i){t.initProperty(e,i,e[i],n)})}},{key:"initProperty",value:function(e,t,n,i){var r=this;i+=t+".",this.checkData(n,i);var a=Object.getOwnPropertyDescriptor(e,t);a.configurable!==!1&&Object.defineProperty(e,t,{enumerable:!0,configurable:!1,get:function(){return n},set:function(e){e!==n&&(n=e,r.checkData(e,parent),r.handler.bubbling(i,e),r.publisher.update(i))}})}},{key:"$watch",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};this.handler.onChange(e,t)}}]),e}();t.default=s},332:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=function(){function e(){i(this,e),this.subscribers=[]}return r(e,[{key:"add",value:function(e){this.subscribers.push(e)}},{key:"update",value:function(e){this.subscribers.forEach(function(t){t.update(e)})}}]),e}();t.default=a},333:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(331),s=i(o),l=n(334),c=i(l),u=n(332),h=i(u),p={element:1,text:3,comment:8},d=/({{(.*?)}})/,f=/g-(.*?)/,y=function(){function e(t){r(this,e),this.data=t.data,this.el="string"==typeof t.el?document.querySelector(t.el):t.el,this.publisher=new h.default,this.computedList=t.computed,this.computed(),this.observer=new s.default(this.data,this.publisher),this.events=t.events,this.watchList=t.watch,this.parseHTML(this.el),this.addEvents(this.el),this.watch()}return a(e,[{key:"computed",value:function(){var e=this,t=this;Object.keys(this.computedList).forEach(function(n){Object.defineProperty(e.data,n,{enumerable:!0,configurable:!1,get:function(){return t.computedList[n].apply(t)}})})}},{key:"watch",value:function(){var e=this;Object.keys(this.watchList).forEach(function(t){e.$watch(t,e.watchList[t])})}},{key:"addEvents",value:function(e){var t=this;Object.keys(this.events).forEach(function(n){Object.keys(t.events[n]).forEach(function(i){e.querySelectorAll(i).forEach(function(e){e.addEventListener(n,t.events[n][i].bind(t))})})})}},{key:"parseHTML",value:function(e){for(var t=document.createDocumentFragment(),n=(e.children.length,null);n=e.firstChild;)t.appendChild(n),this.parseNode(n);this.el.appendChild(t)}},{key:"parseNode",value:function(e){var t=this,n="";if(e.nodeType===p.element){Array.from(e.attributes).forEach(function(n){var i=n.name,r=n.nodeValue;f.test(i)&&("for"===RegExp.$1||new c.default({node:e,type:c.default.TYPE.BIND,name:r,context:t,attrName:i}))});var i=Array.from(e.children);i.length?i.forEach(function(e){t.parseNode(e)}):(n=e.innerText,d.test(n)&&new c.default({node:e,type:c.default.TYPE.NODE,context:this}))}e.nodeType===p.text&&(n=e.nodeValue,d.test(n)&&new c.default({node:e,type:c.default.TYPE.TEXT,context:this}))}},{key:"$watch",value:function(e,t){this.observer.$watch(e,t.bind(this))}}]),e}();t.default=y},334:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=/({{(.*?)}})/g,o=function(){function e(t){i(this,e),this.node=t.node||this.error("Node is required"),this.context=t.context||this.error("Context is required"),this.data=this.context.data,this.publisher=this.context.publisher,this.type=t.type||e.TYPE.NODE,this.type===e.TYPE.BIND&&(this.attrName=t.attrName||this.error("Attribute Name is missing"),this.name=t.name||this.error("Attribute Value is missing")),this.curVal=[],this.init(),this.publisher.add(this)}return r(e,[{key:"error",value:function(e){throw new Error(e)}},{key:"init",value:function(){var t=this;if(this.type===e.TYPE.NODE||this.type===e.TYPE.TEXT){this.name=[],this.originalText=this.type===e.TYPE.NODE?this.node.innerText:this.node.nodeValue;var n=this.originalText.match(a);n&&n.length&&n.forEach(function(e){e.match(a);var n=RegExp.$1.trim(),i=RegExp.$2.trim();t.curVal[i]=n,t.name.push(i)})}this.update("init")}},{key:"update",value:function(e){(e&&this.name.indexOf(e.slice(0,-1))>=0||"init"===e)&&this.render()}},{key:"render",value:function(){switch(this.type){case e.TYPE.TEXT:this.node.nodeValue=this.replaceContent(this.originalText);break;case e.TYPE.NODE:this.node.innerText=this.replaceContent(this.originalText);break;case e.TYPE.BIND:this.node.removeAttribute(this.attrName),this.node.setAttribute(this.attrName.replace("g-",""),this.getData(this.name))}}},{key:"replaceContent",value:function(e){var t=this,n=e;return this.name.forEach(function(e){var i=t.getData(e);t.originalText=n=n.replace(t.curVal[e],i),t.curVal[e]=i}),n}},{key:"getData",value:function(e){var t=this;try{var n=e.trim().split(".");return 1===n.length?this.data[n[0]]:n.reduce(function(e,n){return t.data[e][n]})}catch(e){return""}}}]),e}();o.TYPE={TEXT:"text",NODE:"node",BIND:"bind"},t.default=o},350:function(e,t,n){t=e.exports=n(318)(),t.i(n(354),""),t.push([e.i,'.player-wrap{display:inline-flex;position:relative;flex-wrap:wrap;flex-direction:column;align-items:center;font-size:.12rem;color:#295a8e;line-height:1;width:4rem}.player-wrap *{box-sizing:border-box}.player-wrap .player{display:inline-flex;flex-direction:row;box-shadow:1px 1px 5px 1px rgba(46,120,231,.16);border-radius:.03rem;overflow:hidden;width:100%}.player-wrap .info{display:inline-block;color:#a6c3d4;padding:.05rem 0;transform-origin:left center}.player-wrap .cover{position:relative;height:1.1rem}.player-wrap .cover img{height:1.1rem;width:1.1rem}.player-wrap .cover .loading{position:absolute;top:.1rem;left:.1rem;z-index:1;transform:scale(.4);transform-origin:left top}.player-wrap figcaption{padding:0 .1rem;padding-top:.1rem;display:flex;flex-direction:column;white-space:nowrap;text-overflow:ellipsis;width:80%;overflow:hidden}.player-wrap .control{padding:0 .1rem}.player-wrap .control [class*=icon]{font-size:.16rem;margin:0 .08rem}.player-wrap .control [class*=icon]:first-child{margin-left:0}.player-wrap .control .icon-like{position:absolute;right:.1rem;top:.1rem;margin:0}.player-wrap .control .icon-like.liked,.player-wrap .control .icon-like:hover{color:#e85543}.player-wrap h3{margin:0;font-size:.18rem;display:inline-block}.player-wrap .content{display:flex;flex-direction:column;width:2rem;height:1.1rem;justify-content:space-between;background:#fff;position:relative;flex:1}.player-wrap .progress{display:flex;justify-content:space-between;flex-wrap:wrap}.player-wrap .progress-bar{height:.02rem;width:100%;background:#a6c3d4;margin-top:.05rem}.player-wrap .progress-bar .current{width:20%;height:100%;background:#2e87e7}.player-wrap .volume{padding:0 .12rem;display:flex;align-items:center}.player-wrap .volume-progress{height:.02rem;width:.5rem;background:#a6c3d4;margin:.05rem}.player-wrap .volume-progress .current{width:20%;height:100%;background:#5ca1ec}.player-wrap .volume-progress:hover .current{background:#2e87e7}.player-wrap .time{padding:0 .04rem;color:#a6c3d4;transform:scale(.8)}.player-wrap .time .current:after{content:"/";margin:0 .05rem}.player-wrap .list{width:90%;max-height:3rem;overflow-y:auto;border:.01rem solid #e7f1f7;border-top:.03rem solid rgba(46,120,231,.16);border-radius:0 0 .03rem .03rem;transform:scaleY(0);transform-origin:top center;transition:transform .1s ease-in-out}.player-wrap ul{padding:0;margin:0;list-style:none;padding:.1rem 0}.player-wrap li{display:flex;align-items:center;border-bottom:.01rem solid #e7f1f7}.player-wrap li:hover{background:#e7f1f7}.player-wrap li img{width:.3rem;height:.3rem}.player-wrap li .info{margin:0 .1rem;flex:1;white-space:nowrap;text-overflow:ellipsis;width:80%;overflow:hidden}.player-wrap li .info .title{color:#295a8e}.player-wrap li .icon-delete{width:.25rem;line-height:.25rem}.player-wrap li:first-child{border-top:.01rem solid #e7f1f7}.player-wrap #listSwitch{display:none}.player-wrap #listSwitch:checked+.list{transform:scaleY(1)}.player-wrap [class*=icon]{line-height:1;font-size:.12rem;cursor:pointer;color:#a6c3d4}.player-wrap [class*=icon]:hover{color:#2e87e7}.player-wrap #freq{height:20%;position:absolute;bottom:0;width:100%;left:0;opacity:.8;pointer-events:none}',""])},354:function(e,t,n){t=e.exports=n(318)(),t.push([e.i,"@font-face{font-family:icomoon;src:url("+n(324)+");src:url("+n(324)+'#iefix) format("embedded-opentype"),url('+n(367)+') format("truetype"),url('+n(368)+') format("woff"),url('+n(369)+'#icomoon) format("svg");font-weight:400;font-style:normal}[class*=" icon-"],[class^=icon-]{font-family:icomoon!important;speak:none;font-style:normal;font-weight:400;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-pc:before{content:"\\E956"}.icon-delete:before{content:"\\E9AC"}.icon-list:before{content:"\\E9BA"}.icon-lyric:before{content:"\\E9BD"}.icon-link:before{content:"\\E9CB"}.icon-like:before{content:"\\E9DA"}.icon-play:before{content:"\\EA1C"}.icon-pause:before{content:"\\EA1D"}.icon-backward:before{content:"\\EA1F"}.icon-forward:before{content:"\\EA20"}.icon-volume:before{content:"\\EA27"}.icon-volume-mute:before{content:"\\EA2A"}.icon-loop:before{content:"\\EA2D"}.icon-shuffle:before{content:"\\EA30"}.icon-share:before{content:"\\1F32B"}',""])},363:function(e,t,n){var i=n(350);"string"==typeof i&&(i=[[e.i,i,""]]);n(319)(i,{});i.locals&&(e.exports=i.locals)},367:function(e,t,n){e.exports=n.p+"814ee47a7bfa61193af15d0ceea56807.ttf"},368:function(e,t,n){e.exports=n.p+"1070c58cc710edcca465a8465b35ae2a.woff"},369:function(e,t,n){e.exports=n.p+"static/icomoon.svg"},378:function(e,t){e.exports="<div class=player> </div>"}});
//# sourceMappingURL=0.index.js.map