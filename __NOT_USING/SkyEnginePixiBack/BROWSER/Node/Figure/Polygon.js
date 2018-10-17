OVERRIDE(SkyEngine.Polygon, (origin) => {
	
	SkyEngine.Polygon = CLASS((cls) => {
		
		let findRaycastPoints = cls.findRaycastPoints = origin.findRaycastPoints;
		
		return {
			preset : () => {
				return origin;
			},
			
			init : (inner, self, params) => {
				//REQUIRED: params
				//REQUIRED: params.points	다각형을 이루는 점들의 좌표들
				
				let points = params.points;
				
				inner.drawGraphics((graphics) => {
					
					let pixiPoints = [];
					
					EACH(points, (point) => {
						pixiPoints.push(new PIXI.Point(self.getX() + point.x, self.getY() + point.y));
					});
					
					if (points.length > 0) {
						pixiPoints.push(new PIXI.Point(self.getX() + points[0].x, self.getY() + points[0].y));
					}
					
					graphics.drawPolygon(pixiPoints);
				});
				
				let drawPixiArea;
				OVERRIDE(self.drawPixiArea, (origin) => {
					
					drawPixiArea = self.drawPixiArea = (graphics) => {
						
						let pixiPoints = [];
						
						EACH(points, (point) => {
							pixiPoints.push(new PIXI.Point(self.getX() + point.x, self.getY() + point.y));
						});
						
						if (points.length > 0) {
							pixiPoints.push(new PIXI.Point(self.getX() + points[0].x, self.getY() + points[0].y));
						}
						
						graphics.drawPolygon(pixiPoints);
						
						origin(graphics);
					};
				});
			}
		};
	});
});