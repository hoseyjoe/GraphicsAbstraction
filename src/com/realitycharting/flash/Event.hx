package com.realitycharting.flash;
class Event{
	public static inline var ENTER_FRAME:String="ENTER_FRAME";
	public static inline var FOCUS_OUT:String = "FOCUS_OUT";
	public static inline var ADDED_TO_STAGE:String = "ADDED_TO_STAGE";
	public var target:Dynamic;
	public var type:String;
	public var fnc:Function;
	
	public function new(e, f){
		
	}
}