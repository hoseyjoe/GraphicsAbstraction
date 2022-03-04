(function ($global) { "use strict";
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Main = function() {
	this.s = new com_realitycharting_flash_Sprite();
	var c;
	var d;
	var previous = this.s;
	var txt;
	this.s.addEventListener("CLICK",$bind(this,this.dude));
	this.s.graphics.beginFill(16777215,1);
	this.s.graphics.drawRect(0,0,10,10);
	this.s.graphics.endFill();
	var _g = 0;
	while(_g < 5) {
		var i = _g++;
		c = new com_realitycharting_flash_Sprite();
		var _g1 = 0;
		while(_g1 < 5) {
			var z = _g1++;
			c = new com_realitycharting_flash_Sprite();
			c.graphics.beginFill(16711680,1);
			c.graphics.drawRect(0,0,5,5);
			c.graphics.endFill();
			c.name = c.get_x() + "," + c.get_y();
			previous.addChild(c);
			txt = new com_realitycharting_flash_TextField();
			txt.set_text("Hello");
			txt.set_y(0);
			txt.set_x(100);
			c.addChild(txt);
			c.set_x(c.get_width() + 1);
			c.set_y((c.get_height() + 5) * z);
		}
		txt = new com_realitycharting_flash_TextField();
		txt.set_text("Hello");
		txt.set_y(0);
		txt.set_x(100);
		c.addChild(txt);
		previous = c;
	}
	txt = new com_realitycharting_flash_TextField();
	txt.set_text("AT 0");
	txt.set_y(0);
	txt.set_x(0);
	this.s.addChild(txt);
	var canvas = js_Boot.__cast(window.document.getElementById("canvas") , HTMLCanvasElement);
	var svg = js_Boot.__cast(window.document.getElementById("svg") , SVGSVGElement);
	this.s.render(canvas,0,0);
	this.s.renderSvg(svg,0,0);
	console.log("src/Main.hx:92:",this.s.get_x() + " " + this.s.get_y() + " " + this.s.get_width() + "," + this.s.get_height());
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.init = function() {
};
Main.loadingFinished = function() {
	new Main();
};
Main.prototype = {
	dude: function(e) {
		console.log("src/Main.hx:96:","Hello");
	}
	,__class__: Main
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	while(true) {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
		if(!(n > 0)) {
			break;
		}
	}
	if(digits != null) {
		while(s.length < digits) s = "0" + s;
	}
	return s;
};
var com_realitycharting_flash_DisplayObject = function() {
	this.renderTheSvg = true;
	this.visible = true;
	this.eventChildren = [];
};
com_realitycharting_flash_DisplayObject.__name__ = true;
com_realitycharting_flash_DisplayObject.prototype = {
	addChild: function(s) {
		s.parent = this;
		this.children.push(s);
	}
	,removeChild: function(s) {
		HxOverrides.remove(this.eventChildren,s);
		HxOverrides.remove(this.children,s);
	}
	,addEventListener: function(e,f) {
		this.eventChildren.push(new com_realitycharting_flash_Event(e,f));
	}
	,removeEventListener: function(e,f) {
		HxOverrides.remove(this.eventChildren,new com_realitycharting_flash_Event(e,f));
	}
	,getChildAt: function(d) {
		return new com_realitycharting_flash_Sprite();
	}
	,render: function(canvas,xx,yy) {
		if(yy == null) {
			yy = 0;
		}
		if(xx == null) {
			xx = 0;
		}
	}
	,renderSvg: function(svgElement,xx,yy) {
		if(yy == null) {
			yy = 0;
		}
		if(xx == null) {
			xx = 0;
		}
	}
	,get_width: function() {
		return this._width_;
	}
	,set_width: function(w) {
		return this._width_;
	}
	,get_height: function() {
		return this._height_;
	}
	,set_height: function(w) {
		return this._height_;
	}
	,get_x: function() {
		return this.x;
	}
	,set_x: function(_x) {
		this.x = Math.floor(_x);
		return this.get_x();
	}
	,get_y: function() {
		return this.y;
	}
	,set_y: function(_y) {
		this.y = Math.floor(_y);
		return this.get_y();
	}
	,setChildIndex: function(child,newIndex) {
		var oldIndex = this.children.indexOf(child);
		if(newIndex < this.children.length && newIndex != oldIndex) {
			if(oldIndex < newIndex) {
				this.children.splice(newIndex,0,child);
				HxOverrides.remove(this.children,child);
			} else if(oldIndex > newIndex) {
				HxOverrides.remove(this.children,child);
				this.children.splice(newIndex,0,child);
			}
		}
	}
	,checkChildrenforMouseEvent: function(target,x,y) {
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		var ret = false;
		target.set_hitTarget(new com_realitycharting_flash_Point(x,y));
		if(target.graphics.hit) {
			var _g = 0;
			var _g1 = target.eventChildren;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				if(c.type == "MOUSE_OVER") {
					c.fnc("");
					ret = true;
				} else {
					var tmp = c.type == "MOUSE_OUT";
				}
			}
		} else {
			var _g = 0;
			var _g1 = target.children;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				if(((c) instanceof com_realitycharting_flash_Sprite)) {
					ret = this.checkChildrenforMouseEvent(js_Boot.__cast(c , com_realitycharting_flash_Sprite),x,y);
				}
			}
		}
		return ret;
	}
	,get_numChildren: function() {
		return this.numChildren;
	}
	,set_numChildren: function(num) {
		this.numChildren = num;
		return this.get_numChildren();
	}
	,__class__: com_realitycharting_flash_DisplayObject
};
var com_realitycharting_flash_Event = function(e,f) {
};
com_realitycharting_flash_Event.__name__ = true;
com_realitycharting_flash_Event.prototype = {
	__class__: com_realitycharting_flash_Event
};
var com_realitycharting_flash_GradientType = {};
com_realitycharting_flash_GradientType.fromString = function(value) {
	switch(value.toLowerCase()) {
	case "linear":
		return 0;
	case "radial":
		return 1;
	default:
		return null;
	}
};
com_realitycharting_flash_GradientType.toString = function(value) {
	switch(value) {
	case 0:
		return "linear";
	case 1:
		return "radial";
	default:
		return null;
	}
};
var com_realitycharting_flash_Graphics = function() {
	this.renderTheSvg = false;
	this.hit = false;
	this.hitTarget = null;
	this.blankCall = { fillStyle : 6, color : [0], alpha : 1.0, pointArray : [], lineColor : 0, lineAlpha : 0.0, lineWidth : 1.0};
	this._tempDrawCall = { fillStyle : 6, color : [0], alpha : 1.0, pointArray : [], lineColor : 0, lineAlpha : 0.0, lineWidth : 1.0};
	this._drawCalls = [];
	this.svgGraphics = new com_realitycharting_flash_SvGraphics();
};
com_realitycharting_flash_Graphics.__name__ = true;
com_realitycharting_flash_Graphics.prototype = {
	clear: function() {
		this._tempDrawCall = { fillStyle : 6, color : [0], alpha : 1.0, pointArray : [], lineColor : 0, lineAlpha : 0.0, lineWidth : 1.0};
		this._drawCalls = [];
		this._oX = 0;
		this._oY = 0;
		if(this.ctx != null) {
			this.ctx.clearRect(0,0,1000,1000);
		}
	}
	,beginFill: function(clr,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(clr == null) {
			clr = 0;
		}
		this._tempDrawCall = { fillStyle : 6, color : [clr], alpha : alpha, pointArray : [], lineColor : 0, lineAlpha : 0.0, lineWidth : 1.0};
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		if(focalPointRatio == null) {
			focalPointRatio = 0;
		}
		if(interpolationMethod == null) {
			interpolationMethod = "rgb";
		}
		if(spreadMethod == null) {
			spreadMethod = "pad";
		}
		if(com_realitycharting_flash_GradientType.fromString(type) == 1) {
			this._tempDrawCall = { fillStyle : 7, color : colors, alpha : alphas[0], pointArray : [], lineColor : 0, lineAlpha : 0.0, lineWidth : 1.0};
		} else {
			this._tempDrawCall = { fillStyle : 8, color : colors, alpha : alphas[0], pointArray : [], lineColor : 0, lineAlpha : 0.0, lineWidth : 1.0};
		}
	}
	,endFill: function() {
		this._drawCalls.push(this._tempDrawCall);
	}
	,drawRect: function(x,y,width,height) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([3,x,y,width,height]);
	}
	,drawRoundedRect: function(x,y,width,height,curveWidth,curveHeight) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([3,x,y,width,curveWidth,curveHeight]);
	}
	,moveTo: function(x,y) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([0,x,y]);
	}
	,lineStyle: function(thickness,color,alpha,IDK) {
		if(alpha == null) {
			alpha = 0;
		}
		if(color == null) {
			color = 0;
		}
		if(thickness == null) {
			thickness = 0;
		}
		this._tempDrawCall.lineWidth = thickness;
		this._tempDrawCall.lineColor = color;
		this._tempDrawCall.lineAlpha = alpha;
	}
	,lineTo: function(x,y) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([1,x,y]);
	}
	,curveTo: function(anchorX,anchorY,x,y) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([2,anchorX,anchorY,x,y]);
	}
	,renderSvg: function(x,y) {
		var i = 0;
		var _g = 0;
		var _g1 = this._drawCalls;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			this.hit = false;
			this.svgGraphics.beginFill("#" + StringTools.hex(d.color[0],6),d.alpha);
			this.svgGraphics.lineStyle(d.lineWidth,d.lineColor,d.lineAlpha);
			while(i < d.pointArray.length) if(d.pointArray[i] == 0) {
				this.svgGraphics.moveTo(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y);
				i += 3;
			} else if(d.pointArray[i] == 1) {
				this.svgGraphics.lineTo(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y);
				i += 3;
			} else if(d.pointArray[i] == 2) {
				i += 5;
			} else if(d.pointArray[i] == 3) {
				this.svgGraphics.drawRect(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y,d.pointArray[i + 3],d.pointArray[i + 4]);
				if(this.hitTarget != null && d.pointArray[i + 1] + x < this.hitTarget.x && d.pointArray[i + 3] + d.pointArray[i + 1] + x > this.hitTarget.x && d.pointArray[i + 2] + y < this.hitTarget.y && d.pointArray[i + 4] + d.pointArray[i + 2] + y > this.hitTarget.y) {
					this.hit = true;
				}
				i += 5;
			} else {
				console.log("src/com/realitycharting/flash/Graphics.hx:112:","NONE");
				++i;
			}
			this.svgGraphics.endFill();
			i = 0;
		}
	}
	,render: function(canvas,x,y) {
		if(canvas != null) {
			this.ctx = canvas.getContext("2d");
			var i = 0;
			var _g = 0;
			var _g1 = this._drawCalls;
			while(_g < _g1.length) {
				var d = _g1[_g];
				++_g;
				this.hit = false;
				this.ctx.beginPath();
				this.ctx.lineWidth = d.lineWidth;
				var tmp = StringTools.hex(d.lineColor,6);
				this.ctx.strokeStyle = "#" + tmp;
				this.ctx.globalAlpha = d.alpha;
				if(d.fillStyle == 6) {
					var tmp1 = StringTools.hex(d.color[0],6);
					this.ctx.fillStyle = "#" + tmp1;
				} else {
					var grd = this.ctx.createRadialGradient(Math.floor(6 + x),Math.floor(6 + y),100,Math.floor(6 + x),Math.floor(6 + y),10);
					var tmp2 = "#" + StringTools.hex(d.color[0],6);
					grd.addColorStop(0,tmp2);
					var tmp3 = "#" + StringTools.hex(d.color[1],6);
					grd.addColorStop(1,tmp3);
					this.ctx.fillStyle = grd;
				}
				while(i < d.pointArray.length) if(d.pointArray[i] == 0) {
					this.ctx.moveTo(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y);
					i += 3;
				} else if(d.pointArray[i] == 1) {
					this.ctx.lineTo(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y);
					i += 3;
				} else if(d.pointArray[i] == 2) {
					this.ctx.quadraticCurveTo(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y,d.pointArray[i + 3] + x,d.pointArray[i + 4] + y);
					i += 5;
				} else if(d.pointArray[i] == 5) {
					this.ctx.arc(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y,d.pointArray[i + 3],0,2 * Math.PI,false);
					i += 4;
				} else if(d.pointArray[i] == 3) {
					this.ctx.fillRect(d.pointArray[i + 1] + x,d.pointArray[i + 2] + y,d.pointArray[i + 3],d.pointArray[i + 4]);
					if(this.hitTarget != null && d.pointArray[i + 1] + x < this.hitTarget.x && d.pointArray[i + 3] + d.pointArray[i + 1] + x > this.hitTarget.x && d.pointArray[i + 2] + y < this.hitTarget.y && d.pointArray[i + 4] + d.pointArray[i + 2] + y > this.hitTarget.y) {
						this.hit = true;
					}
					i += 5;
				} else if(d.pointArray[i] == 4) {
					var radius_tl = d.pointArray[i + 5];
					var radius_tr = d.pointArray[i + 5];
					var radius_br = d.pointArray[i + 6];
					var radius_bl = d.pointArray[i + 6];
					var width = d.pointArray[i + 3];
					var height = d.pointArray[i + 4];
					var xx = x + d.pointArray[i + 1];
					var yy = y + d.pointArray[i + 2];
					this.ctx.beginPath();
					this.ctx.moveTo(xx + radius_tl,yy);
					this.ctx.lineTo(xx + width - radius_tr,yy);
					this.ctx.quadraticCurveTo(xx + width,yy,xx + width,yy + radius_tr);
					this.ctx.lineTo(xx + width,yy + height - radius_br);
					this.ctx.quadraticCurveTo(xx + width,yy + height,xx + width - radius_br,yy + height);
					this.ctx.lineTo(xx + radius_bl,yy + height);
					this.ctx.quadraticCurveTo(xx,yy + height,xx,yy + height - radius_bl);
					this.ctx.lineTo(xx,yy + radius_tl);
					this.ctx.quadraticCurveTo(xx,yy,xx + radius_tl,yy);
					this.ctx.closePath();
					if(this.hitTarget != null && d.pointArray[i + 1] + x < this.hitTarget.x && d.pointArray[i + 3] + d.pointArray[i + 1] + x > this.hitTarget.x && d.pointArray[i + 2] + y < this.hitTarget.y && d.pointArray[i + 4] + d.pointArray[i + 2] + y > this.hitTarget.y) {
						this.hit = true;
					}
					i += 7;
				}
				if(this.hitTarget != null && this.ctx.isPointInPath(this.hitTarget.x,this.hitTarget.y) || this.hit == true) {
					this.hit = true;
				} else {
					this.hit = false;
				}
				this.ctx.fill();
				this.ctx.globalAlpha = 1;
				this.ctx.stroke();
				i = 0;
			}
		}
	}
	,drawCircle: function(x,y,radius) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([5,x,y,radius]);
	}
	,drawRoundRect: function(x,y,width,height,ellipseWidth,ellipseHeight) {
		this._tempDrawCall.pointArray = this._tempDrawCall.pointArray.concat([4,x,y,width,height,ellipseWidth,ellipseHeight]);
	}
	,getBounds: function() {
		var i = 0;
		var bound = { xMin : 0, yMin : 0, xMax : 0, yMax : 0};
		var _g = 0;
		var _g1 = this._drawCalls;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			while(i < d.pointArray.length) if(d.pointArray[i] == 0) {
				bound = this.checkPoint(d.pointArray[i + 1],d.pointArray[i + 2],bound);
				i += 3;
			} else if(d.pointArray[i] == 1) {
				bound = this.checkPoint(d.pointArray[i + 1],d.pointArray[i + 2],bound);
				i += 3;
			} else if(d.pointArray[i] == 2) {
				bound = this.checkPoint(d.pointArray[i + 1],d.pointArray[i + 2],bound);
				bound = this.checkPoint(d.pointArray[i + 3],d.pointArray[i + 4],bound);
				i += 5;
			} else if(d.pointArray[i] == 3) {
				bound = this.checkPoint(d.pointArray[i + 1],d.pointArray[i + 2],bound);
				bound = this.checkPoint(d.pointArray[i + 1] + d.pointArray[i + 3],d.pointArray[i + 2] + d.pointArray[i + 4],bound);
				i += 5;
			} else if(d.pointArray[i] == 4) {
				bound = this.checkPoint(d.pointArray[i + 1],d.pointArray[i + 2],bound);
				bound = this.checkPoint(d.pointArray[i + 1] + d.pointArray[i + 3],d.pointArray[i + 2] + d.pointArray[i + 4],bound);
				i += 7;
			} else if(d.pointArray[i] == 5) {
				bound = this.checkPoint(d.pointArray[i + 1],d.pointArray[i + 2],bound);
				bound = this.checkPoint(d.pointArray[i + 1] - d.pointArray[i + 3],d.pointArray[i + 2] - d.pointArray[i + 3],bound);
				i += 4;
			} else {
				console.log("src/com/realitycharting/flash/Graphics.hx:324:","NONE");
				++i;
			}
			i = 0;
		}
		return bound;
	}
	,checkPoint: function(x,y,current) {
		if(y == null) {
			y = 0;
		}
		if(x == null) {
			x = 0;
		}
		if(current == null) {
			current = { xMin : 0, yMin : 0, xMax : 0, yMax : 0};
		}
		current = { xMin : current.xMin > x ? x : current.xMin, yMin : current.yMin > y ? y : current.yMin, xMax : current.xMax < x ? x : current.xMax, yMax : current.yMax < y ? y : current.yMax};
		return current;
	}
	,__class__: com_realitycharting_flash_Graphics
};
var com_realitycharting_flash_Matrix = function(a,b,c,d,tx,ty) {
	if(ty == null) {
		ty = 0;
	}
	if(tx == null) {
		tx = 0;
	}
	if(d == null) {
		d = 1;
	}
	if(c == null) {
		c = 0;
	}
	if(b == null) {
		b = 0;
	}
	if(a == null) {
		a = 1;
	}
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
	this.tx = tx;
	this.ty = ty;
};
com_realitycharting_flash_Matrix.__name__ = true;
com_realitycharting_flash_Matrix.prototype = {
	clone: function() {
		return new com_realitycharting_flash_Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.ty = this.tx * m.b + this.ty * m.d + m.ty;
		this.tx = tx1;
	}
	,copyFrom: function(sourceMatrix) {
		this.a = sourceMatrix.a;
		this.b = sourceMatrix.b;
		this.c = sourceMatrix.c;
		this.d = sourceMatrix.d;
		this.tx = sourceMatrix.tx;
		this.ty = sourceMatrix.ty;
	}
	,createBox: function(scaleX,scaleY,rotation,tx,ty) {
		if(ty == null) {
			ty = 0;
		}
		if(tx == null) {
			tx = 0;
		}
		if(rotation == null) {
			rotation = 0;
		}
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.a = cos * scaleX;
			this.b = sin * scaleY;
			this.c = -sin * scaleX;
			this.d = cos * scaleY;
		} else {
			this.a = scaleX;
			this.b = 0;
			this.c = 0;
			this.d = scaleY;
		}
		this.tx = tx;
		this.ty = ty;
	}
	,createGradientBox: function(width,height,rotation,tx,ty) {
		if(ty == null) {
			ty = 0;
		}
		if(tx == null) {
			tx = 0;
		}
		if(rotation == null) {
			rotation = 0;
		}
		this.a = width / 1638.4;
		this.d = height / 1638.4;
		if(rotation != 0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.tx = tx + width / 2;
		this.ty = ty + height / 2;
	}
	,deltaTransformPoint: function(point) {
		return new com_realitycharting_flash_Point(point.x * this.a + point.y * this.c,point.x * this.b + point.y * this.d);
	}
	,equals: function(matrix) {
		if(matrix != null && this.tx == matrix.tx && this.ty == matrix.ty && this.a == matrix.a && this.b == matrix.b && this.c == matrix.c) {
			return this.d == matrix.d;
		} else {
			return false;
		}
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.tx = -this.tx;
			this.ty = -this.ty;
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.ty = -this.b * this.tx - this.d * this.ty;
			this.tx = tx1;
		}
		return this;
	}
	,rotate: function(theta) {
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.ty = this.tx * sin + this.ty * cos;
		this.tx = tx1;
	}
	,scale: function(sx,sy) {
		this.a *= sx;
		this.b *= sy;
		this.c *= sx;
		this.d *= sy;
		this.tx *= sx;
		this.ty *= sy;
	}
	,setRotation: function(theta,scale) {
		if(scale == null) {
			scale = 1;
		}
		this.a = Math.cos(theta) * scale;
		this.c = Math.sin(theta) * scale;
		this.b = -this.c;
		this.d = this.a;
	}
	,setTo: function(a,b,c,d,tx,ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}
	,to3DString: function(roundPixels) {
		if(roundPixels == null) {
			roundPixels = false;
		}
		if(roundPixels) {
			return "matrix3d(" + this.a + ", " + this.b + ", 0, 0, " + this.c + ", " + this.d + ", 0, 0, 0, 0, 1, 0, " + (this.tx | 0) + ", " + (this.ty | 0) + ", 0, 1)";
		} else {
			return "matrix3d(" + this.a + ", " + this.b + ", 0, 0, " + this.c + ", " + this.d + ", 0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", 0, 1)";
		}
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,transformPoint: function(pos) {
		return new com_realitycharting_flash_Point(pos.x * this.a + pos.y * this.c + this.tx,pos.x * this.b + pos.y * this.d + this.ty);
	}
	,translate: function(dx,dy) {
		this.tx += dx;
		this.ty += dy;
	}
	,toArray: function(transpose) {
		if(transpose == null) {
			transpose = false;
		}
		if(this.__array == null) {
			this.__array = [];
		}
		if(transpose) {
			this.__array[0] = this.a;
			this.__array[1] = this.b;
			this.__array[2] = 0;
			this.__array[3] = this.c;
			this.__array[4] = this.d;
			this.__array[5] = 0;
			this.__array[6] = this.tx;
			this.__array[7] = this.ty;
			this.__array[8] = 1;
		} else {
			this.__array[0] = this.a;
			this.__array[1] = this.c;
			this.__array[2] = this.tx;
			this.__array[3] = this.b;
			this.__array[4] = this.d;
			this.__array[5] = this.ty;
			this.__array[6] = 0;
			this.__array[7] = 0;
			this.__array[8] = 1;
		}
		return this.__array;
	}
	,__cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.tx = Math.round(this.tx * 10) / 10;
		this.ty = Math.round(this.ty * 10) / 10;
	}
	,__transformInversePoint: function(point) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			point.x = -this.tx;
			point.y = -this.ty;
		} else {
			var px = 1.0 / norm * (this.c * (this.ty - point.y) + this.d * (point.x - this.tx));
			point.y = 1.0 / norm * (this.a * (point.y - this.ty) + this.b * (this.tx - point.x));
			point.x = px;
		}
	}
	,__transformInverseX: function(px,py) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			return -this.tx;
		} else {
			return 1.0 / norm * (this.c * (this.ty - py) + this.d * (px - this.tx));
		}
	}
	,__transformInverseY: function(px,py) {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			return -this.ty;
		} else {
			return 1.0 / norm * (this.a * (py - this.ty) + this.b * (this.tx - px));
		}
	}
	,__transformPoint: function(point) {
		var px = point.x;
		var py = point.y;
		point.x = px * this.a + py * this.c + this.tx;
		point.y = px * this.b + py * this.d + this.ty;
	}
	,__transformX: function(px,py) {
		return px * this.a + py * this.c + this.tx;
	}
	,__transformY: function(px,py) {
		return px * this.b + py * this.d + this.ty;
	}
	,__translateTransformed: function(px,py) {
		this.tx = px * this.a + py * this.c + this.tx;
		this.ty = px * this.b + py * this.d + this.ty;
	}
	,__class__: com_realitycharting_flash_Matrix
};
var com_realitycharting_flash_MouseEvent = function(e,f) {
};
com_realitycharting_flash_MouseEvent.__name__ = true;
com_realitycharting_flash_MouseEvent.prototype = {
	__class__: com_realitycharting_flash_MouseEvent
};
var com_realitycharting_flash_Point = function(_x,_y) {
	this.x = _x;
	this.y = _y;
};
com_realitycharting_flash_Point.__name__ = true;
com_realitycharting_flash_Point.prototype = {
	clone: function() {
		return new com_realitycharting_flash_Point(this.x,this.y);
	}
	,__class__: com_realitycharting_flash_Point
};
var com_realitycharting_flash_Sprite = function() {
	com_realitycharting_flash_DisplayObject.call(this);
	this.renderable = true;
	this.graphics = new com_realitycharting_flash_Graphics();
	this.graphics.renderTheSvg = this.renderTheSvg;
	this.children = [];
	this.eventChildren = [];
	this.set_x(0);
	this.set_y(0);
	this.set_width(0);
	this.set_height(0);
	this.svgString = "";
};
com_realitycharting_flash_Sprite.__name__ = true;
com_realitycharting_flash_Sprite.__super__ = com_realitycharting_flash_DisplayObject;
com_realitycharting_flash_Sprite.prototype = $extend(com_realitycharting_flash_DisplayObject.prototype,{
	startDrag: function() {
	}
	,stopDrag: function() {
	}
	,get_hitTarget: function() {
		return this.hitTarget;
	}
	,set_hitTarget: function(_hitTarget) {
		this.mouseX = _hitTarget.x;
		this.mouseY = _hitTarget.y;
		this.hitTarget = _hitTarget;
		this.graphics.hitTarget = this.get_hitTarget();
		return this.get_hitTarget();
	}
	,get_width: function() {
		var bound = this.graphics.getBounds();
		this._width_ = bound.xMax - bound.xMin;
		var cwidth = 0;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.visible) {
				cwidth = c.get_width();
				if(c.get_width() > this._width_) {
					this._width_ = cwidth;
				}
			}
		}
		return this._width_;
	}
	,set_width: function(w) {
		this._width_ = w;
		return this._width_;
	}
	,get_height: function() {
		var bound = this.graphics.getBounds();
		this._height_ = bound.yMax - bound.yMin;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.visible) {
				if(c.get_height() > this._height_) {
					this._height_ = c.get_height();
				}
			}
		}
		return this._height_;
	}
	,set_height: function(h) {
		this._height_ = h;
		return this._height_;
	}
	,renderSvg: function(svgElement,xx,yy) {
		if(yy == null) {
			yy = 0;
		}
		if(xx == null) {
			xx = 0;
		}
		this.graphics.renderSvg(this.get_x() + xx,this.get_y() + yy);
		this.svgString += this.graphics.svgGraphics._xml;
		var txt;
		var sprite;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(((c) instanceof com_realitycharting_flash_Sprite) && c.visible) {
				sprite = js_Boot.__cast(c , com_realitycharting_flash_Sprite);
				sprite.renderSvg(svgElement,this.get_x() + xx,this.get_y() + yy);
				this.svgString += sprite.svgString;
			}
			if(((c) instanceof com_realitycharting_flash_TextField) && c.visible) {
				txt = js_Boot.__cast(c , com_realitycharting_flash_TextField);
				txt.renderSvg(svgElement,this.get_x() + xx,this.get_y() + yy);
				this.svgString += txt.svgString;
			}
		}
		if(svgElement != null) {
			svgElement.innerHTML = this.svgString;
			var _g = 0;
			var _g1 = this.graphics.svgGraphics.svgNodes;
			while(_g < _g1.length) {
				var n = _g1[_g];
				++_g;
				svgElement.appendChild(n);
			}
		}
	}
	,render: function(canvas,xx,yy) {
		if(yy == null) {
			yy = 0;
		}
		if(xx == null) {
			xx = 0;
		}
		if(this.renderable) {
			var newx = xx + this.get_x();
			var newy = yy + this.get_y();
			if(this.visible) {
				this.graphics.render(canvas,newx,newy);
				var _g = 0;
				var _g1 = this.children;
				while(_g < _g1.length) {
					var c = _g1[_g];
					++_g;
					c.render(canvas,newx,newy);
				}
			}
		}
	}
	,__class__: com_realitycharting_flash_Sprite
});
var com_realitycharting_flash_SvGraphics = function() {
	this.stroke = "";
	this.lineDefault = "<path d=\"";
	this.line = "";
	this.fill = "";
	this._currentThickness = 1;
	this.scale = 1;
	this._xml = "";
	this.line = this.lineDefault;
	this.svgNodes = [];
};
com_realitycharting_flash_SvGraphics.__name__ = true;
com_realitycharting_flash_SvGraphics.prototype = {
	beginFill: function(color,alpha) {
		if(alpha == null) {
			alpha = 1;
		}
		if(color == null) {
			color = "#0";
		}
		this.lineFill();
		this.fill = "fill:" + color + ";fill-opacity:" + alpha + ";";
		this.line = this.lineDefault;
	}
	,clear: function() {
		this.fill = "";
		this._xml = "";
		this.svgNodes = [];
		this.line = this.lineDefault;
	}
	,curveTo: function(x,y,anchorX,anchorY) {
		anchorX *= this.scale;
		anchorY *= this.scale;
		this.line += " C" + x + "," + y + " " + anchorX + "," + anchorY + " " + anchorX + "," + anchorY;
	}
	,drawCircle: function(x,y,radius) {
		x *= this.scale;
		y *= this.scale;
		radius *= this.scale;
		this._xml += "<circle cx=\"" + x + "\" cy=\"" + y + "\" r=\"" + radius + "\" style=\"" + this.fill + this.stroke + "\"/>";
		this.svgNodes.push(this.getNode("circle",{ cx : x, cy : y, r : radius, style : this.fill}));
	}
	,drawRect: function(x,y,width,height) {
		x *= this.scale;
		y *= this.scale;
		width *= this.scale;
		height *= this.scale;
		if(height < 0) {
			y += height;
			height *= -1;
		}
		if(width < 0) {
			x += width;
			width *= -1;
		}
		this._xml += "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + width + "\" height=\"" + height + "\" style=\"" + this.fill + this.stroke + "\" />";
		this.svgNodes.push(this.getNode("rect",{ x : x, y : y, width : width, height : height, style : this.fill}));
	}
	,drawRoundRect: function(x,y,width,height,ellipseWidth,ellipseHeight) {
		x *= this.scale;
		y *= this.scale;
		width *= this.scale;
		height *= this.scale;
		if(height < 0) {
			y += height;
			height *= -1;
		}
		if(width < 0) {
			x += width;
			width *= -1;
		}
		this._xml += "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + width + "\" height=\"" + height + "\" rx=\"" + ellipseWidth / 2 + "\" ry=\"" + ellipseHeight / 2 + "\" style=\"" + this.fill + this.stroke + "\" />";
		this.svgNodes.push(this.getNode("rect",{ x : x, y : y, width : width, rx : ellipseWidth / 2, ry : ellipseHeight / 2, height : height, style : this.fill}));
	}
	,endFill: function() {
		this.lineFill();
		this.fill = "";
		this.line = this.lineDefault;
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		if(miterLimit == null) {
			miterLimit = 3;
		}
		if(scaleMode == null) {
			scaleMode = "normal";
		}
		if(pixelHinting == null) {
			pixelHinting = true;
		}
		if(alpha == null) {
			alpha = 1;
		}
		if(color == null) {
			color = 0;
		}
		if(thickness == null) {
			thickness = 0;
		}
		this.lineFill();
		if(this.fill == "") {
			this.fill = "fill-opacity:0;";
		}
		var thick = thickness;
		this._currentThickness = thick;
		var _caps = "";
		if(caps != null) {
			_caps = "stroke-linecap:" + caps + ";";
		}
		if(alpha != 0) {
			this.stroke = "stroke-width:" + this._currentThickness * this.scale + ";stroke:#" + this.displayInHex(color) + ";stroke-opacity:" + alpha + ";" + _caps;
		}
	}
	,lineTo: function(x,y) {
		x *= this.scale;
		y *= this.scale;
		this.line += " L" + x + " " + y;
	}
	,moveTo: function(x,y) {
		x *= this.scale;
		y *= this.scale;
		this.line += " M" + x + " " + y;
	}
	,xml: function(point) {
		var tmp = point.x != 0 || point.y != 0 ? "<g transform=\"translate(" + point.x + " " + point.y + ")\" >" : "";
		this.lineFill();
		tmp = tmp != "" ? tmp + this._xml + "</g>" : this._xml;
		return tmp;
	}
	,displayInHex: function(c) {
		var r = this.extractRed(c) + "";
		var g = this.extractGreen(c) + "";
		var b = this.extractBlue(c) + "";
		var hs = "";
		var zero = "0";
		if(r.length == 1) {
			r = zero + r;
		}
		if(g.length == 1) {
			g = zero + g;
		}
		if(b.length == 1) {
			b = zero + b;
		}
		hs = r + g + b;
		return hs;
	}
	,extractBlue: function(c) {
		return c & 255;
	}
	,extractGreen: function(c) {
		return c >> 8 & 255;
	}
	,extractRed: function(c) {
		return c >> 16 & 255;
	}
	,lineFill: function() {
		if(this.line != this.lineDefault) {
			var tmpFill = "";
			tmpFill = this.fill == "" ? "fill-opacity:0;" : this.fill;
			this.line += "\" style=\"" + tmpFill + this.stroke + "\" />";
			this._xml += this.line;
		}
	}
	,getNode: function(n,v) {
		var element = window.document.createElementNS("http://www.w3.org/2000/svg",n);
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			element.setAttributeNS(null,p,Reflect.field(v,p));
		}
		return element;
	}
	,__class__: com_realitycharting_flash_SvGraphics
};
var com_realitycharting_flash_TextField = function() {
	com_realitycharting_flash_DisplayObject.call(this);
	this._text = "";
	this.tmpCanvas = window.document.createElement("canvas");
	this.defaultTextFormat = new com_realitycharting_flash_TextFormat("arial",12,1048320);
	this.set_x(0);
	this.set_y(0);
	this.rotation = 0;
};
com_realitycharting_flash_TextField.__name__ = true;
com_realitycharting_flash_TextField.__super__ = com_realitycharting_flash_DisplayObject;
com_realitycharting_flash_TextField.prototype = $extend(com_realitycharting_flash_DisplayObject.prototype,{
	get_text: function() {
		return this._text;
	}
	,set_text: function(txt) {
		this._text = txt;
		var teext = this.tmpCanvas.getContext("2d").measureText(txt);
		this.set_width(teext.width);
		this.set_height(this.defaultTextFormat.fontSize);
		return this._text;
	}
	,renderSvg: function(canvas,xx,yy) {
		if(yy == null) {
			yy = 0;
		}
		if(xx == null) {
			xx = 0;
		}
		var tmp = this.rotation != 0;
	}
	,render: function(canvas,xx,yy) {
		if(yy == null) {
			yy = 0;
		}
		if(xx == null) {
			xx = 0;
		}
		var teextContext = this.tmpCanvas.getContext("2d");
		teextContext.font = this.defaultTextFormat.fontSize + "px Arial";
		teextContext.textAlign = this.autoSize;
		var tmp = this.get_text();
		teextContext.fillText(tmp,0,0);
		var tmp = this.get_text();
		this._width_ = teextContext.measureText(tmp).width;
		if(canvas == null) {
			console.log("src/com/realitycharting/flash/TextField.hx:94:","NULL *************");
		}
		var context = canvas.getContext("2d");
		context.save();
		if(this.rotation != 0) {
			context.textAlign = "right";
		} else {
			context.textAlign = this.autoSize;
		}
		context.font = this.defaultTextFormat.fontSize + "px Arial";
		if(this.background) {
			var hold = context.fillStyle;
			context.fillStyle = "#000000";
			var tmp = this.get_x() - this._width_;
			var tmp1 = this.get_y();
			context.fillRect(tmp,tmp1,this._width_,this.defaultTextFormat.fontSize + 4);
			context.stroke();
			context.fillStyle = hold;
		}
		yy += this.get_height();
		var tmp = xx + this.get_x();
		var tmp1 = yy + this.get_y();
		context.translate(tmp,tmp1);
		context.rotate(this.rotation / 180 * Math.PI);
		context.fillStyle = "#" + StringTools.hex(this.defaultTextFormat.fontColor,6);
		var tmp = this.get_text();
		context.fillText(tmp,0,0);
		context.restore();
	}
	,get_width: function() {
		return this._width_;
	}
	,set_width: function(w) {
		this._width_ = w;
		return this._width_;
	}
	,get_height: function() {
		return this._height_;
	}
	,set_height: function(h) {
		this._height_ = h;
		return this._height_;
	}
	,__class__: com_realitycharting_flash_TextField
});
var com_realitycharting_flash_TextFormat = function(fontName,fontSize,fontColor) {
	if(fontColor == null) {
		fontColor = 0;
	}
	if(fontSize == null) {
		fontSize = 12;
	}
	if(fontName == null) {
		fontName = "Arial";
	}
	this.fontName = fontName;
	this.fontSize = fontSize;
	this.fontColor = fontColor;
};
com_realitycharting_flash_TextFormat.__name__ = true;
com_realitycharting_flash_TextFormat.prototype = {
	get_size: function() {
		return this.fontSize;
	}
	,set_size: function(s) {
		this.fontSize = s;
		return this.fontSize;
	}
	,__class__: com_realitycharting_flash_TextFormat
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	get_native: function() {
		return this.__nativeException;
	}
	,__class__: haxe_Exception
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	__class__: haxe_ValueException
});
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) {
		return false;
	}
	if(cc == cl) {
		return true;
	}
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g = 0;
		var _g1 = intf.length;
		while(_g < _g1) {
			var i = _g++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) {
				return true;
			}
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
com_realitycharting_flash_Event.ENTER_FRAME = "ENTER_FRAME";
com_realitycharting_flash_Event.FOCUS_OUT = "FOCUS_OUT";
com_realitycharting_flash_Event.ADDED_TO_STAGE = "ADDED_TO_STAGE";
com_realitycharting_flash_GradientType.LINEAR = 0;
com_realitycharting_flash_GradientType.RADIAL = 1;
com_realitycharting_flash_Graphics.drawMoveToType = 0;
com_realitycharting_flash_Graphics.drawLineType = 1;
com_realitycharting_flash_Graphics.drawCurvedLineType = 2;
com_realitycharting_flash_Graphics.drawRectType = 3;
com_realitycharting_flash_Graphics.drawRoundRectType = 4;
com_realitycharting_flash_Graphics.drawCircleType = 5;
com_realitycharting_flash_Graphics.drawFillType = 6;
com_realitycharting_flash_Graphics.drawFillRadialType = 7;
com_realitycharting_flash_Graphics.drawFillLinearType = 8;
com_realitycharting_flash_Matrix.__identity = new com_realitycharting_flash_Matrix();
com_realitycharting_flash_Matrix.__temp = new com_realitycharting_flash_Matrix();
com_realitycharting_flash_MouseEvent.MOUSE_OVER = "MOUSE_OVER";
com_realitycharting_flash_MouseEvent.MOUSE_OUT = "MOUSE_OUT";
com_realitycharting_flash_MouseEvent.MOUSE_DOWN = "MOUSE_DOWN";
com_realitycharting_flash_MouseEvent.MOUSE_UP = "MOUSE_UP";
com_realitycharting_flash_MouseEvent.CLICK = "CLICK";
Main.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
