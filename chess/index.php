<?php
	session_start();
/*	$link = mysql_connect('localhost', 'database_name_goese_herer', 'PAssword_goes_here');
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
*/	
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>jQuery Chess Game</title>
<script language="javascript" src="js/jquery-1.7.2.min.js"></script>
<script language="javascript" src="js/event.js"></script>
<script language="javascript" src="js/init.js"></script>
<script language="javascript" src="js/chess.js"></script>
<link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="all">
	<div id="header"></div>
	<div id="menu"></div>
	<div id="body">
		<table border="0" align="center" width="500" id="maintable">
			<thead>
				<tr>
					<th>Select 'Two player' if two users are on same PC</th><th>Select 'Online' if you wanna play chess with other user over internet.</th>
				</tr>			
				<tr>
					<td width="50%"><label>
							<input name="typeofplay" type="radio" value="twoplayer" id="twoplayer">
							Two player</label>
						</td><td>
						<label>
							<input name="typeofplay" type="radio" value="online" id="online">
							Online</label></td>
				</tr>
				<tr id="loader" class="vis-hid">
					<td align="center" colspan="2"><img src="images/ajax-loader.gif" width="220" height="19"></td>
				</tr>
				<tr>
					<td colspan="2" align="center" id="errorMessege"></td>
				</tr>
			</thead>
			<tbody>
				<tr id="onlinetr" class="hide">
					<td align="right">Enter name :</td>
					<td><input name="txtName" id="txtName" type="text">
						<input name="" type="button" id="addme" value="Submit My name"></td>
				</tr>
			</tbody>
			<tfoot>
			</tfoot>
		</table>
		<div>&nbsp;</div>
		<div id='popup'></div>
		<div>&nbsp;</div>
		<div id="chess" class="chess hide"></div>
		<!--div>&nbsp;</div>
		<div id="orientationDiv">
			<label><input name="orientaion" type="radio" value="whitebottom" id="whitebottom" />  White on bottom</label><br>
			<label><input name="orientaion" type="radio" value="whitetop" id="whitetop" />  White on top</label>
		</div-->
		<div>&nbsp;</div>		
		
	</div>
	<div id="footer">&copy; <a href="http://www.jquerypluginscripts.com">http://www.jquerypluginscripts.com</a></div>
</div>
</body>
</html>
