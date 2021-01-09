/*
 * 사각형 노드
 */
SkyEngine.Rect = CLASS((cls) => {
	
	let findRaycastPoints = cls.findRaycastPoints = (
		pointX, pointY,
		
		rectX, rectY,
		rectWidth, rectHeight,
		rectScaleX, rectScaleY,
		rectSin, rectCos) => {
		
		let rectPoint1X, rectPoint1Y;
		let rectPoint2X, rectPoint2Y;
		let rectPoint3X, rectPoint3Y;
		let rectPoint4X, rectPoint4Y;
		
		rectWidth *= rectScaleX;
		rectHeight *= rectScaleY;
		
		let cw = rectCos * rectWidth / 2;	let ch = rectCos * rectHeight / 2;
		let sw = -rectSin * rectWidth / 2;	let sh = -rectSin * rectHeight / 2;
		
		rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
		rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
		rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
		rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
		
		let xs = rectPoint1X - pointX;
		let ys = rectPoint1Y - pointY;
		
		let angleSquare = Math.acos(xs / Math.sqrt(xs * xs + ys * ys));
		
		if (ys > 0) {
		    angleSquare = Math.PI + Math.PI - angleSquare;
		}
		
		let minAngleSquare = angleSquare;
		let x1 = rectPoint1X;
		let y1 = rectPoint1Y;
		
		let maxAngleSquare = angleSquare;
		let x2 = rectPoint1X;
		let y2 = rectPoint1Y;
		
		xs = rectPoint2X - pointX;
		ys = rectPoint2Y - pointY;
		
		angleSquare = Math.acos(xs / Math.sqrt(xs * xs + ys * ys));
		
		if (ys > 0) {
		    angleSquare = Math.PI + Math.PI - angleSquare;
		}
		
		if (minAngleSquare > angleSquare) {
			minAngleSquare = angleSquare;
			x1 = rectPoint2X;
			y1 = rectPoint2Y;
		}
		
		if (maxAngleSquare < angleSquare) {
			maxAngleSquare = angleSquare;
			x2 = rectPoint2X;
			y2 = rectPoint2Y;
		}
		
		xs = rectPoint3X - pointX;
		ys = rectPoint3Y - pointY;
		
		angleSquare = Math.acos(xs / Math.sqrt(xs * xs + ys * ys));
		
		if (ys > 0) {
		    angleSquare = Math.PI + Math.PI - angleSquare;
		}
		
		if (minAngleSquare > angleSquare) {
			minAngleSquare = angleSquare;
			x1 = rectPoint3X;
			y1 = rectPoint3Y;
		}
		
		if (maxAngleSquare < angleSquare) {
			maxAngleSquare = angleSquare;
			x2 = rectPoint3X;
			y2 = rectPoint3Y;
		}
		
		xs = rectPoint4X - pointX;
		ys = rectPoint4Y - pointY;
		
		angleSquare = Math.acos(xs / Math.sqrt(xs * xs + ys * ys));
		
		if (ys > 0) {
		    angleSquare = Math.PI + Math.PI - angleSquare;
		}
		
		if (minAngleSquare > angleSquare) {
			minAngleSquare = angleSquare;
			x1 = rectPoint4X;
			y1 = rectPoint4Y;
		}
		
		if (maxAngleSquare < angleSquare) {
			maxAngleSquare = angleSquare;
			x2 = rectPoint4X;
			y2 = rectPoint4Y;
		}
		
		return [{
			x : x1,
			y : y1
		}, {
			x : x2,
			y : y2
		}];
	};
	
	let generateGraphics = cls.generateGraphics = (params) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		//OPTIONAL: params.color
		//OPTIONAL: params.border
		//OPTIONAL: params.blendMode
		
		let width = params.width;
		let height = params.height;
		
		let graphics = SkyEngine.Figure.generateGraphics(params);
		
		graphics.drawRect(-width / 2, -height / 2, width, height);
		
		return graphics;
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Figure;
		},
	
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.width	사각형의 너비
			//REQUIRED: params.height	사각형의 높이
			//REQUIRED: params.color
			//REQUIRED: params.border
			
			let width = params.width;
			let height = params.height;
			let color = params.color;
			let border = params.border;
			
			let checkPointInRect = SkyEngine.Util.Collision.checkPointInRect;
			
			let checkLineRect = SkyEngine.Util.Collision.checkLineRect;
			let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
			
			let setWidth = self.setWidth = (_width) => {
				width = _width;
			};
			
			let getWidth = self.getWidth = () => {
				return width;
			};
			
			let setHeight = self.setHeight = (_height) => {
				height = _height;
			};
			
			let getHeight = self.getHeight = () => {
				return height;
			};
			
			let setColor = self.setColor = (color) => {
				color = _color;
			};
			
			let getColor = self.getColor = () => {
				return color;
			};
			
			let checkPoint;
			OVERRIDE(self.checkPoint, (origin) => {
				
				let checkPoint = self.checkPoint = (pointX, pointY) => {
					
					return checkPointInRect(
						
						pointX,
						pointY,
						
						self.getDrawingX(),
						self.getDrawingY(),
						width,
						height,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()) === true || origin(pointX, pointY) === true;
				};
			});
			
			let checkArea;
			OVERRIDE(self.checkArea, (origin) => {
				
				checkArea = self.checkArea = (area) => {
					// area가 Line인 경우 작동
					// area가 같은 Rect인 경우 작동
					
					if (area.type === SkyEngine.Line) {
						
						if (checkLineRect(
							
							area.getDrawingX(),
							area.getDrawingY(),
							area.getStartX(),
							area.getStartY(),
							area.getEndX(),
							area.getEndY(),
							area.getRealScaleX(),
							area.getRealScaleY(),
							area.getRealSin(),
							area.getRealCos(),
							
							self.getDrawingX(),
							self.getDrawingY(),
							width,
							height,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()) === true) {
							
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Rect) {
						
						if (checkRectRect(
							
							area.getDrawingX(),
							area.getDrawingY(),
							area.getWidth(),
							area.getHeight(),
							area.getRealScaleX(),
							area.getRealScaleY(),
							area.getRealSin(),
							area.getRealCos(),
							
							self.getDrawingX(),
							self.getDrawingY(),
							width,
							height,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()) === true) {
							
							return true;
						}
					}
					
					return origin(area);
				};
			});
			
			let checkOffScreen;
			OVERRIDE(self.checkOffScreen, (origin) => {
				
				checkOffScreen = self.checkOffScreen = () => {
					
					if (checkRectRect(
						
						SkyEngine.Screen.getCameraFollowX(),
						SkyEngine.Screen.getCameraFollowY(),
						SkyEngine.Screen.getWidth(),
						SkyEngine.Screen.getHeight(),
						1,
						1,
						0,
						1,
						
						self.getDrawingX(),
						self.getDrawingY(),
						width,
						height,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()) === true) {
						
						return false;
					}
					
					return origin();
				};
			});
			
			inner.setGraphics(generateGraphics({
				width : width,
				height : height,
				color : color,
				border : border,
				blendMode : self.getBlendMode()
			}));
			
			let drawArea;
			OVERRIDE(self.drawArea, (origin) => {
				
				drawArea = self.drawArea = (graphics) => {
					
					graphics.drawRect(self.getX() - width / 2, self.getY() - height / 2, width, height);
					
					origin(graphics);
				};
			});
			
			let findRaycastPoints = self.findRaycastPoints = (pointX, pointY) => {
				return cls.findRaycastPoints(
				pointX, pointY,
				
				self.getDrawingX(),
				self.getDrawingY(),
				width,
				height,
				self.getRealScaleX(),
				self.getRealScaleY(),
				self.getRealSin(),
				self.getRealCos());
			};
		}
	};
});
