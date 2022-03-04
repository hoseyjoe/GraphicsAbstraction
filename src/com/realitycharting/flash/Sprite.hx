package com.realitycharting.flash;
//imports are found in imports.hx
class Sprite extends DisplayObject{
	public var renderable:Bool;
	@:isVar	
	public var graphics:Graphics;
	@:isVar
	public var hitTarget(get, set):Point;
	public var mouseEnabled:Bool;
	public var mouseX:Float;
	public var mouseY:Float;
	
	public var scaleX:Float;
	public var scaleY:Float;
	
	public var alpha:Float;
	public var useHandCursor:Bool;
	public var doubleClickEnabled:Bool;
	public var buttonMode:Bool;
	public var mouseChildren:Bool;

	public function startDrag(){
		
	}
	public function stopDrag(){
		
	}
	public function new(){
		super();
		renderable=true;
		this.graphics=new Graphics();
		graphics.renderTheSvg=renderTheSvg;
		children = new Array();
		eventChildren = new Array();
		x=0;
		y=0;
		width=0;
		height=0;
		svgString="";
	}
	
	function get_hitTarget() {
		return hitTarget;
	}
	function set_hitTarget(_hitTarget:Point) {
		mouseX=_hitTarget.x;
		mouseY=_hitTarget.y;
		hitTarget=_hitTarget;
		graphics.hitTarget=hitTarget;
		return hitTarget;
	}
	override function get_width():Float {
		var bound:Bounds=graphics.getBounds();
		_width_=bound.xMax-bound.xMin;
		var cwidth:Float=0;
		for (c in children){
			if ( c.visible){
				cwidth=c.width;
				if (c.width>_width_)_width_=cwidth;				
			}
		}
		return _width_;
	}
	override function set_width(w) {
		_width_=w;
		return _width_;
	}
	override function get_height():Float {
		var bound:Bounds=graphics.getBounds();
		_height_=bound.yMax-bound.yMin;

		for (c in children){
			if ( c.visible){
				if (c.height>_height_){
					_height_=c.height;
				}
			}
		}
		return _height_;
	}
	override function set_height(h) {
		_height_=h;
		return _height_ ;
	}

	override public function renderSvg(svgElement, xx:Float=0, yy:Float=0){
		this.graphics.renderSvg( x+xx, y+yy);
		this.svgString+=graphics.svgGraphics._xml;
		var txt:TextField;
		var sprite:Sprite;
		for (c in children){
			if (Std.is(c,Sprite) && c.visible){
				sprite=cast(c,Sprite);
				sprite.renderSvg(svgElement, x+xx, y+yy);
				this.svgString+=sprite.svgString;
			}
			if (Std.is(c,TextField) && c.visible){
				txt=cast(c,TextField);
				txt.renderSvg(svgElement, x+xx, y+yy);  
				this.svgString+=txt.svgString;	
			}
		}
		if (svgElement!=null){
			#if js
			svgElement.innerHTML=svgString;
			for (n in graphics.svgGraphics.svgNodes)
				svgElement.appendChild(n);
			#end
		}
	}

	
	@:keep
	override public function render(canvas, xx:Float=0, yy:Float=0){		
		if (renderable){
			var newx=xx+x;
			var newy=yy+y;
			if (this.visible  ){
				//if (newx>0 && this.width+newx>0  ) 
				this.graphics.render(canvas, newx, newy);		
				for (c in children){
					c.render(canvas, newx, newy);
				}
			}
		}
	}

}



