<?php
	session_start();
	$link = mysql_connect('localhost', 'database_name_goese_herer', 'PAssword_goes_here');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	$db_selected = mysql_select_db('vishalkh_chess', $link);
	if (!$db_selected) {
		die ('Can\'t use foo : ' . mysql_error());
	}
	$result = mysql_query('SELECT SQL_NO_CACHE  `name`,`ip` FROM `chess`',$link);
	$array = array();
	$i=0;
	while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
		$array[$i]=array();
		 $array[$i]['name']=$row[0];
		 $array[$i]['ip']=$row[1];
		 $i++;
	}	
	$result = mysql_query("INSERT INTO `vishalkh_chess`.`chess` ( `name` , `requestfrom` , `ip` ) VALUES ( '".$_POST['name']."', '', '".$_SERVER['REMOTE_ADDR']."' )",$link);
	$array["addedme"]=mysql_affected_rows();
	$array["ip"]=$_SERVER['REMOTE_ADDR'];
	$result = mysql_query("SELECT `id` FROM `vishalkh_chess`.`chess` where `name`='".$_POST['name']."' AND `ip`='".$_SERVER['REMOTE_ADDR']."'");
	$row = mysql_fetch_array($result, MYSQL_NUM);
	$_SESSION['id']=$row[0];
	$array["id"]=$row[0];
	mysql_close($link);
	echo  json_encode($array);
	//;
?>