package com.realitycharting.flash;
#if kha
//using hxColorToolkit.ColorToolkit;
#end
//imports are found in imports.hx
using StringTools;
class TextField extends DisplayObject{
	public var autoSize:String;
	public var type:String;
	public var rotation:Float;
	public var defaultTextFormat:TextFormat;
	private var _text:String;
	public var text(get,set):String;
	public var background:Bool;
	#if !kha
	public var tmpCanvas:CanvasElement;
	#end
	public var embedFonts:Bool;
	public var selectable:Bool;
	public var border:Bool;
	public var alpha:Float;

	public var multiline:Bool;
	public var wordWrap:Bool;
	public var backgroundColor:Int;
	public var mouseEnabled:Bool;
	
	public function new(){
		super();
		_text="";
		#if(!kha)
		tmpCanvas= Browser.document.createCanvasElement();
		#end
		defaultTextFormat=new TextFormat("arial", 12, 0xfff000);
		x=0;
		y=0;
		rotation=0;
		
	}

	function get_text():String{
		return _text;
	}
	function set_text(txt):String{
		_text=txt;
		#if (!kha)		
		var teext = tmpCanvas.getContext("2d").measureText(txt); // TextMetrics object
  		width=teext.width;
		height=defaultTextFormat.fontSize;
		/*TODO: 
		☐ HOw do I get the height http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
		*/
		#end
		return _text;
	}
	#if !kha
	override public function renderSvg(canvas:SVGElement,xx:Float=0,yy:Float=0){
		trace(this.text);
		if(rotation!=0){
			//svgString+="<g transform=\"translate("+(x+xx)+","+(y+yy+height)+")\"><text text-anchor=\"end\" fill=\""+StringTools.hex(defaultTextFormat.fontColor)+"\" transform=\"rotate("+rotation+")\" font-family=\""+defaultTextFormat.fontName+"\" font-size=\""+defaultTextFormat.fontSize+"\">"+this.text+"</text></g>";
			svgString += '<g transform="translate(${x+xx},${y+yy+height})"><text text-anchor="end" fill="#${StringTools.hex(defaultTextFormat.fontColor)}" transform="rotate(${rotation})" font-family="${defaultTextFormat.fontName}" font-size="${defaultTextFormat.fontSize}">${this.text}</text></g>';
		}else{
			//svgString+="<g transform=\"translate("+(x+xx)+","+(y+yy+height)+")\"><text fill=\""+StringTools.hex(defaultTextFormat.fontColor)+"\" transform=\"rotate("+rotation+")\" font-family=\""+defaultTextFormat.fontName+"\" font-size=\""+defaultTextFormat.fontSize+"\">"+this.text+"</text></g>";
			svgString += '<g transform="translate(${x + xx},${y + yy + height})"><text text-anchor="end" fill="#${StringTools.hex(defaultTextFormat.fontColor)}" transform="rotate(${rotation})" font-family="${defaultTextFormat.fontName}" font-size="${defaultTextFormat.fontSize}">${this.text}</text></g>';
		}

	}
	#end
	#if kha
	override public function render(canvas:kha.graphics2.Graphics ,xx:Float=0,yy:Float=0){
		if (_text!=null && canvas!=null) {
			var tmp=canvas.color;
			var clr= 0xff000000 +StringTools.hex(defaultTextFormat.fontColor);

			canvas.color=kha.Color.fromValue(clr );

			canvas.fontSize=Math.floor(defaultTextFormat.fontSize);
			canvas.drawString(_text, xx+x, yy+y);
			canvas.color=tmp;
		}
			
	}
	#else
	@:keep
	override public function render(canvas:CanvasElement,xx:Float=0,yy:Float=0){
			//if(renderable){
				// start by saving the current context (current orientation, origin)
				//temp context for metrics
				var teextContext = tmpCanvas.getContext("2d");// TextMetrics object
				teextContext.font=(defaultTextFormat.fontSize)+"px Arial";	
				teextContext.textAlign = this.autoSize;
				//teextContext.textBaseline="top"; 
				teextContext.fillText(text, 0,0);
				_width_=teextContext.measureText(text).width;
				//temp context for metrics
				if (canvas==null){
					trace("NULL *************");
				}
				var context=canvas.getContext('2d');		
				context.save();	
				
				if (rotation!=0){
					context.textAlign = "right";
				}else{
					context.textAlign = this.autoSize;
				}
				context.font=(defaultTextFormat.fontSize)+"px Arial";	
				if (this.background){
					var hold=context.fillStyle;
					context.fillStyle ="#000000";
					context.fillRect(x-_width_, y, _width_, defaultTextFormat.fontSize+4);
					context.stroke();
					context.fillStyle =hold;
				}
				/*if (rotation!=0){//trace(rotation);
					xx=xx;//??????????? maybe this should be the same irregardless of rotation
				}else{
					xx=xx;
				}*/
				
				yy=yy+height;
				context.translate( xx+x, yy+y  );
				context.rotate( rotation/ 180 * Math.PI );	
				context.fillStyle ="#"+StringTools.hex(defaultTextFormat.fontColor,6);	
				//context.textBaseline="top"; 
				context.fillText(text, 0,0);
				// now restore the canvas flipping it back to its original orientation
				context.restore();
			//}
	}
	#end
	override function get_width() {
		return _width_;
	}
	override function set_width(w) {
		_width_=w;
		return _width_;
	}
	override function get_height() {
		return _height_;
	}
	override function set_height(h) {
		_height_=h;
		return _height_ ;
	}


}