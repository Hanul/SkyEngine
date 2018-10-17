OVERRIDE(SkyEngine.Silhouette, (origin) => {
	
	SkyEngine.Silhouette = CLASS({
		
		preset : () => {
			return origin;
		},
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.src
			//OPTIONAL: params.color
			//OPTIONAL: params.border
			
			let border = params.border;
			
			let borderPixel;
			let borderStyle;
			let borderColor;
			
			let graphics;
			
			if (border !== undefined) {
				let split = border.split(' ');
				borderPixel = INTEGER(split[0]);
				borderStyle = split[1];
				borderColor = split[2];
				
				graphics = new PIXI.Graphics();
				self.addToPixiContainer(graphics);
			}
			
			let sprite;
			
			self.on('load', () => {
				
				if (self.checkIsRemoved() !== true) {
					
					let img = inner.getImg();
					
					sprite = new PIXI.Sprite.fromImage(img.src);
					
					sprite.x = -img.width / 2;
					sprite.y = -img.height / 2;
					
					sprite.blendMode = SkyEnginePixiBack.Util.getPixiBlendMode(self.getBlendMode());
					
					self.addToPixiContainer(sprite);
					
					let polygonPoints = inner.getPolygonPoints();
					
					if (border !== undefined && polygonPoints.length > 0) {
						
						graphics.x = -img.width / 2;
						graphics.y = -img.height / 2;
						
						graphics.lineStyle(borderPixel, parseInt(borderColor.substring(1), 16), 1);
						
						let pixiPoints = [];
						
						EACH(polygonPoints, (point) => {
							pixiPoints.push(new PIXI.Point(point.x, point.y));
						});
						
						if (polygonPoints.length > 0) {
							pixiPoints.push(new PIXI.Point(polygonPoints[0].x, polygonPoints[0].y));
						}
						
						graphics.drawPolygon(pixiPoints);
					}
				}
			});
			
			let setBlendMode;
			OVERRIDE(self.setBlendMode, (origin) => {
				
				setBlendMode = self.setBlendMode = (blendMode) => {
					//REQUIRED: blendMode
					
					if (sprite !== undefined) {
						sprite.blendMode = SkyEnginePixiBack.Util.getPixiBlendMode(blendMode);
					}
					
					origin(blendMode);
				};
			});
			
			let removeBlendMode;
			OVERRIDE(self.removeBlendMode, (origin) => {
				
				removeBlendMode = self.removeBlendMode = () => {
					
					if (sprite !== undefined) {
						sprite.blendMode = PIXI.BLEND_MODES.NORMAL;
					}
					
					origin();
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					sprite = undefined;
					
					origin();
				};
			});
		}
	});
});