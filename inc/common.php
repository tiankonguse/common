<?php
if (! defined ( "COMMON_LOAD" )) {
    // BASE work in server
    // DOMAIN work in client
    
    ! defined ( "COMMON_LOAD" ) && define ( "COMMON_LOAD", true );
    ! defined ( "BASE" ) && define ( "BASE", dirname ( dirname ( dirname ( __FILE__ ) ) ) . "/" );
    
    
    ! defined ( "_DOMAIN" ) && define ( "_DOMAIN", "tk.com:8080" );
    ! defined ( "DOMAIN" ) && define ( "DOMAIN", "http://"._DOMAIN );
    
    ! defined ( "BASE_COMMON" ) && define ( "BASE_COMMON", BASE . "common/" );
    ! defined ( "BASE_INC" ) && define ( "BASE_INC", BASE_COMMON . "inc/" );
    
    ! defined ( "DOMAIN_COMMON" ) && define ( "DOMAIN_COMMON", DOMAIN . "/common/" );
    ! defined ( "DOMAIN_IMG" ) && define ( "DOMAIN_IMG", DOMAIN_COMMON . "img/" );
    ! defined ( "DOMAIN_JS" ) && define ( "DOMAIN_JS", DOMAIN_COMMON . "js/" );
    ! defined ( "DOMAIN_CSS" ) && define ( "DOMAIN_CSS", DOMAIN_COMMON . "css/" );
    ! defined ( "DOMAIN_kindeditor" ) && define ( "DOMAIN_kindeditor", DOMAIN_COMMON . "kindeditor/" );
    ! defined ( "DOMAIN_datepicker" ) && define ( "DOMAIN_datepicker", DOMAIN_COMMON . "datepicker/" );
    
    ! defined ( "DOMAIN_HOME" ) && define ( "DOMAIN_HOME", DOMAIN . "/i/" );
    ! defined ( "DOMAIN_RECORD" ) && define ( "DOMAIN_RECORD", DOMAIN . "/record/" );
    ! defined ( "DOMAIN_RJBQ" ) && define ( "DOMAIN_RJBQ", DOMAIN . "/rjbq/" );
    ! defined ( "DOMAIN_LOG" ) && define ( "DOMAIN_LOG", DOMAIN . "/log/" );
    ! defined ( "DOMAIN_TIMELINE" ) && define ( "DOMAIN_TIMELINE", DOMAIN . "/timeline/" );
    ! defined ( "DOMAIN_LAB" ) && define ( "DOMAIN_LAB", DOMAIN . "/lab/" );
}
?>
