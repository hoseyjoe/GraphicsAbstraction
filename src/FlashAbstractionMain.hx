#if kha
import kha.Framebuffer;
import kha.Image;
import kha.System;
#end

class FlashAbstractionMain {
    static function main() {
        #if kha
            System.init({title: "MeshLoader", width: 800, height: 600}, init);
        #else
        new Main();
        #end
    }
    static function init() {
        Assets.loadEverything(loadingFinished);
		
	}
    static function loadingFinished() {
        new Main();
    }
    private var s:Sprite;
    function new(){
        s=new Sprite();
        var c:Sprite;
        var d:Sprite;
        var previous:Sprite=s;
        var txt:TextField;
        
        s.graphics.beginFill(0xffffff,1);
        s.graphics.drawRect(0,0,10,10);
        s.graphics.endFill();
        for (i in 0...5){
            c=new Sprite();
            for (z in 0...5){
                c=new Sprite();                
                c.graphics.beginFill(0xff0000,1);
                c.graphics.drawRect(0,0,5,5);
                c.graphics.endFill();
                
                c.name=c.x+","+c.y;
                previous.addChild(c);    
                txt=new TextField();
                txt.text="Hello";
                txt.y=0;
                txt.x=100;
                c.addChild(txt);   
                c.x=(c.width+1);
                c.y=(c.height+5)*z;       
            }
          //   previous.addChild(d);

            txt=new TextField();            
            txt.text="Hello";
            txt.y=0;
            txt.x=10;
            c.addChild(txt);
            previous=c;
        }
        txt=new TextField();
        txt.text="AT 0";
        txt.y=0;
        txt.x=0;
        s.addChild(txt);


        #if !kha
        var canvas:CanvasElement=cast(js.Browser.document.getElementById("canvas"),CanvasElement);
        var svg:SVGElement=cast(js.Browser.document.getElementById("svg"),SVGElement);
        s.render(canvas,0,0);
        s.renderSvg(svg,0,0);
        #else
        backbuffer = Image.createRenderTarget(800, 600);

        System.notifyOnRender(renderMe);
        #end
       // s.render(canvas,0,0);
        //s.render(canvas,0,0);
        //s.graphics.clear();
        //s.render(canvas,0,0);
        trace(s.x+" "+s.y+" "+s.width+","+s.height);
    }
    #if kha
    var backbuffer : Image;
    public function renderMe(framebuffer: Framebuffer) : Void {
        backbuffer.g2.font= Assets.fonts.ARIAL;
		backbuffer.g2.fontSize=12;
        s.render(backbuffer.g2,0,0);
		/*backbuffer.g2.begin(Color.Black);
		backbuffer.g2.end();
		
		framebuffer.g2.begin(Color.Blue);
		Scaler.scale(backbuffer, framebuffer, System.screenRotation);
		framebuffer.g2.end();*/
	}
    #end
}
