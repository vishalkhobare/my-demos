var j=0,scx,scy;
var clickedPlane,planeClicked=false;
/*
	Plane motion management
		1) Nose to Nose
		2) Nose to circle
		3) Circle to nose
		4) Circle to circle
	
	Nose requires angle extra. Both require x,y.
	Refer nosex and nosey and circlecx, circlecy
*/
function acircle(x,y,color,classs,r,html){
	var c=$("<div class='"+classs+"' style='position:absolute;border:2px solid "+color
			+";border-radius:"+r+"px;width:"+(r*2)+"px;height:"+
				(r*2)+"px;top:"+(y-r)+"px;left:"+(x-r)+"px;text-align:center;color:"+color+";'>"+html+"</div>");
	
	//$("body").append(c);
	
	var api={
		gotoxy:function(x,y){
			c.css({top:(y-r),left:(x-r)});
		},
		hide:function(){
			c.hide();
		}
	};
	return api;
}


function airplane(nosex,nosey,angle,r,planeType,direction,time,currentPlaneStatus,parkingSlotForThis,planeTypeDesc){
	
	var primaryKey=$(".airplaneContainerDiv").length;
	//var nose=$("<div class='nose'></div>")
	var landingNoseY,landingNoseX;
	
	var typeOfGroundMotion;
	
	var rx=nosex,ry=nosey,cors; // rotation center
//	var clockwisecircle=new acircle(nosex,nosey,"blue","",r,"clockwise");
//	var anticlockwisecircle=new acircle(nosex,nosey,"red","",r,"Anticlockwise");
	var startLeaveOrbitPointx,startLeaveOrbitPointy;
	
	
	var loopReachedSuccessfuly=false,loopReachedSuccessfulyTimer;
	
	//var rotationclockwisecircle=new acircle(nosex,nosey,"teal","",r,"clockwise");
	//var rotationanticlockwisecircle=new acircle(nosex,nosey,"pink","",r,"Anticlockwise");
	
	var timer;
	var tx,ty,clicked;
	var api;
	var operation="";//straightLine, newStraightLine, insky , taxyway
	var clickedForMotionOfPlaneFlag=true; 
	var redBeam,greenBeam;
	var redBeamCanvas,greenBeamCanvas;
	var firstTargetAchieved=false;
	var tokenToland;	
	
	var pauseTaxyingFlag=false;
	
	var plnCanUseRunwayForLanding;
	
	
	var panel;
	
	if(parkingSlotForThis.name!=undefined){
		panel=$('<div class="plnButton"><h2>Flight '+parkingSlotForThis.name+'</h2><input type="button" class="takeoff" value="Take Off" /><input type="button" class="Land" value="Land" /><input type="button"  class="pauseTaxying" value="Pause taxying" /></div>');
	}
	
	else panel=$('<div class="plnButton"><h2>Sukhoi 30</h2></div>');
	
	
	
	//if(planeTypeDesc=="civilAirline")
		$("#panel").append(panel);
	
	//$("body").append(nose);
	
	
	//var groundTime=time*3;
	//var groundTime=time;
	var groundTime=time*2;
	var pln,nosext,noseyt,anglet;
	var gx,gy;
	var gdirection='';
	
	panel.find('.pauseTaxying').prop('disabled',true);

	var placePlaneOnGround=function(x,y){
		/*if(typeOfGroundMotion=='parkingpath')
		{
			pln.add(nose).css({
				left:(parseInt(x)+airStripCanvasX)+"px",
				top:(parseInt(y)+airStripCanvasY)+"px"
			});
		}
		else */
			pln.css({
				left:(parseInt(x-pln.width()/2)+airStripCanvasX)+"px",
				top:(parseInt(y-pln.height()/2)+airStripCanvasY)+"px"
			});
	}
	var placePlane=function(){
		var nosetipx=nosex-pln.width()/2; // plane adjustments
		var nosetipy=nosey-pln.height(); // 
		pln.css({top:nosetipy,left:nosetipx});	
		//nose.css({top:nosey,left:nosex});
		if(direction=="clockwise")
			rotateImage(pln,angle);
		else if(direction=="anticlockwise")
			rotateImage(pln,(angle*-1));
		
	}
	
	if(currentPlaneStatus=="parked"){
		if(planeTypeDesc=="civilAirline")
			pln=$("<div class='pa airplaneContainerDiv'><div class='timerWidth'></div><img src='"+planeType["image"]+"' width='"+planeType["parkingWidth"]+"px' /></div>");
		else 
			pln=$("<div class='pa airplaneContainerDiv'><img src='"+planeType["image"]+"' width='"+planeType["parkingWidth"]+"px' /></div>");
		//////alert(pathPoints[parkingSlotForThis["parkingDot"]]["x"])
		
		//////alert((parseInt(pathPoints[parkingSlotForThis["parkingDot"]]["y"]+airStripCanvasY)))
		gx=pathPoints[parkingSlotForThis["parkingDot"]]["x"];
		gy=pathPoints[parkingSlotForThis["parkingDot"]]["y"];
		operation="landed";
		$("body").append(pln);	
		placePlaneOnGround(gx,gy);
		
		
		panel.find('.takeoff').prop('disabled',false);
		panel.find('.Land').prop('disabled',true);
		panel.find('.goAround').prop('disabled',true);
		
	}
	else if(currentPlaneStatus=="insky"){
		pln=$("<div class='pa airplaneContainerDiv'><img src='"+planeType["image"]+"' width='"+planeType["flyWidth"]+"px' /></div>");
		operation="insky";
		$("body").append(pln);	
		placePlane();
		panel.find('.takeoff').prop('disabled',true);
		panel.find('.Land').prop('disabled',true);
		panel.find('.goAround').prop('disabled',false);
	}
	
	//$("<div class='su33'><img src='images/su33.png' /></div>")
//	$("body").append(pln);	
	
	if(direction=="anticlockwise"){
		angle=360-angle;
	}
	//if(planeTypeDesc=="fighter")
	{
		pln.append('<canvas class="redBeam" width="10" height="10"></canvas>');
		pln.append('<canvas class="greenBeam" width="10" height="10"></canvas>');
		redBeamCanvas=pln.find('.redBeam');
		greenBeamCanvas=pln.find('.greenBeam');
		var redBeamCtx=redBeamCanvas.get(0).getContext('2d');
		var greenBeamCtx=greenBeamCanvas.get(0).getContext('2d');
		//alert($('.greenBeam').length);
		
		
		redBeamCanvas.hide();
		greenBeamCanvas.hide();
	}
		

	var redBeamRadius=0,greenBeamRadius=0;
	var beamTimerFlag=false;
	var beamCanvasCX=redBeamCanvas.width()/2,beamCanvasCY=redBeamCanvas.height()/2;
	
	//redBeamCtx.strokeStyle=('red');
	//greenBeamCtx.strokeStyle=('green');
	
	var rad = ctx.createRadialGradient(2, 2, 1, 2, 2, r);
    rad.addColorStop(0, "red");
    rad.addColorStop(1, 'transparent');
	
	var rad1 = ctx.createRadialGradient(2, 2, 1, 2, 2, r);
    rad1.addColorStop(0, "pink");
    rad1.addColorStop(1, 'transparent');
	
    //ctx.fillStyle = rad;
    
	
	
	
	redBeamCtx.fillStyle=rad;
	rad1.addColorStop(0, "pink");
	greenBeamCtx.fillStyle=rad1;
	//greenBeamCtx.fillStyle=('pink');
	
	
	/*var flashRedBeam=function(){
		redBeamTimer=setInterval(function(){
			//alert(0)
			var i;			
			//redBeamCtx.clearRect(0,0,redBeamCanvas.width(),redBeamCanvas.height());
			for(i=redBeamRadius;i>0;i--){
				redBeamCtx.beginPath();
				redBeamCtx.arc(beamCanvasCX,beamCanvasCY,redBeamRadius,0,Math.PI*2);
				redBeamCtx.stroke();
			}
			redBeamRadius++;
			if(redBeamRadius>beamCanvasCX){
				clearInterval(redBeamTimer);
				redBeamCtx.clearRect(0,0,redBeamCanvas.width(),redBeamCanvas.height());
				redBeamRadius=0;
				flashGreenBeam();
			}
		},100);
	}
	var flashGreenBeam=function(){
		/*
		greenBeamTimer=setInterval(function(){
			var i;
			//alert(1)
			//greenBeamCtx.clearRect(0,0,redBeamCanvas.width(),redBeamCanvas.height());
			for(i=greenBeamRadius;i>0;i--){
				greenBeamCtx.beginPath();
				greenBeamCtx.arc(beamCanvasCX,beamCanvasCY,greenBeamRadius,0,Math.PI*2);
				greenBeamCtx.stroke();
			}
			greenBeamRadius++;
			if(greenBeamRadius>beamCanvasCX){
				clearInterval(greenBeamTimer);
				greenBeamCtx.clearRect(0,0,redBeamCanvas.width(),redBeamCanvas.height());
				greenBeamRadius=0;
				flashRedBeam();
			}
		},100);
				
	}*/
	{
		var i;
		
		
		if(planeTypeDesc=="civilAirline")
			pln.find('canvas').css('top','32%');
		else pln.find('canvas').css('top','12%');
		//alert(beamCanvasCX+"||||||||||"+beamCanvasCY+"||||||||||"+redBeamRadius);
		//for(i=beamCanvasCX;i>0;i--)
		
		{
			//alert(9)
			redBeamCtx.beginPath();
			redBeamCtx.arc(beamCanvasCX,beamCanvasCY,beamCanvasCY,0,Math.PI*2);
			redBeamCtx.fill();
			
			greenBeamCtx.beginPath();
			greenBeamCtx.arc(beamCanvasCX,beamCanvasCY,beamCanvasCY,0,Math.PI*2);
			greenBeamCtx.fill();
			//var flashRedBeam=function(){
		}
		//alert(5)
	}
	
	var flashRedBeam=function(){
		redBeamCanvas.show();
		if(beamTimerFlag!="stopBeams")
			beamTimerFlag=true;
		//else beamTimerFlag=false;
		setTimeout(function(){
			redBeamCanvas.hide();
			if(beamTimerFlag=="stopBeams"){
				beamTimerFlag=true;
			}
			else if(beamTimerFlag)
				setTimeout(function(){
					flashGreenBeam();
				},1000);
			
		},100);
	}
	
	var flashGreenBeam=function(){
		greenBeamCanvas.show();
		if(beamTimerFlag!="stopBeams")
			beamTimerFlag=true;
		else beamTimerFlag=false;
		setTimeout(function(){
			greenBeamCanvas.hide();
			if(beamTimerFlag=="stopBeams"){
				beamTimerFlag=true;
			}
			else if(beamTimerFlag)
				setTimeout(function(){
					flashRedBeam();
				},1000);
		},100);
	}	
	
	
	//placePlane();
	

	/*var displayRotationPoints=function(){
		var cors=getCors(angle,nosex,nosey);
		rotationclockwisecircle.gotoxy(cors.xc,cors.yc);
		rotationanticlockwisecircle.gotoxy(cors.xac,cors.yac);
	};*/
	
	
	
	
	// test variables
	//var test=0;
	
	
	
	
	
	var planeDirection=function(){
		var dir={north:false,south:false,west:false,east:false};
		if(direction=="clockwise"){
		
			if(angle==0 || angle==360){
				dir.south=true;
			}
			else if(angle>0 && angle<90){
				dir.south=true;
				dir.west=true;
			}
			else if(angle==90){
				dir.west=true;
			}
			else if(angle>90 && angle<180){
				dir.west=true;
				dir.north=true;
			}
			else if(angle==180){
				dir.north=true;
			}
			else if(angle>180 && angle<270){
				dir.north=true;
				dir.east=true;
			}
			else if(angle==270){
				dir.east=true;
			}
			else if(angle>270 && angle<360){
				dir.south=true;
				dir.east=true;
			}
		}
		else if(direction=="anticlockwise"){
			if(angle==0 || angle==360){
				dir.south=true;
			}
			else if(angle>0 && angle<90){
				dir.south=true;
				dir.east=true;
			}
			else if(angle==90){
				dir.east=true;
			}
			else if(angle>90 && angle<180){
				dir.east=true;
				dir.north=true;
			}
			else if(angle==180){
				dir.north=true;
			}
			else if(angle>180 && angle<270){
				dir.north=true;
				dir.west=true;
			}
			else if(angle==270){
				dir.west=true;
			}
			else if(angle>270 && angle<360){
				dir.south=true;
				dir.west=true;
			}
		}
		return dir;
	}


	
	var getCors=function(angle,nosex,nosey){		
		var xc,yc,xac,yac;
		
		var m;
		if(direction=="clockwise")
		{	
			m=Math.tan(angle*Math.PI/180);
			
			xac=r*Math.sqrt(1/(1+m*m));
			
			if(angle>90 && angle<=270){
				xac*=-1;
			}
			
			yac=m*xac+nosey;
			
			
			xc=xac*-1;
			yc=m*xc+nosey;
			xc+=nosex;
			
			xac+=nosex;
		
		}
		else if(direction=="anticlockwise")
		{	
			m=Math.tan(angle*-1*Math.PI/180);
			
			xac=r*Math.sqrt(1/(1+m*m));
			
			if(angle>90 && angle<=270){
				xac*=-1;
			}
			
			yac=m*xac+nosey;
			
			
			xc=xac*-1;
			yc=m*xc+nosey;
			xc+=nosex;
			
			xac+=nosex;
		
		}
		
		return ({
			xac:xac,yac:yac,xc:xc,yc:yc
		});
	}
	
	//var td;
	var planeDesiredDirection={north:false,south:false,west:false,east:false};
	var setDesiredPlaneDirectionsBeforeStratightMove=function(){ //////////////////////////////// purified
		planeDesiredDirection={north:false,south:false,west:false,east:false};
		if(rx>tx && ry>ty){
			planeDesiredDirection.north=true;
			planeDesiredDirection.west=true;
		}
		else if(rx<tx && ry>ty){
			planeDesiredDirection.north=true;
			planeDesiredDirection.east=true;
		}
		else if(rx>tx && ry<ty){
			planeDesiredDirection.south=true;
            planeDesiredDirection.west=true;			
		}
		else if(rx<tx && ry<ty){
			planeDesiredDirection.south=true;
            planeDesiredDirection.east=true;			
		}
		else if(rx==tx && ry<ty){
			planeDesiredDirection.south=true;			
		}
		else if(rx==tx && ry>ty){
			planeDesiredDirection.north=true;			
		}
		else if(rx>tx && ry==ty){
			planeDesiredDirection.west=true;			
		}
		else if(rx<tx && ry==ty){
			planeDesiredDirection.east=true;			
		}
		//////alert("rx:"+rx+"\nry:"+ry+"\ntx"+tx+"\nty"+ty+"\n\n\n"+JSON.stringify(planeDesiredDirection));
	}
	var checkForPlaneDirectionToLeave=function(){
		var i;
		var dir=planeDirection();
		
		
		/*var bt=addButton("Planedirectionanalysys");
		bt.one('click',function(){
			var j,l=angle+"|";
			var dir=planeDirection();
			for(j in dir){
				l=l+j+":"+dir[j]+"|";
			}
			//////alert(l);
		});*/
		/*ctriggerClick(bt,function(){
			var j,l="";
			for(j in dir){
				l=l+j+":"+dir[j]+"|";
			}
			puti(l);
		});
		*/
		//var tyyutyy="";
		
		//////alert("planeDesiredDirection :"+JSON.stringify(planeDesiredDirection)+"----\n\n\n\nCurrent dir"+JSON.stringify(dir))
		for(i in planeDesiredDirection){
			if(planeDesiredDirection[i]!=dir[i]){
				////////alert(tyyutyy+"--------false")
				return false;
			}
		}
		return true;
	}
	var checkForOrbitLeavePtReached=function(){
		/*var td1;
		td1=Math.sqrt((nosex-tx)*(nosex-tx)+(nosey-ty)*(nosex-ty));
		////////alert(td);
		$("#testDivID").prepend(td+"	"+td1);
		if(td==parseInt(td1)){
			return true;
		}
		else return false;*/
		
		if(!checkForPlaneDirectionToLeave())
		{
			////////alert(false);
			
			return false;
		}
		
		////////alert('ok');
		var tolerance=2;
		var cors=getCors(angle,nosex,nosey);
		
		var xc=cors["xc"];
		var yc=cors["yc"];
		var xac=cors["xac"];
		var yac=cors["yac"];
		var i,j,k,l;
		
		////////alert(direction);
		
			i=nosex-rx;
			j=nosey-ry;
			k=i*-1;
			l=j*-1;
		if(direction=="clockwise"){
			i+=xc;
			j+=yc;
			k+=xc;
			l+=yc;
			//acircle(i,j,"orange","",10,"")
			//acircle(k,l,"orange","",10,"")
		}
		else if(direction=="anticlockwise"){
			i+=xac;
			j+=yac;
			k+=xac;
			l+=yac;
			//acircle(i,j,"orange","",10,"")
			//acircle(k,l,"orange","",10,"")
		}
		
		var td=parseInt(Math.sqrt((tx-i)*(tx-i)+(ty-j)*(ty-j)));
		var td1=parseInt(Math.sqrt((tx-k)*(tx-k)+(ty-l)*(ty-l)));
		
		//$("#testDivID").prepend(parseInt(td)+"	"+parseInt(td1)+"<br>");
		
		
		for(i=0;i<=tolerance;i++){
			//for(j=0;j<=tolerance;j++){
				
				if(td==td1 || (td+i)==td1 || (td-i)==td1){
					//operation="";
					////////alert('true');
					//////alert((td+"------"+td1+"|||||||"+(td+i)+"|||||||"+(td-i)));
					checkForPlaneDirectionToLeave();
					startLeaveOrbitPointx=nosex;
					startLeaveOrbitPointx=nosey;
					return true;
				}
			//}	
		}
	//	////alert('false');
		return false;
	}
	
	var targetOrbitAchieved=function(m){
		
		//startLeaveOrbitPointx
		var d1;//=Math.sqrt((tx-nosex)*(tx-nosex)+(ty-nosey)*(ty-nosey));
		var tolerance=3;
		var i;
		
		/*var c=nosey-m*nosex;
		
		//y=mx+c
		
		d1=(ty-m*tx-c)/(Math.sqrt(m*m+1));
	//	////alert(d1+"|"+Math.sqrt(m*m+1)+"|"+(ty-m*tx-c)+"|"+c)
		if(d1<0){
			d1*=-1;
		}
		
		*/
		d1=parseInt(Math.sqrt((tx-rx)*(tx-rx)+(ty-ry)*(ty-ry)));
		var d2=parseInt(Math.sqrt((startLeaveOrbitPointx-nosex)*(startLeaveOrbitPointx-nosex)+(startLeaveOrbitPointy-nosey)*(startLeaveOrbitPointy-nosey)));
		
		
		for(i=0;i<=tolerance;i++){
		//	////alert(d2+"\n\n\n\n"+d1+"\n"+(d1-i)+"\n"+(d1+i));
			//if((d1<=r || (d1-i)<=r || (d1+i)<=r) && !(nosex==startLeaveOrbitPointx && nosey==startLeaveOrbitPointx)){
			if((d1<=d2 || (d1-i)==d2 || (d1+i)==d2)){
				// && nosex!=startLeaveOrbitPointx && (nosex-i)!=startLeaveOrbitPointx && (nosex+1)!=startLeaveOrbitPointx
				////////alert(0)
				return true;
			}	
		}
		return false;
	}
	var moveStraightLine=function(){
		//return false;
		if(operation!="straightLine"){
			//////alert(045646)
			return false;
		}
		var m;
		if(direction=="clockwise"){
			m=-1/Math.tan(angle*Math.PI/180);
		}
		else if(direction=="anticlockwise") m=-1/Math.tan((360-angle)*Math.PI/180);
		//var m=Math.tan(angle*Math.PI/180);
		var tolerance=2;
		var c=nosey-m*nosex;
		
	//	////alert(JSON.stringify(planeDirection())+"	"+JSON.stringify(planeDesiredDirection))
		
		if(planeDesiredDirection.east){
			nosex++;
		}
		else {
			nosex--;
		}
		if(nosey!=ty)
		nosey=m*nosex+c;
		/*if(nosey<ty && nosex<tx){
			nosex++;
			nosey=m*nosex+c;
		}
		else if(nosey<ty && nosex>tx){
			nosex--;
			nosey=m*nosex+c;
		}
		else if(nosey>ty && nosex<tx){
			nosex++;
			nosey=m*nosex+c;
		}
		else if(nosey>ty && nosex>tx){
			nosex--;
			nosey=m*nosex+c;
		}
		else if(nosey==ty && nosex>tx){
			nosex--;
			//nosey=m*nosex+c;
		}
		else if(nosey==ty && nosex<tx){
			nosex++;
		}
		else if(nosey>ty && nosex==tx){
			nosey--;
		}
		else if(nosey<ty && nosex==tx){
			nosey++;
		}*/
		/*if(xop!="ddecrease" && xop!="iincrease"){
			if(parseInt(nosex)>tx){
				if(m<0 && ty<nosey){//ty
					nosex++;
					xop="increase";
				}				
				else if(m<0 && ty>nosey){//ty
					nosex--;
					xop="decrease";
				}				
				else if(m>0 && ty>nosey){//ty
					nosex++;
					xop="increase";
				}				
				else if(m>0 && ty<nosey){//ty
					nosex--;
					xop="decrease";
				}
			}
			else if(parseInt(nosex)<tx){
				
				if(m<0 && ty<nosey){//ty
					nosex++;
					xop="increase";
				}				
				else if(m<0 && ty>nosey){//ty
					nosex--;
					xop="decrease";
				}				
				else if(m>0 && ty>nosey){//ty
					nosex++;
					xop="increase";
				}				
				else if(m>0 && ty<nosey){//ty
					nosex--;
					xop="decrease";
				}
			}
		}
		else {
			////////alert(xop)
			if(xop=="decrease" || xop=="ddecrease")
			{
				nosex--;
				noseAdjustment(m);
				xop="ddecrease"
			}
			else if(xop=="iincrease" || xop=="increase"){
				nosex++;
				noseAdjustment(m);
				xop="iincrease"
			}
		}
		*/
		
		
		
		placePlane();
		//////alert(targetOrbitAchieved(xop))
		if(targetOrbitAchieved(m))
		{
			operation="insky";
			//////alert('Straight line nullified');
			if(direction=="clockwise"){
				//rotateClockwiseHelper();
				api.rotateClockwise();
			}
			else api.rotateAntiClockwise();
			
			
			if(!firstTargetAchieved){
				//alert('will return now');
				returnInSeconds();
				clearTimeout(loopReachedSuccessfulyTimer);
				firstTargetAchieved=true;
			}
			
		}
		else
		timer=setTimeout(function(){
			moveStraightLine();
		},10);
	};
	
	var landingErrorAdjustment=false;
	//var addedCivilianStripUseRequest=false;
	
	var rotateClockwiseHelper=function(){
		
		angle++;
		if(angle>360){
			angle=0;
		}
		var m=Math.tan(angle*Math.PI/180);		
				
		nosex=r*Math.sqrt(1/(1+m*m));
		if(angle>90 && angle<=270){
			nosex*=-1;
		}
		nosey=m*nosex+ry;
		nosex+=rx;
		placePlane();
		//clockwisecircle.gotoxy(rx,ry);
		
		//displayRotationPoints();
		//plnCanUseRunwayForLanding=runwayQueue.occupy();
		if(nosexyAdjustRequest && !landingErrorAdjustment && parseInt(Math.sqrt((landingNoseX-nosex)*(landingNoseX-nosex)+(landingNoseY-nosey)*(landingNoseY-nosey)))<=(r*2)){
			//strip.civilianPlaneLandingSet(true);
			if(!tokenToland)
				tokenToland=runwayQueue.occupy(api);
			if(tokenToland)
				setTimeout(function(){
					if(nosexyAdjustRequest)
					{
						/*tx+=100;
						ty+=100;
						firstTargetAchieved=false;
						operation="insky";
						strip.release();
						orbitChange();
						*/
						rx=tx;
						ry=ty;
						tx=-r-100;
						ty=ty-10;					
						if(planeTypeDesc=="civilAirline"){
							msgs.show('Flight '+parkingSlotForThis.name+"	missed the landing. It will now abort the landing and try it after some time.",5000);
						}
						//alert('problem hai bhai');
						landingErrorAdjustment=false;					
						firstTargetAchieved=false;
						//strip.civilianPlaneLandingSet(false);
						nosexyAdjustRequest=false;
						strip.release(api);	
						if(tokenToland)
						{
							runwayQueue.release(api);							
						}
						orbitChange();					
						
						//resetMotion
						//api.resetMotion();
					}
				},15000);
			
		}
		
		//alert(strip.civilianPlaneLandingGet());
		if(nosexyAdjustRequest && angle==270 && tokenToland) {
			
			landingNoseY,landingNoseX
			//////alert(nosex+"=?"+landingNoseX+"		-----------    "+nosey+"=?"+landingNoseY);
			var i,xNoseMatched=false,yNoseMatched=false;
			var tolerence=20;
			var nx=parseInt(nosex),ny=parseInt(nosey);
			for(i=0;i<=tolerence;i++){
				if(nx==landingNoseX || (nx+i)==landingNoseX || (nx-i)==landingNoseX){
					xNoseMatched=true;
					break;
				}
			}
			if(xNoseMatched){
				for(i=0;i<=tolerence;i++){
					if(ny==landingNoseY || (ny+i)==landingNoseY || (ny-i)==landingNoseY){
						yNoseMatched=true;
						break;
					}
				}
				if(yNoseMatched){
					operation="descendingToLand";
					//angle=270;
					//nosex=landingNoseX;
					nosey=landingNoseY;
					//direction=
					placePlane();
					//////alert('descendign');
					youtubeAndMessage(planeType.startedLandingMessage,planeType.landingYoutube[getRandomInt(0,planeType.landingYoutube.length-1)]);
					landingDescend(0);

					nosexyAdjustRequest=false;
					return false;
				}
			}
			
		}	
		
		if((operation=="straightLine" || operation=="newStraightLine") && checkForOrbitLeavePtReached())
		{
			//////alert('orbit leaving');
			operation="straightLine"
			startLeaveOrbitPointy=nosey;
			startLeaveOrbitPointx=nosex;
			moveStraightLine();
		}		
		else 
		timer=setTimeout(function(){
			rotateClockwiseHelper();
		},time);
	}
	/*var taxywayToBrakeAndStop=function(){
		typeOfGroundMotion='parkingpath';
		initiateTaxyWay();
		
	}*/
	var landingDescend=function(i){
		
		if(i=="adjustToPoint0"){
			//////alert(parseInt(nosex)+"--------"+parseInt((parseInt(pathPoints[0]["x"]+pln.width()/2)+airStripCanvasX)) +"\n\n"+ parseInt(nosey)+"------"+parseInt((parseInt(pathPoints[0]["y"]+pln.height()/2)+airStripCanvasY)))
			//////alert(986)
			
			if(parseInt(nosex)==(parseInt(pathPoints[0]["x"]+pln.width()/2)+airStripCanvasX) && parseInt(nosey)==(parseInt(pathPoints[0]["y"])+airStripCanvasY))
			{
							
				gx=pathPoints[0]["x"];
				gy=pathPoints[0]["y"];
				
				typeOfGroundMotion='parkingpath';
				/*nose.css({
					left:(parseInt(gx-pln.width()/2)+airStripCanvasX)+"px",
					top:(parseInt(gy-pln.height()/2)+airStripCanvasY)+"px",
					background:"red"
				});
				
				left:(parseInt(x-pln.width()/2)+airStripCanvasX)+"px",
			top:(parseInt(y-pln.height()/2)+airStripCanvasY)+"px"
				
				*/
				//rotateImageSymmetrical(pln,270);
				resetRotateCenter(pln);
				pln.find('img').attr('src',planeType.image);
				//////alert('before placed on ground');
				//placePlaneOnGroundWhenFirstLanded(gx,gy);
				//placePlaneOnGround(gx,gy);
				//////alert('placed on ground');
				//rotateImageSymmetrical(pln,0);
				
				/*var testRotation=function(f){
					//while(f<720)
					{
						rotateImageSymmetrical(pln,f);
						if(f<720){
							setTimeout(function(
							){testRotation(++f);},50);
							
						}
					}
					
				}*/
				
			//	testRotation(0);

				//f=0;
				
				//////alert(0);
			/*	while(f>-360){
					rotateImageSymmetrical(pln,f);
					f--;					
				}*/
				//gdirection="north";
				operation="landeds";
				initiateTaxyWay();
				return false;
			}
			if(nosex<(parseInt(pathPoints[0]["x"]+pln.width()/2)+airStripCanvasX)){
				//////alert('nosex++');
				nosex++;
			}
			if(parseInt(nosey)<(parseInt(pathPoints[0]["y"])+airStripCanvasY)){
				//////alert('increase y');
				nosey++;
			}
			else if(parseInt(nosey)>(parseInt(pathPoints[0]["y"])+airStripCanvasY)){
				//////alert('decrease y');
				nosey--;
			}
			placePlane();
			setTimeout(function(){
				landingDescend("adjustToPoint0");
			},groundTime);
			
			return false;
		}
		var w=parseInt(pln.find('img').width());
		if(i%4==0&& w>planeType.parkingWidth){
			pln.find('img').width(w-1);
			//pln.css('top',parseInt(pln.css('top'))+1);
		}		
		i=i+2;
		
		nosex=nosex+2;		
		placePlane();
		if(w<=planeType.parkingWidth){
			//////alert('reacheed');
			
			
			//left:(parseInt(x-pln.width()/2)+airStripCanvasX)+"px",
			//top:(parseInt(y-pln.height()/2)+airStripCanvasY)+"px"
			
			
			//////alert(nosey+"	"+(parseInt(150-pln.width()/2)+airStripCanvasY));
			
			//taxywayToBrakeAndStop();
			pln.find('img').width(planeType.parkingWidth);
			
			landingDescend("adjustToPoint0");
			return false;
			//api.rotateClockwise();
		}
		else setTimeout(function(){
			landingDescend(i);
		},groundTime);		
	}
	
	var rotateAntiClockwiseHelper=function(){
		angle++;
		if(angle>360){
			angle=0;
		}
		var m=Math.tan((angle*-1)*Math.PI/180);	
		
		
		nosex=r*Math.sqrt(1/(1+m*m));
		if((angle>=0 && angle<=90) || (angle>270 && angle<=360)){
			nosex*=-1;
		}
		nosey=m*nosex+ry;
		nosex+=rx;
		placePlane();
		//anticlockwisecircle.gotoxy(rx,ry);
		
		//displayRotationPoints();
		
		if((operation=="straightLine" || operation=="newStraightLine") && checkForOrbitLeavePtReached())
		{
			operation="straightLine"
			startLeaveOrbitPointy=nosey;
			startLeaveOrbitPointx=nosex;
			moveStraightLine();
		}
		else 
		timer=setTimeout(function(){
			rotateAntiClockwiseHelper();
		},time);
	}	
	
	var orbitChangeHelper=function(dir){
		clearTimeout(timer);
		var cors=getCors(angle,nosex,nosey);
		if(dir=="clockwise"){
			rx=cors["xc"];
			ry=cors["yc"];
			direction="clockwise";
		}
		else if(dir=="anticlockwise"){
		
			rx=cors["xac"];
			ry=cors["yac"];
			direction="anticlockwise";			
		}
		angle=360-angle;
		
		setDesiredPlaneDirectionsBeforeStratightMove();
	}
	/*var newStraightMoveHelper=function(dir){
		clearTimeout(timer);
		var cors=getCors(angle,nosex,nosey);
		if(dir=="clockwise"){
			rx=cors["xc"];
			ry=cors["yc"];
			direction="clockwise";
		}
		else if(dir=="anticlockwise"){
		
			rx=cors["xac"];
			ry=cors["yac"];
			direction="anticlockwise";			
		}
		angle=360-angle;
		
		setDesiredPlaneDirectionsBeforeStratightMove();
	}
	var newStraightMove=function(){
		clearTimeout(timer);
		var cors=getCors(angle,nosex,nosey);
		
		var xc=cors["xc"];
		var yc=cors["yc"];
		var xac=cors["xac"];
		var yac=cors["yac"];
		
		var d1=Math.sqrt((xc-tx)*(xc-tx)+(yc-ty)*(yc-ty));
		var d2=Math.sqrt((xac-tx)*(xac-tx)+(yac-ty)*(yac-ty));
		
		operation="newStraightLine";
		if(d1>d2){// go anticlockwise
			newStraightMoveHelper("anticlockwise");
			rotateAntiClockwiseHelper();
		}
		else if(d1<=d2){
			newStraightMoveHelper("clockwise");
			rotateClockwiseHelper();
		}
		
	}*/
	var nosexyAdjustRequest=false;
	var orbitChange=function(flag){
		
		var cors=getCors(angle,nosex,nosey);
		
		var xc=cors["xc"];
		var yc=cors["yc"];
		var xac=cors["xac"];
		var yac=cors["yac"];
		
		var d1=Math.sqrt((xc-tx)*(xc-tx)+(yc-ty)*(yc-ty));
		var d2=Math.sqrt((xac-tx)*(xac-tx)+(yac-ty)*(yac-ty));
		
		operation="straightLine";
		
		//////alert(d1+"	"+d2);
		//////alert(tx+"	"+ty+"\n\n\n"+nosex+"	"+nosey);
		if((flag!=undefined && flag=="onlyclockwise")){
			////alert(1)
			//operation="landingPreparation";
			nosexyAdjustRequest=true;
			if(direction=="clockwise"){
				setDesiredPlaneDirectionsBeforeStratightMove();
			}
			else{
				orbitChangeHelper("clockwise");
				rotateClockwiseHelper();
			}
		}
		else if((d1>d2 && direction=="clockwise")){// go anticlockwise			
						////alert(2)
			orbitChangeHelper("anticlockwise");
				//calculateTd();
			rotateAntiClockwiseHelper();
		}
		else if(d1<=d2 && direction=="anticlockwise"){// go0 clockwise
				////alert(3)
			orbitChangeHelper("clockwise");
			//calculateTd();
			rotateClockwiseHelper();
		}
		else if(d1>d2 && direction=="anticlockwise"){
						////alert(4)
			if(flag!=undefined && flag=="takenOffJustNow"){
				////alert('problem is here');
				//angle=angle-180;
				orbitChangeHelper("anticlockwise");
				rotateAntiClockwiseHelper();
			}
			else setDesiredPlaneDirectionsBeforeStratightMove();
			
			
		}
		else if(d2>d1 && direction=="clockwise"){
						////alert(5)
			if(flag!=undefined && flag=="takenOffJustNow"){
				////alert('never reachable case');
				//angle=angle+180;
				orbitChangeHelper("clockwise");
				angle=360-angle;
				rotateClockwiseHelper();
			}
			else setDesiredPlaneDirectionsBeforeStratightMove();
			
		}
		

		
	}
	
	pln.click(function(e){
		if(e.which === 1) 
		{
			deselectAllPlanesOnMap();
			clicked=true;
			pln.addClass('selected');
			panel.show();
			$("#panel .info").html('<img width="200px" src="'+planeType.info+'" />');
		}
	});
	/*$(document).click(function(){
		if(e.which !== 1){			
			//clicked=false;
			
		}
	});*/
	
	var gotoNosexyangle=function(x,y){
		nosext=parseInt(x);
		noseyt=parseInt(y);
		anglet=90;
		if(direction=="clockwise")
			anglet=360-anglet;
		
		var cors=getCors(anglet,nosext,noseyt);
		//clockwisecircle.gotoxy(cors["xc"],cors["yc"]);
		//anticlockwisecircle.gotoxy(cors["xac"],cors["yac"]);
		
		tx=cors["xc"];
		ty=cors["yc"];
		
		//////alert(tx+"	"+ty+"\n\n\n"+x+"	"+y)
		if(tx==parseInt(rx) && ty==parseInt(ry)){			
			return false;
		}
		
		//////alert('gotoNosexyangle');
		orbitChange("onlyclockwise");
		//pln.css('border','2px solid teal');

	}
	var land=function(){
		//////alert(landingNoseX+"	"+landingNoseY);
		/*nose.css({
			top:landingNoseY,
			left:landingNoseX
			});*/
		//////alert('land');
		if(planeTypeDesc=="fighter" && !strip.occupy(api)){
			return false;
		}
		{
			youtubeAndMessage(planeType.landingMessage);
			grotationAngle=-90;
			gotoNosexyangle(landingNoseX,landingNoseY);
		}
	}
	
	var grotationAngle=0;
	var rotataPlaneOnGroundAntiClockwise=function(pathCopy,a,i){
		//////alert(11111111);
		if(a==undefined){
			a=grotationAngle;	
			i=1;
		}
		rotateImageSymmetrical(pln,--a);
		if(i<90){
			setTimeout(function(){
				rotataPlaneOnGroundAntiClockwise(pathCopy,a,++i);
			},groundTime);
		}
		else {
			//////alert('anticlockwise');
			grotationAngle=a;
			//////alert("cccccccccc         "+grotationAngle);
			if(pathCopy.length==1){
				setTimeout(function(){
					taxiForTakeOff(pathCopy);
				},groundTime*100);
			}
			else taxiForTakeOff(pathCopy);
		}
	}
	var rotataPlaneOnGroundClockwise =function(pathCopy,a,i){
		if(i==undefined){
			a=grotationAngle;	
			i=1;
		}
		rotateImageSymmetrical(pln,++a);
		if(i<90){
			setTimeout(function(){
				rotataPlaneOnGroundClockwise(pathCopy,a,++i);
			},groundTime);
			//rotataPlaneOnGroundClockwise(pathCopy,a);
		}
		else {
			grotationAngle=a;
			//////alert("cccccccccc         "+grotationAngle);
			if(pathCopy.length==1){
				setTimeout(function(){
					taxiForTakeOff(pathCopy);
				},groundTime*100);
			}
			else taxiForTakeOff(pathCopy);
		}
	}
	var rotatePlaneOnGround=function(gdirection,gx,gy,x,y,pathCopy){
		if(gx==x && y>gy){
			//////alert(gdirection);
			if(gdirection=="west"){
				rotataPlaneOnGroundAntiClockwise(pathCopy);
			}
			else if(gdirection=="east"){
				rotataPlaneOnGroundClockwise(pathCopy);
			}
		}
		else if(gx==x && y<gy){
			if(gdirection=="west"){
				rotataPlaneOnGroundClockwise(pathCopy);
			}
			else if(gdirection=="east"){
				rotataPlaneOnGroundAntiClockwise(pathCopy);
			}
		}
		else if(gx>x && y==gy){
			if(gdirection=="south"){
				rotataPlaneOnGroundClockwise(pathCopy);
			}
			else if(gdirection=="north"){
				rotataPlaneOnGroundAntiClockwise(pathCopy);
			}
		}
		else if(gx<x && y==gy){
			if(gdirection=="north"){
				rotataPlaneOnGroundClockwise(pathCopy);
			}
			else if(gdirection=="south"){
				rotataPlaneOnGroundAntiClockwise(pathCopy);				
			}
		}
	}
	var taxiForTakeOff =function(pathCopy){
		//////alert(pathCopy)
		var x=pathPoints[pathCopy[0]]["x"],y=pathPoints[pathCopy[0]]["y"];
		
		if(operation=="landeds" && pathCopy.length<parkingSlotForThis.parkingpath.length  && tokenToland){
			//alert('release')			
			tokenToland=runwayQueue.release(api);			
			if(tokenToland){tokenToland=false;}
			else tokenToland=true;
		}
		
		if(planeTypeDesc=="fighter" ){
				//***************
			if(typeOfGroundMotion=='takeoffpath' && runwayQueue.isOccupied() && ((pathCopy[0]==1 || pathCopy[0]==0) && pathPoints[0]["y"]>=(gy+ah)))
				pauseTaxyingFlag=true;
			else pauseTaxyingFlag=false;
			
		}
		/*else if(planeTypeDesc!="fighter" && addedCivilianStripUseRequest &&pathCopy.length<parkingSlotForThis['parkingpath'].length){
			alert('civilian request release');
			//addedCivilianStripUseRequest=false;
			//strip.civilianPlaneLandingSet(false);		
		}*/
		
		
		
		if(pauseTaxyingFlag){
				setTimeout(function(){					
					taxiForTakeOff(pathCopy);
				},groundTime);
				return false;
		}
		//if(operation=="landeds")
		//	alert(0)
		if(pathCopy.length==0 || pathCopy==undefined){
			//////alert('ready to take off');
			strip.release(api);
			
			return false;
		}
		
		var rotate=false;
		
	//////alert(gx+"|"+gy+"|"+x+"|"+y);
		if(gx==x){
			if(gy>y){
				gy--;
				gdirection="north";
			}
			else if(gy<y){
				gy++;
				gdirection="south";
			}
			else {
				pathCopy.shift();
				rotate=true;
			}
		}
		else if(gy==y){
			if(gx>x){
				gx--;
				gdirection="west";
			}
			else if(gx<x){
				gx++;
				gdirection="east";
			}
			else {
				pathCopy.shift();
				rotate=true;
			}
		}
		placePlaneOnGround(gx,gy);
		if(rotate){
			if(operation=="landeds")
				{
					//alert('stripe released');
					strip.release(api);
					beamTimerFlag="stopBeams";
					firstTargetAchieved=false;
				}
			if(pathCopy[0]!=undefined && pathPoints[pathCopy[0]]!=undefined)
				rotatePlaneOnGround(gdirection,gx,gy,pathPoints[pathCopy[0]]["x"],pathPoints[pathCopy[0]]["y"],pathCopy);
			else {
				strip.release(api);
				if(typeOfGroundMotion=="takeoffpath")
				{
					pln.addClass('insky');
					nosex=pln.offset().left+pln.width()+5;
					nosey=pln.offset().top+pln.height()/2;
					angle=270;
					
					takeOffAscend(0);
				}
				else if(operation=="landeds")
				{
					operation="landed";
					//////alert(0)
					pln.removeClass('insky');
					//if(planeTypeDesc=="fighter")
					{
						api.launchAfterRandomTime();
					}
					panel.find('.takeoff').prop('disabled',false);
					panel.find('.Land').prop('disabled',true);
					panel.find('.goAround').prop('disabled',true);
					setTimeout(function(){
						pln.find('.timerWidth').show();
						if(parkingSlotForThis.name!=undefined)
						{
							msgs.show('Flight '+parkingSlotForThis.name+"	is now ready to depart.<br>Select the flight and click of 'Take off' button.",5000);
							panel.find('.pauseTaxying').prop('disabled',false);							
						}
					},
					10000);
					pln.find('.timerWidth').hide();
				}
			}
			rotate=false;
		}
		else {
			//alert(operation);
			if(pathCopy.length==1 && operation!="landeds" && typeOfGroundMotion=="takeoffpath"){ //take speed should be fast
				//////alert('zoom');								
				panel.find('.pauseTaxying').prop('disabled',true);
				pln.find('img').attr('src',planeType.afterburnwersimage);
				setTimeout(function(){
					taxiForTakeOff(pathCopy);
				},time);
			}
			else
			{				
				setTimeout(function(){					
					taxiForTakeOff(pathCopy);
				},groundTime);
			}
		}
	}
	
	var checkWhetherFiestPointAchieved=function(){
		if(!firstTargetAchieved){
			returnInSeconds();
			msgs.show("Aborting flight dyue to tecnical reasons. Returning to airbase.",5000);
		}
	}

	var takeOffAscend=function(i){
		
		//pln.find('img').width((pln.find('img').width()+parseInt(i))+"px");
		//////alert('problem hai bhai')
		var w=parseInt(pln.find('img').width());
		if(i%5==0 && w<=planeType.flyWidth){
			pln.find('img').width(w+2);
		//	pln.css('top',parseInt(pln.css('top'))-1);
		}
		i=i+2;		
		clearTimeout(timer);
		//////alert(pln.offset().left)
		nosex+=2;
		placePlane();
		//pln.css('left',(parseInt(pln.offset().left)+2)+"px");
		if(w>planeType.flyWidth){
	//		////alert("troubkle end");
			pln.find('img').width(planeType.flyWidth);
			
			//nosex=pln.offset().left+pln.width()+5;
			//nosey=pln.offset().top+pln.height()/2;
			
			//landingNoseY=parseInt(nosey);
			angle=270;
	//		direction="anticlockwise"
			//////alert(direction)
			placePlane();
			var rn;
			
			//while((rn.x>=$(window).width()/4 &&  rn.x<=$(window).width()*3/4) ||
  			//	  (rn.y>=$(window).height()/4 &&  rn.x<=$(window).height()*3/4))
			rn=randomCors(r*4,r*2);
			//rn=randomCors($(window).height(),$(window).height());
			tx=rn.x;
			ty=rn.y;
			firstTargetAchieved=false;
			
			var d = new Date();
			d=d.getSeconds();
			
			if(d%4==0){
				tx=$(window).width()*2;
			}
			else if(d%3==0){
				ty*=-1;
			}
			else if(d%2==0){
				ty*=-1;
				tx*=-1;
			}
			else ty=$(window).height()*2;
			//tx=400;
			//ty=400;
			
			//tx=0;
			//ty=0;
			//////alert(tx+"	"+ty)
			//ty=200;
			
			//angle*=-1
			//////alert(nosex+"	|	"+nosey+"\n\n\n"+tx+"	| 	"+ty);
		//	////alert("troubkle end1");
		
			loopReachedSuccessfulyTimer=setTimeout(function(){
				checkWhetherFiestPointAchieved();
			},180000);
		
			orbitChange('takenOffJustNow');
			//returnInSeconds();
			
			//panel.find('.goAround').prop('disabled',false);
			//operation="insky";
			//api.rotateClockwise();
		}
		else setTimeout(function(){
			takeOffAscend(i);
		},time);
	}
	var initiateTaxyWay=function(){
		/*if(strip.civilianPlaneLandingGet()>0 && planeTypeDesc=="fighter" && operation!="landeds" && typeOfGroundMotion=="takeoffpath")
		{
			setTimeout(function(){
				initiateTaxyWay();
			},5000);
			return false;
			
		};		*/
		
		var pathCopy=[];
		for(i in parkingSlotForThis[typeOfGroundMotion]){//takeoffpath
			pathCopy.push(parkingSlotForThis[typeOfGroundMotion][i]);
		}
		//////alert(pathCopy);		
		//alert('taxy way start');		
		taxiForTakeOff(pathCopy);
	}
	
	var checkWhetherClickToMovePlane=function(){
		//////alert(clickedForMotionOfPlaneFlag)
		return clickedForMotionOfPlaneFlag;
	}
	

	var returnInSeconds=function(){
		var f=randomCors(50000,0);
		//alert('i will come back in '+(f.x/1000)+"	seconds");
		setTimeout(function(){
			if(planeTypeDesc=="fighter" && !strip.occupy(api)){
				return false;
			}
			if(planeTypeDesc=="civilAirline"){
				tx=parkingSlotForThis.prelandingX
				ty=parkingSlotForThis.prelandingY
				pln.find('.timerWidth').show();
				if(parkingSlotForThis.name!=undefined)
				{
					msgs.show('Flight '+parkingSlotForThis.name+"	is now ready to land.<br>It will shortly hover on airbase so that you can give it permission to land by clicking on it and then clicking on 'Land' button in down panel.",10000);
					panel.find('.Land').prop('disabled',false);
				}	
					
				orbitChange();
			}
			else land();
		},f["x"]);
	}
	api={
		launch:function(){
			//return false;
			if(currentPlaneStatus=="parked"){
				operation="taxyway";
				// takeoffpath
				//parkingSlotForThis
				/// pathPoints[parkingSlotForThis["parkingDot"]]["y"]
				//////alert(planeTypeDesc);
				if(parkingSlotForThis.initialRotation!=undefined && parkingSlotForThis.initialRotation!=null){
					rotateImageSymmetrical(pln,parkingSlotForThis.initialRotation)
					grotationAngle=parkingSlotForThis.initialRotation;
					parkingSlotForThis.initialRotation=null
				}
				if(planeTypeDesc=="fighter" && !strip.occupy(api)){
					return false;
				}
				youtubeAndMessage(planeType.takeOffMessage,planeType.flightPreparationYoutube[getRandomInt(0,planeType.flightPreparationYoutube.length-1)]);
				//if(strip.occupy(api))
				{
					//////alert(planeTypeDesc);
					typeOfGroundMotion='takeoffpath';
					initiateTaxyWay();
					/*var pathCopy=[];
					for(i in parkingSlotForThis["takeoffpath"]){
						pathCopy.push(parkingSlotForThis["takeoffpath"][i]);
					}*/
				}
			}
		},
		rotateClockwise:function(){
			var cors=getCors(angle,nosex,nosey);
			rx=cors["xc"];
			ry=cors["yc"];
			direction="clockwise";
			//clockwisecircle.gotoxy(cors.xc,cors.yc);
			//anticlockwisecircle.gotoxy(cors.xac,cors.yac);
			rotateClockwiseHelper();			
		},
		rotateAntiClockwise:function(){
			var cors=getCors(angle,nosex,nosey);
			rx=cors["xac"];
			ry=cors["yac"];
			direction="anticlockwise";
			//clockwisecircle.gotoxy(cors.xc,cors.yc);
			//anticlockwisecircle.gotoxy(cors.xac,cors.yac);
			rotateAntiClockwiseHelper();
		},
		mouseEvent:function(leftButtonDown,x,y){
		
			return false; // Remove this to enable motion of plane by mouse click
			if(clicked && leftButtonDown)
			{
				//setTimeout(function(){
						if(checkWhetherClickToMovePlane() && operation=="insky"){
							//////alert(true);
							if(operation=="straightLine")
								return false;
							tx=parseInt(x);
							ty=parseInt(y);
							if(tx==parseInt(rx) && ty==parseInt(ry)){
								return false;
							}
							$(".pathval").prepend('<br>mouseEvent:'+clickedForMotionOfPlaneFlag);
							orbitChange();
							
						}
						
						//clickedForMotionOfPlaneFlag=true;
				//},1000);
				//pln.css('border','2px solid teal');
			}
		},
		mouseEventReset:function(){
			clicked=false;
			pln.removeClass('selected');
			panel.hide();
			//$("#panel .info").html('');
			//pln.css('border','2px solid green');
		},
		notifyToUseStrip:function(){
			if(operation=="insky"){
				land();
			}
			else if(operation=="taxyway" || operation=="landed")
			{	
				typeOfGroundMotion='takeoffpath';
				youtubeAndMessage(planeType.takeOffMessage,planeType.flightPreparationYoutube[getRandomInt(0,planeType.flightPreparationYoutube.length-1)]);
				initiateTaxyWay();
			}
		},
		getType:function(){
			return planeTypeDesc;
		},
		setPlaneMotionFlag:function(f){
			clickedForMotionOfPlaneFlag=f;
		},
		placePlaneOnMap:function(){
			if(operation=="insky" || operation=="straightLine")
			{
				//////alert(nosex+"	"+nosey+"	"+angle);				
				//mapFactorX mapFactorY
				//mapCanvasCtx
				//////alert(mapFactorX*nosex+"||"+mapFactorY*nosey);
				mapCanvasCtx.beginPath();
				
				if(planeTypeDesc=="civilAirline"){
					mapCanvasCtx.fillStyle="green";
				}
				else if(planeTypeDesc=="fighter"){
					mapCanvasCtx.fillStyle="red";
				}
				
				mapCanvasCtx.arc(mapFactorX*nosex,mapFactorY*nosey,5,0,2*Math.PI);
				mapCanvasCtx.fill();
			}
		},
		getCurrentStatus:function(){
			return operation;
		},
		getPK:function(){
			return primaryKey;
		},
		resetMotion:function(){
			//strip.release(api);
			//clearTimeout(timer);
			//tx=-100;
			//ty=100;
			//orbitChange();
			//alert(operation);
			/*if(operation=="insky" || operation=="straightLine" || operation=="newStraightLine"){
			
				
				clearTimeout(timer);
				operation="insky";
				//alert('resety');
				//operation="insky";
				tx=-100;
				ty=100;
				
				firstTargetAchieved=false;
				
				
				//orbitChange();
				if(direction=="clockwise"){
					//this.rotateClockwise();
					direction="anticlockwise"
				}
				else{
					//this.rotateAntiClockwise();
					direction="clockwise"
				}
				
				orbitChange();
			})*/
		},
	/*	highlight:function(){
			pln.css('border','3px solid green');
		},
		highlightremove:function(){
			pln.css('border','none');
		},*/
		notifyToUseRunwayForLanding:function(){
			tokenToland=true;
		},
		launchAfterRandomTime:function(){
			if(planeTypeDesc!="fighter"){
				return false;
			}
			var f=randomCors(180000,0);
			////alert('i will fly after '+(f.x/1000)+"	seconds");
			beamTimerFlag=true;
			
			
			
			
			setTimeout(function(){
				currentPlaneStatus="parked";
				//
				//if(!beamTimerFlag)
					flashRedBeam();
				setTimeout(function(){
					api.launch();
				},5000);
				
			},f["x"]);
		}
	};
	
//	clockwisecircle.hide();
	//anticlockwisecircle.hide();
	//api.rotateClockwise();
	landingNoseX=parseInt($("#map canvas").offset().left-200);
	landingNoseY=parseInt(pathPoints[0]["y"]+airStripCanvasY);
	if(currentPlaneStatus=="insky"){
		if(direction=="clockwise"){
			api.rotateClockwise();
		}
		else if(direction=="anticlockwise") api.rotateAntiClockwise();	
	}
	panel.find('.takeoff').click(function(){
		panel.find('.pauseTaxying').prop('disabled',false);
		pln.find('.timerWidth').hide();
		//clickedForMotionOfPlaneFlag=false;
		//$(".pathval").prepend('<br>takeoff:'+clickedForMotionOfPlaneFlag);
		//////alert('bt');
		//$(this).hide();
		//youtubeAndMessage(planeType.takeOffMessage,planeType.flightPreparationYoutube[getRandomInt(0,planeType.flightPreparationYoutube.length-1)]);
		api.launch();
		//api.mouseEventReset();
		//if(!beamTimerFlag)
		beamTimerFlag=true;
		//alert(beamTimerFlag)
			flashRedBeam();
		$(this).prop('disabled',true);
	});
	panel.find('.Land').click(function(){
		//clickedForMotionOfPlaneFlag=false;
		//////alert(false);	
		//api.mouseEventReset();
		if(operation=="insky"){
			pln.find('.timerWidth').hide();
			
					//////alert(planeTypeDesc);
					land();
					
					/*var pathCopy=[];
					for(i in parkingSlotForThis["takeoffpath"]){
						pathCopy.push(parkingSlotForThis["takeoffpath"][i]);
					}*/


		}
	});	
	
	panel.find('.pauseTaxying').click(function(){
		if(pauseTaxyingFlag)
			pauseTaxyingFlag=false;	
		else pauseTaxyingFlag=true;	
	});
	
	
	
	pln.find('.timerWidth').show();
	//msgs.show('Flight '+parkingSlotForThis.name+"	is now ready to depart.",5);
	return api;
}