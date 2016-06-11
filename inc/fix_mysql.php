<?php

if(!function_exists("mysql_connect")){
    function mysql_connect($server, $username, $password){
        global $conn;
        return mysqli_connect($server, $username, $password);
    }
}

function db_function_help($oldFun, $newFun){
    if(!function_exists($oldFun)){
        $commonHead = 'global $conn;if(!$link){$link=$conn;} return ' . $newFun .'($link, $param);';
        return create_function('$param,$link=false', $commonHead);
    }else{
        return $oldFun;
    }
}

if(!function_exists("mysql_query")){
    function mysql_query($sql, $link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_query($link, $sql); 
    }
}

if(!function_exists("mysql_select_db")){
    function mysql_select_db($dbname, $link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_select_db($link, $dbname);

    }
}

if(!function_exists("mysql_real_escape_string")){
    function mysql_real_escape_string($unescape_string, $link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_real_escape_string($link, $unescape_string);
    }
}


if(!function_exists("mysql_fetch_array")){
    function mysql_fetch_array($result, $link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_fetch_array($result);
    }
}

if(!function_exists("mysql_num_rows")){
    function mysql_num_rows($result, $link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_num_rows($result);
    }
}


if(!function_exists("mysql_insert_id")){
    function mysql_insert_id($link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_insert_id($link);
    }
}


if(!function_exists("mysql_close")){
    function mysql_close($link = false){
        global $conn;
        if(!$link){
            $link = $conn;
        }
        return mysqli_close($link);
    }
}

