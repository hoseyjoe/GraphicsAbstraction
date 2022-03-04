package com.realitycharting.flash;

class Graphics{
	static inline var drawMoveToType=0;
	static inline var drawLineType=1;
	static inline var drawCurvedLineType=2;
	static inline var drawRectType=3;
	static inline var drawRoundRectType=4;
	static inline var drawCircleType=5;
	static inline var drawFillType=6;
	static inline var drawFillRadialType=7;
	static inline var drawFillLinearType=8;
	var _tempDrawCall:DrawCall;
	var _drawCalls:Array<DrawCall>;
	var _oX:Float;//holding offset during begin/end for the moveTo
	var _oY:Float;
	private var blankCall:DrawCall={fillStyle:Graphics.drawFillType, color:[0x000000], alpha:1.0, pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};
	public var hitTarget:Point=null;
	public var hit:Bool=false;
	#if js
	public var svgGraphics:SvGraphics;
	#end
	public var renderTheSvg=false;
	var ctx:Dynamic;
	public function new(){
		_tempDrawCall={fillStyle:Graphics.drawFillType, color:[0x000000], alpha:1.0, pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};
		_drawCalls=new Array();
		#if js this.svgGraphics=new SvGraphics(); #end
	}	

	@:keep
	public function clear(){
		_tempDrawCall={fillStyle:Graphics.drawFillType, color:[0x000000], alpha:1.0, pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};
		_drawCalls=new Array();
		_oX=0;
		_oY=0;
		if (ctx!=null){
			ctx.clearRect(0, 0, 1000, 1000);
			/*TODO:
			☐  get actual widht and height
			*/
		}	
	}
	public function beginFill(clr:Int=0x000000, alpha:Float=1){
		_tempDrawCall={fillStyle:Graphics.drawFillType, color:[clr], alpha:alpha, pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};
	}
	public function beginGradientFill(type:String, colors:Array<Int>, alphas:Array<Float>, ratios:Array<Int>, matrix:Matrix = null, spreadMethod:String = "pad", interpolationMethod:String = "rgb", focalPointRatio:Float = 0){
		if (type==GradientType.RADIAL){
			_tempDrawCall={fillStyle:Graphics.drawFillRadialType, color:colors, alpha:alphas[0], pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};
			//_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat(color:[clr], alpha:alpha,pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};;
		}else {
			_tempDrawCall={fillStyle:Graphics.drawFillLinearType, color:colors, alpha:alphas[0], pointArray:new Array(), lineColor:0x000000, lineAlpha:0.0, lineWidth:1.0};
		}
	}
	public function endFill(){
		//if (_tempDrawCall.)
		_drawCalls.push(_tempDrawCall);
		//var tmp:DrawCall={color:0x000000, alpha:1.0, pointArray:new Array(), lineColor:0x000000, lineAlpha:1.0, lineWidth:1.0};		
		//tmp.color=_tempDrawCall.color;
		//tmp.alpha=_tempDrawCall.alpha;
		//tmp.lineColor=_tempDrawCall.lineColor;
		//tmp.lineAlpha=_tempDrawCall.lineAlpha;
		//_tempDrawCall=tmp;		
	}
	public function drawRect(x:Float,y:Float,width:Float,height:Float){
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawRectType, x, y, width, height]);
	}
	public function drawRoundedRect(x:Float,y:Float,width:Float,height:Float, curveWidth:Float, curveHeight:Float){
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawRectType, x, y, width, curveWidth, curveHeight]);
	}
	public function moveTo(x:Float,y:Float){
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawMoveToType, x, y]);
	}
	public function lineStyle(thickness:Float=0,color:Int=0x000000, alpha:Float=0, IDK=null){
		_tempDrawCall.lineWidth=thickness;
		_tempDrawCall.lineColor=color;
		_tempDrawCall.lineAlpha=alpha;
	}
	public function lineTo(x:Float, y:Float){
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawLineType, x, y]);
	}
	
	public function curveTo(anchorX:Float, anchorY:Float, x:Float, y:Float){
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat( [Graphics.drawCurvedLineType, anchorX, anchorY, x, y]);
	}
	#if js
	public function renderSvg(x,y){
		var i=0;
		for (d in _drawCalls){
			hit=false; 
			svgGraphics.beginFill("#"+StringTools.hex(d.color[0],6),d.alpha );
			
			svgGraphics.lineStyle(d.lineWidth,d.lineColor,d.lineAlpha);
			while (i < d.pointArray.length){
				if (d.pointArray[i]==Graphics.drawMoveToType){
					svgGraphics.moveTo(d.pointArray[i+1] + x,d.pointArray[i+2] + y);					
					i+=3;
				}else if (d.pointArray[i]==Graphics.drawLineType){
					svgGraphics.lineTo(d.pointArray[i+1] + x,d.pointArray[i+2] + y);					
					i+=3;
				}else if (d.pointArray[i]==Graphics.drawCurvedLineType){
					//ctx.quadraticCurveTo(20,100,200,20);
					i+=5;
				}else if (d.pointArray[i]==Graphics.drawRectType){
					svgGraphics.drawRect(d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3], d.pointArray[i+4]);
					if (hitTarget!=null && (d.pointArray[i+1]+x)< hitTarget.x && ( d.pointArray[i+3] + d.pointArray[i+1]+x)> hitTarget.x &&	(d.pointArray[i+2]+y)<hitTarget.y && 	(d.pointArray[i+4] +d.pointArray[i+2]+y)	>hitTarget.y){
						hit=true;
					}
					
					i+=5;
				}else{
					trace("NONE" );
					i++;
				}

			}
			svgGraphics.endFill();
			/*if (hitTarget!=null && ctx.isPointInPath(hitTarget.x, hitTarget.y) || hit==true) {
				//ctx.lineWidth = 2;
				hit=true;
			}else{
				//ctx.lineWidth = d.lineWidth+0.5;
				hit=false;
			}*/
			i=0;			
		}
	}
	#end
	#if kha
	public function render(ctx:kha.graphics2.Graphics,x,y){
		var i=0;
		var currentx=x;
		var currenty=y;
		var poly:Array<Point>=[];
		for (d in _drawCalls){
			hit=false;			
			ctx.color=Color.fromValue(0xff000000+d.color[0]);//alpha needs to be the ff which is equivalent of 1
			ctx.opacity=d.alpha;
			while (i < d.pointArray.length){
				if (d.pointArray[i]==Graphics.drawMoveToType){
					currentx=d.pointArray[i+1] + x;
					currenty=d.pointArray[i+2] + y;		
					poly.push(new Point(currentx,currenty));
					i+=3;
				}else if (d.pointArray[i]==Graphics.drawLineType){
					ctx.drawLine(currentx,currenty,d.pointArray[i+1] + x,d.pointArray[i+2] + y);
					currentx=d.pointArray[i+1] + x;
					currenty=d.pointArray[i+2] + y;
					poly.push(new Point(currentx,currenty));
					i+=3;
				}else if (d.pointArray[i]==Graphics.drawCurvedLineType){
					var QP0 = new Point(d.pointArray[i-2]+ x, d.pointArray[i-1]+y);
					var QP1 = new Point(d.pointArray[i+1]+ x, d.pointArray[i+2]+y);
					var QP2 = new Point(d.pointArray[i+3]+ x, d.pointArray[i+4]+y);
					var CP0 = QP0; 
					var CP3 = QP2;
					var CP1 = new Point(QP0.x + 2/3 *(QP1.x-QP0.x), QP0.y + 2/3 *(QP1.y-QP0.y) );
					var	CP2 = new Point(QP2.x+ 2/3 *(QP1.x-QP2.x), QP2.y + 2/3 *(QP1.y-QP2.y) );
					kha.graphics2.GraphicsExtension.drawCubicBezier(ctx, [CP0.x, CP1.x,CP2.x, CP3.x], [CP0.y, CP1.y,CP2.y, CP3.y]);
					i+=5;
				}else if (d.pointArray[i]==Graphics.drawRectType){
					ctx.fillRect(d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3], d.pointArray[i+4]);					
					if (hitTarget!=null && (d.pointArray[i+1]+x)< hitTarget.x && ( d.pointArray[i+3] + d.pointArray[i+1]+x)> hitTarget.x &&	(d.pointArray[i+2]+y)<hitTarget.y && (d.pointArray[i+4] +d.pointArray[i+2]+y)	>hitTarget.y){
						hit=true;
					}					
					i+=5;
				}else if (d.pointArray[i]==Graphics.drawCircleType){
					//ctx.drawRect(0,0,10,10);
					//ctx.drawCircle(5,5,5);
					kha.graphics2.GraphicsExtension.fillCircle(ctx,d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3]);
					//ctx.fillCircle(d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3]);			
					i+=4;
				}else{
					trace("NONE" );
					i++;
				}

			}
			hit=false;

			i=0;
			
		}
	}
	#else
	public function render(canvas:CanvasElement,x:Float,y:Float){
		if (canvas!=null ){
			ctx=canvas.getContext('2d'); 
			var i=0;
			for (d in _drawCalls){
				hit=false;
				ctx.beginPath();
				ctx.lineWidth=d.lineWidth;
				ctx.strokeStyle="#"+StringTools.hex(d.lineColor,6);
				ctx.globalAlpha =d.alpha;
				if(d.fillStyle==Graphics.drawFillType){
					ctx.fillStyle="#"+StringTools.hex(d.color[0],6);
				}else{
					var grd=ctx.createRadialGradient(Math.floor(6+x),Math.floor(6+y),100,Math.floor(6+x),Math.floor(6+y),10);
					grd.addColorStop(0,"#"+StringTools.hex(d.color[0],6));
					grd.addColorStop(1,"#"+StringTools.hex(d.color[1],6));
					ctx.fillStyle=grd;
				}
				while (i < d.pointArray.length){
					if (d.pointArray[i]==Graphics.drawMoveToType){
						ctx.moveTo(d.pointArray[i+1] + x,d.pointArray[i+2] + y);					
						i+=3;
					}else if (d.pointArray[i]==Graphics.drawLineType){
						ctx.lineTo(d.pointArray[i+1] + x ,d.pointArray[i+2] + y);					
						i+=3;
					}else if (d.pointArray[i]==Graphics.drawCurvedLineType){
						ctx.quadraticCurveTo(d.pointArray[i+1]+ x, d.pointArray[i+2]+y, d.pointArray[i+3]+ x, d.pointArray[i+4]+y);
						//ctx.quadraticCurveTo(20,100,200,20);
						i+=5;
					}else if(d.pointArray[i]==Graphics.drawCircleType){
						ctx.arc(d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3], 0, 2 * Math.PI, false);
						i+=4;
					}else if (d.pointArray[i]==Graphics.drawRectType){
						ctx.fillRect(d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3], d.pointArray[i+4]);								
						if (hitTarget!=null && (d.pointArray[i+1]+x)< hitTarget.x && ( d.pointArray[i+3] + d.pointArray[i+1]+x)> hitTarget.x &&	(d.pointArray[i+2]+y)<hitTarget.y && 	(d.pointArray[i+4] +d.pointArray[i+2]+y)	>hitTarget.y){
							hit=true;
						}					
						i+=5;
					}else if (d.pointArray[i]==Graphics.drawRoundRectType){
						//ctx.fillRoundRect(d.pointArray[i+1]+x, d.pointArray[i+2]+y, d.pointArray[i+3], d.pointArray[i+4], d.pointArray[i+5], d.pointArray[i+6]);		

						/*var stroke=null
						if (typeof stroke == 'undefined') {
							stroke = true;
						}
						if (typeof radius === 'undefined') {
							radius = 5;
						}*/

						var radius = {tl: d.pointArray[i+5], tr: d.pointArray[i+5], br: d.pointArray[i+6], bl: d.pointArray[i+6]};
						var width=d.pointArray[i+3];
						var height=d.pointArray[i+4];
						var xx= x+d.pointArray[i+1];
						var yy= y+d.pointArray[i+2];
						ctx.beginPath();
						ctx.moveTo(xx + radius.tl, yy);
						ctx.lineTo(xx + width - radius.tr, yy);
						ctx.quadraticCurveTo(xx + width, yy, xx + width, yy + radius.tr);
						ctx.lineTo(xx + width, yy + height - radius.br);
						ctx.quadraticCurveTo(xx + width, yy + height, xx + width - radius.br, yy + height);
						ctx.lineTo(xx + radius.bl, yy + height);
						ctx.quadraticCurveTo(xx, yy + height, xx, yy + height - radius.bl);
						ctx.lineTo(xx, yy + radius.tl);
						ctx.quadraticCurveTo(xx, yy, xx + radius.tl, yy);
						ctx.closePath();
						/*if (fill) {
							ctx.fill();
						}
						if (stroke) {
							ctx.stroke();
						}	*/
						if (hitTarget!=null && (d.pointArray[i+1]+x)< hitTarget.x && ( d.pointArray[i+3] + d.pointArray[i+1]+x)> hitTarget.x &&	(d.pointArray[i+2]+y)<hitTarget.y && 	(d.pointArray[i+4] +d.pointArray[i+2]+y)	>hitTarget.y){
							hit=true;
						}							
						i+=7;
					}

				}
				if (hitTarget!=null && ctx.isPointInPath(hitTarget.x, hitTarget.y) || hit==true) {
					//ctx.lineWidth = 2;
					hit=true;
				}else{
					//ctx.lineWidth = d.lineWidth+0.5;
					hit=false;
				}
				ctx.fill();
				ctx.globalAlpha =1;
				ctx.stroke();
				i=0;
				
			}
		}
	}
	#end
	public function drawCircle(x,y,radius){
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawCircleType, x, y, radius]);
		//.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	}
	
	public function drawRoundRect(x:Float, y:Float, width:Float, height:Float, ellipseWidth:Float, ellipseHeight:Float ){
		//_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawRectType, x, y, width, height]);
		_tempDrawCall.pointArray = _tempDrawCall.pointArray.concat([Graphics.drawRoundRectType, x, y, width, height, ellipseWidth, ellipseHeight]);
	}
	public function getBounds():Bounds{
		var i=0;
		var bound:Bounds={
				xMin:0,
				yMin:0,
				xMax:0,
				yMax:0
			}
			for (d in _drawCalls){
				while (i < d.pointArray.length){
					if (d.pointArray[i]==Graphics.drawMoveToType){
						bound=checkPoint(d.pointArray[i+1] ,d.pointArray[i+2], bound);					
						i+=3;
					}else if (d.pointArray[i]==Graphics.drawLineType){
						bound=checkPoint(d.pointArray[i+1],d.pointArray[i+2], bound);					
						i+=3;
					}else if (d.pointArray[i]==Graphics.drawCurvedLineType){
						bound=checkPoint(d.pointArray[i+1], d.pointArray[i+2], bound);
						bound=checkPoint(d.pointArray[i+3], d.pointArray[i+4], bound);
						//ctx.quadraticCurveTo(20,100,200,20);
						i+=5;
					}else if (d.pointArray[i]==Graphics.drawRectType){
						bound=checkPoint(d.pointArray[i+1], d.pointArray[i+2], bound);
						bound=checkPoint(d.pointArray[i+1]+d.pointArray[i+3], d.pointArray[i+2]+d.pointArray[i+4], bound);					
						i+=5;
					}else if (d.pointArray[i]==Graphics.drawRoundRectType){
						bound=checkPoint(d.pointArray[i+1], d.pointArray[i+2], bound);
						bound=checkPoint(d.pointArray[i+1]+d.pointArray[i+3], d.pointArray[i+2]+d.pointArray[i+4], bound);					
						i+=7;
					}else if(d.pointArray[i]==Graphics.drawCircleType){
						bound=checkPoint(d.pointArray[i+1], d.pointArray[i+2], bound);
						bound=checkPoint(d.pointArray[i+1]-d.pointArray[i+3], d.pointArray[i+2]-d.pointArray[i+3], bound);
						i+=4;
						//.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
					}else{
						trace("NONE" );
						i++;
					}
				}
				i=0;
				
			}
		
		
		return bound;
	}
	public function checkPoint(x:Float=0,y:Float=0, current:Bounds):Bounds{
		if (current==null){
			current={
				xMin:0,
				yMin:0,
				xMax:0,
				yMax:0
			}
		}

		current={
			xMin:(current.xMin>x)?x:current.xMin,
			yMin:(current.yMin>y)?y:current.yMin,
			xMax:(current.xMax<x)?x:current.xMax,
			yMax:(current.yMax<y)?y:current.yMax		
		}
		return current;
	}
	
}
typedef DrawCall={
	var fillStyle:Int;
	var color:Array<Int>;
	var alpha:Float;
	var pointArray:Array<Float>;//this is line style (line, curved, rect) which defines whether the next x number of points are counted
	var lineColor:Int;
	var lineAlpha:Float;
	var lineWidth:Float;
}

