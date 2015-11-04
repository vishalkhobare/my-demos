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
	{
		$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `ack` = '' WHERE `chess`.`name` = '".$_POST['nowname']."'   LIMIT 1 ",$link);
		if(!$result)
			echo "Fail";
		else{
			if(isset($_POST['oppid']))
			{
				$_SESSION["gameslot"]=$_SESSION['id']."_".$_POST['oppid'];				
				//$_SESSION["id"]=$_POST['id'];
			}
		}
	}	
	mysql_close($link);
	if($result)
		echo "Success";	
	else 	echo "Fail";	
?>