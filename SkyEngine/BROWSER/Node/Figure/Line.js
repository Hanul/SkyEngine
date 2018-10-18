/*
 * 직선 노드
 */
SkyEngine.Line = CLASS((cls) => {
	
	let findLineIntersectionPoint = cls.findLineIntersectionPoint = (
		lineX, lineY,
		lineStartX, lineStartY,
		lineEndX, lineEndY,
		lineScaleX, lineScaleY,
		lineSin, lineCos,
		
		targetX, targetY,
		targetStartX, targetStartY,
		targetEndX, targetEndY,
		targetScaleX, targetScaleY,
		targetSin, targetCos
	) => {
		
		if (SkyEngine.Util.Collision.checkLineLine(
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			targetX, targetY,
			targetStartX, targetStartY,
			targetEndX, targetEndY,
			targetScaleX, targetScaleY,
			targetSin, targetCos
		) === true) {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
				
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
			
			targetStartX *= targetScaleX;
			targetStartY *= targetScaleY;
			
			let targetTempStartX = targetX + targetCos * targetStartX + targetSin * targetStartY;
			let targetTempStartY = targetY + targetSin * targetStartX + targetCos * targetStartY;
				
			targetEndX *= targetScaleX;
			targetEndY *= targetScaleY;
			
			let targetTempEndX = targetX + targetCos * targetEndX + targetSin * targetEndY;
			let targetTempEndY = targetY + targetSin * targetEndX + targetCos * targetEndY;
			
			let denom = (lineTempEndX - lineTempStartX) * (targetTempEndY - targetTempStartY) - (targetTempEndX - targetTempStartX) * (lineTempEndY - lineTempStartY);
			
			return {
				x : ((lineTempEndX * lineTempStartY - lineTempEndY * lineTempStartX) * (targetTempEndX - targetTempStartX) - (lineTempEndX - lineTempStartX) * (targetTempEndX * targetTempStartY - targetTempEndY * targetTempStartX)) / denom,
				y : ((lineTempEndX * lineTempStartY - lineTempEndY * lineTempStartX) * (targetTempEndY - targetTempStartY) - (lineTempEndY - lineTempStartY) * (targetTempEndX * targetTempStartY - targetTempEndY * targetTempStartX)) / denom 
			};
		}
	};
	
	let findRectIntersectionPoints = cls.findRectIntersectionPoints = (
		lineX, lineY,
		lineStartX, lineStartY,
		lineEndX, lineEndY,
		lineScaleX, lineScaleY,
		lineSin, lineCos,
		
		rectX, rectY,
		rectWidth, rectHeight,
		rectScaleX, rectScaleY,
		rectSin, rectCos
	) => {
		
		let points = [];
		
		lineStartX *= lineScaleX;
		lineStartY *= lineScaleY;
		
		let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
		let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
			
		lineEndX *= lineScaleX;
		lineEndY *= lineScaleY;
		
		let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
		let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
		
		let rectPoint1X, rectPoint1Y;
		let rectPoint2X, rectPoint2Y;
		let rectPoint3X, rectPoint3Y;
		let rectPoint4X, rectPoint4Y;
		
		rectWidth *= rectScaleX / 2;
		rectHeight *= rectScaleY / 2;
		
		let cw = rectCos * rectWidth;	let ch = rectCos * rectHeight;
		let sw = -rectSin * rectWidth;	let sh = -rectSin * rectHeight;
		
		rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
		rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
		rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
		rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
		
		let point = findLineIntersectionPoint(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1);
		if (point !== undefined) {
			points.push(point);
		}
		
		point = findLineIntersectionPoint(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1);
		if (point !== undefined) {
			points.push(point);
		}
		
		point = findLineIntersectionPoint(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1);
		if (point !== undefined) {
			points.push(point);
		}
		
		point = findLineIntersectionPoint(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1);
		if (point !== undefined) {
			points.push(point);
		}
		
		return points;
	};
	
	let findCircleIntersectionPoints = cls.findCircleIntersectionPoints = (
		lineX, lineY,
		lineStartX, lineStartY,
		lineEndX, lineEndY,
		lineScaleX, lineScaleY,
		lineSin, lineCos,
		
		circleX, circleY,
		circleWidth, circleHeight,
		circleScaleX, circleScaleY,
		circleSin, circleCos
	) => {
		
		let points = [];
		
		if (SkyEngine.Util.Collision.checkLineCircle(
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos
		) === true) {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY - circleX;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY - circleY;
				
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY - circleX;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY - circleY;
			
			let tempStartX = circleCos * lineTempStartX + circleSin * lineTempStartY;
			let tempStartY = -circleSin * lineTempStartX + circleCos * lineTempStartY;
			
			let tempEndX = circleCos * lineTempEndX + circleSin * lineTempEndY;
			let tempEndY = -circleSin * lineTempEndX + circleCos * lineTempEndY;
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let h = circleWidth / 2;
			let v = circleHeight / 2;
			
			let a = (tempEndY - tempStartY) / (tempEndX - tempStartX);
			let b = (tempStartY - a * tempStartX);
			
			let r = a * a * h * h + v * v;
			let s = 2 * a * b * h * h;
			let t = h * h * b * b - h * h * v * v;
			
			let d = s * s - 4 * r * t;
			
			if (d > 0) {
				
				let resultX1 = (-s + Math.sqrt(d)) / (2 * r);
				let resultY1 = a * resultX1 + b;
				
				let resultX2 = (-s - Math.sqrt(d)) / (2 * r);
				let resultY2 = a * resultX2 + b;
			
				if ((tempStartX < tempEndX ? tempStartX : tempEndX) <= resultX1 && resultX1 <= (tempStartX < tempEndX ? tempEndX : tempStartX) && (tempStartY < tempEndY ? tempStartY : tempEndY) <= resultY1 && resultY1 <= (tempStartY < tempEndY ? tempEndY : tempStartY)) {
					points.push({
						x : circleCos * resultX1 - circleSin * resultY1 + circleX,
						y : circleSin * resultX1 + circleCos * resultY1 + circleY
					});
				}
				if ((tempStartX < tempEndX ? tempStartX : tempEndX) <= resultX2 && resultX2 <= (tempStartX < tempEndX ? tempEndX : tempStartX) && (tempStartY < tempEndY ? tempStartY : tempEndY) <= resultY2 && resultY2 <= (tempStartY < tempEndY ? tempEndY : tempStartY)) {
					points.push({
						x : circleCos * resultX2 - circleSin * resultY2 + circleX,
						y : circleSin * resultX2 + circleCos * resultY2 + circleY
					});
				}
			}
			
			else if (d === 0) {
				
				let resultX = -s / (2 * r);
				let resultY = a * resultX + b;
				
				if ((tempStartX < tempEndX ? tempStartX : tempEndX) <= resultX && resultX <= (tempStartX < tempEndX ? tempEndX : tempStartX) && (tempStartY < tempEndY ? tempStartY : tempEndY) <= resultY && resultY <= (tempStartY < tempEndY ? tempEndY : tempStartY)) {
					points.push({
						x : circleCos * resultX - circleSin * resultY + circleX,
						y : circleSin * resultX + circleCos * resultY + circleY
					});
				}
			}
		}
		
		return points;
	};
	
	let findPolygonIntersectionPoints = cls.findPolygonIntersectionPoints = (
		lineX, lineY,
		lineStartX, lineStartY,
		lineEndX, lineEndY,
		lineScaleX, lineScaleY,
		lineSin, lineCos,
		
		polygonX, polygonY,
		polygonPoints,
		polygonScaleX, polygonScaleY,
		polygonSin, polygonCos
	) => {
		
		let points = [];
		
		lineStartX *= lineScaleX;
		lineStartY *= lineScaleY;
		
		let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
		let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
			
		lineEndX *= lineScaleX;
		lineEndY *= lineScaleY;
		
		let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
		let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
		
		let length = polygonPoints.length;
		
		for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
			
			let iX = polygonPoints[i].x * polygonScaleX;
			let iY = polygonPoints[i].y * polygonScaleY;
			
			let jX = polygonPoints[j].x * polygonScaleX;
			let jY = polygonPoints[j].y * polygonScaleY;
			
			let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
			let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
			
			let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
			let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
			
			let point = findLineIntersectionPoint(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1);
			
			if (point !== undefined) {
				points.push(point);
			}
		}
		
		return points;
	};
	
	let generateGraphics = cls.generateGraphics = (params) => {
		//REQUIRED: params
		//REQUIRED: params.startX
		//REQUIRED: params.startY
		//REQUIRED: params.endX
		//REQUIRED: params.endY
		//OPTIONAL: params.border
		//OPTIONAL: params.blendMode
		
		let startX = params.startX;
		let startY = params.startY;
		let endX = params.endX;
		let endY = params.endY;
		let border = params.border;
		
		let graphics = SkyEngine.Figure.generateGraphics(params);
		
		graphics.moveTo(startX, startY);
		graphics.lineTo(endX, endY);
		
		return graphics;
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Figure;
		},
	
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.startX		직선의 시작 x 좌표
			//REQUIRED: params.startY		직선의 시작 y 좌표
			//REQUIRED: params.endX			직선의 끝 x 좌표
			//REQUIRED: params.endY			직선의 끝 Y 좌표
			//REQUIRED: params.border
			//OPTIONAL: params.isEndless	true로 지정하면 양 끝이 무한인 직선을 생성합니다.
			
			let startX = params.startX;
			let startY = params.startY;
			let endX = params.endX;
			let endY = params.endY;
			let border = params.border;
			let isEndless = params.isEndless;
			
			let checkLineLine = SkyEngine.Util.Collision.checkLineLine;
			let checkLineRect = SkyEngine.Util.Collision.checkLineRect;
			
			if (isEndless === true) {
				if (Math.abs(endX - startX) < Math.abs(endY - startY)) {
					endX = ((endY - startY < 0 ? -999999 : 999999) - startY) / (endY - startY) * (endX - startX) + startX;
					endY = endY - startY < 0 ? -999999 : 999999;
				} else {
					endY = (endY - startY) / (endX - startX) * ((endX - startX < 0 ? -999999 : 999999) - startX) + startY;
					endX = endX - startX < 0 ? -999999 : 999999;
				}
			}
			
			let setStartX = self.setStartX = (_startX) => {
				startX = _startX;
			};
			
			let getStartX = self.getStartX = () => {
				return startX;
			};
			
			let setStartY = self.setStartY = (_startY) => {
				startY = _startY;
			};
			
			let getStartY = self.getStartY = () => {
				return startY;
			};
			
			let setEndX = self.setEndX = (_endX) => {
				endX = _endX;
			};
			
			let getEndX = self.getEndX = () => {
				return endX;
			};
			
			let setEndY = self.setEndY = (_endY) => {
				endY = _endY;
			};
			
			let getEndY = self.getEndY = () => {
				return endY;
			};
			
			let checkArea;
			OVERRIDE(self.checkArea, (origin) => {
				
				checkArea = self.checkArea = (area) => {
					// area가 같은 Line인 경우 작동
					
					if (area.type === SkyEngine.Line) {
						
						if (checkLineLine(
							
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
							startX,
							startY,
							endX,
							endY,
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
					
					if (checkLineRect(
						
						self.getDrawingX(),
						self.getDrawingY(),
						startX,
						startY,
						endX,
						endY,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos(),
						
						SkyEngine.Screen.getCameraFollowX(),
						SkyEngine.Screen.getCameraFollowY(),
						SkyEngine.Screen.getWidth(),
						SkyEngine.Screen.getHeight(),
						1,
						1,
						0,
						1) === true) {
						
						return false;
					}
					
					return origin();
				};
			});
			
			inner.setGraphics(generateGraphics({
				startX : startX,
				startY : startY,
				endX : endX,
				endY : endY,
				border : border,
				blendMode : self.getBlendMode()
			}));
			
			let drawArea;
			OVERRIDE(self.drawArea, (origin) => {
				
				drawArea = self.drawArea = (graphics) => {
					
					graphics.moveTo(self.getX() + startX, self.getY() + startY);
					graphics.lineTo(self.getX() + endX, self.getY() + endY);
					
					origin(graphics);
				};
			});
			
			let findIntersectionPoints = self.findIntersectionPoints = (target) => {
				
				let points = [];
				
				if (target.checkIsInstanceOf(SkyEngine.Line) === true) {
					
					let point = findLineIntersectionPoint(
						self.getDrawingX(),
						self.getDrawingY(),
						startX,
						startY,
						endX,
						endY,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos(),
						
						target.getDrawingX(),
						target.getDrawingY(),
						target.getStartX(),
						target.getStartY(),
						target.getEndX(),
						target.getEndY(),
						target.getRealScaleX(),
						target.getRealScaleY(),
						target.getRealSin(),
						target.getRealCos()
					);
					
					if (point !== undefined) {
						points.push(point);
					}
				}
				
				else if (target.checkIsInstanceOf(SkyEngine.Rect) === true) {
					
					points = findRectIntersectionPoints(
						self.getDrawingX(),
						self.getDrawingY(),
						startX,
						startY,
						endX,
						endY,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos(),
						
						target.getDrawingX(),
						target.getDrawingY(),
						target.getWidth(),
						target.getHeight(),
						target.getRealScaleX(),
						target.getRealScaleY(),
						target.getRealSin(),
						target.getRealCos()
					);
				}
				
				else if (target.checkIsInstanceOf(SkyEngine.Circle) === true) {
					
					points = findCircleIntersectionPoints(
						self.getDrawingX(),
						self.getDrawingY(),
						startX,
						startY,
						endX,
						endY,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos(),
						
						target.getDrawingX(),
						target.getDrawingY(),
						target.getWidth(),
						target.getHeight(),
						target.getRealScaleX(),
						target.getRealScaleY(),
						target.getRealSin(),
						target.getRealCos()
					);
				}
				
				else if (target.checkIsInstanceOf(SkyEngine.Polygon) === true) {
					
					points = findPolygonIntersectionPoints(
						self.getDrawingX(),
						self.getDrawingY(),
						startX,
						startY,
						endX,
						endY,
						self.getRealScaleX(),
						self.getRealScaleY(),
						self.getRealSin(),
						self.getRealCos(),
						
						target.getDrawingX(),
						target.getDrawingY(),
						target.getPoints(),
						target.getRealScaleX(),
						target.getRealScaleY(),
						target.getRealSin(),
						target.getRealCos()
					);
				}
				
				return points;
			};
		}
	};
});
