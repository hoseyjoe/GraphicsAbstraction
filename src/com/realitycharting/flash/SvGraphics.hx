package com.realitycharting.flash;

    /**
     * ...
     * @author
     */
    class SvGraphics { 
        public function new() {
           // sprite = s;
            //g = sprite.graphics;
            line = lineDefault;
            svgNodes=[];
        }

        public var _xml:String               = "";
        public var svgNodes:Array<Dynamic>;
        public var scale:Float              = 1;

        private var _currentThickness:Float = 1;
        private var fill:String              = "";

        //private var g:Graphics;
        private var line:String              = "";
        private var lineDefault:String       = '<path d="';
        //private var sprite:Sprite;
        private var stroke:String            = "";

        public function beginFill(color:String="#0", alpha:Float=1):Void {
            lineFill();
            fill = "fill:" + color + ";fill-opacity:" + alpha + ";";
            line = lineDefault;
        }

        public function clear():Void {
            //if (g != null) {
                //g.clear();
            //}
            fill = "";
            _xml = "";
            svgNodes=[];
            line = lineDefault;
        }

        public function curveTo(x:Float, y:Float, anchorX:Float, anchorY:Float):Void {
            anchorX = anchorX * scale;
            anchorY = anchorY * scale;
            //g.curveTo(x, y, anchorX, anchorY);
            line += ' C' + (x) + ',' + (y) + ' ' + (anchorX) + ',' + (anchorY) + ' ' + (anchorX) + ',' + (anchorY);
        }

        public function drawCircle(x:Float, y:Float, radius:Float) {
            x = x * scale;
            y = y * scale;
            radius = radius * scale;
            _xml += '<circle cx="' + x + '" cy="' + y + '" r="' + radius + '" style="' + fill + stroke + '"/>';
            svgNodes.push(getNode("circle", {cx:x, cy:y, r:radius, style:fill}));
            //g.drawCircle(x, y, radius);
        }

        public function drawRect(x:Float, y:Float, width:Float, height:Float):Void {
            x = x * scale;
            y = y * scale;
            width = width * scale;
            height = height * scale;
            if (height < 0) {
                y += height;
                height *= -1;
            }
            if (width < 0) {
                x += width;
                width *= -1;
            }
           // g.drawRect(x, y, width, height);
            _xml += '<rect x="' + (x) + '" y="' + (y) + '" width="' + width + '" height="' + height + '" style="' + fill + stroke + '" />';
            svgNodes.push(getNode("rect", {x:x, y:y, width:width, height:height , style:fill}));

        }

        public function drawRoundRect(x:Float, y:Float, width:Float, height:Float, ellipseWidth:Float, ellipseHeight:Float):Void {
            x = x * scale;
            y = y * scale;
            width = width * scale;
            height = height * scale;
            if (height < 0) {
                y += height;
                height *= -1;
            }
            if (width < 0) {
                x += width;
                width *= -1;
            }
            //g.drawRoundRect(x, y, width, height, ellipseWidth, ellipseHeight);
            _xml += '<rect x="' + (x) + '" y="' + (y) + '" width="' + width + '" height="' + height + '" rx="' + ellipseWidth / 2 + '" ry="' + ellipseHeight / 2 + '" style="' + fill + stroke + '" />';
            svgNodes.push(getNode("rect", {x:x, y:y, width:width, rx:(ellipseWidth / 2), ry:(ellipseHeight / 2), height:height , style:fill}));
        }

        public function endFill():Void {
            //g.endFill();
            lineFill();
            fill = "";
            line = lineDefault;
        }

        public function lineStyle(thickness:Float=0 , color:Int = 0, alpha:Float = 1, pixelHinting:Bool = true, scaleMode:String = "normal", caps:String = null, joints:String = null, miterLimit:Float = 3):Void {
            lineFill();
            if (fill == "")
                fill = "fill-opacity:0;";
            var thick:Float = thickness;
            /*if (Math.NaN(thick)) {
                thick = 0;
                alpha = 0;
            }*/
            _currentThickness = thick;
            var _caps        = "";
            if (caps != null)
                _caps = "stroke-linecap:" + caps + ";";
            if (alpha != 0) {
                stroke = 'stroke-width:' + (_currentThickness * scale) + ';stroke:#' + displayInHex(color) + ';stroke-opacity:' + alpha + ';' + _caps;
            } else {

            }

        }

        public function lineTo(x:Float, y:Float):Void {
            x = x * scale;
            y = y * scale;
           // g.lineTo(x, y);
            line += ' L' + (x) + ' ' + (y);
        }

        public function moveTo(x:Float, y:Float):Void {
            x = x * scale;
            y = y * scale;
            line += ' M' + (x) + ' ' + (y);
           // g.moveTo(x, y)
        }

        public function xml(point:Point):String { //lines are always added after rects?
            var tmp:String = (point.x != 0 || point.y != 0) ? '<g transform="translate(' + point.x + ' ' + point.y + ')" >' : '';
            lineFill();
            tmp = (tmp != "") ? tmp + _xml + '</g>' : _xml;

            return tmp;
        }

        private function displayInHex(c:Int):String {
            var r:String    = extractRed(c)+"";
            var g:String    = extractGreen(c)+"";
            var b:String    = extractBlue(c)+"";
            var hs:String   = "";
            var zero:String = "0";
            if (r.length == 1) {
                r = zero+r;
            }
            if (g.length == 1) {
                g = zero+g;
            }
            if (b.length == 1) {
                b = zero+b;
            }
            hs = r + g + b;
            return hs;
        }

        private function extractBlue(c:Int):Int {
            return (c & 0xFF);
        }

        private function extractGreen(c:Int):Int {
            return ((c >> 8) & 0xFF);
        }

        private function extractRed(c:Int):Int {
            return ((c >> 16) & 0xFF);
        }

        private function lineFill() {
            if (line != lineDefault) {
                var tmpFill = "";
                tmpFill = (fill == "") ? "fill-opacity:0;" : fill;
                line += '" style="' + tmpFill + stroke + '" />';
                _xml += line;
            }
        }
        #if js
        function getNode(n:String, v:SvgObj): js.html.Element {
            //var doc:js.Browser.document;
            var element = js.Browser.document.createElementNS("http://www.w3.org/2000/svg", n);
            for (p in Reflect.fields(v)){
                element.setAttributeNS(null, p, Reflect.field(v, p));
            }
            return element;
        }
        #end
    }
typedef SvgObj = {
    @:optional var x:Float;
    @:optional var y:Float;
    @:optional var rx:Float;
    @:optional var ry:Float;
    @:optional var cx:Float;
    @:optional var cy:Float;
    @:optional var r:Float;
    @:optional var width:Float;
    @:optional var height:Float;
    @:optional var style:String;
}

