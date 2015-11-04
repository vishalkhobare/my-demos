<?php	
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
	mysql_close($link);
	if($result)
		echo "Success";	
	else 	echo "Fail";	
?>