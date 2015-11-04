// JavaScript Document
var board;
(function($){
	$.fn.chess=function(option){
		var thiz=$(this);		
				
		thiz.append('<div class="board"></div>');
		thiz.append('<div class="disable-board"></div>');
		board=thiz.find($(".board"));		
		var chessJSObj=new Array();
		if(option.mode=="online")
			board.data('token',option.token);
		if(thiz.data('token')!='true')
			renderMethod.placePiecesOrientation(board,chessJSObj,option.orientation,option);
		thiz.data('init','true');

	}
})(jQuery);

var refreshUserListTimer,trackGameMoves,ip,name,ajaxflag=true,id,trackGameMovesFunFlag=true;;
	function trackGameMovesFun(co)
	{
		if(!trackGameMovesFunFlag)
			return true;
		trackGameMovesFunFlag=false;
		 $.ajax({
			type: "POST",
			url: "trackGameMovesFun.php",
			cache: false,
			data: "",
			dataType :"json",
			success: function(data){
					if(data!=null &&  data[0]!=undefined && data[0]["color"]==co){
						window.clearInterval(trackGameMoves);
						board.data('token',true);
						$("#popup").html("It's your turn now.");
						var move=data[0]["move"].split("|");
						var idofsq=move[0];
						var classNm=$("#"+idofsq).attr('class');
						var trClassNm="";
						classNm=classNm.split(" ");
						for(i=0;i<classNm.length;i++){
							if(classNm[i].search("piece-")!=-1)
							{								
								trClassNm=classNm[i];
								$("#"+idofsq).removeClass(classNm[i]);								
								break;
							}				
						}
						idofsq=move[1];
						classNm=$("#"+idofsq).attr('class');
						classNm=classNm.split(" ");
						for(i=0;i<classNm.length;i++){
							if(classNm[i].search("piece-")!=-1)
							{
								$("#"+idofsq).removeClass(classNm[i]);
								break;
							}				
						}
						$("#"+idofsq).addClass(trClassNm);
						$('.disable-board').hide();
					}
					trackGameMovesFunFlag=true;
		}});
	}
	function placeUserList(data){
		var len=0;
		$("#maintable tbody").html('');
		for(i in data)
		{			
			if(name!=data[i]["name"] && i!="ip" && i!="addedme"  && i!="requestfrom"  && i!="ack" && i!="id")//&& data[i]["ip"]!=ip)
			{
				var r=data[i]["ip"];
				r = r.replace(/\./g,"_");
				len++;				
				$("#maintable tbody").append("<tr><td colspan='2'> <input name='"+data[i]["name"]+"' primaryid='"+data[i]["id"]+"' id='"+data[i]["name"]+"' ip='"+r+"'  value='"+data[i]["name"]+"' type='checkbox' > "+data[i]["name"]+"</td></tr>");
			}
		}
		if(len==0)
		{
			$("#connect").attr("disabled","true");
			$("#errorMessege").addClass('error').html("No user online. You can open the same demo chess URL in other browser and add different name as user. Then the name will appear below as user with whom you will be able to play chess from this browser. Please refer details page for further information and help.");
			
		}
		else if(len>0)
		{
			$("#connect").removeAttr("disabled");
			$("#maintable tbody").prepend("<tr><td colspan='2'>Below is the list of users who are online. Please select and click \"Connect\" to start a game.</td></tr>");
			$("#errorMessege").html("");
			
		}

		if(data["requestfrom"]!=undefined && data["requestfrom"]!='')
		{
			//if($("#popup").length==0)
			{
				var r=(data["requestfrom"].split("|"))[0];	
				var i=(data["requestfrom"].split("|"))[1];
				var id1=(data["requestfrom"].split("|"))[2];
				$("#popup").html(r+" is requesting for new chess game. Do you wanna play with "+r+" ?</p><p><a href='javascript:void(0)' primaryid='"+id1+"' id='yesChessPlay' ip='"+i+"' name='"+r+"'>Yes </a> <a href='javascript:void(0)'  id='noChessPlay'  ip='"+i+"' name='"+r+"'> No</a></p></div>");
			}
		}
		if(data["ack"]!=undefined && data["ack"]!='')
		{
			if(data["ack"][0]=='n')
			{
				var r=(data["ack"].split("|"))[1];	
				var i=(data["ack"].split("|"))[2];
				$("#popup").html(r+" rejected to play chess with u.");
				 $.ajax({
					type: "POST",
					url: "resetRequests.php",
					cache: false,
					data: "nowname="+namenowname+"&nowipnowname="+ip,
					dataType :"json",
					success: function(data){
					if(data=="Success")
					{	//$("#popup").html("Successfully rejected game");
					}
					else ;//$("#popup").html("Some error in rejecting game");
				}});
			}
			if(data["ack"][0]=='y')
			{	
				window.clearInterval(refreshUserListTimer);
				$("#maintable").hide();
				 $.ajax({
					type: "POST",
					url: "resetRequests.php",
					cache: false,
					data: "nowname="+name+"&nowip="+ip+"&oppid="+((data["ack"]).split("|"))[3],
					success: function(data){
						
					if(data=="Success")
					{
						$("#popup").html("The game has started. You have white pieces.");
						$("#chess").show().chess({
							orientation:"bottom",
							mode:'online',
							color:'white',
							token:true
						});
					}					
				}});
			}
		}
	}
	function refreshUserList(name,ip){
		if(ajaxflag)
		{
			ajaxflag=false;
			$("#loader").attr('class','vis-vis');
			 $.ajax({
				type: "POST",
				url: 'refreshUserList.php?' + (new Date()).getTime(),
				cache: false,
				data: "name1="+name+"&ip1="+ip,			
				dataType :"json",
			success: function(data){
						$("#maintable tbody").find($("#onlinetr")).nextAll().remove();						
						placeUserList(data);
						ajaxflag=true;
						$("#loader").attr('class','vis-hid');
			}});
		}
	}
	var refreshOnlineStatusFlash=true;
	function refreshOnlineStatus(){
		if(refreshOnlineStatusFlash)
		{
			refreshOnlineStatusFlash=false;
			 $.ajax({
				type: "POST",
				url: "refreshOnlineStatus.php",
				cache: false,
				data: "nowname="+name,
				success: function(data)
				{
					refreshOnlineStatusFlash=true;
					if(data!="Success")
					{
						//alert('Some error in refreshing server.');	
					}
				}
			});
		}
	}
	$(function(){
		
		$("#online").click(function(){
			$("#chess").html('').hide();
			$("#onlinetr").show();
			
		});
		$("#twoplayer").click(function(){
			$("#chess").show().chess({
				orientation:"bottom",
				mode:'local'
			});
			$("#onlinetr").hide();
			$("#maintable").hide();
		});
		$("#yesChessPlay").live('click',function(){
			var r=$(this).attr('name');
			var i=$(this).attr('ip');
			var opponentId=$(this).attr('primaryid');
			$("#popup").html("");
			//alert(opponentId);
			 $.ajax({
				type: "POST",
				url: "ack.php",
				cache: false,
				data: "name1="+r+"&ip1="+ip+"&nowname="+name+"&nowip="+ip+"&confirmGame="+'y'+"&oppoid="+opponentId,				
			success: function(data){
				if(data=="Success")
				{
					$("#popup").html("The game with "+r+" has started. You have black pieces. Please wait for your turn.");
					$("#chess").show().chess({
						orientation:"bottom",
						mode:'online',
						color:'black',
						token:false
					});										
					$('.disable-board').show();
					$("#maintable").hide();
					window.clearInterval(refreshUserListTimer);
					trackGameMoves=self.setInterval("trackGameMovesFun('B')",1000);
				}
				else $("#popup").html("Some error in accepting game");
			}});
		});
		$("#noChessPlay").live('click',function(){
			var r=$(this).attr('name');
			var i=$(this).attr('ip');
			$("#popup").html("");
			$.ajax({
				type: "POST",
				url: "ack.php",
				cache: false,
				data: "name1="+r+"&ip1="+ip+"&nowname="+name+"&nowip="+ip+"&confirmGame="+'n',
				success:function(data){
				if(data=="Success")
					$("#popup").html("Successfully rejected game");
				else $("#popup").html("Some error in rejecting game");
			}});
		});
		$("#addme").click(function(){
			if($("#txtName").val().length>0)
			{
				name=$("#txtName").val();
				setInterval('refreshOnlineStatus()',3000);
				//alert( "'"+name+"="+$("#txtName").val()+"'");
				$("#loader").attr('class','vis-vis');
				 $.ajax({
					type: "POST",
					url: "addUser.php",
					cache: false,
					data: "name="+$("#txtName").val(),
					dataType :"json",
					success: function(data){
						placeUserList(data);					
						$("#maintable tfoot").append("<tr><td><input name='' id='connect' value='Connect' type='button'></td></tr>");
						ip=data["ip"];
						id=data["id"];
						$("#loader").attr('class','vis-hid');
						refreshUserList(name,ip);
						refreshUserListTimer=self.setInterval("refreshUserList('"+name+"','"+ip+"')",5000);
				}});
			}
			$("#maintable").delegate("#connect","click",function(){
				$("#loader").attr('class','vis-vis');
				var r=$(":checked",$("#maintable tbody")).filter(':first');				
				r.attr('ip',r.attr('ip').replace(/\_/g,"\."));
				 $.ajax({
					type: "POST",
					url: "gamerequest.php",
					cache: false,
					data: "rename="+name+"|"+ip+"|"+id+"&name1="+r.val()+"&ip1="+r.attr('ip'),
					dataType :"text",
					success: function(data){
						$("#loader").attr('class','vis-hid');
							if(data=="Success")
							{
								$("#errorMessege").addClass('success').html("Requested "+r.val()+" for game.");
							}
							else if(data=="Fail")
							{
								$("#errorMessege").addClass('error').html("Game request to "+r.val()+" failed.");
							}
							else {
								$("#errorMessege").html("Unknown error.");
						}	
				}});

			});			
			$("#onlinetr").html('<td></td>');
		});		
	});