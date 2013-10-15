function getPropertyName(o){
    var r = [];
    for(name in o){
        r.push(name);
    }
    return r;
}

function copyProperties(from, to){
    if(!to)to = {};
    for(p in from){
        to[p] = from[p];
    }
    return to;
}

function copyUndefinedProperties(from, to){
    if(!to)to = {};
    for(p in from){
        if(! p in to){
            to[p] = from[p];
        }
    }
    return to;
}

var inspector = function($){return eval($);};

function inspect(inspector, title){
    var expression, result;
    if("ignore" in arguments.callee)return;
    while(true){
        var message = "";
        if(title){
            message = title + "\n";
        }
        if(expression){
            message += "\n" + expression + " ==> " + result + "\n";
        }else{
            expression = "";
        }
        
        message += "Enter an expression to evalutate: ";
        
        expression = prompt(message, expression);
        
        if(!expression)return ;
        
        result = inspector(expression);
        
    }
}


if(!Function.prototype.apply){
    Function.prototype.apply = function(object, parameters){
        var f = this;
        var o = object || window;
        var args = parameters || [];
        
        o._$_apply_$_ = f;
        var stringArgs = {};
        for(var i = 0;i < args.length; i++){
            stringArgs[i] = "args[" + i + "]";
        }
        var arglist = stringArgs.join(",");
        var methodcall = "o._$_apply_$_(" + arglist + ");";
        var result = eval(methodcall);
        delete o._$_apply_$_;
        return result;        
    };
}

