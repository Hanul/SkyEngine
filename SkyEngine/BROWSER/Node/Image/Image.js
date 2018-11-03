/*
 * 이미지 노드
 */
SkyEngine.Image = CLASS((cls) => {
	
	const TRANSPARENT_ALPHA = 20;
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.src
			
			let src = params.src;
			
			let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
			
			let imageData;
			let isImageDataLoading = false;
			
			let polygonPoints;
			
			let width;
			let height;
			
			let img;
			
			let pixiSprite;
			
			let setSrc = self.setSrc = (_src) => {
				src = _src;
				
				NEXT([
				(next) => {
					
					if (PIXI.utils.TextureCache[src] === undefined) {
						
						let tempImg = new Image();
						
						if (img === undefined) {
							img = tempImg;
						}
						
						tempImg.onload = () => {
							
							tempImg.onload = undefined;
							
							if (self.checkIsRemoved() !== true) {
								
								width = tempImg.width;
								height = tempImg.height;
								
								img = tempImg;
								
								PIXI.Texture.addToCache(new PIXI.Texture.from(img), src);
								
								next();
							}
						};
						
						tempImg.src = src;
					}
					
					else {
						next();
					}
				},
				
				() => {
					return () => {
						
						pixiSprite = new PIXI.Sprite.fromImage(src);
						
						width = pixiSprite.width;
						height = pixiSprite.height;
						
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
					
					if (imageData === undefined) {
						
						if (isImageDataLoading !== true) {
							
							let tempImg = new Image();
							
							tempImg.onload = () => {
								
								let width = tempImg.width;
								let height = tempImg.height;
								
								let imageCanvas = CANVAS({
									style : {
										display : 'none'
									},
									width : width,
									height : height
								}).appendTo(BODY);
								
								let imageContext = imageCanvas.getContext('2d');
								imageContext.drawImage(tempImg, 0, 0, width, height);
								
								imageData = imageContext.getImageData(0, 0, width, height).data;
								
								// clear.
								imageContext = undefined;
								imageCanvas.remove();
								
								tempImg.onload = undefined;
							};
							
							tempImg.src = src;
							
							isImageDataLoading = true;
						}
						
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
					
					return (px >= 0 && px < width && py >= 0 && py < height && imageData[(py * width + px) * 4 + 3] > TRANSPARENT_ALPHA) || origin(x, y) === true;
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
					
					img.onload = undefined;
					img = undefined;
					
					pixiSprite = undefined;
					
					imageData = undefined;
					
					polygonPoints = undefined;
					
					origin();
				};
			});
			
			let getImg = inner.getImg = () => {
				return img;
			};
			
			let getWidth = self.getWidth = () => {
				return width;
			};
			
			let getHeight = self.getHeight = () => {
				return height;
			};
		}
	};
});
