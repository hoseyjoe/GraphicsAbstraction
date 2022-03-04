package com.realitycharting.flash;
#if kha
import kha.input.Mouse;
#end

class DisplayObject {
    public var parent:Dynamic;
    @:isVar
	public var numChildren(get, set):Int;
	@:isVar
	public var x(get, set):Float;
	@:isVar
	public var y(get, set):Float;
	public var width(get, set):Float;
	@:isVar
    public var height(get, set):Float;
    private var _width_:Float;
	private var _height_:Float;
	
    var children:Array<DisplayObject>;
    var eventChildren:Array<Event>;
    public var visible:Bool;
    public var svgString:String;
    public var renderTheSvg = true;
    public var name:String;
    public function new() {	
		#if kha
		initInputs();
		#end
		visible=true;	
        eventChildren=new Array();
    }
    public function addChild(s:Dynamic){
		s.parent = this;
		this.children.push(s);
	}
	public function removeChild(s:Dynamic){
		eventChildren.remove(s);
		children.remove(s);
	}
	public function addEventListener(e:String, f:Dynamic){
		eventChildren.push(new Event(e,f));
	}
	public function removeEventListener(e:String, f:Dynamic){
		eventChildren.remove(new Event(e,f));
	}
	public function getChildAt(d):Sprite{
		return new Sprite();
	}
	#if kha
	public function render(framebuffer:kha.graphics2.Graphics, xx:Float=0, yy:Float=0){}
	#else
    public function render(canvas:CanvasElement, xx:Float=0, yy:Float=0){}
	#end
	#if js
    public function renderSvg(svgElement:SVGElement, xx:Float=0, yy:Float=0){}
	#end
    function get_width():Float{
        return _width_; 
    }
    function set_width(w):Float{
        return _width_; 
    }
     function get_height():Float{
        return _height_; 
    }
    function set_height(w):Float{
        return _height_; 
    }
    function get_x() {
		return x;
	}
	function set_x(_x) {
		x=Math.floor(_x);
		return x;
	}
	function get_y() {
		return y;
	}
	function set_y(_y) {
		y=Math.floor(_y);
		return y ;
	}
    function setChildIndex(child:Dynamic,newIndex:Int){
		var oldIndex=this.children.indexOf(child);
		if (newIndex<children.length && newIndex!=oldIndex){
			if(oldIndex<newIndex){
				this.children.insert(newIndex,child);
				this.children.remove(child);
			}else if (oldIndex>newIndex){
				this.children.remove(child);
				this.children.insert(newIndex,child);
			}
		}
	}
	function checkChildrenforMouseEvent(target:Sprite, x:Float=0,y:Float=0):Bool{
		var ret:Bool=false;
		target.hitTarget=new Point(x,y);
		
		if (target.graphics.hit ){
			/*
			this relies on the render to mark hit during drawing. (redraw happening on mouse move)
			doesnt work for svg
			*/
			for (c in target.eventChildren){
				if(c.type==MouseEvent.MOUSE_OVER){					
					c.fnc("");
					ret=true;
				}else if(c.type==MouseEvent.MOUSE_OUT){
					//c.fnc("");
				}
			}
		}else{
			for (c in target.children){				
				if (Std.is(c,Sprite) ) {
					ret = checkChildrenforMouseEvent(cast(c,Sprite),x,y);
						//setChildIndex(c,target.children.length-1);
						
				}
			}
		}
		return ret;
	}
	function get_numChildren() {
		//if (numChildren==null)numChildren=0;
		return numChildren;
	}
	function set_numChildren(num) {
		numChildren=num;
		return numChildren;
	}
	
	#if kha
	public function initInputs() {
        if (Mouse.get() != null) Mouse.get().notify(mouseDown, mouseUp, mouseMove, mouseWheel);
    }

    private function mouseDown(button: Int, x: Int, y: Int): Void {
        trace('down');
    }

    private function mouseUp(button: Int, x: Int, y: Int): Void {
        trace('up');
    }

    private function mouseMove(x: Int, y: Int, movementX: Int, movementY: Int): Void {
        trace('Move');
    }

    private function mouseWheel(delta: Int): Void {
        trace('Wheel');
    }
	#end
}