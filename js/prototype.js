Object.extend || (Object.prototype.extend = function(options) {
	var target = this;
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
});

String.prototype.hasString = function(a) {
	if ("object" == typeof a) {
		for ( var b = 0, e = a.length; b < e; b++)
			if (!this.hasString(a[b]))
				return !1;
		return !0
	}
	if (-1 != this.indexOf(a))
		return !0
};

String.prototype.breakWord = function(a, b) {
	b || (b = "<wbr/>");
	return this.replace(RegExp("(\\w{" + (a ? a : 0) + "})(\\w)", "g"),
			function(a, g, i) {
				return g + b + i
			})
};

