/*
 * 이미지 노드
 */
SkyEngine.Image = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.src
		
		let src = params.src;
		
		let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
		
		let polygonPoints;
		
		let width;
		let height;
		
		let img;
		
		let pixiSprite;
		
		let setSrc = self.setSrc = (_src) => {
			src = _src;
			
			NEXT([
			(next) => {
				
				let texture = PIXI.utils.TextureCache[src];
				
				if (texture === undefined) {
					
					let tempImg = new Image();
					
					if (img === undefined) {
						img = tempImg;
					}
					
					tempImg.crossOrigin = 'anonymous';
					
					tempImg.onload = () => {
						
						tempImg.onload = undefined;
						
						if (self.checkIsRemoved() !== true) {
							
							img = tempImg;
							
							if (PIXI.utils.TextureCache[src] !== undefined) {
								texture = PIXI.utils.TextureCache[src];
							}
							
							else {
								
								texture = new PIXI.Texture.from(img);
								
								PIXI.Texture.addToCache(texture, src);
							}
							
							next(texture);
						}
					};
					
					tempImg.src = src;
				}
				
				else {
					next(texture);
				}
			},
			
			() => {
				return (texture) => {
					
					width = texture.width;
					height = texture.height;
					
					pixiSprite = new PIXI.Sprite.from(texture);
					
					pixiSprite.anchor.x = 0.5;
					pixiSprite.anchor.y = 0.5;
					
					pixiSprite.zIndex = -9999999;
					
					pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					self.addToPixiContainer(pixiSprite);
					
					self.fireEvent('load');
				};
			}]);
		};
		
		setSrc(src);
		
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
		
		let checkPoint;
		OVERRIDE(self.checkPoint, (origin) => {
			
			checkPoint = self.checkPoint = (x, y) => {
				
				let imageData = SkyEngine.Util.ImageData.getCachedImageData(src);
				
				if (imageData === undefined) {
					
					SkyEngine.Util.ImageData.loadAndCache(src);
					
					return origin(x, y) === true;
				}
				
				let tx = x - self.getDrawingX();
				let ty = y - self.getDrawingY();
				
				let cos = Math.cos(-self.getRealRadian());
				let sin = Math.sin(-self.getRealRadian());
				
				let px = cos * tx - sin * ty;
				let py = cos * ty + sin * tx;
				
				px = parseInt((px + width * self.getRealScaleX() / 2) / self.getRealScaleX());
				py = parseInt((py + height * self.getRealScaleY() / 2) / self.getRealScaleY());
				
				return (px >= 0 && px < width && py >= 0 && py < height && SkyEngine.Util.ImageData.checkPointIsTransparent(imageData, width, px, py) !== true) || origin(x, y) === true;
			};
		});
		
		let checkOffScreen;
		OVERRIDE(self.checkOffScreen, (origin) => {
			
			checkOffScreen = self.checkOffScreen = () => {
				
				if (width === undefined || checkRectRect(
					
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
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				if (img !== undefined) {
					img.onload = undefined;
					img = undefined;
				}
				
				pixiSprite = undefined;
				
				polygonPoints = undefined;
				
				origin();
			};
		});
		
		let getWidth = self.getWidth = () => {
			return width;
		};
		
		let getHeight = self.getHeight = () => {
			return height;
		};
	}
});
