var TK = TK || {};

TK.$ = TK.$ || function(id) {
	return document.getElementById(id);
};

var zoomwheel = "Mouse Wheel zoom picture";
var newWindowPic = "In the new window opens";
var resizePic = "Actual size";
var closePic = "Close";
if (window.navigator.systemLanguage == "zh-cn"
		|| window.navigator.language == "zh-CN") {
	zoomwheel = "鼠标滚轮缩放图片";
	newWindowPic = "在新窗口打开";
	resizePic = "实际大小";
	closePic = "关闭";
}

var lang = new Array();
var userAgent = navigator.userAgent.toLowerCase();
var is_opera = userAgent.indexOf('opera') != -1 && opera.version();
var is_moz = (navigator.product == 'Gecko')
		&& userAgent.substr(userAgent.indexOf('firefox') + 8, 3);
var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera)
		&& userAgent.substr(userAgent.indexOf('msie') + 5, 3);

var zoomobj = Array();
var zoomadjust;
var zoomstatus = 1;

var zoomdragstart = new Array();
var zoomclick = 0;

function doane(event) {
	e = event ? event : window.event;
	if (is_ie) {
		e.returnValue = false;
		e.cancelBubble = true;
	}
	if (e) {
		e.stopPropagation && e.stopPropagation();
		e.preventDefault && e.preventDefault();
	}
}

function zoomdrag(e, op) {
	doane(e);
	var $zoomimglayer = TK.$('zoomimglayer');
	if (op == 1) {
		zoomclick = 1;
		zoomdragstart = is_ie ? [ event.clientX, event.clientY ] : [ e.clientX,
				e.clientY ];
		zoomdragstart[2] = parseInt($zoomimglayer.style.left);
		zoomdragstart[3] = parseInt($zoomimglayer.style.top);
		doane(e);
	} else if (op == 2 && zoomdragstart[0]) {
		zoomclick = 0;
		var zoomdragnow = is_ie ? [ event.clientX, event.clientY ] : [
				e.clientX, e.clientY ];
		$zoomimglayer.style.left = (zoomdragstart[2] + zoomdragnow[0] - zoomdragstart[0])
				+ 'px';
		$zoomimglayer.style.top = (zoomdragstart[3] + zoomdragnow[1] - zoomdragstart[1])
				+ 'px';
		doane(e);
	} else if (op == 3) {
		if (zoomclick) {
			zoomclose();
		}
		zoomdragstart = [];
		doane(e);
	}
}

function zoomimgadjust(e, a) {
	var $zoomimglayer = TK.$('zoomimglayer');
	var $zoomimg = TK.$('zoomimg');
	var $zoomimglayer_bg = TK.$("zoomimglayer_bg");
	if (!e) {
		e = window.event;
	}

	if (e.originalEvent) {
		e = e.originalEvent;
	}

	if (!a) {

		if (e.altKey || e.shiftKey || e.ctrlKey) {
			return;
		}

		var l = parseInt($zoomimglayer.style.left);
		var t = parseInt($zoomimglayer.style.top);

		if (e.wheelDelta <= 0 || e.detail > 0) {
			if ($zoomimg.width <= 100 || $zoomimg.height <= 100) {
				doane(e);
				return;
			}
			$zoomimg.width -= zoomobj['img_info'][0] / 10;
			$zoomimg.height -= zoomobj['img_info'][1] / 10;
			l += zoomobj['img_info'][0] / 20;
			t += zoomobj['img_info'][1] / 20;
		} else {

			$zoomimg.width += zoomobj['img_info'][0] / 10;
			$zoomimg.height += zoomobj['img_info'][1] / 10;
			l -= zoomobj['img_info'][0] / 20;
			t -= zoomobj['img_info'][1] / 20;
		}
	} else {
		var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight
				: document.body.clientHeight;
		var scrollTop = document.body.scrollTop ? document.body.scrollTop
				: document.documentElement.scrollTop;
		$zoomimg.width = zoomobj['img_info'][0];
		$zoomimg.height = zoomobj['img_info'][1];
		var l = (document.body.clientWidth - $zoomimg.clientWidth) / 2;
		l = l > 0 ? l : 0;
		var t = (clientHeight - $zoomimg.clientHeight) / 2 + scrollTop;
		t = t > 0 ? t : 0;
	}
	$zoomimglayer.style.left = l + 'px';
	$zoomimglayer.style.top = t + 'px';
	$zoomimglayer_bg.style.height = t + $zoomimglayer.clientHeight > $zoomimglayer_bg.clientHeight ? (t + $zoomimglayer.clientHeight)
			+ 'px'
			: $zoomimglayer_bg.style.height;
	doane(e);
}

