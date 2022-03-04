#if kha
import kha.Framebuffer;
import kha.Image;
import kha.System;
import kha.graphics2.ImageScaleQuality;
import kha.Assets;
#end

class Main {
	static function main() {
		#if kha
		System.init({
			title: "MeshLoader",
			width: 800,
			height: 600,
			samplesPerPixel: 4
		}, init);
		#else
		new Main();
		#end
	}
	#if kha
	static function init() {
		
		Assets.loadEverything(loadingFinished);
		
	}

	static function loadingFinished() {
		new Main();
	}
	#end
	private var s:Sprite;

	function new() {
		s = new Sprite();
		var c:Sprite;
		var d:Sprite;
		var previous:Sprite = s;
		var txt:TextField;
		s.addEventListener(MouseEvent.CLICK, dude);
		s.graphics.beginFill(0xffffff, 1);
		s.graphics.drawRect(0, 0, 10, 10);
		s.graphics.endFill();
		for (i in 0...5) {
			c = new Sprite();
			for (z in 0...5) {
				c = new Sprite();
				c.graphics.beginFill(0xff0000, 1);
				c.graphics.drawRect(0, 0, 5, 5);
				c.graphics.endFill();

				c.name = c.x + "," + c.y;
				previous.addChild(c);
				txt = new TextField();
				txt.text = 'Hello $i $z';
				txt.y = 0;
				txt.x = 100;
				c.addChild(txt);
				c.x = (c.width + 1);
				c.y = (c.height + 5) * z;
			}
			//   previous.addChild(d);

			txt = new TextField();
			txt.text = 'Hello $i';
			txt.y = 0;
			txt.x = 100;
			c.addChild(txt);
			previous = c;
		}
		txt = new TextField();
		txt.text = "AT 0";
		txt.y = 0;
		txt.x = 0;
		s.addChild(txt);

		#if !kha
		var canvas:CanvasElement = cast(js.Browser.document.getElementById("canvas"), CanvasElement);
		var svg:SVGElement = cast(js.Browser.document.getElementById("svg"), SVGElement);
		s.render(canvas, 0, 0);
		s.renderSvg(svg, 0, 0);
		#else
		backbuffer = Image.createRenderTarget(400, 300);

		System.notifyOnRender(renderMe);
		#end
		// s.render(canvas,0,0);
		// s.render(canvas,0,0);
		// s.graphics.clear();
		// s.render(canvas,0,0);
		trace(s.x + " " + s.y + " " + s.width + "," + s.height);
	}

	function dude(e) {
		trace("Hello");
	}

	#if kha
	var backbuffer:Image;

	public function renderMe(framebuffer:Framebuffer):Void {
		backbuffer.g2.font = Assets.fonts.ARIAL;
		backbuffer.g2.fontSize = 12;
		backbuffer.g2.imageScaleQuality = ImageScaleQuality.High;
		s.render(backbuffer.g2, 0, 0);
		/*backbuffer.g2.begin(Color.Black);
			backbuffer.g2.end();

			framebuffer.g2.begin(Color.Blue);
			Scaler.scale(backbuffer, framebuffer, System.screenRotation);
			framebuffer.g2.end(); */
	}
	#end
}
