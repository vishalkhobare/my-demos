function deselectAllPlanesOnMap(){
	var i;
	//$("#panel .info").html('');
	for(i in plansOnBoard){
		plansOnBoard[i].mouseEventReset();
	}
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function youTubeQueue(){
	var occupied=false;
	
	var api={
		requestVideoPlay:function(obj){
			
			if($('[name="yt"]').filter(':checked').val()=='n'){
				return false;
			}
			if(!occupied){
				occupied=-true;
				var video='<object id="youTubeObject" width="320" height="180">  <param name="movie" value="http://www.youtube.com/v/'+obj.link+'?version=3&enablejsapi=1&autoplay=0"></param>    <param name="allowFullScreen" value="true"></param>  <param name="allowScriptAccess" value="always"></param>  <embed id="youTubeEmbed" src="https://www.youtube.com/v/'+obj.link+'?autoplay=0&version=3&enablejsapi=1" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="320" height="180"></embed></object>';
				$("#youtube").show();
				$("#youtube").html(video);
				currentVideoStartTiming=parseInt(obj.startTime);
				currentVideoEndTiming=parseInt(obj.endTime);
				//
			}
		},
		resetOccupied:function(){
			occupied=false;
			$("#youtube").hide();
		}
	}
	return api;
}
youTubeQueueObj=new youTubeQueue();

function onYouTubePlayerReady(){
//youTubeObject,youTubeEmbed
	//alert(12);
	
	//
	var a=$('#youTubeObject').get(0);
	var b=$('#youTubeEmbed').get(0);
	
	var playTime=(currentVideoEndTiming-currentVideoStartTiming)*1000;
	
	if(a.seekTo){
		//a.seekTo(100,false);
		//currentVideoStartTiming,currentVideoEndTiming;
		//alert('a');
		a.seekTo(currentVideoStartTiming,false);
		a.playVideo();
		setTimeout(function(){
			a.stopVideo();
			setTimeout(function(){
				youTubeQueueObj.resetOccupied();
			},10000);
		},playTime);
	}
	
	else if(b.seekTo){
		//b.seekTo(100,false);
		//currentVideoStartTiming,currentVideoEndTiming;
		//alert('b');
		b.seekTo(currentVideoStartTiming,false);
		b.playVideo();
		setTimeout(function(){
			//b.stopVideo();
			setTimeout(function(){
				youTubeQueueObj.resetOccupied();
			},10000);
		},playTime);
	}
	
	
}
function youtubeAndMessage(msg,link){
	//alert(link);
	$('.messsageBox').prepend(msg+'<br><br>');
	
	if(link!=undefined){
		//alert(link.link);
		youTubeQueueObj.requestVideoPlay(link);
	}
}


function randomCors(maxN,minN){
	var x1,y1;
	
	x1=Math.floor((Math.random()*maxN)+minN); 
	y1=Math.floor((Math.random()*maxN)+minN); 
	
	//alert(x1+"||||||	"+y1);
	
	return {
		x:parseInt(x1),
		y:parseInt(y1)};
	// between 1 and 10
	
	
}

function drawAirStrip(){

	var airportY=($(window).height()/2-$("#airport").height()/2);
	var airportX=($(window).width()/2-$("#airport").width()/2);
	$("#airport").css({
		top:airportY,
		left:airportX
	});
	//planeTypes , planeRotationRadiusinm
	
	var i,j=0;
	for(i in passengerParkingSlots){
		passengerParkingSlots[i]["prelandingX"]=airportX+j*(planeRotationRadiusinm+planeTypes["passengerPlane"]["flyWidth"])*2;
		passengerParkingSlots[i]["prelandingY"]=airportY;
		j++;
	}
	
	
	ctx.fillRect(30,30,cw-60,ch-0);
	ctx.clearRect(ah+30,ah+30,cw-ah*2-60,ch-ah*2-30);
	//ctx.clearRect(10,10,200,100);
	
	ctx.fillRect(0,(ch/2)-(ah/2),cw,ah	);
	ctx.fillStyle="white";
	var i;
	for(i=0;i<parseInt($("#airport").attr("width"));){
		ctx.fillRect(i,((ch/2)-(ah/2)-2+ah/2),10,1);
		i+=20;
	}
}
function mcred(l,t){
	$('.circcle').css({
		top:t,
		left:l
	});
}
function mcblue(l,t){
	$('.circcle1').css({
		top:t,
		left:l
	});
}
function rotateImageSymmetrical(obj,angle){
	obj.css({
		transform: "rotate("+angle+"deg)",
		"-webkit-transform": "rotate("+angle+"deg)",
		"-moz-transform": "rotate("+angle+"deg)",
		"-o-transform":"rotate("+angle+"deg)",
		"-ms-transform":"rotate("+angle+"	deg)" 
	});
}
function resetRotateCenter(obj){
	obj.css({
		"transform-origin":(obj.width()/2)+"px "+(obj.height()/2)+"px" ,
		"-ms-transform-origin":(obj.width()/2)+"px "+(obj.height()/2)+"px" ,
		"-webkit-transform-origin":obj.width()/2+"px "+(obj.height()/2)+"px"
	});
}
function rotateImage(obj,angle){
	obj.css({
		transform: "rotate("+angle+"deg)",
		"-webkit-transform": "rotate("+angle+"deg)",
		"-moz-transform": "rotate("+angle+"deg)",
		"-o-transform":"rotate("+angle+"deg)",
		"-ms-transform":"rotate("+angle+"	deg)",
		"transform-origin":+obj.width()/2+"px "+obj.height()+"px" ,
		"-ms-transform-origin":+obj.width()/2+"px "+obj.height()+"px" ,
		"-webkit-transform-origin":+obj.width()/2+"px "+obj.height()+"px" 
	});
}
function addButton(id,fn){

	if($("#"+id).length>0){
		return $("#"+id);
	}

	var bt=$('<input type="button" class="buttonTest" id="'+id+'" value="'+id+'" />');
	$("#testDivButtonID").append(bt);
	
	bt.click(fn);
	
	return bt;
}
function ctriggerClick(bt,fn){
	if(bt.hasClass('start')){
		fn();
	}
}
function puti(s){
	$("#testDivID").prepend(s+'<br>');
}
var radarAngle=0,radarCtx;
function radarAnimation(){
	var canvas=$("#smallMap .radarCanvas");	
	var i=0;
	var xc=canvas.width()/2,yc=canvas.height()/2;
	
	radarCtx=canvas.get(0).getContext('2d');
	radarCtx.strokeStyle="green";

		for(;i<=xc*2;){
			radarCtx.beginPath();
			radarCtx.arc(xc,yc,i,0,2*Math.PI);
			i+=20;
			radarCtx.stroke();
			//ctx.endPath();
	
		}
		radarCtx.beginPath();
		radarCtx.moveTo(xc,yc);
		radarCtx.lineTo(xc*2,yc);
		radarCtx.stroke();
		resetRotateCenter(canvas);
		canvas.css({
			top:($("#smallMap").height()-canvas.height())/2,
			left:($("#smallMap").width()-canvas.width())/2,
			transform: "rotate("+radarAngle+"deg)",
			"-webkit-transform": "rotate("+radarAngle+"deg)",
			"-moz-transform": "rotate("+radarAngle+"deg)",
			"-o-transform":"rotate("+radarAngle+"deg)",
			"-ms-transform":"rotate("+radarAngle+"	deg)",
			"transform-origin":+xc+"px "+yc+"px" ,
			"-ms-transform-origin":+xc+"px "+yc+"px" ,
			"-webkit-transform-origin":+xc+"px "+yc+"px" 
		});
		var x=1,y,opacity=1;
		for(i=180;i>0;i--){
			radarCtx.beginPath();
			
			m=Math.tan(i*Math.PI/180);
			
			x=xc*Math.sqrt(1/(m*m+1));
			y=m*x;
			//x++;
			
			
			
			radarCtx.moveTo(xc,yc);
			radarCtx.lineTo(x+xc,y+yc);
			
			opacity=opacity-0.01;
			radarCtx.strokeStyle = 'rgba(0,255,0,'+opacity+')';
			radarCtx.stroke();		
			i+=0.5;
		}
	
		
		setInterval(function(){
			rotateImageSymmetrical(canvas,radarAngle);
			radarAngle++;
			if(radarAngle>360){
				radarAngle=0;
			}
		},10);	
}
function msgPlugin(){
	var c=$('<div id="divmessages"></div>');
	$("body").append(c);
	c.css('left',($(window).width()-c.width())/2);
	var api={
		show:function(m,time){
			c.html(m).show();
			if(time!=undefined){
				setTimeout(function(){
					api.hide();
				},time);
			}
		},
		hide:function(){
			c.hide();
		}
	};
	return api;
}

function runwayLandingUseQueue(){
	var occupied=false;	
	var queue=[];
	var currentOccupant;
	var api;
	
	var addToQueue=function(p){
		var i;
		for(i in queue){
			if(p.getPK()==queue[i].getPK()){
				return false;
			}
		}
		queue.push(p);
	}
	
	api={
		isOccupied:function(){
			return occupied;
		},
		occupy:function(plane){
			
			if(!occupied || currentOccupant==plane.getPK()){
				occupied=true;
				
				currentOccupant=plane.getPK();
				//alert('given key to land :'+currentOccupant);
				//plane.highlight();
				return true;
			}
			else {				
				addToQueue(plane);
				//alert('queued key to land :\n\nCurrent owner : '+currentOccupant+"\nownerfship requested by :"+plane.getPK());
				return false;
			}
		},
		release:function(plane){
			//clearTimeout(tokenTimer);
			
			if(currentOccupant!=plane.getPK()){
				//alert('released key error. not owner of key trying to release the key');
				return false;
			}
			if(queue.length>0)
			{
				occupied=true;
				currentOccupant=queue[0].getPK();
				queue[0].notifyToUseRunwayForLanding();
				queue.shift();
				//alert('given key to  next in queue : '+currentOccupant);
			}
			else {
				//alert('no one wiaint gfot runwqay to land');
				occupied=false;				
			}
			return true;
		}
		
	}
	
	
	return api;
}
var runwayQueue=new runwayLandingUseQueue();


function startGame(){
	//getCurrentStatus
	//msgs.show('Your new job is to regulate air traffic to the airbase. \nThe airbase is shared between civilian and military aircrafts. The airbase resorts squadron of formiddable Sukhois. Naturally, the preference to use the the airbase is given to military but when the airbase is not used by military, your job is to depart civilian flights on time and land the incoming civilian airplanes.<br>A radar is provided which just displays current aerial traffic status.<br><br>Best luck!!',15000);
	msgs.show('Press F1 at any time for help.',15000);

	
	var i;
	for(i in plansOnBoard){
	//	alert(plansOnBoard[i].getCurrentStatus())
	}
}
