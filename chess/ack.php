<?php
	session_start();
	if(!isset($_SESSION['id']))
	{
		echo "Illegel request";
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
	//echo "_POST['confirmGame']  ".$_POST['confirmGame']=='y'."	";
	if($_POST['confirmGame']=='y')
	{
		$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `ack` = 'y|".$_POST['nowname']."|".$_POST['nowip']."|".$_SESSION['id']."' WHERE `chess`.`name` = '".$_POST['name1']."'  LIMIT 1 ",$link);
		if(!$result)
			echo "Fail";
		$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `requestfrom` = '' WHERE `chess`.`name` = '".$_POST['nowname']."' LIMIT 1 ",$link);
		if(!$result)
			echo "Fail";
		$result = mysql_query("INSERT INTO `vishalkh_chess`.`games` (`matchid`, `lastmove`, `currentplayer`) VALUES ('".$_POST['oppoid']."_".$_SESSION['id']."', 'START', 'W')",$link);
		$_SESSION['gameslot']=$_POST['oppoid']."_".$_SESSION['id'];
		if($result)
		{			
			$_SESSION['color']='black';
		}
		else if(!$result)
			echo "Fail";			
	}
	else 
	{
		$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `ack` = 'n|".$_POST['nowname']."|".$_POST['nowip']."|".$_SESSION['id']."' WHERE `chess`.`name` = '".$_POST['name1']."'  LIMIT 1 ",$link);
		if(!$result)
			echo "Fail";
		$result = mysql_query("UPDATE `vishalkh_chess`.`chess` SET `requestfrom` = '' WHERE `chess`.`name` = '".$_POST['nowname']."'  LIMIT 1 ",$link);
		if(!$result)
			echo "Fail";
	}
	mysql_close($link);
	if($result)
		echo "Success";	
	else 	echo "Fail";	
?>