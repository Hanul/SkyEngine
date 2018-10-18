/*
 * 도형 노드
 */
SkyEngine.Figure = CLASS((cls) => {
	
	let generatePixiSprite = cls.generatePixiSprite = (params, drawFigure) => {
		//REQUIRED: params
		//REQUIRED: params.width
		//REQUIRED: params.height
		//OPTIONAL: params.color
		//OPTIONAL: params.border
		//OPTIONAL: params.blendMode
		//REQUIRED: drawFigure
		
		let width = params.width;
		let height = params.height;
		let color = params.color;
		let border = params.border;
		let blendMode = params.blendMode;
		
		let borderPixel;
		let borderStyle;
		let borderColor;
		
		if (border !== undefined) {
			let split = border.split(' ');
			borderPixel = INTEGER(split[0]);
			borderStyle = split[1];
			borderColor = split[2];
		}
		
		let canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		
		let pixiSprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
		
		pixiSprite.x = -width / 2;
		pixiSprite.y = -height / 2;
		pixiSprite.zIndex = -9999999;
		
		pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(blendMode);
		
		var context = canvas.getContext('2d');
		
		context.beginPath();
		
		drawFigure(context, pixiSprite);
		
		if (color !== undefined) {
			if (CHECK_IS_DATA(color) === true && color.checkIsInstanceOf(SkyEngine.Gradient) === true) {
				context.fillStyle = color.generateContextGradient(context, width / 2, height / 2);
			} else {
				context.fillStyle = color;
			}
			context.fill();
		}
		
		if (border !== undefined) {
			context.lineWidth = borderPixel;
			context.strokeStyle = borderColor;
			
			if (borderStyle === 'dashed') {
				context.setLineDash([5]);
			} else if (borderStyle === 'dotted') {
				context.setLineDash([2]);
			}
			
			context.stroke();
		}
		
		context.closePath();
		
		context = undefined;
		canvas = undefined;
		
		return pixiSprite;
	};
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
	
		init : (inner, self) => {
			
			let pixiSprite;
			
			let setPixiSprite = inner.setPixiSprite = (_pixiSprite) => {
				
				pixiSprite = _pixiSprite;
				
				self.addToPixiContainer(pixiSprite);
			};
			
			let setBlendMode;
			OVERRIDE(self.setBlendMode, (origin) => {
				
				setBlendMode = self.setBlendMode = (blendMode) => {
					//REQUIRED: blendMode
					
					origin(blendMode);
					
					if (pixiSprite !== undefined) {
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					}
				};
			});
			
			let removeBlendMode;
			OVERRIDE(self.removeBlendMode, (origin) => {
				
				removeBlendMode = self.removeBlendMode = () => {
					
					origin();
					
					if (pixiSprite !== undefined) {
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					}
				};
			});
			
			let remove;
			OVERRIDE(self.remove, (origin) => {
				
				remove = self.remove = () => {
					
					pixiSprite = undefined;
					
					origin();
				};
			});
		}
	};
});
