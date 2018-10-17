/*
 * 도형 노드
 */
SkyEngine.Figure = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.color
		//OPTIONAL: params.border
		
		let color = params.color;
		let border = params.border;
		
		let borderPixel;
		let borderStyle;
		let borderColor;
		
		if (border !== undefined) {
			let split = border.split(' ');
			borderPixel = INTEGER(split[0]);
			borderStyle = split[1];
			borderColor = split[2];
		}
		
		let pixiSprite;
		
		let draw = inner.draw = (width, height, drawFigure) => {
			
			let canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			
			var context = canvas.getContext('2d');
			
			context.beginPath();
			
			drawFigure(context);
			
			if (color !== undefined) {
				if (CHECK_IS_DATA(color) === true && color.checkIsInstanceOf(SkyEngine.Gradient) === true) {
					context.fillStyle = color.generateContextGradient(context);
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
			
			pixiSprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
			
			pixiSprite.x = -width / 2;
			pixiSprite.y = -height / 2;
			pixiSprite.zIndex = -9999999;
			
			pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
			
			self.addToPixiContainer(pixiSprite);
			
			context = undefined;
			canvas = undefined;
		};
		
		let setBlendMode;
		OVERRIDE(self.setBlendMode, (origin) => {
			
			setBlendMode = self.setBlendMode = (blendMode) => {
				//REQUIRED: blendMode
				
				pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
				
				origin(blendMode);
			};
		});
		
		let removeBlendMode;
		OVERRIDE(self.removeBlendMode, (origin) => {
			
			removeBlendMode = self.removeBlendMode = () => {
				
				origin();
				
				pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
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
});
