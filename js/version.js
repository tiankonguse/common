(function(TK) {
    "use strict";
    var loader = TK.loader = TK.loader || {};

    loader.version = loader.version || "1.04";
    loader.load = false;
    var versionList = [];
    versionList["/common/js/main.js"] = "1.01";
    versionList["/i/css/main.css"] = "1.01";
    versionList["/record/css/main.css"] = "1.04";
    versionList["/record/js/main.js"] = "1.04.1";
    versionList["/record/js/write.js"] = "1.04";
    versionList["/common/kindeditor/plugins/code/prettify.css"] = "1.02.2";
    loader.getVersion = function(url) {
        return versionList[url];
    };
})(TK);
