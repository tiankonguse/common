(function(loader) {
    "use strict";
    var versionList = [];
    versionList["/i/css/main.css"] = "1.01";
    loader.getVersion = function(url) {
	return versionList[url];
    };
})(TK.loader);