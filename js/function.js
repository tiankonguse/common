(function() {
    "use strict";
    Function.prototype.method = function(name, func) {

	if (!this.prototype[name]) {
	    this.prototype[name] = func;
	    return this;
	}
    };

    Function.method('bind', function(that) {

	// Return a function that will call this function as
	// though it is a method of that object.
	var method = this, //
	slice = Array.prototype.slice, //
	args = slice.apply(arguments, [ 1 ]);
	return function() {
	    return method.apply(that, args
		    .concat(slice.apply(arguments, [ 0 ])));
	};
    });

    Function.method('curry', function() {

	var slice = Array.prototype.slice, //
	args = slice.apply(arguments), that = this;
	return function() {
	    return that.apply(null, args.concat(slice.apply(arguments)));
	};
    });

    Function.method('new', function() {

	// Create a new object that inherits from the
	// constructor's prototype.
	var that = Object.create(this.prototype);
	// Invoke the constructor, binding 鈥搕his- to
	// the new object.
	var other = this.apply(that, arguments);
	// If its return value isn't an object,
	// substitute the new object.
	return (typeof other === 'object' && other) || that;
    });

    Function.method('inherits', function(Parent) {
	this.prototype = new Parent();
	return this;
    });

    Number.method('integer', function() {
	console.log('next');
	return Math[this < 0 ? 'ceil' : 'floor'](this);
    });

    String.method('trim', function() {
	console.log('next');
	return this.replace(/^\s+|\s+$/g, '');
    });
    String.method('ltrim', function() {
	console.log('next');
	return this.replace(/^\s+/g, '');
    });
    String.method('rtrim', function() {
	console.log('next');
	return this.replace(/\s+$/g, '');
    });

    String.method('deentityify', function() {
	// The entity table. It maps entity names to
	// characters.
	var entity = {
	    quot : '"',
	    lt : '<',
	    gt : '>'
	};
	// Return the deentityify method.
	return function() {
	    // This is the deentityify method. It calls the string
	    // replace method, looking for substrings that start
	    // with '&' and end with ';'. If the characters in
	    // between are in the entity table, then replace the
	    // entity with the character from the table. It uses
	    // a regular expression (Chapter 7).
	    return this.replace(/&([^&;]+);/g, function(a, b) {
		var r = entity[b];
		return typeof r === 'string' ? r : a;
	    });
	};
    }());

    String.method('charAt', function(pos) {
	return this.slice(pos, pos + 1);
    });

    String.method('entityify', function() {
	var character = {
	    '<' : '&lt;',
	    '>' : '&gt;',
	    '&' : '&amp;',
	    '"' : '&quot;'
	};
	return function() {
	    return this.replace(/[<>&"]/g, function(c) {
		return character[c];
	    });
	};
    }());

    Array.method('reduce', function(f, value) {
	var i;
	for (i = 0; i < this.length; i += 1) {
	    value = f(this[i], value);
	}
	return value;
    });

    Array.method('pop', function() {
	return this.splice(this.length - 1, 1)[0];
    });

    Array.method('push', function() {
	this.splice.apply(this, [ this.length, 0 ].concat(Array.prototype.slice
		.apply(arguments)));
	return this.length;
    });

    Array.method('shift', function() {
	return this.splice(0, 1)[0];
    });

    Array
	    .method(
		    'splice',
		    function(start, deleteCount) {
			var max = Math.max, min = Math.min, delta, element, insertCount = max(
				arguments.length - 2, 0), k = 0, len = this.length, new_len, result = [], shift_count;
			start = start || 0;
			if (start < 0) {
			    start += len;
			}
			start = max(min(start, len), 0);
			deleteCount = max(min(
				typeof deleteCount === 'number' ? deleteCount
					: len, len - start), 0);
			delta = insertCount - deleteCount;
			new_len = len + delta;
			while (k < deleteCount) {
			    element = this[start + k];
			    if (element !== undefined) {
				result[k] = element;
			    }
			    k += 1;
			}
			shift_count = len - start - deleteCount;
			if (delta < 0) {
			    k = start + insertCount;
			    while (shift_count) {
				this[k] = this[k - delta];
				k += 1;
				shift_count -= 1;
			    }
			    this.length = new_len;
			} else if (delta > 0) {
			    k = 1;
			    while (shift_count) {
				this[new_len - k] = this[len - k];
				k += 1;
				shift_count -= 1;
			    }
			    this.length = new_len;
			}
			for (k = 0; k < insertCount; k += 1) {
			    this[start + k] = arguments[k + 2];
			}
			return result;
		    });

    Array.method('unshift', function() {
	this.splice.apply(this, [ 0, 0 ].concat(Array.prototype.slice
		.apply(arguments)));
	return this.length;
    });

    RegExp.method('test', function(string) {
	return this.exec(string) !== null;
    });

    // Object.method('superior', function(name) {
    // var that = this, method = that[name];
    // return function() {
    // return method.apply(that, arguments);
    // };
    // });

})();

(function() {
    "use strict";
    window.TK = window.TK || {};

    TK.getPropertyName = function(o) {
	var r = [];
	for (name in o) {
	    r.push(name);
	}
	return r;
    };

    TK.copyProperties = function(from, to) {
	if (!to) {
	    to = {};
	}

	for (p in from) {
	    to[p] = from[p];
	}
	return to;
    };

    TK.copyUndefinedProperties = function(from, to) {
	if (!to){
	    to = {};
	}
	    
	for (p in from) {
	    if (!p in to) {
		to[p] = from[p];
	    }
	}
	return to;
    };
    
    
    

})();
