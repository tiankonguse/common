<div class="bdsharebuttonbox" data-tag="share_1">
	<a class="bds_mshare" data-cmd="mshare"></a> <a class="bds_qzone"
		data-cmd="qzone" href="#"></a> <a class="bds_tsina" data-cmd="tsina"></a>
	<a class="bds_baidu" data-cmd="baidu"></a> <a class="bds_renren"
		data-cmd="renren"></a> <a class="bds_tqq" data-cmd="tqq"></a>
</div>
<script>
	window._bd_share_config = {
	    common : {
		"bdSnsKey" : {
		    "tsina" : "4191660266",
		    "tqq" : "801471730"
		},
		bdText : '',
		bdDesc : '',
		bdUrl : '',
		bdPic : ''
	    // 此处放置通用设置
	    },
	    share : [
	    // 此处放置分享按钮设置
	    ],
	    slide : [ {
		"type" : "slide",
		"bdImg" : "3",
		"bdPos" : "right",
		"bdTop" : "250"
	    } ],
	    image : [
	    // 此处放置图片分享设置
	    ],
	    selectShare : [
	    // 此处放置划词分享设置
	    ]
	}
	function bdShare() {
	    with (document)
		0[(getElementsByTagName('head')[0] || body)
			.appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
			+ ~(-new Date() / 36e5)];
	}
	jQuery(document).ready(function() {
	    var that = window._bd_share_config.common;
	    that.bdComment = jQuery(".post").text().replace(/\s{2,}/g, " ").substring(0, 100);
	    bdShare();
	});
</script>

