/*
 * 폴리곤 노드
 */
SkyEngine.Polygon = CLASS((cls) => {
	
	let findRaycastPoints = cls.findRaycastPoints = (
		pointX, pointY,
		
		polygonX, polygonY,
		polygonPoints,
		polygonScaleX, polygonScaleY,
		polygonSin, polygonCos) => {
		
		let length = polygonPoints.length;
		
		let minAngleSquare;
		let x1;
		let y1;
		
		let maxAngleSquare;
		let x2;
		let y2;
		
		for (let i = 0; i < length; i += 1) {
			
			let iX = polygonPoints[i].x * polygonScaleX;
			let iY = polygonPoints[i].y * polygonScaleY;
			
			let polygonPointX = polygonX + polygonCos * iX - polygonSin * iY;
			let polygonPointY = polygonY + polygonSin * iX + polygonCos * iY;
			
			let xs = polygonPointX - pointX;
			let ys = polygonPointY - pointY;
			
			let angleSquare = Math.acos(xs / Math.sqrt(xs * xs + ys * ys));
			
			if (ys > 0) {
			    angleSquare = Math.PI + Math.PI - angleSquare;
			}
			
			if (minAngleSquare == undefined || minAngleSquare > angleSquare) {
				minAngleSquare = angleSquare;
				x1 = polygonPointX;
				y1 = polygonPointY;
			}
			
			if (maxAngleSquare == undefined || maxAngleSquare < angleSquare) {
				maxAngleSquare = angleSquare;
				x2 = polygonPointX;
				y2 = polygonPointY;
			}
		}
		
		return minAngleSquare === undefined ? [] : [{
			x : x1,
			y : y1
		}, {
			x : x2,
			y : y2
		}];
	};
	
	let generatePixiSprite = cls.generatePixiSprite = (params) => {
		//REQUIRED: params
		//REQUIRED: params.points
		//OPTIONAL: params.color
		//OPTIONAL: params.border
		//OPTIONAL: params.blendMode
		
		let points = params.points;
		
		let minX = 9999999;
		let minY = 9999999;
		let maxX = -9999999;
		let maxY = -9999999;
		
		let width = 0;
		let height = 0;
		
		if (points.length > 0) {
			
			for (let i = 0; i < points.length; i += 1) {
				let point = points[i];
				if (point.x < minX) {
					minX = point.x;
				}
				if (point.y < minY) {
					minY = point.y;
				}
				if (point.x > maxX) {
					maxX = point.x;
				}
				if (point.y > maxY) {
					maxY = point.y;
				}
			}
			
			width = maxX - minX;
			height = maxY - minY;
		}
		
		params.width = width;		
		params.height = height;
		
		return SkyEngine.Figure.generatePixiSprite(params, (context, pixiSprite) => {
			
			if (points.length > 0) {
				
				pixiSprite.x = minX;
				pixiSprite.y = minY;
				
				context.moveTo(points[0].x - minX, points[0].y - minY);
				
				for (let i = 1; i < points.length; i += 1) {
					let point = points[i];
					context.lineTo(point.x - minX, point.y - minY);
				}
				
				context.lineTo(points[0].x - minX, points[0].y - minY);
			}
		});
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Figure;
		},
	
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.points	다각형을 이루는 점들의 좌표들
			//REQUIRED: params.color
			//REQUIRED: params.border
			
			let points = params.points
			let color = params.color;
			let border = params.border;
			
			let checkPointInPolygon = SkyEngine.Util.Collision.checkPointInPolygon;
			
			let checkLinePolygon = SkyEngine.Util.Collision.checkLinePolygon;
			let checkRectPolygon = SkyEngine.Util.Collision.checkRectPolygon;
			let checkCirclePolygon = SkyEngine.Util.Collision.checkCirclePolygon;
			let checkPolygonPolygon = SkyEngine.Util.Collision.checkPolygonPolygon;
			
			let getPoints = self.getPoints = () => {
				return points;
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
					
					return checkPointInPolygon(
						
						pointX,
						pointY,
						
						self.getDrawingX(),
						self.getDrawingY(),
						points,
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
					// area가 Circle인 경우 작동
					// area가 같은 Polygon인 경우 작동
					
					if (area.type === SkyEngine.Line) {
						
						if (checkLinePolygon(
							
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
							points,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()
							
						) === true) {
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Rect) {
						
						if (checkRectPolygon(
							
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
							points,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()
							
						) === true) {
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Circle) {
						
						if (checkCirclePolygon(
							
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
							points,
							self.getRealScaleX(),
							self.getRealScaleY(),
							self.getRealSin(),
							self.getRealCos()
							
						) === true) {
							return true;
						}
					}
					
					else if (area.type === SkyEngine.Polygon) {
						
						if (checkPolygonPolygon(
							
							area.getDrawingX(),
							area.getDrawingY(),
							area.getPoints(),
							area.getRealScaleX(),
							area.getRealScaleY(),
							area.getRealSin(),
							area.getRealCos(),
							
							self.getDrawingX(),
							self.getDrawingY(),
							points,
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
					
					if (checkRectPolygon(
						
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
						points,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos()) === true) {
						
						return false;
					}
					
					return origin();
				};
			});
			
			inner.setPixiSprite(generatePixiSprite({
				points : points,
				color : color,
				border : border,
				blendMode : self.getBlendMode()
			}));
			
			let drawArea;
			OVERRIDE(self.drawArea, (origin) => {
				
				drawArea = self.drawArea = (graphics) => {
					
					if (points.length > 0) {
						
						graphics.moveTo(points[0].x, points[0].y);
						
						for (let i = 1; i < points.length; i += 1) {
							let point = points[i];
							graphics.lineTo(point.x, point.y);
						}
						
						graphics.lineTo(points[0].x, points[0].y);
					}
					
					origin(graphics);
				};
			});
			
			let findRaycastPoints = self.findRaycastPoints = (pointX, pointY) => {
				return cls.findRaycastPoints(
				pointX, pointY,
				
				self.getDrawingX(),
				self.getDrawingY(),
				points,
				self.getRealScaleX(),
				self.getRealScaleY(),
				self.getRealSin(),
				self.getRealCos());
			};
		}
	};
});
