var ctx;
var ah=50,cw,ch;
var ang;
var timeFrame=10;// timer of the game
var plansOnBoard=[];
var airStripCanvasX=0,airStripCanvasY=0;
var mapFactorX,mapFactorY;
var mapCanvasCtx;
var strip;
var msgs;

function initAndStartGame(){
	if(plansOnBoard.length>1){
		return false;
	}
	
	/*var html1="<table>";
	for(i=0;i<=361;i++){
		html1+="<tr><td>"+i+"</td><td>"+Math.tan(i*Math.PI/180)+"</td></tr>";
	}
	html1+="</table>";
	$("body").html(html1);
	
	
	/*
		>90 && <=180
		>270 && <=360 is -ve slope
	

	return false;
		*/
	var i=0,j=0;
	
	
	ctx=document.getElementById('airport').getContext('2d');
	cw=$("#airport").attr('width');
	ch=$("#airport").attr('height');	
	drawAirStrip();
	
	
	//plansOnBoard[1].landAndPark();
	//plansOnBoard[2]=new airplane(100,500,360,100,$("<div class='f22'></div>"),"clockwise");
	//plansOnBoard[3]=new airplane(200,200,360,100,$("<div class='f18'></div>"),"clockwise");
	
	var leftButtonDown = false;
	
    $(document).mousedown(function(e){
        // Left mouse button was pressed, set flag
        if(e.which === 1) 
		{
			leftButtonDown = true;
			
			for(i in plansOnBoard){
				//setTimeout(				function(){
					plansOnBoard[i].mouseEvent(leftButtonDown,e.pageX,e.pageY);
				//},10);
				
			}
		}
		else {
			for(i in plansOnBoard){
				plansOnBoard[i].mouseEventReset();
			}
		}
    });
    $(document).mouseup(function(e){
        // Left mouse button was released, clear flag
        if(e.which === 1) leftButtonDown = false;
		for(i in plansOnBoard){
				plansOnBoard[i].mouseEvent(leftButtonDown,e.pageX,e.pageY);
			}
			//d.
    });
	  $(document).bind("contextmenu",function(e){
			  $("#panel .info").html('');
              return false;
       });
	
	$(document).keyup(function(e){
		var keyCode = e.keyCode || e.which;
		
		if(keyCode==112){
			$("#screenBlackOut").show();
			//$("#screenBlackOut .initial").hide();
			$("#screenBlackOut .help").show();
		}
	});
	

/*	d.setCors(20,400,300);
	
	d.setCors(120,800,300);
	//d.rotateClockwise();
	a	ng=90;
	setInterval(function(){
		//d.rotateClockwise();
		ang++;
	},10);*/
	//d.movePlane({angle:150,x:130,y:200},{angle:170,x:700,y:600});
	//d.moveTo(500,500);
	
	//fightersParkingSlots
	airStripCanvasX=$('#airport').offset().left,airStripCanvasY=$('#airport').offset().top;
	

	$("#panel").css({
		left:($(window).width()-$("#panel").width())/2
	});
	
	for(i in passengerParkingSlots){
		plansOnBoard[j]=new airplane(400,500,47,planeRotationRadiusinm,planeTypes["passengerPlane"],"clockwise",timeFrame,"parked",passengerParkingSlots[i],"civilAirline");
		j++;		
		//
	}
	/*i++;////////////////////deleted
	plansOnBoard[j]=new airplane(400,500,47,100,planeTypes["passengerPlane"],"clockwise",timeFrame,"parked",passengerParkingSlots[i],"civilAirline");*/
	var pl=0;
	for(i in fightersParkingSlots){
		plansOnBoard[j]=new airplane(400,500,50,planeRotationRadiusinm,planeTypes["Sukhoi33"],"clockwise",timeFrame,"parked",fightersParkingSlots[i],"fighter");
		j++;
		pl++;
		if(pl==$("#gameDifficultyLEvel").val()){
			break;
		}
	}	
	strip=new airstrip();
	
	for(i in plansOnBoard){
		if(plansOnBoard[i].getType()=="fighter"){
			plansOnBoard[i].launchAfterRandomTime();
			//plansOnBoard[i].launch();
		}
	}
	
	$('body').on('click','.buttonTest',function(){
		$(this).toggleClass('start');
	});
	$("#panel").mouseenter(function(){
		for(i in plansOnBoard){
			plansOnBoard[i].setPlaneMotionFlag(false);
		}
	});
	$("#panel").mouseleave(function(){
		for(i in plansOnBoard){
			plansOnBoard[i].setPlaneMotionFlag(true);
		}
	});	
	
	
	radarAnimation();

	
	mapFactorX=$("#smallMap .planeCanvas").width()/$(window).width();
	mapFactorY=$("#smallMap .planeCanvas").height()/$(window).height();
	mapCanvasCtx=$('.planeCanvas').get(0).getContext('2d');
	
	
	setInterval(function(){
		mapCanvasCtx.clearRect(0,0,$("#smallMap .planeCanvas").width(),$("#smallMap .planeCanvas").height());
		for(i in plansOnBoard){
			plansOnBoard[i].placePlaneOnMap();
		}
	},100);
	
	
	

	airport();
	
	startGame();
	

}

$(function(){
	
	/*
	initAndStartGame();
		$("#screenBlackOut").hide();
		$("#screenBlackOut .initial").hide();
	return false;	
		*/

	$(".btnStartGame").click(function(){
		if(msgs==undefined){
			msgs=new msgPlugin();		
		}
		
		initAndStartGame();
		$("#screenBlackOut").hide();
		$("#screenBlackOut .initial").hide();
		
	});
	
	$("#btnShowHelp").click(function(){
		//initAndStartGame();
		//$("#screenBlackOut").hide();
		$("#screenBlackOut .initial").hide();
		$("#screenBlackOut .help").show();
		
	});
	$("#btnStartGameDirect").click(function(){
		$("#screenBlackOut").hide();
		$("#screenBlackOut .initial").hide();
		$("#screenBlackOut .help").hide();
		if(msgs==undefined){
			msgs=new msgPlugin();		
		}		
		initAndStartGame();
		
		
	});
	
	
	
	
	return false;
	
//	alert(parseInt(-123));
	
});