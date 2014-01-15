(function(window) {
    "use strict";
    window.TK = window.TK || {};

    TK.basepath = window.basepath || "http://tiankonguse.com";
    window.basepath = TK.basepath;

})(window);

(function(TK) {
    "use strict";

    var loader = TK.loader = {}, /**/
    basepath = TK.basepath, /**/
    version = "1.04", /**/
    head = document.getElementsByTagName('head')[0], /**/
    hasjQuery = false /**/;

    loader.files = [];
    loader.filemeta = [];

    // 判断是否支持本地存储
    loader.localstorage = function() {
	return !!window.localStorage;
    };

    // 获取本地缓存文件元信息
    loader.getLocalStorageFileMeta = function() {
	var fileMeta = localStorage.getItem('fileMeta');
	if (typeof fileMeta == 'undefined' || fileMeta == null) {
	    fileMeta = null;
	}
	return fileMeta;
    };

    loader.getLocalStorageFileMetaObj = function() {
	var fileMeta = loader.getLocalStorageFileMeta();
	if (typeof fileMeta != 'undefined' && fileMeta != null) {
	    var fileMetaList = fileMeta.split(';');
	    for ( var i = 0; i < fileMetaList.length; i++) {
		loader.filemeta.push(eval('(' + fileMetaList[i] + ')'));
	    }
	}
    };

    // 获取文件元信息
    loader.getLoaderFileMetaInfo = function(key) {
	if (loader.filemeta && loader.filemeta.length > 0) {
	    for ( var i = 0; i < loader.filemeta.length; i++) {
		if (loader.filemeta[i].name == key) {
		    return loader.filemeta[i];
		}
	    }
	}
	return null;
    };

    // 获取缓存数据元信息
    loader.getFileMetaInfo = function(key) {
	var fileMeta = loader.getLocalStorageFileMeta();
	if (typeof fileMeta != 'undefined' && fileMeta != null) {
	    var fileMetaList = fileMeta.split(';');
	    for ( var i = 0; i < fileMetaList.length; i++) {
		var info = eval('(' + fileMetaList[i] + ')');
		if (info.name == key) {
		    return info;
		}
	    }
	}
	return null;
    };

    // 保存或更新数据文件元信息
    loader.saveOrUpdateFileMeta = function(key) {
	var metaInfo = loader.getLoaderFileMetaInfo(key);
	var fileMeta = loader.getLocalStorageFileMeta();
	if (fileMeta == null) {
	    loader.setItem('fileMeta', '{name:"' + metaInfo.name + '",v:"'
		    + metaInfo.v + '"}');
	} else {
	    localStorage.removeItem('fileMeta');
	    var fileMetaList = fileMeta.split(';');
	    for ( var i = 0; i < fileMetaList.length; i++) {
		var info = eval('(' + fileMetaList[i] + ')');
		if (info.name == key) {
		    fileMetaList[i] = '{name:"' + metaInfo.name + '",v:"'
			    + metaInfo.v + '"}';
		    loader.setItem('fileMeta', fileMetaList.join(';'));
		    return;
		}
	    }
	    fileMeta += ';{name:"' + metaInfo.name + '",v:"' + metaInfo.v
		    + '"}';
	    loader.setItem('fileMeta', fileMeta);
	}
    };

    // 比较缓存数据是否为最新版本
    loader.compareFileMetaInfo = function(key) {
	if (loader.filemeta && loader.filemeta.length > 0) {
	    for ( var i = 0; i < loader.filemeta.length; i++) {
		if (loader.filemeta[i].name == key) {
		    var localMetaInfo = loader.getFileMetaInfo(key);
		    if (localMetaInfo != null
			    && localMetaInfo.v == loader.filemeta[i].v) {
			return true;
		    } else {
			return false;
		    }
		}
	    }
	}
	return false;
    };

    // 保存本地缓存
    loader.setItem = function(key, value) {
	if (key != 'fileMeta') {
	    loader.saveOrUpdateFileMeta(key);
	}
	localStorage.setItem(key, value);
    };

    // 获取本地缓存
    loader.getItem = function(key) {
	var fileMeta = loader.getLocalStorageFileMeta();
	if (fileMeta != null && loader.compareFileMetaInfo(key)) {
	    return localStorage.getItem(key);
	} else {
	    localStorage.removeItem(key);
	    return null;
	}
    };

    // 根据地址加载文件
    loader.fileLoader = function(file, callBack) {
	var ret = null;
	if (!hasjQuery && (typeof jQuery != "undefined")) {
	    hasjQuery = true;
	}

	if (file && file.length > 0) {
	    var name = file[0].name, //
	    url = file[0].url, //
	    v = file[0].v, //
	    type = file[0].type, //
	    load = file[0].load, //
	    onerror = file[0].onerror, //
	    unStore = file[0].unStore;

	    var metaInfo = loader.getLoaderFileMetaInfo(name);
	    if (metaInfo == null) {
		loader.filemeta.push({
		    name : name,
		    v : v
		});
	    } else {
		metaInfo.v = v;
	    }

	    // 判断是否支持本地存储
	    if (!unStore && loader.localstorage()) {

		var content = loader.getItem(name);

		if (load || typeof content == 'undefined' || content == null) {
		    loader.getFile(basepath + url, false);

		    if (typeof loader.getFileResponse != 'undefined'
			    && loader.getFileResponse != null
			    && loader.getFileResponse != '') {
			loader.setItem(name, loader.getFileResponse);
			content = loader.getItem(name);
		    }
		}

		if (typeof content != 'undefined' && content != null) {
		    if (type == 'js') {
			if (hasjQuery) {
			    try {
				ret = jQuery(('<script type="text/javascript">'
					+ content + '</script>'))
				if (ret.length == 1) {
				    jQuery('head:last').append(ret);
				    ret = ret[0];
				} else {
				    throw "error";
				}
			    } catch (e) {
				ret = jQuery(('<script src="' + basepath + url + '"></script>'))
				jQuery('head:last').append(ret);
				ret = ret[0];
			    }
			} else {
			    var script = document.createElement('script');
			    script.type = 'text/javascript';
			    if (onerror) {
				script.onerror = onerror;
			    }
			    try {
				script.innerHTML = content;
			    } catch (e) {
				script.src = basepath + url;
			    }

			    head.appendChild(script);
			    ret = script;
			}

		    } else if (type == 'css') {
			// css 放在 head 的最后
			if (hasjQuery) {
			    ret = jQuery(('<style type="text/css">' + content + '</style>'));
			    jQuery('head:last').append(ret);
			    ret = ret[0];
			} else {
			    var style = document.createElement('style');
			    style.type = 'text/css';

			    try {
				style.innerHTML = content;
				head.appendChild(style);
			    } catch (e) {
				head.appendChild(style);
				if (style.styleSheet
					&& typeof (style.styleSheet.cssText) !== "undefined") {
				    style.styleSheet.cssText = content;
				} else {
				    style.appendChild(document
					    .createTextNode(content))
				}
			    }

			    ret = style;
			}

		    }
		}
	    } else {
		if (type == 'js') {
		    // js 放到 body 的最后
		    var script = document.createElement('script');
		    script.type = 'text/javascript';
		    script.src = basepath + url;
		    head.appendChild(script);
		    ret = script;
		} else if (type == 'css') {
		    // css 放在 head 的最后
		    var style = document.createElement('link');
		    style.rel = 'stylesheet';
		    style.type = 'text/css';
		    style.href = basepath + url;
		    head.appendChild(style);
		    ret = style;
		}
	    }

	}

	if (callBack) {
	    callBack();
	}
	return ret;
    };

    // 获取文件
    loader.getFile = function(url, async, callback) {
	if (typeof callback == 'undefined') {
	    callback = loader.getFileCallBack;
	}
	if (window.XMLHttpRequest) {
	    loader.xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
	    loader.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (loader.xmlhttp != null) {
	    loader.xmlhttp.onreadystatechange = callback;
	    loader.xmlhttp.open("GET", url, async);
	    loader.xmlhttp.send(null);
	}
    }

    // 获取文件回调函数
    loader.getFileCallBack = function(data) {
	if (loader.xmlhttp.readyState == 4 && loader.xmlhttp.status == 200) {
	    loader.getFileResponse = loader.xmlhttp.responseText;
	}
    }
    loader.goBackTo = function() {
	try {
	    window.history.go(-1);
	    return false;
	} catch (e) {
	    window.location.href = document.referrer;
	}
    }

    loader.xssFilter = function(val) {
	val = val.toString();
	val = val.replace(/[<%3C]/g, "&lt;");
	val = val.replace(/[>%3E]/g, "&gt;");
	val = val.replace(/"/g, "&quot;");
	val = val.replace(/'/g, "&apos;");
	return val;
    };

    loader.loadJS = function(obj) {
	obj.name = obj.url;
	obj.type = "js";
	obj.load = !!obj.load;
	obj.unStore = !!obj.unStore;
	obj.v = obj.v || version;
	return TK.loader.fileLoader([ obj ]);
    };
    loader.loadCSS = function(obj) {
	obj.name = obj.url;
	obj.type = "css";
	obj.load = !!obj.load;
	obj.unStore = !!obj.unStore;
	obj.v = obj.v || version;
	return TK.loader.fileLoader([ obj ]);
    };

})(TK);
