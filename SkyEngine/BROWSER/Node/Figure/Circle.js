/*
 * 원형 노드
 */
SkyEngine.Circle = CLASS((cls) => {
	
	let findRaycastPoints = cls.findRaycastPoints = (
		pointX, pointY,
		
		circleX, circleY,
		circleWidth, circleHeight,
		circleScaleX, circleScaleY,
		circleSin, circleCos) => {
		
		let tempX = circleCos * pointX + circleSin * pointY - circleX;
		let tempY = -circleSin * pointX + circleCos * pointY - circleY;
		
		circleWidth *= circleScaleX;
		circleHeight *= circleScaleY;
		
		let h = circleWidth / 2;
		let v = circleHeight / 2;
		
		let startX = 99999;
		let startY = (1 - tempX * startX / h / h * v * v) / tempY + circleY;
		startX += circleX;
		
		let endX = -99999;
		let endY = (1 - tempX * endX / h / h * v * v) / tempY + circleY;
		endX += circleX;
		
		return SkyEngine.Line.findCircleIntersectionPoints(
			0,
			0,
			startX,
			startY,
			endX,
			endY,
			1,
			1,
			0,
			1,
			
			circleX, circleY,
			circleWidth, circleHeight,
			1, 1,
			circleSin, circleCos);
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Figure;
		},
	
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.width	원의 너비
			//REQUIRED: params.height	원의 높이
			
			let width = params.width;
			let height = params.height;
			
			let checkPointInCircle = SkyEngine.Util.Collision.checkPointInCircle;
			
			let checkLineCircle = SkyEngine.Util.Collision.checkLineCircle;
			let checkRectCircle = SkyEngine.Util.Collision.checkRectCircle;
			let checkCircleCircle = SkyEngine.Util.Collision.checkCircleCircle;
			
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
			
			let checkPoint;
			OVERRIDE(self.checkPoint, (origin) => {
				
				let checkPoint = self.checkPoint = (pointX, pointY) => {
					
					return checkPointInCircle(
						
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
					// area가 Rect인 경우 작동
					// area가 같은 Circle인 경우 작동
					
					if (area.type === SkyEngine.Line) {
						
						if (checkLineCircle(
							
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
							self.getRealCos()
							
						) === true) {
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Rect) {
						
						if (checkRectCircle(
							
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
							self.getRealCos()
							
						) === true) {
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Circle) {
						
						if (checkCircleCircle(
							
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
							self.getRealCos()
							
						) === true) {
							return true;
						}
					}
					
					return origin(area);
				};
			});
			
			let checkOffScreen;
			OVERRIDE(self.checkOffScreen, (origin) => {
				
				checkOffScreen = self.checkOffScreen = () => {
					
					if (checkRectCircle(
						
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
			
			inner.draw(width, height, (context) => {
				context.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
			});
			
			let drawArea;
			OVERRIDE(self.drawArea, (origin) => {
				
				drawArea = self.drawArea = (graphics) => {
					
					graphics.drawEllipse(self.getX(), self.getY(), width / 2, height / 2);
					
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
