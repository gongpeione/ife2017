webpackJsonp([12,14],{121:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}function r(e){arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];e="string"==typeof e?u.g.$(e):e,e.innerHTML=l.default,c(i)}function i(){var e=window.THREE,n=new e.WebGLRenderer({canvas:u.g.$("#mainCanvas"),antialias:!0});n.setClearColor(13421772),n.shadowMapEnabled=!0;var t=window.scene=new e.Scene,a=new THREE.PerspectiveCamera(30,4/3,1,1e3);a.position.set(60,70,60),t.add(a),a.lookAt(new e.Vector3(-50,0,-50));var o=new e.MeshLambertMaterial({color:13421772}),r=new e.PlaneGeometry(260,260),i=new e.Mesh(r,new e.MeshLambertMaterial({color:4473924}));t.add(i),i.rotation.x=80,i.position.set(-50,5,-50),i.receiveShadow=!0;var c=new e.Mesh(new e.CubeGeometry(40,20,20),o);t.add(c),c.position.set(-10,30,0),c.castShadow=!0;var d=s();d.forEach(function(e){t.add(e)});var l=new THREE.PointLight(16777215);l.position.set(100,100,50),t.add(l),l.castShadow=!0;var p=new THREE.DirectionalLight(16777215,.6);p.position.set(0,100,200),t.add(p),p.castShadow=!0,n.render(t,a)}function s(){for(var e=new THREE.MeshLambertMaterial({color:13421772}),n=new THREE.TorusGeometry(5,2,20,20),t=[],a=[[0,20,10],[-20,20,10],[0,20,-10],[-20,20,-10]],r=0;r<4;r++){var i,s=new THREE.Mesh(n,e);(i=s.position).set.apply(i,o(a[r])),s.castShadow=!0,t.push(s)}return t}function c(e){var n=document.createElement("script");n.src="//cdn.bootcss.com/three.js/r83/three.min.js",n.async=!0,n.addEventListener("load",function(){e()}),document.body.appendChild(n)}Object.defineProperty(n,"__esModule",{value:!0}),n.create=r;var d=t(365),l=a(d),u=t(59);t(350)},338:function(e,n,t){n=e.exports=t(317)(),n.push([e.i,"#mainCanvas{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}",""])},350:function(e,n,t){var a=t(338);"string"==typeof a&&(a=[[e.i,a,""]]);t(318)(a,{});a.locals&&(e.exports=a.locals)},365:function(e,n){e.exports=" <canvas id=mainCanvas width=800px height=600px></canvas>"}});
//# sourceMappingURL=12.index.js.map