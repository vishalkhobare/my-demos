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
		$result = mysql_query("select UNIX_TIMESTAMP(CURRENT_TIMESTAMP) ",$link);
		$time = mysql_fetch_array($result, MYSQL_NUM);
		$result = mysql_query("select UNIX_TIMESTAMP(`lastresponse`),`id`,`name` from `chess`",$link);
		while ($row = mysql_fetch_array($result, MYSQL_NUM)) 
		{
			$r=(int)$row[0]-((int)$time[0]);
			if($r<0)
				$r=$r*-1;
			if($r>10)
			{
				$re = mysql_query("DELETE FROM chess where `id`='".$row[1]."'",$link);
				
			}
		}	
	}
	
	
	
	
	$result = mysql_query('SELECT SQL_NO_CACHE  `name`,`ip`,`id` FROM `chess`',$link);
	$array = array();
	$i=0;
	while ($row = mysql_fetch_array($result, MYSQL_NUM)) {
		 $array[$i]['name']=$row[0];
		 $array[$i]['ip']=$row[1];
		 $array[$i]['id']=$row[2];
		 $i++;
	}	
	$result = mysql_query("SELECT SQL_NO_CACHE `requestfrom`,`ack`,`id` FROM `chess` where `ip`='".$_POST['ip1']."' AND `name`='".$_POST['name1']."'",$link);
	$row = mysql_fetch_array($result, MYSQL_NUM);
	$array['requestfrom']=$row[0];
	$array['ack']=$row[1];
	//$array['requestfrom']="SELECT SQL_NO_CACHE `requestfrom` FROM `chess` where `ip`='".$_POST['ip1']."' AND `name`='".$_POST['name1']."'";
	mysql_close($link);
	echo  json_encode($array);
	//;
?>