/*TK JavaScript Library v1.0.2*/
(function(window, undefined) {
	// "use strict";
	
	String.hasString || (String.prototype.hasString = function(a) {
		if ("object" == typeof a) {
			for ( var b = 0, e = a.length; b < e; b++)
				if (!this.hasString(a[b]))
					return !1;
			return !0
		}
		if (-1 != this.indexOf(a))
			return !0
	});
	
	/* document */
	var document = window.document,
	/* TK(document) */
	$rootTK,
	/* TK() */
	TK = function(selector, context) {
		return new TK.fn.init(selector, context, $rootTK);
	},
	/* store old TK */
	_TK = window.TK,
	class2type = {},
	deletedIds = [],
	concat = [].concat,
	push = [].push,
	pop = [].pop,
	slice = [].slice,
	sort = [].sort,
	splice = [].splice,
	indexOf = [].indexOf || function(elem) {
		var i = 0, len = this.length;
		for (; i < len; i++) {
			if (this[i] === elem) {
				return i;
			}
		}
		return -1;
	},
	toString = {}.toString,
	hasOwn = {}.hasOwnProperty,
	trim = "".trim
	;
	/* set TK's prototype */
	TK.fn = TK.prototype = {
		version : "1.0.1",
		constructor : TK,
		selector : "",
		context : "",
		length : 0,
		push: push,
		sort: sort,
		splice: splice,	
		init : function(selector, context, $rootTK) {
			
			var match,elem;
			if (!selector) {
				return this;
			} else if(selector === "body" && document.body){
				this.context = document;
				this[0] = document.body;
				this.selector = selector;
				this.length = 1;
				return this;
			} else if (selector.nodeType) {
				this.context =  this[0] = selector;
				this.length = 1;
				return this;
			} else if (TK.isFunction(selector)) {
				return $rootTK.ready(selector);
			}else if (typeof selector === "string") {
				if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
					match = [ null, selector, null ];
				} else {
					match = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/.exec( selector );
				}
				
				if ( match && (match[1] || !context) ) {
					if ( match[1] ) {
						
					}else{
						elem = document.getElementById( match[2] );
						if ( elem && elem.parentNode ) {
							if ( elem.id !== match[2] ) {
								return $rootTK.find( selector );
							}
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}
					
				}else if(!context || context.version){
					console.log($rootTK );
					return ( context || $rootTK ).find( selector );
				}else{
					return this.constructor( context ).find( selector );
				}
				
			}
			
			
			if ( selector.selector !== undefined ) {
				
				this.selector = selector.selector;
				this.context = selector.context;
			}			
			
			return TK.makeArray( selector, this );			
		},
		ready:function(a){
			
			if(TK.readyDone){
				a();
			}else{
				
				TK.isReadyDone?TK.readyDo.push(a):(TK.readyDo=[a], TK.isReady());
			}
			return this;
		}
	};
	
	TK.fn.init.prototype = TK.fn;	
	
	TK.extend = TK.fn.extend = function(options) {
		var target = this,src,copy;
		if (options) {
			for (name in options) {
				src = target[name];
				copy = options[name];
				if (target === copy) {
					continue;
				}
				
				if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	};
	
	
	TK.extend({
		readyDo:[],
		readyDone: false,
		isReadyDone : false,
		onReady:function(){
			if(!TK.readyDone){
				TK.readyDone=!0;
				for(var a=0,b=TK.readyDo.length;a<b;a++){
					TK.readyDo[a]();
				}
				TK.readyDo = null;
			}
		},
		isReady:function(){
			if(!TK.isReadyDone){
				TK.isReadyDone=!0;
				
				if("complete"==document.readyState){
					TK.onReady();
				}else if(document.addEventListener){
					if("interactive"==document.readyState&&!TK.B.ie9){
						TK.onReady();
					}else {
						document.addEventListener("DOMContentLoaded",function(arg){document.removeEventListener("DOMContentLoaded",arguments.callee,!1);TK.onReady();},!1);
					}	
				} else if(document.attachEvent){
					var a=top!=self;
					if(a){
						document.attachEvent("onreadystatechange",function(){
							"complete"===document.readyState&&(document.detachEvent("onreadystatechange",arguments.callee),TK.onReady())
						});
					}else{
						if(document.documentElement.doScroll){
							(function(){
								if(!TK.readyDone){
									try{
										document.documentElement.doScroll("left");
									}catch(a){
										setTimeout(arguments.callee,0);
										return;
									}
									TK.onReady();
								}
							})();
						}
					}
					
				}
				TK.addEvent(window,"load",TK.onReady)
			}
		},
		ready:function(a){
			return TK.fn.ready(a);
		}
	});
	
	TK.extend({
		isElement : function(a) {
			return a && 1 == a.nodeType;
		},
		isDate : function(a) {
			return "Date" == TK.type(a);
		},
		isNumber : function(a) {
			return "Number" == TK.type(a);
		},
		isObject : function(a) {
			return "object" == typeof a;
		},
		isString : function(a) {
			return "String" == TK.type(a);
		},
		isFunction : function(obj) {
			return TK.type(obj) === "function";
		},
		isArray : Array.isArray || function(obj) {
			return TK.type(obj) === "array";
		},
		isWindow : function(obj) {
			return obj != null && obj == obj.window;
		},
		isNumeric : function(obj) {
			return !isNaN(parseFloat(obj)) && isFinite(obj);
		},
		type : function(obj) {
			if (obj == null) {
				return String(obj);
			}
			return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)]
					|| "object"
					: typeof obj;
		},
		isEmptyObject : function(obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},	
		isUndefined:function(a){
			return"undefined"==typeof a;
		},
		isArraylike : function (obj) {
			var length = obj.length, type = TK.type(obj);

			if (TK.isWindow(obj)) {
				return false;
			}

			if (obj.nodeType === 1 && length) {
				return true;
			}
			
			return type === "array" || type !== "function" && 
			(length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
		}
	});
	
	TK.extend({
		addEvent : function(a,b,e,g){
			if(a){
				if(TK.isString(e)){
					var i=e,e=function(){eval(i);};
				}
				return a.addEventListener?("mousewheel"==b && TK.B.firefox&&(b="DOMMouseScroll"),
						a.addEventListener(b,e,g),!0):a.attachEvent?a.attachEvent("on"+b,e):!1;
			}
		}
	});
	TK.extend({
		toArray : function() {
			return slice.call(this);
		},
		get : function(num) {
			return num == null ?
			this.toArray() :
			(num < 0 ? (num %= this.length,this[this.length + num] ): this[num]);
		},
		makeArray : function(arr, results) {
			
			var ret = results || [];
			if (arr != null) {
				if (TK.isArraylike(Object(arr))) {
					
					TK.merge(ret, typeof arr === "string" ? [ arr ] : arr);
				} else {
					push.call(ret, arr);
				}
			}

			return ret;
		},
		merge : function(first, second) {
			var l = second.length, i = first.length, j = 0;

			if (typeof l === "number") {
				for (; j < l; j++) {
					first[i++] = second[j];
				}
			} else {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}

			first.length = i;

			return first;
		}
	});
	
	TK.extend({
		each:function(a,b){
			if(a){
				if(TK.isUndefined(a[0])&&!TK.isArray(a)){
					for(var e in a){
						if(b(a[e],e)){
							break
						}
					}
				}else{
					e=0;
					for(var g=a.length;e<g&&!b(a[e],e);e++);
				}
					
			}

		}
	});
	
	TK.each("Boolean Number String Function Array Date RegExp Object Error"
			.split(" "), function(name, i) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});	
	
	(function( window, undefined ) {
		var strundefined = typeof undefined,
			MAX_NEGATIVE = 1 << 31,
			arr = [],
			hasOwn = hasOwn,
			push = push,
			push_native = push,
			slice = slice,
			indexOf = indexOf,
			pop = pop,
			preferredDoc = window.document,
			setDocument,
			outermostContext,
			dirruns,
			document,
			docElem,
			documentIsHTML,
			isXML,
			support,
			done = 0,
			Expr,
			strundefined = typeof undefined,
			booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
			whitespace = "[\\x20\\t\\r\\n\\f]",
			characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			identifier = characterEncoding.replace( "w", "w#" ),
			attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
			"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
			runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
			funescape = function( _, escaped, escapedWhitespace ) {
				var high = "0x" + escaped - 0x10000;
				return high !== high || escapedWhitespace ?
					escaped :
					high < 0 ?
						String.fromCharCode( high + 0x10000 ) :
						String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
			},
			pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",
			matchExpr = {
					"ID": new RegExp( "^#(" + characterEncoding + ")" ),
					"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
					"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
					"ATTR": new RegExp( "^" + attributes ),
					"PSEUDO": new RegExp( "^" + pseudos ),
					"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
						"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
						"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
					"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
					// For use in libraries implementing .is()
					// We use this for POS matching in `select`
					"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
						whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
				},
			expando = "sizzle" + -(new Date()),
			rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
			classCache = createCache(),
			tokenCache = createCache(),
			compilerCache = createCache(),
			rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
			compile,
			rsibling = new RegExp( whitespace + "*[+~]" )
			;
		
		try {
			push.apply(
				(arr = slice.call( preferredDoc.childNodes )),
				preferredDoc.childNodes
			);
			arr[ preferredDoc.childNodes.length ].nodeType;
			
		} catch ( e ) {
			push = { apply: arr.length ?
				function( target, els ) {
					push_native.apply( target, slice.call(els) );
				} :
				function( target, els ) {
					var j = target.length,
						i = 0;
					// Can't trust NodeList.length
					while ( (target[j++] = els[i++]) ) {}
					target.length = j - 1;
				}
			};
		}
		
		function Sizzle( selector, context, results, seed ) {
			var nodeType;
			setDocument( context );
			context = context || document;
			results = results || [];
			
			if ( !selector || typeof selector !== "string" ) {
				return results;
			}
			
			if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
				return [];
			}
			
			
			return select( selector.replace( rtrim, "$1" ), context, results, seed );
			
		}
		function elementMatcher( matchers ) {
			return matchers.length > 1 ?
				function( elem, context, xml ) {
					var i = matchers.length;
					while ( i-- ) {
						if ( !matchers[i]( elem, context, xml ) ) {
							return false;
						}
					}
					return true;
				} :
				matchers[0];
		}

		function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
			// A counter to specify which element is currently being matched
			var matcherCachedRuns = 0,
				bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function( seed, context, xml, results, expandContext ) {
					var elem, j, matcher,
						setMatched = [],
						matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						outermost = expandContext != null,
						contextBackup = outermostContext,
						// We must always have either seed elements or context
						elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
						// Use integer dirruns iff this is the outermost matcher
						dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

					if ( outermost ) {
						outermostContext = context !== document && context;
						cachedruns = matcherCachedRuns;
					}

					// Add elements passing elementMatchers directly to results
					// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
					for ( ; (elem = elems[i]) != null; i++ ) {
						if ( byElement && elem ) {
							j = 0;
							while ( (matcher = elementMatchers[j++]) ) {
								if ( matcher( elem, context, xml ) ) {
									results.push( elem );
									break;
								}
							}
							if ( outermost ) {
								dirruns = dirrunsUnique;
								cachedruns = ++matcherCachedRuns;
							}
						}

						// Track unmatched elements for set filters
						if ( bySet ) {
							// They will have gone through all possible matchers
							if ( (elem = !matcher && elem) ) {
								matchedCount--;
							}

							// Lengthen the array for every element, matched or not
							if ( seed ) {
								unmatched.push( elem );
							}
						}
					}

					// Apply set filters to unmatched elements
					matchedCount += i;
					if ( bySet && i !== matchedCount ) {
						j = 0;
						while ( (matcher = setMatchers[j++]) ) {
							matcher( unmatched, setMatched, context, xml );
						}

						if ( seed ) {
							// Reintegrate element matches to eliminate the need for sorting
							if ( matchedCount > 0 ) {
								while ( i-- ) {
									if ( !(unmatched[i] || setMatched[i]) ) {
										setMatched[i] = pop.call( results );
									}
								}
							}

							// Discard index placeholder values to get only actual matches
							setMatched = condense( setMatched );
						}

						// Add matches to results
						push.apply( results, setMatched );

						// Seedless set matches succeeding multiple successful matchers stipulate sorting
						if ( outermost && !seed && setMatched.length > 0 &&
							( matchedCount + setMatchers.length ) > 1 ) {

							Sizzle.uniqueSort( results );
						}
					}

					// Override manipulation of globals by nested matchers
					if ( outermost ) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup;
					}

					return unmatched;
				};

			return bySet ?
				markFunction( superMatcher ) :
				superMatcher;
		}
		function createCache() {
			var keys = [];
			function cache( key, value ) {
				if ( keys.push( key += " " ) > Expr.cacheLength ) {
					delete cache[ keys.shift() ];
				}
				return (cache[ key ] = value);
			}
			return cache;
		}
		
		function markFunction( fn ) {
			fn[ expando ] = true;
			return fn;
		}
		function assert( fn ) {
			var div = document.createElement("div");

			try {
				return !!fn( div );
			} catch (e) {
				return false;
			} finally {
				if ( div.parentNode ) {
					div.parentNode.removeChild( div );
				}
				div = null;
			}
		}		
		
		function addHandle( attrs, handler ) {
			var arr = attrs.split("|"),
				i = attrs.length;

			while ( i-- ) {
				Expr.attrHandle[ arr[i] ] = handler;
			}
		}
		function createPositionalPseudo( fn ) {
			return markFunction(function( argument ) {
				argument = +argument;
				return markFunction(function( seed, matches ) {
					var j,
						matchIndexes = fn( [], seed.length, argument ),
						i = matchIndexes.length;

					// Match elements found at the specified indexes
					while ( i-- ) {
						if ( seed[ (j = matchIndexes[i]) ] ) {
							seed[j] = !(matches[j] = seed[j]);
						}
					}
				});
			});
		}
		
		isXML = Sizzle.isXML = function( elem ) {
			var documentElement = elem && (elem.ownerDocument || elem).documentElement;
			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};
		
		support = Sizzle.support = {};
		
		setDocument = Sizzle.setDocument = function( node ) {
			var doc = node ? node.ownerDocument || node : preferredDoc,
					parent = doc.defaultView;
			if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
				return document;
			}
			
			document = doc;
			docElem = doc.documentElement;
			
			documentIsHTML = !isXML( doc );
			
			if ( parent && parent.attachEvent && parent !== parent.top ) {
				parent.attachEvent( "onbeforeunload", function() {
					setDocument();
				});
			}
			
			support.attributes = assert(function( div ) {
				div.className = "i";
				return !div.getAttribute("className");
			});
			
			support.getElementsByTagName = assert(function( div ) {
				div.appendChild( doc.createComment("") );
				return !div.getElementsByTagName("*").length;
			});
			
			support.getElementsByClassName = assert(function( div ) {
				div.innerHTML = "<div class='a'></div><div class='a i'></div>";
				div.firstChild.className = "i";
				return div.getElementsByClassName("i").length === 2;
			});

			support.getById = assert(function( div ) {
				docElem.appendChild( div ).id = expando;
				return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
			});
			
			if ( support.getById ) {
				Expr.find["ID"] = function( id, context ) {
					if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
						var m = context.getElementById( id );
						return m && m.parentNode ? [m] : [];
					}
				};
				Expr.filter["ID"] = function( id ) {
					var attrId = id.replace( runescape, funescape );
					return function( elem ) {
						return elem.getAttribute("id") === attrId;
					};
				};
			} else {
				delete Expr.find["ID"];
				Expr.filter["ID"] =  function( id ) {
					var attrId = id.replace( runescape, funescape );
					return function( elem ) {
						var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
						return node && node.value === attrId;
					};
				};
			}
			
			Expr.find["TAG"] = support.getElementsByTagName ?
					function( tag, context ) {
						if ( typeof context.getElementsByTagName !== strundefined ) {
							return context.getElementsByTagName( tag );
						}
					} :
					function( tag, context ) {
						var elem,
							tmp = [],
							i = 0,
							results = context.getElementsByTagName( tag );

						if ( tag === "*" ) {
							while ( (elem = results[i++]) ) {
								if ( elem.nodeType === 1 ) {
									tmp.push( elem );
								}
							}

							return tmp;
						}
						return results;
					};
			
			Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
				if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
					return context.getElementsByClassName( className );
				}
			};	
			
			sortOrder = docElem.compareDocumentPosition ?
					function( a, b ) {

						// Flag for duplicate removal
						if ( a === b ) {
							hasDuplicate = true;
							return 0;
						}

						var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

						if ( compare ) {
							// Disconnected nodes
							if ( compare & 1 ||
								(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

								// Choose the first element that is related to
								// our preferred document
								if ( a === doc || contains(preferredDoc, a) ) {
									return -1;
								}
								if ( b === doc || contains(preferredDoc, b) ) {
									return 1;
								}

								// Maintain original order
								return sortInput ?
									( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
									0;
							}

							return compare & 4 ? -1 : 1;
						}

						// Not directly comparable, sort on existence of method
						return a.compareDocumentPosition ? -1 : 1;
					} :
					function( a, b ) {
						var cur,
							i = 0,
							aup = a.parentNode,
							bup = b.parentNode,
							ap = [ a ],
							bp = [ b ];

						// Exit early if the nodes are identical
						if ( a === b ) {
							hasDuplicate = true;
							return 0;

						// Parentless nodes are either documents or disconnected
						} else if ( !aup || !bup ) {
							return a === doc ? -1 :
								b === doc ? 1 :
								aup ? -1 :
								bup ? 1 :
								sortInput ?
								( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
								0;

						// If the nodes are siblings, we can do a quick check
						} else if ( aup === bup ) {
							return siblingCheck( a, b );
						}

						// Otherwise we need full lists of their ancestors for
						// comparison
						cur = a;
						while ( (cur = cur.parentNode) ) {
							ap.unshift( cur );
						}
						cur = b;
						while ( (cur = cur.parentNode) ) {
							bp.unshift( cur );
						}

						// Walk down the tree looking for a discrepancy
						while ( ap[i] === bp[i] ) {
							i++;
						}

						return i ?
							// Do a sibling check if the nodes have a common
							// ancestor
							siblingCheck( ap[i], bp[i] ) :

							// Otherwise nodes in our document sort first
							ap[i] === preferredDoc ? -1 :
							bp[i] === preferredDoc ? 1 :
							0;
					};			
			
			return doc;					
		};
		
		Expr = Sizzle.selectors = {

				// Can be adjusted by the user
				cacheLength : 50,

				createPseudo : markFunction,

				match : matchExpr,

				attrHandle : {},

				find : {},

				relative : {
					">" : {
						dir : "parentNode",
						first : true
					},
					" " : {
						dir : "parentNode"
					},
					"+" : {
						dir : "previousSibling",
						first : true
					},
					"~" : {
						dir : "previousSibling"
					}
				},

				preFilter : {
					"ATTR" : function(match) {
						match[1] = match[1].replace(runescape, funescape);

						// Move the given value to match[3] whether quoted or
						// unquoted
						match[3] = (match[4] || match[5] || "").replace(runescape,
								funescape);

						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}

						return match.slice(0, 4);
					},

					"CHILD" : function(match) {
						match[1] = match[1].toLowerCase();

						if (match[1].slice(0, 3) === "nth") {
							if (!match[3]) {
								Sizzle.error(match[0]);
							}

							match[4] = +(match[4] ? match[5] + (match[6] || 1)
									: 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +((match[7] + match[8]) || match[3] === "odd");

							// other types prohibit arguments
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}

						return match;
					},

					"PSEUDO" : function(match) {
						var excess, unquoted = !match[5] && match[2];

						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}
						if (match[3] && match[4] !== undefined) {
							match[2] = match[4];
						} else if (unquoted
								&& rpseudo.test(unquoted)
								&&
								(excess = tokenize(unquoted, true))
								&&
								(excess = unquoted.indexOf(")", unquoted.length - excess)
										- unquoted.length)) {

							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}
						return match.slice(0, 3);
					}
				},

				filter : {

					"TAG" : function(nodeNameSelector) {
						var nodeName = nodeNameSelector.replace(runescape, funescape)
								.toLowerCase();
						return nodeNameSelector === "*" ? function() {
							return true;
						} : function(elem) {
							return elem.nodeName
									&& elem.nodeName.toLowerCase() === nodeName;
						};
					},

					"CLASS" : function(className) {
						var pattern = classCache[className + " "];

						return pattern
								|| (pattern = new RegExp("(^|" + whitespace + ")"
										+ className + "(" + whitespace + "|$)"))
								&& classCache(className, function(elem) {
									return pattern.test(typeof elem.className === "string"
											&& elem.className
											|| typeof elem.getAttribute !== strundefined
											&& elem.getAttribute("class") || "");
								});
					},

					"ATTR" : function(name, operator, check) {
						return function(elem) {
							var result = Sizzle.attr(elem, name);

							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}

							result += "";

							return operator === "=" ? result === check
									: operator === "!=" ? result !== check
											: operator === "^=" ? check
													&& result.indexOf(check) === 0
													: operator === "*=" ? check
															&& result.indexOf(check) > -1
															: operator === "$=" ? check
																	&& result
																			.slice(-check.length) === check
																	: operator === "~=" ? (" "
																			+ result + " ")
																			.indexOf(check) > -1
																			: operator === "|=" ? result === check
																					|| result
																							.slice(
																									0,
																									check.length + 1) === check
																							+ "-"
																					: false;
						};
					},

					"CHILD" : function(type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";

						return first === 1 && last === 0 ?

						// Shortcut for :nth-*(n)
						function(elem) {
							return !!elem.parentNode;
						}
								:

								function(elem, context, xml) {
									var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling"
											: "previousSibling", parent = elem.parentNode, name = ofType
											&& elem.nodeName.toLowerCase(), useCache = !xml
											&& !ofType;

									if (parent) {

										// :(first|last|only)-(child|of-type)
										if (simple) {
											while (dir) {
												node = elem;
												while ((node = node[dir])) {
													if (ofType ? node.nodeName
															.toLowerCase() === name
															: node.nodeType === 1) {
														return false;
													}
												}
												// Reverse direction for :only-*
												// (if we
												// haven't yet done so)
												start = dir = type === "only" && !start
														&& "nextSibling";
											}
											return true;
										}

										start = [ forward ? parent.firstChild
												: parent.lastChild ];

										if (forward && useCache) {
											outerCache = parent[expando]
													|| (parent[expando] = {});
											cache = outerCache[type] || [];
											nodeIndex = cache[0] === dirruns && cache[1];
											diff = cache[0] === dirruns && cache[2];
											node = nodeIndex
													&& parent.childNodes[nodeIndex];

											while ((node = ++nodeIndex && node && node[dir]
													||

													(diff = nodeIndex = 0) || start.pop())) {
												if (node.nodeType === 1 && ++diff
														&& node === elem) {
													outerCache[type] = [ dirruns,
															nodeIndex, diff ];
													break;
												}
											}
										} else if (useCache
												&& (cache = (elem[expando] || (elem[expando] = {}))[type])
												&& cache[0] === dirruns) {
											diff = cache[1];
										} else {
											while ((node = ++nodeIndex && node && node[dir]
													|| (diff = nodeIndex = 0)
													|| start.pop())) {

												if ((ofType ? node.nodeName.toLowerCase() === name
														: node.nodeType === 1)
														&& ++diff) {
													if (useCache) {
														(node[expando] || (node[expando] = {}))[type] = [
																dirruns, diff ];
													}

													if (node === elem) {
														break;
													}
												}
											}
										}

										// Incorporate the offset, then check
										// against cycle
										// size
										diff -= last;
										return diff === first
												|| (diff % first === 0 && diff / first >= 0);
									}
								};
					},

					"PSEUDO" : function(pseudo, argument) {
						var args, fn = Expr.pseudos[pseudo]
								|| Expr.setFilters[pseudo.toLowerCase()]
								|| Sizzle.error("unsupported pseudo: " + pseudo);

						if (fn[expando]) {
							return fn(argument);
						}

						// But maintain support for old signatures
						if (fn.length > 1) {
							args = [ pseudo, pseudo, "", argument ];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(
									seed, matches) {
								var idx, matched = fn(seed, argument), i = matched.length;
								while (i--) {
									idx = indexOf.call(seed, matched[i]);
									seed[idx] = !(matches[idx] = matched[i]);
								}
							})
									: function(elem) {
										return fn(elem, 0, args);
									};
						}

						return fn;
					}
				},

				pseudos : {
					// Potentially complex pseudos
					"not" : markFunction(function(selector) {
						var input = [], results = [], matcher = compile(selector.replace(
								rtrim, "$1"));

						return matcher[expando] ? markFunction(function(seed, matches,
								context, xml) {
							var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;

							while (i--) {
								if ((elem = unmatched[i])) {
									seed[i] = !(matches[i] = elem);
								}
							}
						})
								: function(elem, context, xml) {
									input[0] = elem;
									matcher(input, null, xml, results);
									return !results.pop();
								};
					}),

					"has" : markFunction(function(selector) {
						return function(elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),

					"contains" : markFunction(function(text) {
						return function(elem) {
							return (elem.textContent || elem.innerText || getText(elem))
									.indexOf(text) > -1;
						};
					}),

					"lang" : markFunction(function(lang) {
						// lang value must be a valid identifier
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function(elem) {
							var elemLang;
							do {
								if ((elemLang = documentIsHTML ? elem.lang : elem
										.getAttribute("xml:lang")
										|| elem.getAttribute("lang"))) {

									elemLang = elemLang.toLowerCase();
									return elemLang === lang
											|| elemLang.indexOf(lang + "-") === 0;
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),

					// Miscellaneous
					"target" : function(elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},

					"root" : function(elem) {
						return elem === docElem;
					},

					"focus" : function(elem) {
						return elem === document.activeElement
								&& (!document.hasFocus || document.hasFocus())
								&& !!(elem.type || elem.href || ~elem.tabIndex);
					},

					// Boolean properties
					"enabled" : function(elem) {
						return elem.disabled === false;
					},

					"disabled" : function(elem) {
						return elem.disabled === true;
					},

					"checked" : function(elem) {
						var nodeName = elem.nodeName.toLowerCase();
						return (nodeName === "input" && !!elem.checked)
								|| (nodeName === "option" && !!elem.selected);
					},

					"selected" : function(elem) {
						if (elem.parentNode) {
							elem.parentNode.selectedIndex;
						}

						return elem.selected === true;
					},

					// Contents
					"empty" : function(elem) {
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeName > "@" || elem.nodeType === 3
									|| elem.nodeType === 4) {
								return false;
							}
						}
						return true;
					},

					"parent" : function(elem) {
						return !Expr.pseudos["empty"](elem);
					},

					// Element/input types
					"header" : function(elem) {
						return rheader.test(elem.nodeName);
					},

					"input" : function(elem) {
						return rinputs.test(elem.nodeName);
					},

					"button" : function(elem) {
						var name = elem.nodeName.toLowerCase();
						return name === "input" && elem.type === "button"
								|| name === "button";
					},

					"text" : function(elem) {
						var attr;
						return elem.nodeName.toLowerCase() === "input"
								&& elem.type === "text"
								&& ((attr = elem.getAttribute("type")) == null || attr
										.toLowerCase() === elem.type);
					},

					"first" : createPositionalPseudo(function() {
						return [ 0 ];
					}),

					"last" : createPositionalPseudo(function(matchIndexes, length) {
						return [ length - 1 ];
					}),

					"eq" : createPositionalPseudo(function(matchIndexes, length, argument) {
						return [ argument < 0 ? argument + length : argument ];
					}),

					"even" : createPositionalPseudo(function(matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"odd" : createPositionalPseudo(function(matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"lt" : createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),

					"gt" : createPositionalPseudo(function(matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length;) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					})
				}
			};
		
		function tokenize( selector, parseOnly ) {
			
			var matched, match, tokens, type,
				soFar, groups, preFilters,
				cached = tokenCache[ selector + " " ];

			if ( cached ) {
				return parseOnly ? 0 : cached.slice( 0 );
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;
			
			while ( soFar ) {
				if ( !matched || (match = rcomma.exec( soFar )) ) {
					if ( match ) {
						soFar = soFar.slice( match[0].length ) || soFar;
					}
					groups.push( tokens = [] );
				}

				matched = false;

				// Combinators
				if ( (match = rcombinators.exec( soFar )) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						// Cast descendant combinators to space
						type: match[0].replace( rtrim, " " )
					});
					soFar = soFar.slice( matched.length );
				}
				

				// Filters
				for ( type in Expr.filter ) {
					
					if ((type !== "extend") && (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
						(match = preFilters[ type ]( match ))) ) {
						matched = match.shift();
						tokens.push({
							value: matched,
							type: type,
							matches: match
						});
						soFar = soFar.slice( matched.length );
					}
				}
				
				
				if ( !matched ) {
					break;
				}
			}
			

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ?
				soFar.length :
				soFar ?
					Sizzle.error( selector ) :
					// Cache the tokens
					tokenCache( selector, groups ).slice( 0 );
		}
		
		function addCombinator( matcher, combinator, base ) {
			var dir = combinator.dir,
				checkNonElements = base && dir === "parentNode",
				doneName = done++;

			return combinator.first ?
				// Check against closest ancestor/preceding element
				function( elem, context, xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							return matcher( elem, context, xml );
						}
					}
				} :

				// Check against all ancestor/preceding elements
				function( elem, context, xml ) {
					var data, cache, outerCache,
						dirkey = dirruns + " " + doneName;

					// We can't set arbitrary data on XML nodes, so they don't
					// benefit from dir caching
					if ( xml ) {
						while ( (elem = elem[ dir ]) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								if ( matcher( elem, context, xml ) ) {
									return true;
								}
							}
						}
					} else {
						while ( (elem = elem[ dir ]) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								outerCache = elem[ expando ] || (elem[ expando ] = {});
								if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
									if ( (data = cache[1]) === true || data === cachedruns ) {
										return data === true;
									}
								} else {
									cache = outerCache[ dir ] = [ dirkey ];
									cache[1] = matcher( elem, context, xml ) || cachedruns;
									if ( cache[1] === true ) {
										return true;
									}
								}
							}
						}
					}
				};
		}
		
		function matcherFromTokens( tokens ) {
			var checkContext, matcher, j,
				len = tokens.length,
				leadingRelative = Expr.relative[ tokens[0].type ],
				implicitRelative = leadingRelative || Expr.relative[" "],
				i = leadingRelative ? 1 : 0,

				// The foundational matcher ensures that elements are reachable
				// from top-level context(s)
				matchContext = addCombinator( function( elem ) {
					return elem === checkContext;
				}, implicitRelative, true ),
				matchAnyContext = addCombinator( function( elem ) {
					return indexOf.call( checkContext, elem ) > -1;
				}, implicitRelative, true ),
				matchers = [ function( elem, context, xml ) {
					return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
						(checkContext = context).nodeType ?
							matchContext( elem, context, xml ) :
							matchAnyContext( elem, context, xml ) );
				} ];

			for ( ; i < len; i++ ) {
				if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
					matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
				} else {
					matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

					// Return special upon seeing a positional matcher
					if ( matcher[ expando ] ) {
						// Find the next relative operator (if any) for proper
						// handling
						j = ++i;
						for ( ; j < len; j++ ) {
							if ( Expr.relative[ tokens[j].type ] ) {
								break;
							}
						}
						return setMatcher(
							i > 1 && elementMatcher( matchers ),
							i > 1 && toSelector(
								// If the preceding token was a descendant
								// combinator, insert an implicit any-element
								// `*`
								tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
							).replace( rtrim, "$1" ),
							matcher,
							i < j && matcherFromTokens( tokens.slice( i, j ) ),
							j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
							j < len && toSelector( tokens )
						);
					}
					matchers.push( matcher );
				}
			}

			return elementMatcher( matchers );
		}
		function toSelector( tokens ) {
			var i = 0,
				len = tokens.length,
				selector = "";
			for ( ; i < len; i++ ) {
				selector += tokens[i].value;
			}
			return selector;
		}		
		
		compile = Sizzle.compile = function( selector, group ) {
			
			var i,
				setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[ selector + " " ];

			if ( !cached ) {
				// Generate a function of recursive functions that can be used
				// to check each element
				if ( !group ) {
					group = tokenize( selector );
				}
				i = group.length;
				while ( i-- ) {
					cached = matcherFromTokens( group[i] );
					if ( cached[ expando ] ) {
						setMatchers.push( cached );
					} else {
						elementMatchers.push( cached );
					}
				}

				// Cache the compiled function
				cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
			}
			return cached;
		};
		
		Sizzle.uniqueSort = function( results ) {
			var elem,
				duplicates = [],
				j = 0,
				i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice( 0 );
			results.sort( sortOrder );

			if ( hasDuplicate ) {
				while ( (elem = results[i++]) ) {
					if ( elem === results[ i ] ) {
						j = duplicates.push( i );
					}
				}
				while ( j-- ) {
					results.splice( duplicates[ j ], 1 );
				}
			}

			return results;
		};
		
		function select( selector, context, results, seed ) {
			
			var i, tokens, token, type, find,
				match = tokenize( selector );
			
			if ( !seed ) {
				if ( match.length === 1 ) {
					tokens = match[0] = match[0].slice( 0 );
					if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
							support.getById && context.nodeType === 9 && documentIsHTML &&
							Expr.relative[ tokens[1].type ] ) {

						context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
						if ( !context ) {
							return results;
						}
						selector = selector.slice( tokens.shift().value.length );
					}
					i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
					while ( i-- ) {
						token = tokens[i];
						if ( Expr.relative[ (type = token.type) ] ) {
							break;
						}
						if ( (find = Expr.find[ type ]) ) {
							if ( (seed = find(
								token.matches[0].replace( runescape, funescape ),
								rsibling.test( tokens[0].type ) && context.parentNode || context
							)) ) {
								tokens.splice( i, 1 );
								selector = seed.length && toSelector( tokens );
								if ( !selector ) {
									push.apply( results, seed );
									return results;
								}

								break;
							}
						}
					}
				}
			}
			
			compile( selector, match )(
				seed,
				context,
				!documentIsHTML,
				results,
				rsibling.test( selector )
			);
			
			return results;
		}
		
		TK.find = Sizzle;
		TK.expr = Sizzle.selectors;
		TK.expr[":"] = jQuery.expr.pseudos;
		TK.unique = Sizzle.uniqueSort;
		TK.text = Sizzle.getText;
		TK.isXMLDoc = Sizzle.isXML;
		TK.contains = Sizzle.contains;
	})(window);
	
	TK.fn.extend({
		
		find: function( selector ) {
			var i,
				ret = [],
				self = this,
				len = self.length;

			if ( typeof selector !== "string" ) {
				return this.pushStack( TK( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( TK.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				TK.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find(
			// selector )
			ret = this.pushStack( len > 1 ? TK.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		pushStack:function(name,b,c){
			var self=this.constructor();
			
			if(TK.isArray(name)){
				Array.prototype.push.apply(self,name);
			}else{
				TK.merge(self,name);
			}
			
			self.prevObject = this;
			self.context = this.context;
			
			if(b === "find"){
				self.selector = this.selector + (this.selector ? " " : "" ) + c;
			}else if(b){
				self.selector = this.selector + "." + b + "(" + c +")" ;
			}
			
			return self;
		}
	});
	

	
	$rootTK = TK(document);
	
	window.TK = TK;
})(window);
