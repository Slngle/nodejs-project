!function(a,b){function c(a,b){function c(){s||(s=!0,m=a.querySelector("canvas"),n=m.getContext("2d"),q=.13373158940994154,r=.06015722128359704);var b=m.getBoundingClientRect();(m.width!==b.width*t||m.height!==b.height*t)&&(m.width=b.width*t,m.height=b.height*t,o=b.width/2,p=o/15)}function e(a){"draw"===w&&(c(),v.style.display="none",u.style.display="block",a>100&&(a=100),n.clearRect(0,0,m.width*t,m.height*t),n.beginPath(),n.arc(o*t,o*t,(o-p)*t,-q-Math.PI/2,-q-Math.PI/2-r*a,!0),n.lineWidth=p*t,n.strokeStyle="#999",n.stroke(),n.closePath())}function h(){"spin"===w&&(v.style.display="block",u.style.display="none")}function i(){var b=a.querySelector(".arrow");return b.style.cssText="display: block",d.resolve()}function j(){var b=a.querySelector(".arrow");return b.style[f+"Transform"]="scale(1)",b.style.opacity="1",new lib.animation(400,lib.cubicbezier.easeIn,function(a,c){b.style[f+"Transform"]="scale("+(1-.5*c)+")",b.style.opacity=1-c+""}).play().then(function(){b.style.cssText="display:none"})}var k=Date.now()+"-"+ ++g,l=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(b=arguments[0],a=null),a||(a=document.createElement("div"),l.appendChild(a)),b=b||{},a.setAttribute("data-ctrl-name","loading"),a.setAttribute("data-ctrl-id",k),a.innerHTML='<div rol="draw"><canvas></canvas><span class="arrow"></span></div><div rol="spin"><div class="circle"><span></span></div></div><span class="text"></span>';var m,n,o,p,q,r,s=!1,t=2,u=a.querySelector('[rol="draw"]'),v=a.querySelector('[rol="spin"]');Object.defineProperty(this,"bgcolor",{get:function(){return a.style.backgroundColor},set:function(b){if("string"!=typeof b)throw new Error("Non expected value");a.querySelector('[rol="spin"] span').style.backgroundColor=b,a.style.backgroundColor=b}}),Object.defineProperty(this,"text",{get:function(){return a.querySelector(".text").textContent},set:function(b){if("string"!=typeof b)throw new Error("Non expected value");var c=a.querySelector("div"),d=a.querySelector(".text");b?(a.style[f+"BoxPack"]="",c.style.marginLeft="",d.style.display="block",d.textContent=b):(a.style[f+"BoxPack"]="center",c.style.marginLeft="0",d.style.display="none",d.textContent="")}});var w="";Object.defineProperty(this,"mode",{get:function(){return w},set:function(a){if(!a&&"string"!=typeof a&&["draw","spin"].indexOf(a)<0)throw new Error("Non expected value");w=a,"spin"===w?y?j().then(h):h():"draw"===w&&i().then(function(){e(0)})}});var x=0;Object.defineProperty(this,"per",{get:function(){return x},set:function(a){if("draw"!==w)throw new Error('only work under "draw" mode');if(!a&&"number"!=typeof a&&0>a&&a>100)throw new Error("Non expected value");e(a)}});var y="";Object.defineProperty(this,"arrowDirection",{get:function(){return y},set:function(b){if(!b&&"string"!=typeof b&&["up","down",""].indexOf(b)<0)throw new Error("Non expected value");y=b,a.querySelector(".arrow").className="arrow "+b}}),this.remove=function(){a.parentNode&&a.parentNode.removeChild(a)},this.element=a,this.root=l}var d=a.Promise,e=a.navigator.userAgent.match(/IEMobile\/([\d\.]+)/),f=e?"ms":"webkit",g=0;b.loading=function(a){return new c(a)}}(window,window.ctrl||(window.ctrl={}));