// JavaScript Document
function bindEvents(board,chessJSObj,o)
{
	var curClass;
	var pieceString;
	
	if(o.color=='white' && o.mode=="online"){	
		pieceString=".piece-white-bishop,.piece-white-queen,.piece-white-king";
	}
	else if(o.color=='black' && o.mode=="online"){
		pieceString=".piece-black-bishop,.piece-black-queen,.piece-black-king";
	}
	else if(o.mode=="local"){
		pieceString=".piece-black-bishop,.piece-white-bishop,.piece-black-queen,.piece-white-queen,.piece-black-king,.piece-white-king";
	}
	board.delegate(pieceString, "click", function(){
			//alert(board.data('token'));
			if(o.mode=="online" && !board.data('token')){
				return false;
			}
			if($(this).hasClass('hover-click') || $('.hover-click-originate').length>0)	
				return true;
			$('.hover').addClass('hover-click').removeClass('hover');
			if($('.hover-click').length>0)
			{			if($('.hover-click').length>0)
			{
				$(this).addClass('hover-click-originate');
			}

			}
		}).delegate(pieceString, "mouseleave", function(){
			$('.hover').removeClass('hover');
		}).delegate(pieceString, "mouseenter", function(){
			if($('.hover-click').length>0){
				return false;
			}
			
			var classNm=$(this).attr("class");
			//alert($(this).attr("class"));
			var id=$(this).attr("id").split("");
			var ho=id[0].charCodeAt(0);
			var vo=parseInt(id[1]);			
			if(classNm.search("piece-white")!=-1)
			{
				i=vo+1;
				j=ho+1;				
				while(i<9 && j<73)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1 || classNm.search("-king")!=-1)
						break;
					i++;
					j++;
				}
				
				i=vo-1;
				j=ho+1;							
				while(i>0 && j<73)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;
					i--;
					j++;
				}
				
				i=vo-1;
				j=ho-1;
				while(i>0 && j>64)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;
					i--;
					j--;
				}
				
				
				i=vo+1;
				j=ho-1;
				while(i<9 && j>64)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;

					i++;
					j--;
				}
			}
			// bishop black
			if(classNm.search("piece-black")!=-1)
			{
				i=vo+1;
				j=ho+1;				
				while(i<9 && j<73)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					i++;
					j++;
				}
				
				i=vo-1;
				j=ho+1;							
				while(i>0 && j<73)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					i--;
					j++;
				}
				
				i=vo-1;
				j=ho-1;
				while(i>0 && j>64)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					i--;
					j--;
				}
				
				
				i=vo+1;
				j=ho-1;
				while(i<9 && j>64)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;

					i++;
					j--;
				}
			}
	});	
		
	if(o.color=='white' && o.mode=="online"){
		pieceString=".piece-white-rook,.piece-white-queen,.piece-white-king";
	}
	else if(o.color=='black' && o.mode=="online"){
		pieceString=".piece-black-rook,.piece-black-queen,.piece-black-king";
	}
	else if(o.mode=="local"){
		pieceString=".piece-black-rook,.piece-white-rook,.piece-black-queen,.piece-white-queen,.piece-black-king,.piece-white-king";
	}
	
	board.delegate(pieceString, "click", function(){
				//alert(board.data('token'));
			if(o.mode=="online" && !board.data('token')){	
				return false;
			}
			if($(this).hasClass('hover-click')  || $('.hover-click-originate').length>0)	
				return true;
			$('.hover').addClass('hover-click').removeClass('hover');			if($('.hover-click').length>0)
			{
				$(this).addClass('hover-click-originate');
			}

		}).delegate(pieceString, "mouseleave", function(){$('.hover').removeClass('hover');}).delegate(pieceString, "mouseenter", function(){
			if($('.hover-click').length>0){
				return false;
			}
			var classNm=$(this).attr("class");
			var id=$(this).attr("id").split("");			
			var ho=id[0].charCodeAt(0);
			var vo=parseInt(id[1]);			
			if(classNm.search("piece-white")!=-1)
			{
				i=vo+1;
				j=ho;				
				while(i<9)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;
					i++;
				}
				
				i=vo-1;
				j=ho;				
				while(i>0)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;
					i--;					
				}				
				j=ho-1;
				i=vo;
				while(j>64)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;
					j--;
				}
				j=ho+1;
				i=vo;
				while(j<73)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-white")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-black")!=-1  || classNm.search("-king")!=-1)
						break;
					j++;
				}
			}
			// rook black
			if(classNm.search("piece-black")!=-1)
			{
				i=vo+1;
				j=ho;				
				while(i<9)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					i++;
				}
				
				i=vo-1;
				j=ho;				
				while(i>0)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					i--;					
				}				
				j=ho-1;
				i=vo;
				while(j>64)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					j--;
				}
				j=ho+1;
				i=vo;
				while(j<73)
				{
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
					if(curClass.search("piece-black")!=-1)
						break;
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(curClass.search("piece-white")!=-1  || classNm.search("-king")!=-1)
						break;
					j++;
				}
			}
	});	
	
	if(o.color=='white' && o.mode=="online"){
		pieceString=".piece-white-knight";
	}
	else if(o.color=='black' && o.mode=="online"){
		pieceString=".piece-black-knight";
	}
	else if(o.mode=="local"){
		pieceString=".piece-white-knight,.piece-black-knight";
	}
	board.delegate(pieceString, "click", function(){
			//alert(board.data('token'));
			if(o.mode=="online" && !board.data('token')){	
				return false;
			}
			if($(this).hasClass('hover-click') || $('.hover-click-originate').length>0)	
				return true;
			$('.hover').addClass('hover-click').removeClass('hover');			if($('.hover-click').length>0)
			{
				$(this).addClass('hover-click-originate');
			}

		}).delegate(pieceString, "mouseleave", function(){$('.hover').removeClass('hover');}).delegate(pieceString, "mouseenter", function(){
			if($('.hover-click').length>0){
				return false;
			}
			var classNm=$(this).attr("class");
			var id=$(this).attr("id").split("");			
			var ho=id[0].charCodeAt(0);
			var vo=parseInt(id[1]);			
			if(classNm.search("piece-white")!=-1)
			{
				i=vo+2;
				j=ho+1;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i<9 && curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo+2;
				j=ho-1;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i<9 && curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-2;
				j=ho+1;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i>0 &&curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-2;
				j=ho-1;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i>0 &&curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo+1;
				j=ho+2;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i<9 && curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo+1;
				j=ho-2;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i<9 && curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-1;
				j=ho+2;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i>0 && curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-1;
				j=ho-2;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i>0 && curClass.search("piece-white")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}												
				
			}
			// rook black
			if(classNm.search("piece-black")!=-1)
			{
i=vo+2;
				j=ho+1;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i<9 && curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo+2;
				j=ho-1;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i<9 && curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-2;
				j=ho+1;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i>0 &&curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-2;
				j=ho-1;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i>0 &&curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo+1;
				j=ho+2;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i<9 && curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo+1;
				j=ho-2;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i<9 && curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-1;
				j=ho+2;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && i>0 && curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}
				
				i=vo-1;
				j=ho-2;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && i>0 && curClass.search("piece-black")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
				}										
			}
	});	

	if(o.color=='white' && o.mode=="online"){
		pieceString=".piece-white-pawn";
	}
	else if(o.color=='black' && o.mode=="online"){
		pieceString=".piece-black-pawn";
	}
	else if(o.mode=="local"){
		pieceString=".piece-white-pawn,.piece-black-pawn";
	}

	board.delegate(pieceString, "click", function(){
			//alert(board.data('token'));
			if(o.mode=="online" && !board.data('token')){	
				return false;
			}
			if($(this).hasClass('hover-click') || $('.hover-click-originate').length>0)	
				return true;
			$('.hover').addClass('hover-click').removeClass('hover');			if($('.hover-click').length>0)
			{
				$(this).addClass('hover-click-originate');
			}

		}).delegate(pieceString, "mouseleave", function(){$('.hover').removeClass('hover');}).delegate(pieceString, "mouseenter", function(){
			if($('.hover-click').length>0){
				return false;
			}
			var classNm=$(this).attr("class");
			var id=$(this).attr("id").split("");			
			var ho=id[0].charCodeAt(0);
			var vo=parseInt(id[1]);			
			if(classNm.search("piece-white")!=-1)
			{
				i=vo+1;
				j=ho;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(i<9 && curClass.search("piece-")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(i<9 && i==3 && $("#"+String.fromCharCode(j)+(i+1)).attr('class').search("piece-")==-1)
					{
						$("#"+String.fromCharCode(j)+(i+1)).addClass('hover');
					}	
				}
				j=ho+1;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && curClass.search("piece-black")!=-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');					
				}	
				j=ho-1;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && curClass.search("piece-black")!=-1)
				
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');					
				}
			}
			if(classNm.search("piece-black")!=-1)
			{
				i=vo-1;
				j=ho;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(i>0 && curClass.search("piece-")==-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');
					if(i<9 && i==6 && $("#"+String.fromCharCode(j)+(i-1)).attr('class').search("piece-")==-1)
					{
						$("#"+String.fromCharCode(j)+(i-1)).addClass('hover');
					}	
				}
				j=ho+1;
				curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j<73 && curClass.search("piece-white")!=-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');					
				}	
				j=ho-1;
				if(j>64)
					curClass=$("#"+String.fromCharCode(j)+i).attr('class');
				if(j>64 && curClass.search("piece-white")!=-1)
				{
					$("#"+String.fromCharCode(j)+i).addClass('hover');					
				}
			}
	});	
	board.delegate(".hover-click", "click", function(){
			//alert(board.data('token'));
		if(o.mode=="online" && !board.data('token')){	
				return false;
		}
		var originator=board.find('.hover-click-originate');
		if(originator.length==1)
		{
			var thiz=$(this);
			var classNm=thiz.attr('class');
			var move=originator.attr('id')+"|"+thiz.attr('id');
			classNm=classNm.split(" ");
			for(i=0;i<classNm.length;i++){
				if(classNm[i].search("piece-")!=-1)
				{
					thiz.removeClass(classNm[i]);
					break;
				}				
			}
			
			classNm=board.find('.hover-click-originate').attr('class');			
			classNm=classNm.split(" ");
			for(i=0;i<classNm.length;i++){
				if(classNm[i].search("piece-")!=-1)
				{
					thiz.addClass(classNm[i]);
					break;
				}				
			}

			$('.hover-click').removeClass('hover-click');
			originator.removeClass(classNm[i]).removeClass('hover-click-originate');
			board.data('token',false);
			thiz.trigger('mouseenter');
			var targetColor;
			if(o.color=="white"){
				targetColor="B";
			}
			else if(o.color=="black"){
				targetColor="W";
			}
			if(o.mode=="online")
			{				
				$('.disable-board').show();
				$("#popup").html("Please wait for your turn.");
				 $.ajax({
					type: "POST",
					url: "gameMoves.php",
					cache: false,
					data: "move1="+move+"&color="+targetColor,
					success: function(data){
						if(data=="Success"){
							if(o.color=="white"){
								targetColor="W";
							}
							else if(o.color=="black"){
								targetColor="B";
							}
							trackGameMoves=self.setInterval("trackGameMovesFun('"+targetColor+"')",1000);
						}
				}});
			}
		}
	});	
	
	board.delegate(".block-black,.block-white", "click", function(){		
		if($(this).hasClass('hover-click-originate')||  $(this).hasClass('hover-click'))
			return true;
		$('.hover-click-originate,.hover-click').removeClass('hover-click-originate').removeClass('hover-click');
	});		
	
}