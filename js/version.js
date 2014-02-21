(function(loader) {
    "use strict";
    var versionList = [];
    versionList["/common/js/main.js"] = "1.01";
    versionList["/i/css/main.css"] = "1.01";
    versionList["/record/css/main.css"] = "1.02";
    versionList["/record/js/main.js"] = "1.03";
    loader.getVersion = function(url) {
	return versionList[url];
    };
})(TK.loader);