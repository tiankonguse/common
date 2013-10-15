
UI={
	ajax:function(a){
		var b=a.xhr||UI.xmlHttp(),e,g;a.async=UI.isUndefined(a.async)?!0:a.async;b.onreadystatechange=function(){b&&(1==b.readyState?a.timeout&&a.fail&&(g=setTimeout(function(){e||(e=1,a.fail(),b.abort(),b=null)},a.timeout),a.timeout=0):2==b.readyState?a.send&&a.send():4==b.readyState&&!e&&(e=1,200==b.status?a.success&&a.success(b.responseText):a.fail&&a.fail(),clearTimeout(g),b=null))};if(UI.isObject(a.data)){var i=[],j;for(j in a.data)i.push(j+"="+encodeURIComponent(a.data[j]));a.data=i.join("&")}i=function(){a.refer&&b.setRequestHeader("rf",a.refer)};"get"==a.type?(b.open("GET",a.url+(a.url.hasString("?")?"&":"?")+(a.data||""),a.async),i(),b.send(null)):(b.open("POST",a.url,a.async),i(),b.setRequestHeader("Content-type","application/x-www-form-urlencoded"),b.send(a.data));return b},
		get:function(a,b,e){var g=UI.xmlHttp(),i=a.hasString("?")?"&":"?";g.onreadystatechange=function(){if(4==g.readyState&&200==g.status)try{e(g.responseText)}catch(a){}else return g};if(void 0!=b)if(UI.isObject(b)){var j=[],k;for(k in b)j.push(k+"="+encodeURIComponent(b[k]));a+=i+j.join("&")}else a+=i+b;g.open("GET",a,!0);g.send(null);return g},
		xmlHttp:function(){return window.ActiveXObject?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:window.XMLHttpRequest?function(){return new XMLHttpRequest}:function(){}}(),
		crossAsynJson:function(a,b,e,g){var i=UI.DC("script"),j=UI.GT(document,"head")[0];window[b]=function(a){window[b]=void 0;try{delete window[b]}catch(g){}e(a);j&&setTimeout(function(){j.removeChild(i)},5)};g&&UI.A(i,"charset",g);UI.A(i,"type","text/javascript");UI.A(i,"src",a);j.appendChild(i)},
		getScript:function(a,b,e){var g=UI.DC("script");UI.B.ie?g.onreadystatechange=function(){if("loaded"==this.readyState||"complete"==this.readyState)b&&b(),g=null}:g.onload=function(){b&&b();g=null};e&&UI.A(g,"charset",e);UI.A(g,"type","text/javascript");UI.A(g,"src",a);UI.A(g,"async","true");UI.GT(document,"head")[0].appendChild(g)},
		getCss:function(){var a=function(b,g){var i;try{for(var j=document.styleSheets,k,l,o=0,q=j.length;o<q;o++)if(l=j[o].ownerNode,l.href==b)if(UI.B.safari)k=l.sheet;else if(l.sheet)try{k=l.sheet.cssRules}catch(u){if(1E3==u.code||18==u.code)k=1}k?g():i=1}catch(y){i=1}i&&setTimeout(function(){a(b,g)},50)},b=50;return function(e,g,i){var j=i?i:UI.DC("link");g&&(UI.B.safari||UI.B.firefox?setTimeout(function(){a(e,g)},50):j.onload=function(){g()});i||(UI.A(j,"rel","stylesheet"),UI.A(j,"type","text/css"),UI.GT(document,"head")[0].appendChild(j));try{UI.A(j,"href",e)}catch(k){if(0<b){b--;var j=UI.GC("style"),l=j.length;1<l&&(UI.remove(j[l-1]),i||UI.remove(null),UI.getCss(e,g||null,i||null))}}}}(),
		evalScript:function(a){var b=this.regExp.script;(a=(a||"").match(RegExp(b,"img")))&&UI.each(a,function(a){eval(a.match(RegExp(b,"im"))[1])})},
		regExp:{script:"<script[^>]*>([\\S\\s]*?)<\/script>"},
		encode:function(a){return escape(UI.utfEncode(a))},
		decode:function(a){return UI.utfDecode(unescape(a))},
		utfEncode:function(a){for(var a=a.replace(/\r\n/g,"\n"),b="",e=0,g=a.length;e<g;e++){var i=a.charCodeAt(e);128>i?b+=String.fromCharCode(i):(127<i&&2048>i?b+=String.fromCharCode(i>>6|192):(b+=String.fromCharCode(i>>12|224),b+=String.fromCharCode(i>>6&63|128)),b+=String.fromCharCode(i&63|128))}return b},
		utfDecode:function(a){for(var b="",e=0,g=c1=c2=c3=0;e<a.length;)g=a.charCodeAt(e),128>g?(b+=String.fromCharCode(g),e++):191<g&&224>g?(c2=a.charCodeAt(e+1),b+=String.fromCharCode((g&31)<<6|c2&63),e+=2):(c2=a.charCodeAt(e+1),c3=a.charCodeAt(e+2),b+=String.fromCharCode((g&15)<<12|(c2&63)<<6|c3&63),e+=3);return b},
		parseUrl:function(a,b){var e=a?a:document.location.href,g={},b=b||"?";if(!e.hasString(b))return g;for(var e=e.split(b)[1].split("&"),i=0;i<e.length;i++){var j=e[i].replace(/#.*$/g,"").split("=");j[1]||(j[1]="");g[j[0]]=UI.B.ie?j[1]:UI.decode(j[1])}return g},
		cookie:function(a,b,e,g){if(void 0==b){a+="=";b=document.cookie.split(";");e=0;for(g=b.length;e<g;e++){for(var i=b[e];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(a))return decodeURIComponent(i.substring(a.length,i.length))}return null}i="";e&&(i=new Date,i.setTime(i.getTime()+864E5*e),i="; expires="+i.toGMTString());document.cookie=a+"="+b+i+"; path=/"+(g?";domain="+g:"")},
		drag:function(a,b,e){var g=document,e=void 0!=e?e:!0;UI.EA(a,"mousedown",function(i){b.start&&b.start(i);e&&(a.setCapture?a.setCapture():window.captureEvents&&window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP));b.drag&&(g.onmousemove=b.drag);g.onmouseup=function(){e&&(a.releaseCapture?a.releaseCapture():window.releaseEvents&&window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP));b.stop&&b.stop(i);g.onmousemove=null;g.onmouseup=null;b.call&&b.call(i)}})},
		animate:function(a,b,e,g,i,j){var i=i||0.4,k=b.hasString("scroll"),l="height,width,marginLeft,marginTop".hasString(b),o="opacity"==b,e=o?100*e:e,q,u=setInterval(function(){var j,s,r;j=l?a.style[b]:k?a[b]:UI.C(a,b);o?(j*=100,100<e&&(e=100)):k||(j="auto"==j?0:Number(j.slice(0,-2)));if(isNaN(e))clearInterval(u);else{if(3>=Math.abs(e-j)||k&&q==j)j=e,clearInterval(u);r=(e-j)*i;o||(0<r&&1>r?r=1:0>r&&-1<r&&(r=-1));s=q=j+r;if(!o&&(0>r&&0<e-s||0<r&&0<s-e))s=e;l?a.style[b]=s+"px":k?a[b]=parseInt(s):UI.C(a,b,!o?s+"px":s/100+"");j==e&&(UI.isString(g)?eval(g):g&&g())}},j||40);return u},
		getX:function(a){return a.getBoundingClientRect?a.getBoundingClientRect().left+UI.scrollX():(a.offsetParent?a.offsetLeft+UI.getX(a.offsetParent):a.offsetLeft)+("fixed"==UI.C(a,"position")?UI.scrollX():0)},
		getY:function(a){return a.getBoundingClientRect?a.getBoundingClientRect().top+UI.scrollY():(a.offsetParent?a.offsetTop+UI.getY(a.offsetParent):a.offsetTop)+("fixed"==UI.C(a,"position")?UI.scrollY():0)},
		within:function(a,b){var e=UI.getX(b)-UI.scrollX(),g=UI.width(b)+e,i=UI.getY(b)-UI.scrollY(),j=UI.height(b)+i,k={};if(a[0]>e&&a[0]<g&&a[1]>i&&a[1]<j)return a[0]-e<(g-e)/2&&(k.left=!0),a[1]-i<(j-i)/2&&(k.top=!0),k},
		frameX:function(a){return a.frameElement?UI.getX(a.frameElement)+UI.frameX(a.parent):0},
		frameY:function(a){return a.frameElement?UI.getY(a.frameElement)+UI.frameY(a.parent):0},
		width:function(a){return a?parseInt(a.offsetWidth):0},
		height:function(a){return a?parseInt(a.offsetHeight):0},
		pageWidth:function(){return document.body.scrollWidth||document.documentElement.scrollWidth},
		pageHeight:function(){return document.body.scrollHeight||document.documentElement.scrollHeight},
		windowWidth:function(){var a=document.documentElement;return self.innerWidth||a&&a.clientWidth||document.body.clientWidth},
		windowHeight:function(){var a=document.documentElement;return self.innerHeight||a&&a.clientHeight||document.body.clientHeight},
		scrollX:function(a){var b=document.documentElement;if(a){var e=a.parentNode,g=a.scrollLeft||0;a==b&&(g=UI.scrollX());return e?g+UI.scrollX(e):g}return self.pageXOffset||b&&b.scrollLeft||document.body.scrollLeft},
		scrollY:function(a){var b=document.documentElement;if(a){var e=a.parentNode,g=a.scrollTop||0;a==b&&(g=UI.scrollY());return e?g+UI.scrollY(e):g}return self.pageYOffset||b&&b.scrollTop||document.body.scrollTop},
		scrollTo:function(a,b,e){if(a==document.documentElement||a==document.body)return window.scrollTo(b,e)},
		hide:function(a){UI.isString(a)&&(a=this.G(a));if(a){if(!a.__curDisplay){var b=this.C(a,"display");"none"!=b&&(a.__curDisplay=b)}a.style.display="none"}},
		show:function(a){UI.isString(a)&&(a=this.G(a));a&&(a.style.display=a.__curDisplay||"")},
		toggle:function(a){UI.isString(a)&&(a=this.G(a));"none"==this.C(a,"display")?this.show(a):this.hide(a)},
		hasClass:function(a,b){return!a||!a.className?!1:a.className!=a.className.replace(RegExp("\\b"+b+"\\b"),"")},
		addClass:function(a,b){a&&(a.className?this.hasClass(a,b)||(a.className+=" "+b):a.className=b)},
		removeClass:function(a,b){if(a){var e=b.split(" ");1<e.length?UI.each(e,function(b){UI.removeClass(a,b)}):this.hasClass(a,b)&&(a.className=a.className.replace(RegExp("\\b"+b+"\\b"),"").replace(/\s$/,""))}},
		toggleClass:function(a,b){this.hasClass(a,b)?this.removeClass(a,b):this.addClass(a,b)},
		next:function(a){a=a.nextSibling;return null==a?!1:UI.isElement(a)?a:this.next(a)},
		prev:function(a){a=a.previousSibling;return null==a?!1:UI.isElement(a)?a:this.prev(a)},
		remove:function(a){a&&a.parentNode&&a.parentNode.removeChild(a)},
		append:function(a,b){b.appendChild(a)},
		prepend:function(a,b){var e=b.firstChild;e?UI.before(a,e):UI.append(a,b)},
		after:function(a,b){var e=b.parentNode;e.lastChild==a?e.appendChild(a):e.insertBefore(a,b.nextSibling)},
		before:function(a,b){b.parentNode.insertBefore(a,b)},
		replace:function(a,b){b.parentNode.replaceChild(a,b)},
		tmpl:function(){var a={};return function e(g,i){var j=!/\W/.test(g)?a[g]=a[g]||e(UI.G(g).innerHTML):UI.tmplString(g);return i?j(i):j}}(),
		tmplString:function(a){return new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")},
		txTpl:function(){var a={};return function(b,e,g,i,j){var k=[];if((j=void 0!=j?j:!0)&&a[b]){for(var j=0,l=a[b].propList,o=l.length;j<o;j++)k.push(e[l[j]]);e=a[b].parsefn}else{l=[];g||(g="<%");i||(i="%>");i=(!1==/[^\w\d_:\.-]/g.test(b)?document.getElementById(b).innerHTML:b).replace(/\\/g,"\\\\").replace(/[\r\t\n]/g," ").split(g).join("\t").replace(RegExp("((^|"+i+")[^\t]*)'","g"),"$1\r").replace(RegExp("\t=(.*?)"+i,"g"),"';\n s+=$1;\n s+='").split("\t").join("';\n").split(i).join("\n s+='").split("\r").join("\\'");for(o in e)l.push(o),k.push(e[o]);e=new Function(l," var s='';\n s+='"+i+"';\n return s");j&&(a[b]={parsefn:e,propList:l})}try{return e.apply(null,k)}catch(q){b="txTpl"+(new Date).getTime(),e="var "+b+"="+e.toString(),j=navigator.userAgent.toLowerCase(),l=document.getElementsByTagName("head")[0],o=document.createElement("script"),-1<j.indexOf("gecko")&&-1==j.indexOf("khtml")?window.eval.call(window,e):(o.innerHTML=e,l.appendChild(o),l.removeChild(o)),window[b].apply(null,k)}}}(),
		html:function(a){var b=UI.DC("div"),e=[];b.innerHTML=a;UI.each(b.childNodes,function(a){UI.isElement(a)&&e.push(a)});return e},
		css:function(a,b){var e;b||(b=UI.DC("style"),UI.A(b,"type","text/css"),UI.append(b,UI.GT(document,"head")[0]));if(b.styleSheet)try{b.styleSheet.cssText=a}catch(g){e=$$("head style");var i=e.length;1<i&&(UI.remove(e[i-1]),e[i-2].styleSheet.cssText+=a)}else e=document.createTextNode(a),UI.append(e,b)},
		text:function(a){for(var b=[],a=a.childNodes,e,g=0,i=a.length;g<i;g++)e=a[g].nodeName.toUpperCase(),"STYLE"==e||"SCRIPT"==e||b.push(1!=a[g].nodeType?a[g].nodeValue:UI.text(a[g]));return b.join("")},
		parent:function(a,b){if(UI.isArray(a)){var e=[];UI.each(a,function(a){(b&&UI.hasClass(a.parentNode,b)||!b)&&e.push(a.parentNode)});return e}return a&&a.parentNode},
		parents:function(a,b){if(b){var e=[],g=UI.parents(a);UI.each(g,function(a){UI.hasClass(a,b)&&e.push(a)});return e}return(g=a.parentNode)?"HTML"==g.nodeName?[g]:[g].concat(UI.parents(g)):[]},
		children:function(a,b){var e=[];b&&(b=b.split("|"));UI.each(a.childNodes,function(a){var i=!1;if(b)for(var j=0,k=b.length;j<k;j++)if(UI.hasClass(a,b[j])){i=!0;break}UI.isElement(a)&&(!b||i)&&e.push(a)});return e},
		A:function(a,b,e){if(a&&a.getAttribute){if(void 0==e)return a.getAttribute(b)||"";""==e?a.removeAttribute(b):a.setAttribute(b,e)}},
		C:function(){var a;return function(b,e,g){if(b)if(void 0==g){if(window.getComputedStyle)return e=e.replace(/([A-Z])/g,"-$1"),e=e.toLowerCase(),window.getComputedStyle(b,null).getPropertyValue(e);if(b.currentStyle)return"opacity"==e?0<=b.style.filter.indexOf("opacity=")?parseFloat(b.style.filter.match(/opacity=([^)]*)/)[1])/100:"1":b.currentStyle[e]}else!a&&"opacity"==e&&(a="opacity"in b.style?1:2),"opacity"==e&&2==a?b.style.filter=(b.style.filter||"").replace(/alpha\([^)]*\)/,"")+"alpha(opacity="+100*g+")":b.style[e]=g}}(),
		DC:function(a){return document.createElement(a)},
		E:function(a){if(a&&a.clone)return a;a=window.event||a||{};return{clone:!0,stop:function(){a&&a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},prevent:function(){a&&a.preventDefault?a.preventDefault():a.returnValue=!1},target:a.target||a.srcElement,relatedTarget:a.relatedTarget||(a.fromElement&&a.fromElement===a.srcElement?a.toElement:a.fromElement),x:a.clientX||a.pageX,y:a.clientY||a.pageY,button:a.button,key:a.keyCode,shift:a.shiftKey,alt:a.altKey,ctrl:a.ctrlKey,type:a.type,wheel:a.wheelDelta/120||-a.detail/3}},
		bind:function(a,b,e){e&&UI.clear(function(){b=null});return function(){return a.apply(b,Array.prototype.slice.call(arguments))}},
		EA:function(a,b,e,g){
			if(a){
				if(UI.isString(e))
					var i=e,e=function(){eval(i)};
				return a.addEventListener?("mousewheel"==b&&UI.B.firefox&&(b="DOMMouseScroll"),
						a.addEventListener(b,e,g),!0):a.attachEvent?a.attachEvent("on"+b,e):!1}},
		ER:function(a,b,e){if(a)return a.removeEventListener?(a.removeEventListener(b,e,!1),!0):a.detachEvent?a.detachEvent("on"+b,e):!1},
		fireEvent:function(){return document.dispatchEvent?function(a,b){var e=document.createEvent("HTMLEvents");e.initEvent(b,!0,!0);return!a.dispatchEvent(e)}:function(a,b){var e=document.createEventObject();return a.fireEvent("on"+b,e)}}(),
		linkEvent:function(){var a={},b=function(b,g){var i=a[b];i&&UI.each(i,function(a){UI.isFunction(a)&&a(g)})};b.event=a;b.add=function(b,g){a[b]||(a[b]=[]);g&&a[b].push(g)};b.remove=function(b,g){var i=a[b];UI.each(i,function(a,b){g&&a==g&&i.splice(b,1)})};return b}(),
		proxyEvent:function(){var a=function(a,b){var e=b.match(/[\.#]?[\w|-]+/g),g=1;if(a)return UI.each(e,function(b){var e=b.slice(0,1);if("."==e){if(e=a.match(/\.[^\.#]+/g),!e||!UI.has(e,b))g=0}else(e="#"==e?a.match(/#\w+/g):a.match(/\w+/g))&&e[0]==b||(g=0)}),g},b,e={},g=+new Date,i=g;return function(j,k,l,o,q){var u,y;if(j){b=UI.A(j,"p_h");if(!b||b<i)UI.A(j,"p_h",g),e[g]={},g++;u=e[UI.A(j,"p_h")];if(!u[k]){u[k]=[];var s=u[k];UI.EA(j,k,function(a){var b=UI.E(a),a=b.target,e=1,g=[],i=[];if(UI.isElement(a))for(;a;){e++;g.push(a);var k=a.className,k=(UI.isString(k)?k:"").split(" ").join(".");i.push(a.nodeName.toLowerCase()+(a.id?"#"+a.id:"")+(k?"."+k:""));UI.proxyEventStop||10<=e||a===j?(a=null,UI.proxyEventStop=0):a=a.parentNode}var l={};UI.each(g,function(a,e){for(var j=0,k=s.length;j<k;j++){var r=s[j][1](a,i,g,e,l);r&&s[j][0].call(UI.isElement(r)?r:a,b)}})})}y=u[k];UI.each(o,function(b){y.push([l(b),function(e,g,i,j,k){var s=q||5,l,o,x=b.split("|"),t=[];2==x.length&&(t=x[1].split("&"));x=x[0].split(",");!UI.proxyEventStop&&!k[b]&&(UI.each(x,function(b){if("*"==b)l=1;else if(b){l=0;for(var e=j,f=b.split(" "),n=f.length-1,c=n+s;0<=c;c--){b=g[e];a(b,f[n])&&(o||(o=i[e]),n--);if(0>n||!b)break;e++}0>n&&(l=1)}if(l)return 1}),UI.each(t,function(a){a=a.split("=");a[1]&&UI.A(e,a[0])==a[1]||""==a[1]&&UI.A(e,a[0])||(l=0)}));l&&o&&(o&&(l=o),k[b]=1);return l}])})}}}(),
		G:function(a){return UI.isElement(a)?a:document.getElementById(a)},
		GT:function(a,b){return a.getElementsByTagName(b)},
		GC:function(){function a(s,r){r||(r=s,s=document);s=s||document;if(!/^[\w\-_#]+$/.test(r)&&s.querySelectorAll)return b(s.querySelectorAll(r));if(-1<r.indexOf(",")){for(var h=r.split(/,/g),q=[],C=0,v=h.length;C<v;++C)q=q.concat(a(s,h[C]));return o(q)}var h=r.match(g),v=h.pop(),q=(v.match(j)||l)[1],w=!q&&(v.match(i)||l)[1],C=v.split(".").slice(2),v=!q&&(v.match(k)||l)[1];if(w&&!v&&s.getElementsByClassName)v=b(s.getElementsByClassName(w));else{v=!q&&b(s.getElementsByTagName(v||"*"));if(w){for(var w=RegExp("(^|\\s)"+w+"(\\s|$)"),u=-1,y,D=-1,x=[],C=C||"";y=v[++u];)w.test(y.className)&&y.className.hasString(C)&&(x[++D]=y);v=x}if(q)return(h=document.getElementById(q))?[h]:[]}return h[0]&&v[0]?e(h,v):v}function b(a){try{return Array.prototype.slice.call(a)}catch(b){for(var e=[],g=0,i=a.length;g<i;++g)e[g]=a[g];return e}}function e(a,b,g){var o=a.pop();if(">"===o)return e(a,b,!0);for(var q=[],v=-1,w=(o.match(j)||l)[1],u=!w&&(o.match(i)||l)[1],o=!w&&(o.match(k)||l)[1],y=-1,D,x,t,o=o&&o.toLowerCase();D=b[++y];){x=D.parentNode;do if(t=(t=(t=!o||"*"===o||o===x.nodeName.toLowerCase())&&(!w||x.id===w))&&(!u||RegExp("(^|\\s)"+u+"(\\s|$)").test(x.className)),g||t)break;while(x=x.parentNode);t&&(q[++v]=D)}return a[0]&&q[0]?e(a,q):q}var g=/(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,i=/^(?:[\w\-_]+)?\.([\w\-_]+)/,j=/^(?:[\w\-_]+)?#([\w\-_]+)/,k=/^([\w\*\-_]+)/,l=[null,null],o,q=+new Date,u,y=1;u=function(a){var b=a[q],e=y++;return!b?(a[q]=e,!0):!1};o=function(a){for(var b=a.length,e=[],g=-1,i=0,j;i<b;++i)j=a[i],u(j)&&(e[++g]=j);q+=1;return e};return a}(),
		closest:function(a,b,e){e=e||document;for(b=UI.GC(e,b);a;){if(UI.has(b,a))return a;a=a.parentNode}return null},
		getEvent:function(){if(window.event)return window.event;for(var a=arguments.callee.caller;a;){var b=a.arguments[0];if(b&&(b.constructor===Event||b.constructor===MouseEvent||"object"===typeof b&&b.preventDefault&&b.stopPropagation))return b;a=a.caller}return null},
		sortElement:function(a,b){if(1<a.length&&b)for(var e=0,g=b.length;e<g;e++)a=a.sort(function(a,g){return a.className.hasString(b[e])&&!g.className.hasString(b[e])?1:-1});return a},
		withinElement:function(a,b){for(var b=UI.E(b||UI.getEvent()),e=b.relatedTarget||document;e;){if(a===e)return!0;e=e.parentNode}return!1},
		isDate:function(a){return"Date"==this.getType(a)},
		isMouseMove:function(){var a,b,e;UI.EA(document.body,"mousedown",function(a){a=UI.E(a);b=a.x+","+a.y});UI.EA(document.body,"mouseup",function(g){g=UI.E(g);e=g.x+","+g.y;a=b!=e});UI.isMouseMove=function(){return a}},
		cloneDate:function(a){if(!a)return a;d=new Date;d.setTime(a.getTime());return d},
		formatDate:function(a,b){for(var e=b.replace(/\W/g,",").split(","),g="yyyy MM dd hh mm ss ww".split(" "),i={y:a.getFullYear(),M:a.getMonth()+1,d:a.getDate(),h:a.getHours(),m:a.getMinutes(),s:a.getSeconds(),w:a.getDay()},j=0,k=e.length;j<k;j++)for(var l=e[j],o=0;7>o;o++){var q=g[o].slice(-1);l.hasString(q)&&("w"==q&&0==i[q]&&(i[q]=7),b=l.hasString(g[o])?b.replace(RegExp(g[o],"g"),this.addZero(i[q])):b.replace(RegExp(g[o].slice(g[o].length/2),"g"),i[q]))}return b},
		parseDate:function(a,b){b||(b="yyyy-MM-dd");var b=b.replace(/\W/g,",").split(","),a=a.replace(/\D/g,",").split(","),e=2E3,g=0,i=1,j=0,k=0,l=0;UI.each(b,function(b,q){""!=a[q]&&!isNaN(a[q])&&(b.hasString("y")&&(e=Number(a[q])),b.hasString("M")&&(g=Number(a[q])-1),b.hasString("d")&&(i=Number(a[q])),b.hasString("h")&&(j=Number(a[q])),b.hasString("m")&&(k=Number(a[q])),b.hasString("s")&&(l=Number(a[q])),b.hasString("w")&&(l=Number(a[q])))});return new Date(e,g,i,j,k,l)},
		zoneDate:function(a,b){var e=new Date(Number(a)),e=e.getTime()+6E4*e.getTimezoneOffset();return new Date(e+36E5*b)},
		isObject:function(a){return"object"==typeof a},
		isElement:function(a){return a&&1==a.nodeType},
		isUndefined:function(a){return"undefined"==typeof a},
		isFunction:function(a){return"Function"==this.getType(a)},
		isNumber:function(a){return"Number"==this.getType(a)},
		isString:function(a){return"String"==this.getType(a)},
		isArray:function(a){return"Array"==this.getType(a)},
		getType:function(a){return Object.prototype.toString.call(a).slice(8,-1)},
		json:function(a){var b={};if(a)try{b=eval("("+a+")")}catch(e){}return b},
		json2str:function(a){var b=[],e=UI.isArray(a);if(UI.isObject(a)){if(null===a)return"null";if(window.JSON&&window.JSON.stringify)return JSON.stringify(a);for(var g in a)b.push((e?"":'"'+g+'":')+UI.json2str(a[g]));b=b.join();return e?"["+b+"]":"{"+b+"}"}return UI.isNumber(a)||UI.isFunction(a)?a.toString():UI.isUndefined(a)?"undefined":!a?'""':'"'+a+'"'},
		addZero:function(a,b){return Array(Math.abs((""+a).length-((b||2)+1))).join(0)+a},
		trim:function(a){return a.replace(/^\s+|\s+$/g,"")},
		random:function(a,b){void 0==a&&(a=0);void 0==b&&(b=9);return Math.floor(Math.random()*(b-a+1)+a)},
		has:function(a,b){for(var e=0,g=a.length;e<g;e++)if(a[e]==b)return!0;return!1},
		hasKey:function(a,b){return b in a},
		each:function(a,b){
			if(a)
				if(UI.isUndefined(a[0])&&!UI.isArray(a))
					for(var e in a){
						if(b(a[e],e))break
					}
				else{
						e=0;
						for(var g=a.length;e<g&&!b(a[e],e);e++);
				}
		},
		merge:function(a,b){var e=[];if(b)return UI.each(b,function(b){UI.has(a,b)||e.push(b)}),a.concat(e);UI.each(a,function(a){UI.has(e,a)||e.push(a)});return e},
		clone:function clone(b){var e,g;if(null===b||"object"!==typeof b)e=b;else for(g in e=new b.constructor,b)b.hasOwnProperty(g)&&(e[g]=clone(b[g]));return e},
		ready:function(a){
			if(UI.ready.done)return a();
			console.log("UI.ready.done" + UI.ready.done);
			UI.isReady.done?UI.readyDo.push(a):(UI.readyDo=[a],UI.isReady())
			console.log("UI.isReady.done" + UI.isReady.done);
		},
		readyDo:[],
		isReady:function(){
			if(!UI.isReady.done){
				UI.isReady.done=!0;
				if("complete"==document.readyState)
					UI.onReady();
				else if(document.addEventListener)
					if("interactive"==document.readyState&&!UI.B.ie9)
						UI.onReady();
					else 
						document.addEventListener("DOMContentLoaded",function(){
							document.removeEventListener("DOMContentLoaded",arguments.callee,!1);UI.onReady()},!1);
				else if(document.attachEvent){var a=top!=self;a?document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),UI.onReady())}):document.documentElement.doScroll&&!a&&function(){if(!UI.ready.done){try{document.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);return}UI.onReady()}}()}
				
				UI.EA(window,"load",UI.onReady)
			}
		},
		onReady:function(){
			if(!UI.ready.done){
				UI.ready.done=!0;
				for(var a=0,b=UI.readyDo.length;a<b;a++)
					UI.readyDo[a]();
				UI.readyDo=null
			}
		}
};


UI.B=function(){
	var a={},b=navigator.userAgent;
	a.win=a.win||b.hasString("Win32");
	UI.each({win:"Windows",mac:"Mac",ie:"MSIE",ie6:"MSIE 6",ie7:"MSIE 7",ie8:"MSIE 8",ie9:"MSIE 9",safari:"WebKit",webkit:"WebKit",chrome:"Chrome",ipad:"iPad",iphone:"iPhone",os4:"OS 4",os5:"OS 5",os6:"OS 6",qq:"QQBrowser",firefox:"Firefox",tt:"TencentTraveler",opera:"Opera"},function(e,i){a[i]=b.hasString(e)});
	a.ie6=a.ie6&&!a.ie7&&!a.ie8;
	a.opera=window.opera||a.opera;
	try{
		a.maxthon=window.external&&window.external.max_version
	}catch(e){}
	return a
}();
