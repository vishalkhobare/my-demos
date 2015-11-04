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
	$result = mysql_query("SELECT  SQL_NO_CACHE  `lastmove`,`currentplayer` from `games`  where `matchid` ='".$_SESSION['gameslot']."'",$link);
	$array = array();
	$i=0;
	while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
		$array[$i]=array();
		 $array[$i]['color']=$row[1];
		 $array[$i]['move']=$row[0];
		 $i++;
	}
//	$array['query']="SELECT  SQL_NO_CACHE  `lastmove`,`currentplayer` from `games`  where `matchid` ='".$_SESSION['gameslot']."'";
	mysql_close($link);
	if($result)
	{
		echo  json_encode($array);
	}
	else
	{
		$array["fail"]="fail";
		echo  json_encode($array);
	}
?>