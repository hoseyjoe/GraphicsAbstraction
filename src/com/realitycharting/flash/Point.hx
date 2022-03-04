package com.realitycharting.flash;
class Point{
	public var x:Float;
	public var y:Float;
	public function new (_x:Float,_y:Float){
		x=_x;
		y=_y;
	}
	public function clone ():Point {		
		return new Point (x, y);
		
	}
}