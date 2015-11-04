


function airport(){
	//var i,cx=$('canvas').offset().left,cy=$('canvas').offset().top;
	
	/*for(i in fightersParkingSlots){
		$("#map").append('<div class="parkingSlot" i="fightersParkingSlots  '+i+'" style="left:'+(pathPoints[fightersParkingSlots[i]["parkingDot"]]["x"]+cx)+'px;top:'+(pathPoints[fightersParkingSlots[i]["parkingDot"]]["y"]+cy)+'px;" >'+
		'<img width="25" src="images/su33.png" /></div>');
	}
		for(i in fightersParkingSlots1){
		$("#map").append('<div class="parkingSlot" i="fightersParkingSlots1  '+i+'" style="left:'+(pathPoints[fightersParkingSlots1[i]["parkingDot"]]["x"]+cx)+'px;top:'+(pathPoints[fightersParkingSlots1[i]["parkingDot"]]["y"]+cy)+'px;" >'+
		'<img width="25" src="images/f22u.png" /></div>');
	}
	for(i in passengerParkingSlots){
		$("#map").append('<div class="parkingSlot" i="passengerParkingSlots  '+i+'" style="left:'+(pathPoints[passengerParkingSlots[i]["parkingDot"]]["x"]+cx)+'px;top:'+(pathPoints[passengerParkingSlots[i]["parkingDot"]]["y"]+cy)+'px;" >'+
		'<img width="50" src="images/tanker.png" /></div>');
	}*/
	/*for(i in pathPoints){
		$("#map").append('<div class="parkingDot" i="'+i+'" style="left:'+(pathPoints[i]["x"]+cx-3)+'px;top:'+(pathPoints[i]["y"]+cy-3)+'px;" >'+
		'</div>');
	}
	$("body").append('<div class="pathval"></div>');
	$('.parkingDot').hover(function(){
			$('.pathval').css({top:$(this).offset().top+20,left:$(this).offset().left}).show();
			$('.pathval').html("i:"+$(this).attr('i'));///*+"X:"+pathPoints[$(this).attr('x')]["x"]+"<br>Y:"+pathPoints[$(this).attr('y')]["y"]);
		},function(){
			$('.pathval').hide();
	});
	$('.parkingSlot').hover(function(){
			$('.pathval').css({top:$(this).offset().top+20,left:$(this).offset().left}).show();
			$('.pathval').html("i:"+$(this).attr('i'));//+"X:"+pathPoints[$(this).attr('x')]["x"]+"<br>Y:"+pathPoints[$(this).attr('y')]["y"]);
		},function(){
			$('.pathval').hide();
	});*/
}

function airstrip(){
	var occupied=false,queue=[],priorityQueue=[];
	var currentOccupant;
	var tokenTimer;
	
	//var civilianPlaneRequestForAirstripForLanding=0;
	
	var addToQueue=function(q,p){
		var i;
		for(i in q){
			//alert(p.getPK()+"	|"+q[i].getPK());
			if(p.getPK()==q[i].getPK()){
				//alert('duplicate');
				return false;
			}
		}
		q.push(p);
	}
	
	var api={
		/*civilianPlaneLandingSet:function(f){ // Check whether strip is used for landing
			if(f){
				civilianPlaneRequestForAirstripForLanding++;
			}
			else civilianPlaneRequestForAirstripForLanding--;			
		},
		civilianPlaneLandingGet:function(f){
			return civilianPlaneRequestForAirstripForLanding;
		},*/
		occupy:function(plane){
			if(!occupied || currentOccupant==plane.getPK()){
				occupied=true;
				currentOccupant=plane.getPK();
				tokenTimer=setTimeout(function(){
					this.release();
					//plane.resetMotion();
					
					
				},
				300000);
				return true;
			}
			else{
				if(plane.getType()=="fighter")
					addToQueue(priorityQueue,plane);
				else {
					msgs.show('Airstrip not available as of now, but the requested action is queued and will be processed once air strip is free.',5000);
					addToQueue(queue,plane);
				}
				return false;
			}
		},
		release:function(plane){
			clearTimeout(tokenTimer);
			if(currentOccupant!=plane.getPK()){
				return false;
			}
			if(priorityQueue.length>0){
				occupied=true;
				currentOccupant=priorityQueue[0].getPK();
				priorityQueue[0].notifyToUseStrip();
				priorityQueue.shift();
			}
			else if(queue.length>0){
				occupied=true;
				currentOccupant=queue[0].getPK();
				queue[0].notifyToUseStrip();
				queue.shift();
			}
			else{
				occupied=false;
			}
		}
	};
	return api;
	
}