/*
 * 도형 노드
 */
SkyEngine.Figure = CLASS((cls) => {
	
	let colorStrToColor = (colorStr) => {
		
		if (colorStr[0] === '#') {
			return parseInt(colorStr.substring(1), 16);
		}
		
		if (colorStr.substring(0, 4) === 'rgb(') {
			let split = colorStr.substring(4, colorStr.indexOf(')')).split(',');
			return (1 << 24) + (parseInt(split[0]) << 16) + (parseInt(split[1]) << 8) + parseInt(split[2]);
		}
	};
	
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
				graphics.beginFill(colorStrToColor(color));
			}
		}
		
		if (border !== undefined) {
			
			let split = border.split(' ');
			let borderSize = REAL(split[0]);
			let borderStyle = split[1];
			let borderColor = split[2];
			
			graphics.lineStyle(borderSize, colorStrToColor(borderColor), 1);
		}
		
		if (blendMode !== undefined) {
			graphics.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(blendMode);
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
