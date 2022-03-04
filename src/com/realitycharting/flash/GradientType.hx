package com.realitycharting.flash;

@:enum abstract GradientType(Int) {
	public var LINEAR = 0;
	public var RADIAL = 1;

	@:from
	public static function fromString(value:String):GradientType {
		return switch (value.toLowerCase()) {
			case "linear": GradientType.LINEAR;
			case "radial": GradientType.RADIAL;
			default: null;
		}
	}

	@:to
	public static function toString(value:Int):String {
		return switch (value) {
			case 0: "linear";
			case 1: "radial";
			default: null;
		}
	}
}