function zoomST(c) {
	var $zoomimglayer = TK.$('zoomimglayer');
	if ($zoomimglayer.style.display == '') {
		$zoomimglayer.style.left = (parseInt($zoomimglayer.style.left) + zoomobj['x'])
				+ 'px';
		$zoomimglayer.style.top = (parseInt($zoomimglayer.style.top) + zoomobj['y'])
				+ 'px';
		$zoomimglayer.style.width = (parseInt($zoomimglayer.style.width) + zoomobj['w'])
				+ 'px';
		$zoomimglayer.style.height = (parseInt($zoomimglayer.style.height) + zoomobj['h'])
				+ 'px';
		
		$zoomimglayer.style.opacity = 1;
		zoomadjust = 1;
		$zoomimglayer.style.filter = '';
		TK.$('zoomimglayer_bg').style.display = '';
		$zoomimglayer.innerHTML = '<table cellspacing="0"><tr><td align="center" id="zoomimgbox"><img id="zoomimg" style="cursor: move; margin: 5px;" src="'
				+ zoomobj['img_src']
				+ '" width="'
				+ $zoomimglayer.style.width
				+ '" height="'
				+ $zoomimglayer.style.height
				+ '"></td></tr></table>';
		$zoomimglayer.style.overflow = 'visible';
		$zoomimglayer.style.width = $zoomimglayer.style.height = 'auto';

		jQuery("#zoomimgbox,#zoomimglayer_bg").bind("mousescroll", function(e) {
//			console.log("mousescroll");
			zoomimgadjust(e);
		});
		jQuery("#zoomimgbox,#zoomimglayer_bg").bind("DOMMouseScroll",
				function(e) {
//					console.log("mousescroll");
					zoomimgadjust(e);
				});

		jQuery("#zoomimgbox,#zoomimglayer_bg").bind("mousewheel", function(e) {
//			console.log("mousewheel");
			zoomimgadjust(e);
		});

		jQuery("#zoomimgbox").bind("mousedown", function(e) {
			zoomdrag(e, 1);
		});

		jQuery("#zoomimgbox").bind("mousemove", function(e) {
			zoomdrag(e, 2);
		});

		jQuery("#zoomimgbox").bind("mouseup", function(e) {
			zoomdrag(e, 3);
		});
	}
}

function zoomimgresize(obj) {
	zoomobj['img_info'] = [ obj.width, obj.height ];
	var r = obj.width / obj.height;
	var w = document.body.clientWidth * 0.95;
	w = obj.width > w ? w : obj.width;
	var h = w / r;
	var clientHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight
			: document.body.clientHeight;
	var scrollTop = document.body.scrollTop ? document.body.scrollTop
			: document.documentElement.scrollTop;
	if (h > clientHeight) {
		h = clientHeight;
		w = h * r;
	}
	var l = (document.body.clientWidth - w) / 2;
	var t = h < clientHeight ? (clientHeight - h) / 2 : 0;
	t += +scrollTop;
	zoomobj['x'] = (l - zoomobj['img_info']['left']) / 5;
	zoomobj['y'] = (t - zoomobj['img_info']['top']) / 5;
	zoomobj['w'] = (w - zoomobj['img_obj'].width) / 5;
	zoomobj['h'] = (h - zoomobj['img_obj'].height) / 5;
	TK.$('zoomimglayer').style.filter = '';
	TK.$('zoomimglayer').innerHTML = '';
	zoomST(1);
}

function zoom(img_obj, img_src) {
	if (!img_src) {
		img_src = img_obj.src;
	}

	if (!TK.$('zoomimglayer_bg')) {
		div = document.createElement('div');
		div.id = 'zoomimglayer_bg';
		div.style.position = 'fixed';
		div.style.left = div.style.top = '0px';
		div.style.width = '100%';
		div.style.height = document.body.scrollHeight + 'px';
		div.style.backgroundColor = '#000';
		div.style.display = 'none';
		div.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=80,finishOpacity=100,style=0)';
		div.style.opacity = 0.8;
		TK.$('append_parent').appendChild(div);

		div = document.createElement('div');
		div.id = 'zoomimglayer';
		div.style.position = 'fixed';
		div.className = 'popupmenu_popup';
		div.style.padding = 0;
		TK.$('append_parent').appendChild(div);
	}

	zoomobj['img_info'] = {
		'left' : 100,
		'top' : 100
	}; // srcinfo
	zoomobj['img_obj'] = img_obj; // srcobj
	zoomobj['img_src'] = img_src; // zimg

	var $zoomimglayer = TK.$('zoomimglayer');

	$zoomimglayer.style.display = '';
	$zoomimglayer.style.left = zoomobj['img_info']['left'] + 'px';
	$zoomimglayer.style.top = zoomobj['img_info']['top'] + 'px';
	$zoomimglayer.style.width = zoomobj['img_obj'].width + 'px';
	$zoomimglayer.style.height = zoomobj['img_obj'].height + 'px';
	$zoomimglayer.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=40,finishOpacity=100,style=0)';
	$zoomimglayer.style.opacity = 0.4;
	$zoomimglayer.style.zIndex = 999;
	$zoomimglayer.innerHTML = '<div style="position:absolute;top:-100000px;visibility:hidden"><img onload="zoomimgresize(this)" src="'
			+ zoomobj['img_src'] + '"></div>';

}

function zoomclose() {
	TK.$('zoomimglayer').innerHTML = '';
	TK.$('zoomimglayer').style.display = 'none';
	TK.$('zoomimglayer_bg').style.display = 'none';
}

function addZoom(selector) {
	jQuery(selector).each(function(i) {
		var that = jQuery(this);
		that.click(function() {
			zoom(that[0]);

		});

	});
}
