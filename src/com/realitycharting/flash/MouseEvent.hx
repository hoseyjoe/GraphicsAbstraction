package com.realitycharting.flash;

class MouseEvent {
	public static inline var MOUSE_OVER:String = "MOUSE_OVER";
	public static inline var MOUSE_OUT:String = "MOUSE_OUT";
	public static inline var MOUSE_DOWN:String = "MOUSE_DOWN";
	public static inline var MOUSE_UP:String = "MOUSE_UP";
	public static inline var CLICK:String = "CLICK";

	public var type:String;
	public var target:Dynamic;

	public function new(e, f:Function = null) {}
}
