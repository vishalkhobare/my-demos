// JavaScript Document

var renderMethod={
	placePieces:function(board,chessJSObj){
		var recursive_flag=true;
		for (var key in chessJSObj) {
		  if(key=="class")
		  {			  
				recursive_flag=false;
				for (var key1 in chessJSObj['position']) {
					$("#"+(chessJSObj['position'][key1])).addClass(chessJSObj[key]);
					//alert("#"+(chessJSObj['position'][key1]));
				}
				break;
		  }	
		}
		if(recursive_flag)		
		{
			for (var key in chessJSObj) 
			{
				this.placePieces(board,chessJSObj[key]);						
			}			
			
		}
	},
	orientationAdjustMent:function(board,chessJSObj,o,option){
		
		var imgDim=50;		
		var rowStart=0;
		$('.block-white,.block-black,#horizontal-naming1,#horizontal-naming2,#verticle-naming1,#verticle-naming2').remove();
		if(o=="bottom")
		{
			for(i=0;i<8;i++)
			{			
				for(j=0;j<8;j++)
				{
					if((rowStart%2)==0)
					{
						board.append("<div id='"+(String.fromCharCode(j+65))+(8-i)+"' style='top:"+(i*imgDim)+"px;left:"+(j*imgDim)+"px;' class='block-white'></div>");
					}
					else
					{
						 board.append("<div id='"+(String.fromCharCode(j+65))+(8-i)+"' style='top:"+(i*imgDim)+"px;left:"+(j*imgDim)+"px;' class='block-black'></div>");	
					}
					rowStart++;
				}
				rowStart++;				
			}
			board.parent().append("<div id='horizontal-naming1'></div><div id='horizontal-naming2'></div>");
			var bml=parseInt(board.css('margin-left'));
			var x=bml+imgDim/2-5;			
			for(i=0;i<8;i++)
			{
				$("#horizontal-naming1").append("<div style='position:absolute;left:"+(x)+"px;top:"+(0)+"px;'>"+(String.fromCharCode(i+65))+"</div>");
				$("#horizontal-naming2").append("<div style='position:absolute;left:"+(x)+"px;top:"+(imgDim*8+bml)+"px;'>"+(String.fromCharCode(i+65))+"</div>");
				x=x+imgDim;
			}
			
			board.parent().append("<div id='verticle-naming1' style='position:absolute;width:"+bml+"px;'></div><div id='verticle-naming2'  style='position:absolute;width:"+bml+";'></div>");
			x=(imgDim/2)-5;
			for(i=0;i<8;i++)
			{
				$("#verticle-naming1").append("<div style='position:absolute;top:"+(x)+"px;left:"+(2)+"px;'>"+(8-i)+"</div>");
				$("#verticle-naming2").append("<div style='position:absolute;padding-left:2px;top:"+(x)+"px;left:"+(imgDim*8+bml)+"px;'>"+(8-i)+"</div>");
				x=x+imgDim;
			}
		}
		else if(o=="top")
		{
			for(i=0;i<8;i++)
			{			
				for(j=0;j<8;j++)
				{
					if((rowStart%2)==0)
					{
						board.append("<div id='"+(String.fromCharCode(72-j))+(i+1)+"' style='top:"+(i*imgDim)+"px;left:"+(j*imgDim)+"px;' class='block-white'></div>");
					}
					else
					{
						 board.append("<div id='"+(String.fromCharCode(72-j))+(i+1)+"' style='top:"+(i*imgDim)+"px;left:"+(j*imgDim)+"px;' class='block-black'></div>");	
					}
					rowStart++;
				}
				rowStart++;
				
			}
			board.parent().append("<div id='horizontal-naming1'></div><div id='horizontal-naming2'></div>");
			var bml=parseInt(board.css('margin-left'));
			var x=bml+imgDim/2-5;			
			for(i=0;i<8;i++)
			{
				$("#horizontal-naming1").append("<div style='position:absolute;left:"+(x)+"px;top:"+(0)+"px;'>"+(String.fromCharCode(72-i))+"</div>");
				$("#horizontal-naming2").append("<div style='position:absolute;left:"+(x)+"px;top:"+(imgDim*8+bml)+"px;'>"+(String.fromCharCode(72-i))+"</div>");
				x=x+imgDim;
			}
			
			board.parent().append("<div id='verticle-naming1' style='position:absolute;width:"+bml+"px;'></div><div id='verticle-naming2'  style='position:absolute;width:"+bml+";'></div>");
			x=(imgDim/2)-5;
			for(i=0;i<8;i++)
			{
				$("#verticle-naming1").append("<div style='position:absolute;top:"+(x)+"px;left:"+(2)+"px;'>"+(i+1)+"</div>");
				$("#verticle-naming2").append("<div style='position:absolute;padding-left:2px;top:"+(x)+"px;left:"+(imgDim*8+bml)+"px;'>"+(i+1)+"</div>");
				x=x+imgDim;
			}
			
		}
		
		
	},
	placePiecesOrientation:function(board,chessJSObj,o,option){
		
		
		var thi=this;
		/*$("#whitebottom").click(function(){
			thi.orientationAdjustMent(board,chessJSObj,"bottom",option)
		});		
		$("#whitetop").click(function(){
			thi.orientationAdjustMent(board,chessJSObj,"top",option)
		});		*/
		
		this.orientationAdjustMent(board,chessJSObj,o,option)				
		
		chessJSObj.white=new Array();
		
		chessJSObj.white.rook=new Array();
		chessJSObj.white.rook.position=new Array();
		chessJSObj.white.rook.position[0]="A1";
		chessJSObj.white.rook.position[1]="H1";
		chessJSObj.white.rook['class']='piece-white-rook';

		chessJSObj.white.bishop=new Array();
		chessJSObj.white.bishop.position=new Array();
		chessJSObj.white.bishop.position[0]="C1";
		chessJSObj.white.bishop.position[1]="F1";
		chessJSObj.white.bishop['class']='piece-white-bishop';
		
		chessJSObj.white.knight=new Array();
		chessJSObj.white.knight.position=new Array();
		chessJSObj.white.knight.position[0]="B1";
		chessJSObj.white.knight.position[1]="G1";
		chessJSObj.white.knight['class']='piece-white-knight';
		
		chessJSObj.white.king=new Array();
		chessJSObj.white.king.position=new Array();
		chessJSObj.white.king.position[0]="E1";
		chessJSObj.white.king['class']="piece-white-king";


		chessJSObj.white.queen=new Array();
		chessJSObj.white.queen.position=new Array();
		chessJSObj.white.queen.position[0]="D1";
		chessJSObj.white.queen['class']="piece-white-queen";	
		
		chessJSObj.white.pawn=new Array();
		for(i=0;i<8;i++)			
		{
			chessJSObj.white.pawn[i]=new Object();
			chessJSObj.white.pawn[i]['class']='piece-white-pawn';
			chessJSObj.white.pawn[i]['position']=new Array();
			chessJSObj.white.pawn[i]['position'][0]=String.fromCharCode(i+65)+2;
		}



		chessJSObj.black=new Array();
		
		chessJSObj.black.rook=new Array();
		chessJSObj.black.rook.position=new Array();
		chessJSObj.black.rook.position[0]="A8";
		chessJSObj.black.rook.position[1]="H8";
		chessJSObj.black.rook['class']='piece-black-rook';

		chessJSObj.black.bishop=new Array();
		chessJSObj.black.bishop.position=new Array();
		chessJSObj.black.bishop.position[0]="C8";
		chessJSObj.black.bishop.position[1]="F8";
		chessJSObj.black.bishop['class']='piece-black-bishop';
		
		chessJSObj.black.knight=new Array();
		chessJSObj.black.knight.position=new Array();
		chessJSObj.black.knight.position[0]="B8";
		chessJSObj.black.knight.position[1]="G8";
		chessJSObj.black.knight['class']='piece-black-knight';
		
		chessJSObj.black.king=new Array();
		chessJSObj.black.king.position=new Array();
		chessJSObj.black.king.position[0]="E8";
		chessJSObj.black.king['class']="piece-black-king";


		chessJSObj.black.queen=new Array();
		chessJSObj.black.queen.position=new Array();
		chessJSObj.black.queen.position[0]="D8";
		chessJSObj.black.queen['class']="piece-black-queen";	
		
		chessJSObj.black.pawn=new Array();
		for(i=0;i<8;i++)			
		{
			chessJSObj.black.pawn[i]=new Object();
			chessJSObj.black.pawn[i]['class']='piece-black-pawn';
			chessJSObj.black.pawn[i]['position']=new Array();
			chessJSObj.black.pawn[i]['position'][0]=String.fromCharCode(i+65)+7;
		}				

		this.placePieces(board,chessJSObj);
		bindEvents(board,chessJSObj,option);
		
	}	
};