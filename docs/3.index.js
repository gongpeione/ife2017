webpackJsonp([3,15],{123:function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function i(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?r.g.$(e):e,e.innerHTML=s.default;var t=r.g.$(".contentMenu",e);new c.default(t,u)}Object.defineProperty(t,"__esModule",{value:!0}),t.create=i;var r=n(59),a=n(374),s=o(a),l=n(326),c=o(l);n(359);var u={class:"context-menu",items:[{type:"link",title:"百度",content:"https://www.baidu.com",target:"_blank"},{type:"separator"},{type:"function",title:"Alert",content:function(){return alert(1)}},{type:"link",title:"Disabled",disabled:!0},{type:"text",title:"Plain Text",class:"plain"}]}},326:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(59);n(358);var a=function(){function e(t){var n=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,e),this.parent="string"==typeof t?r.g.$(t):t,this.options=i,this.isHidden=!0,this.type=["separator","link","function","text"],this.menu=this.render(),this.parent.appendChild(this.menu),this.parent.addEventListener("contextmenu",function(e){n.show();var t=n._getXY(e);return n.setPosition(t.x,t.y),e.preventDefault(),!1}),document.addEventListener("click",function(e){e.target!==n.menu&&n.hide()}),document.addEventListener("contextmenu",function(e){e.target!==n.menu&&e.target!==n.parent&&n.hide()})}return i(e,[{key:"render",value:function(){var e=this,t=[];this.options.items.forEach(function(n){if(!(e.type.indexOf(n.type)<0))switch(n.type){case"separator":t.push(e.separator(n));break;case"link":t.push(e.link(n));break;case"function":t.push(e.function(n));break;case"text":t.push(e.text(n));break;default:return}});var n="g-contextMenu "+(this.options.class||"");return new r.g.vdom("ul",{class:n},t).render()}},{key:"separator",value:function(e){return new r.g.vdom("li",{class:"separator"})}},{key:"link",value:function(e){var t=new r.g.vdom("a",{href:e.content||"",target:e.target?e.target:"_blank"},[e.title]),n=new r.g.vdom("li",{class:"link"+(e.disabled?" disabled":"")},[t]);return e.disabled&&n.addEvent("click",function(e){return e.preventDefault(),!1}),n}},{key:"function",value:function(e){var t=new r.g.vdom("li",{class:"function"+(e.disabled?" disabled":"")},[e.title]);return e.disabled||t.addEvent("click",function(t){e.content(t)}),t}},{key:"text",value:function(e){return new r.g.vdom("li",{class:"text"+(e.disabled?" disabled":"")},[e.title])}},{key:"show",value:function(){r.g.class(this.menu,"hide",!0),r.g.class(this.menu,"show")}},{key:"hide",value:function(){r.g.class(this.menu,"show",!0),r.g.class(this.menu,"hide")}},{key:"setPosition",value:function(e,t){r.g.css(this.menu,"left:"+e+"px; top:"+t+"px")}},{key:"_getXY",value:function(e){var t=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.scrollLeft||document.body.scrollLeft,o=r.g.width(document.body),i=r.g.height(document.body),a=r.g.width(this.menu),s=r.g.height(this.menu),l=e.clientX+n,c=e.clientY+t;return o-l<a&&(l-=a),i-c<s&&(c-=s),{x:l,y:c}}}]),e}();t.default=a},345:function(e,t,n){t=e.exports=n(318)(),t.push([e.i,".g-contextMenu{background:#fff;display:none;border-radius:3px;margin:0;padding:5px 0;list-style:none;min-width:200px;position:fixed;border:1px solid #ccc;box-shadow:1px 1px 2px rgba(0,0,0,.2)}.g-contextMenu.show{display:inline-block}.g-contextMenu.hide{display:none}.g-contextMenu li{padding:5px 10px;color:#333}.g-contextMenu li:hover{background:#eee}.g-contextMenu li.separator{border-bottom:1px solid #eee;padding:0;margin:5px 0}.g-contextMenu li.separator:hover{background:transparent}.g-contextMenu li.disabled{color:#999;cursor:not-allowed}.g-contextMenu li.disabled:hover{background:transparent}.g-contextMenu li.disabled a{color:#999;cursor:not-allowed}.g-contextMenu a{color:#333;text-decoration:none;display:block}",""])},346:function(e,t,n){t=e.exports=n(318)(),t.push([e.i,'.contentMenu{width:100%;height:200px;background:#eee;border-radius:3px;position:absolute;top:50%;margin:-100px 0 0}.contentMenu:before{content:"\\8FD9\\91CC\\662F\\53F3\\952E\\83DC\\5355\\533A\\57DF";font-size:20px;color:#999;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}',""])},358:function(e,t,n){var o=n(345);"string"==typeof o&&(o=[[e.i,o,""]]);n(319)(o,{});o.locals&&(e.exports=o.locals)},359:function(e,t,n){var o=n(346);"string"==typeof o&&(o=[[e.i,o,""]]);n(319)(o,{});o.locals&&(e.exports=o.locals)},374:function(e,t){e.exports="<div class=contentMenu></div>"}});
//# sourceMappingURL=3.index.js.map