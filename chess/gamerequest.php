<?php
	session_start();
	if(!isset($_SESSION['id']))
	{
		exit (0);
	}
	$link = mysql_connect('localhost', 'database_name_goese_herer', 'PAssword_goes_here');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	$db_selected = mysql_select_db('vishalkh_chess', $link);
	if (!$db_selected) {
		die ('Can\'t use foo : ' . mysql_error());
	}
	//;
	$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `requestfrom` = '".$_POST['rename']."' WHERE `chess`.`name` = '".$_POST['name1']."'  LIMIT 1 ",$link);
	mysql_close($link);
	if($result)
		echo "Success";	
	else 	echo "Fail";	
?>