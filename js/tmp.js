/*TK JavaScript Library v1.0.1*/
(function(window, undefined) {
	
	"use strict";

	var loc = win.location, /**/
	doc = win.document, /**/
	nav = win.navigator,
	docElem = doc.documentElement, 
	$doc,
	g = {},
	readyFuns,
	removeReadyListener,
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	readyList, /**/
	completed = function(event) {
		if (doc.addEventListener || event.type === "load" || doc.readyState === "complete") {
			detach();
			TK.ready();
		}
	},
	detach = function() {
		if (doc.addEventListener) {
			doc.removeEventListener("DOMContentLoaded", completed, false);
			win.removeEventListener("load", completed, false);
		} else {
			doc.detachEvent("onreadystatechange", completed);
			win.detachEvent("onload", completed);
		}
	},

	TK.fn = {
		each : function(obj, callback, args) {
			var value, i = 0, length = obj.length, isArray = isArraylike(obj);

			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				}

				// A special, fast, case for the most common use of each
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);

						if (value === false) {
							break;
						}
					}
				}
			}

			return obj;
		},


		noConflict: function( deep ) {
			if ( window.TK === TK ) {
				window.TK = _TK;
			}
			return TK;
		},


		error : function(msg) {
			throw new Error(msg);
		},

		nodeName : function(elem, name) {
			return elem.nodeName
					&& elem.nodeName.toLowerCase() === name.toLowerCase();
		},
		
		
		trim : core.trim && !core.trim.call("\uFEFF\xA0") ? function(text) {
			return text == null ? "" : core.trim.call(text);
		} : function(text) {
			return text == null ? "" : (text + "").replace(rtrim, "");
		},
		

		inArray : function(elem, arr, i) {
			var len;

			if (arr) {
				if (core.indexOf) {
					return core.indexOf.call(arr, elem, i);
				}

				len = arr.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

				for (; i < len; i++) {
					// Skip accessing in sparse arrays
					if (i in arr && arr[i] === elem) {
						return i;
					}
				}
			}

			return -1;
		},

		grep : function(elems, callback, inv) {
			var retVal, ret = [], i = 0, length = elems.length;
			inv = !!inv;
			for (; i < length; i++) {
				retVal = !!callback(elems[i], i);
				if (inv !== retVal) {
					ret.push(elems[i]);
				}
			}

			return ret;
		},
		now : function() {
			return (new Date()).getTime();
		},

	};	
	

	
	
	TK.Callbacks=function(){
		var funContainer = [];

		var addFun = function(obj){
			for(var i = 0, len = obj.length, value, _type; i < len; ++i){
				value = obj[i];
				_type = TK.type(value);
				
				if(_type === "array"){
					addFun(value);
				}else if(_type === "function"){
					funContainer.push(value);
				}
			}
		};
		
		var addFunsUI = {
			add : function(){
				
				if(funContainer){
					addFun(arguments);
				}
				return this;
			},
			empty : function(){
				funContainer = [];
				return this;
			},
			fireWith:function(){
			
				for(var i = 0, len = funContainer.length; i < len; ++i){
					funContainer[i]();
				}
				return this;
			}
		};
		
		return addFunsUI
	};
	


	
	TK.B = function(){
		var a={},b=navigator.userAgent;
		a.win=a.win||b.hasString("Win32");
		TK.each({win:"Windows",mac:"Mac",ie:"MSIE",ie6:"MSIE 6",ie7:"MSIE 7",ie8:"MSIE 8",ie9:"MSIE 9",safari:"WebKit",webkit:"WebKit",chrome:"Chrome",ipad:"iPad",iphone:"iPhone",os4:"OS 4",os5:"OS 5",os6:"OS 6",qq:"QQBrowser",firefox:"Firefox",tt:"TencentTraveler",opera:"Opera"},function(e,i){a[i]=b.hasString(e)});
		a.ie6=a.ie6&&!a.ie7&&!a.ie8;
		a.opera=window.opera||a.opera;
		try{
			a.maxthon=window.external&&window.external.max_version;
		}catch(e){}
		return a
	}();
	
	
	
	
	TK.extend({
	
		_trim : function(str) {
			return str.replace(/^\s+|\s+$/g, "");
		},
		xmlHttp : function() {
			return new XMLHttpRequest();
		},
		windowWidth : function() {
			var a = doc.documentElement;
			return self.innerWidth || a && a.clientWidth
					|| doc.body.clientWidth;
		},
		windowHeight : function() {
			var a = doc.documentElement;
			return self.innerHeight || a && a.clientHeight
					|| doc.body.clientHeight;
		},
		width : function(obj) {
			return obj ? parseInt(obj.offsetWidth) : 0;
		},
		utfDecode : function(a) {
			var b = "";
			for ( var c = 0, g = 0, l = a.length; c < l;) {
				g = a.charCodeAt(c);
				if (128 > g) {
					b += String.fromCharCode(g);
					c++;
				} else if (191 < g && 224 > g) {
					b += String.fromCharCode((g & 31) << 6 | a.charCodeAt(c + 1)
							& 63);
					c += 2;
				} else {
					b += String.fromCharCode((g & 15) << 12
							| (a.charCodeAt(c + 1) & 63) << 6 | a.charCodeAt(c + 2)
							& 63);
					c += 3;
				}
			}
			return b;
		},
		utfEncode : function(a) {
			var b = "";
			a = a.replace(/\r\n/g, "\n");
			for ( var c = 0, g = 0, l = a.length; c < l; c++) {
				g = a.charCodeAt(c);
				if (128 > g) {
					b += String.fromCharCode(g);
				} else if (127 < g && 2048 > g) {
					b += String.fromCharCode(g >> 6 | 192);
					b += String.fromCharCode(g & 63 | 128);
				} else {
					b += String.fromCharCode(g >> 12 | 224);
					b += String.fromCharCode(g >> 6 & 63 | 128);
					b += String.fromCharCode(g & 63 | 128);
				}
			}
			return b;
		},
		append : function(child, parent) {
			parent.appendChild(child);
		}
	});

	
	TK.extend({
		random : function(a, b) {
			var u = void 0;
			u == a && (a = 0);
			u == b && (b = 9);
			return Math.floor(Math.random() * (b - a + 1) + a);
		},
		hasClass : function(a, b) {
			return !a || !a.className ? !1 : a.className != a.className.replace(
					RegExp("\\b" + b + "\\b"), "");
		},
		isUndefined : function(a) {
			return "undefined" == typeof a;
		},
		getType : function(a) {
			return Object.prototype.toString.call(a).slice(8, -1);
		},
		removeClass : function(a, b) {
			if (a) {
				var c = b.split(" ");
				if (l < c.length) {
					this.each(c, function(b) {
						this.removeClass(a, b);
					});
				} else if (this.hasClass(a, b)) {
					a.className = a.className
							.replace(RegExp("\\b" + b + "\\b"), "").replace(/\s$/,
									"");
				}
			}
		}
	});


	win.TK = TK;
	
})(window);
