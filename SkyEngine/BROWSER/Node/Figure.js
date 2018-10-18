/*
 * 도형 노드
 */
SkyEngine.Figure = CLASS((cls) => {
	
	let generateGraphics = cls.generateGraphics = (params) => {
		//REQUIRED: params
		//OPTIONAL: params.color
		//OPTIONAL: params.border
		//OPTIONAL: params.blendMode
		
		let color = params.color;
		let border = params.border;
		let blendMode = params.blendMode;
		
		let graphics = new PIXI.Graphics();
		
		if (color !== undefined) {
			if (isNaN(color) !== true) {
				graphics.beginFill(color);
			} else {
				graphics.beginFill(parseInt(color.substring(1), 16));
			}
		}
		
		if (border !== undefined) {
			
			let split = border.split(' ');
			let borderSize = REAL(split[0]);
			let borderStyle = split[1];
			let borderColor = split[2];
			
			graphics.lineStyle(borderSize, parseInt(borderColor.substring(1), 16), 1);
		}
		
		graphics.zIndex = -9999999;
		
		return graphics;
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
	
		init : (inner, self) => {
			
			let graphics;
			
			let setGraphics = inner.setGraphics = (_graphics) => {
				
				graphics = _graphics;
				
				self.addToPixiContainer(graphics);
			};
			
			let setBlendMode;
			OVERRIDE(self.setBlendMode, (origin) => {
				
				setBlendMode = self.setBlendMode = (blendMode) => {
					//REQUIRED: blendMode
					
					origin(blendMode);
					
					if (graphics !== undefined) {
						graphics.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					}
				};
			});
			
			let removeBlendMode;
			OVERRIDE(self.removeBlendMode, (origin) => {
				
				removeBlendMode = self.removeBlendMode = () => {
					
					origin();
					
					if (graphics !== undefined) {
						graphics.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					}
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					graphics = undefined;
					
					origin();
				};
			});
		}
	};
});
