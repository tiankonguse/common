<div class="_message modal-backdrop hide"></div>
<div id="_message" class="modal hide modal-transition">
	<div class="modal-header">
		<button type="button" class="close">×</button>
		<h3 id="messageModalLabel">warnning</h3>
	</div>
	<div class="modal-body">
		<p></p>
	</div>
	<div class="modal-footer">
		<button class="btn ok">确定</button>
	</div>

</div>

<div class="footer">
	<div class="copyright">
		Copyright © 2012 ~
		<script>document.write(new Date().getFullYear());</script>
		<a href="<?php echo DOMAIN?>">tiankonguse.com</a>. All rights
		reserved.
	</div>
	<div class="copyright">联系邮箱：i@tiankonguse.com</div>
	<div class="copyright">QQ : 804345178</div>
	<div class="copyright">如果本站侵犯你的权利，请联系上面邮箱，我会会尽快删除.</div>
	<div class="copyright">
		<script type="text/javascript"
			src="http://tajs.qq.com/stats?sId=26608498" charset="UTF-8"></script>
		<script type="text/javascript">
			var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
			document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F7c743a9badeff72a194b85235f301f37' type='text/javascript'  %3E%3C/script%3E"));
        </script>
		<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1000110679'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s22.cnzz.com/z_stat.php%3Fid%3D1000110679%26show%3Dpic' type='text/javascript' %3E%3C/script%3E"));</script>
	</div>
</div>
<div class="top-btn top-show top-hide"></div>
<script>
function showMessage(message) {
    var $message = $("#_message");
    $message.find(".modal-body>p").text(message);
    $message.addClass("in");
    $("._message.modal-backdrop.hide").addClass("in");
}
(function() {
    if (jQuery) {
		$(document).ready(function() {
	            var $_message = jQuery("#_message");
	            var $_message_ok = jQuery("#_message .ok");
	            var $_message_close = jQuery("#_message .close");
	            var $_message_modal_backdrop = jQuery("._message.modal-backdrop");
	            
	            $_message_close.click(function() {
	                $_message.removeClass("in");
	                $_message_modal_backdrop.removeClass("in");
	            });
	            $_message_ok.click(function() {
	                $_message.removeClass("in");
	                $_message_modal_backdrop.removeClass("in");
	            });
		});
    }
})();
</script>
<script src="<?php echo DOMAIN_mathjax;?>MathJax.js?config=default" type="text/javascript"></script>