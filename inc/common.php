<?php
if (! defined ( "COMMON_LOAD" )) {
	// BASE work in server
	// DOMAIN work in client

	$server_ip = $_SERVER['SERVER_ADDR'];


	! defined ( "COMMON_LOAD" ) && define ( "COMMON_LOAD", true );


	! defined ( "BASE" ) && define ( "BASE", dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/" );


	if(strcmp($server_ip, "127.0.0.1") == 0){
		! defined ( "_DOMAIN" ) && define ( "_DOMAIN", "tk.com" );
	}else{
		! defined ( "_DOMAIN" ) && define ( "_DOMAIN", "tiankonguse.com" );
	}


	! defined ( "DOMAIN" ) && define ( "DOMAIN", "http://"._DOMAIN );


	! defined ( "BASE_COMMON" ) && define ( "BASE_COMMON", BASE . "common/" );
	! defined ( "BASE_INC" ) && define ( "BASE_INC", BASE_COMMON . "inc/" );

	! defined ( "PATH" ) && define ( "PATH", "/");
	! defined ( "PATH_COMMON" ) && define ( "PATH_COMMON", "/common/");
	! defined ( "PATH_IMG" ) && define ( "PATH_IMG", PATH_COMMON."img/");
	! defined ( "PATH_JS" ) && define ( "PATH_JS", PATH_COMMON."js/");
	! defined ( "PATH_CSS" ) && define ( "PATH_CSS", PATH_COMMON."css/");
	! defined ( "PATH_kindeditor" ) && define ( "PATH_kindeditor", PATH_COMMON."kindeditor/");
	! defined ( "PATH_datepicker" ) && define ( "PATH_datepicker", PATH_COMMON."datepicker/");
	! defined ( "PATH_mathjax" ) && define ( "PATH_mathjax", PATH_COMMON."mathjax/");
	! defined ( "PATH_HOME" ) && define ( "PATH_HOME", "/i/");
	! defined ( "PATH_RECORD" ) && define ( "PATH_RECORD", "/record/");
	! defined ( "PATH_RJBQ" ) && define ( "PATH_RJBQ", "/rjbq/");
	! defined ( "PATH_LOG" ) && define ( "PATH_LOG", "/log/");
	! defined ( "PATH_TIMELINE" ) && define ( "PATH_TIMELINE", "/timeline/");
	! defined ( "PATH_LAB" ) && define ( "PATH_LAB", "/lab/");


	! defined ( "DOMAIN_COMMON" ) && define ( "DOMAIN_COMMON", DOMAIN . PATH_COMMON );
	! defined ( "DOMAIN_IMG" ) && define ( "DOMAIN_IMG", DOMAIN . PATH_IMG);
	! defined ( "DOMAIN_JS" ) && define ( "DOMAIN_JS", DOMAIN . PATH_JS );
	! defined ( "DOMAIN_CSS" ) && define ( "DOMAIN_CSS", DOMAIN . PATH_CSS );
	! defined ( "DOMAIN_kindeditor" ) && define ( "DOMAIN_kindeditor", DOMAIN . PATH_kindeditor );
	! defined ( "DOMAIN_datepicker" ) && define ( "DOMAIN_datepicker", DOMAIN . PATH_datepicker );
	! defined ( "DOMAIN_mathjax" ) && define ( "DOMAIN_mathjax", DOMAIN . PATH_mathjax );

	! defined ( "DOMAIN_HOME" ) && define ( "DOMAIN_HOME", DOMAIN . PATH_HOME );
	! defined ( "DOMAIN_RECORD" ) && define ( "DOMAIN_RECORD", DOMAIN . PATH_RECORD );
	! defined ( "DOMAIN_RJBQ" ) && define ( "DOMAIN_RJBQ", DOMAIN . PATH_RJBQ );
	! defined ( "DOMAIN_LOG" ) && define ( "DOMAIN_LOG", DOMAIN . PATH_LOG );
	! defined ( "DOMAIN_TIMELINE" ) && define ( "DOMAIN_TIMELINE", DOMAIN . PATH_TIMELINE );
	! defined ( "DOMAIN_LAB" ) && define ( "DOMAIN_LAB", DOMAIN . PATH_LAB);
}
?>
