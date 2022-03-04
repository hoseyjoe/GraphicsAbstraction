package com.realitycharting.flash;
class TextFormat{
	public var fontName:String;
	public var fontSize:Float;
	public var fontColor:Int;
	public var size(get, set):Float;
	public function new(fontName:String="Arial", fontSize:Float=12, fontColor:Int=0xff00ff){
		this.fontName=fontName;
		this.fontSize=fontSize;
		this.fontColor=fontColor;
	}
	private function get_size():Float{
		return fontSize;
	}
	private function set_size(s):Float{
		fontSize = s;
		return fontSize;
	}
}