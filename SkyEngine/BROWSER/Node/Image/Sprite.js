/*
 * 스프라이트 노드
 */
SkyEngine.Sprite = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.src
		//OPTIONAL: params.srcs
		//OPTIONAL: params.spriteWidth
		//OPTIONAL: params.spriteHeight
		//OPTIONAL: params.fps
		//OPTIONAL: params.frameCount
		
		let src = params.src;
		let srcs = params.srcs;
		let spriteWidth = params.spriteWidth;
		let spriteHeight = params.spriteHeight;
		let fps = params.fps;
		let frameCount = params.frameCount;
		
		let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
		
		let img;
		let imgs;
		
		let pixiTilingSprite;
		let pixiSprites;
		let nowPixiSprite;
		
		let width;
		let height;
		
		let realFrame = 0;
		let frame = 0;
		let beforeFrame = 0;
		
		let isStopped = false;
		
		if (fps === undefined) {
			fps = 0;
		}
		
		if (src !== undefined) {
			
			NEXT([
			(next) => {
				
				let texture = PIXI.utils.TextureCache[src];
				
				if (texture === undefined) {
					
					img = new Image();
					
					img.crossOrigin = 'anonymous';
					
					img.onload = () => {
						
						img.onload = undefined;
						
						if (self.checkIsRemoved() !== true) {
							
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
					
					img.src = src;
				}
				
				else {
					next(texture);
				}
			},
			
			() => {
				return (texture) => {
					
					width = texture.width;
					height = texture.height;
					
					if (spriteWidth === undefined) {
						if (frameCount !== undefined) {
							spriteWidth = width / frameCount;
						} else {
							spriteWidth = width;
						}
					}
					
					if (spriteHeight === undefined) {
						spriteHeight = height;
					}
					
					if (frameCount === undefined) {
						frameCount = width / spriteWidth * height / spriteHeight;
					}
					
					pixiTilingSprite = new PIXI.extras.TilingSprite.from(texture, spriteWidth, spriteHeight);
					
					pixiTilingSprite.anchor.x = 0.5;
					pixiTilingSprite.anchor.y = 0.5;
					
					pixiTilingSprite.zIndex = -9999999;
					
					pixiTilingSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					self.addToPixiContainer(pixiTilingSprite);
					
					self.fireEvent('load');
				};
			}]);
		}
		
		if (srcs !== undefined) {
			EACH(srcs, (src, i) => {
				
				if (imgs === undefined) {
					imgs = [];
					pixiSprites = [];
				}
				
				NEXT([
				(next) => {
					
					let texture = PIXI.utils.TextureCache[src];
					
					if (texture === undefined) {
						
						let img = new Image();
						
						img.crossOrigin = 'anonymous';
						
						img.onload = () => {
							
							img.onload = undefined;
							
							if (self.checkIsRemoved() !== true) {
								
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
						
						img.src = src;
						
						imgs.push(img);
					}
					
					else {
						next(texture);
					}
				},
				
				() => {
					return (texture) => {
						
						width = texture.width;
						height = texture.height;
						
						if (spriteWidth === undefined) {
							spriteWidth = width;
						}
						
						if (spriteHeight === undefined) {
							spriteHeight = height;
						}
						
						if (frameCount === undefined) {
							frameCount = 1;
						} else {
							frameCount += 1;
						}
						
						let pixiSprite = new PIXI.Sprite.from(texture);
						
						pixiSprite.anchor.x = 0.5;
						pixiSprite.anchor.y = 0.5;
						
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites[i] = pixiSprite;
						
						self.fireEvent('load');
					};
				}]);
			});
		}
		
		let getFrame = self.getFrame = () => {
			return frame;
		};
		
		let getBeforeFrame = self.getBeforeFrame = () => {
			return beforeFrame;
		};
		
		let stop = self.stop = () => {
			isStopped = true;
		};
		
		let resume = self.resume = () => {
			isStopped = false;
		};
		
		let hide;
		OVERRIDE(self.hide, (origin) => {
			
			hide = self.hide = () => {
				
				realFrame = 0;
				frame = 0;
				beforeFrame = 0;
				
				stop();
				
				origin();
			};
		});
		
		let show;
		OVERRIDE(self.show, (origin) => {
			
			show = self.show = () => {
				
				realFrame = 0;
				frame = 0;
				beforeFrame = 0;
				
				resume();
				
				origin();
			};
		});
		
		let setBlendMode;
		OVERRIDE(self.setBlendMode, (origin) => {
			
			setBlendMode = self.setBlendMode = (blendMode) => {
				//REQUIRED: blendMode
				
				origin(blendMode);
				
				if (pixiTilingSprite !== undefined) {
					pixiTilingSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
				}
				
				if (pixiSprites !== undefined) {
					EACH(pixiSprites, (pixiSprite) => {
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					});
				}
			};
		});
		
		let removeBlendMode;
		OVERRIDE(self.removeBlendMode, (origin) => {
			
			removeBlendMode = self.removeBlendMode = () => {
				
				origin();
				
				if (pixiTilingSprite !== undefined) {
					pixiTilingSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
				}
				
				if (pixiSprites !== undefined) {
					EACH(pixiSprites, (pixiSprite) => {
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					});
				}
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
					spriteWidth,
					spriteHeight,
					self.getRealScaleX(),
					self.getRealScaleY(),
					self.getRealSin(),
					self.getRealCos()) === true) {
					
					return false;
				}
				
				return origin();
			};
		});
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				if (isStopped !== true) {
					
					if (fps > 0) {
						realFrame += fps * deltaTime;
					}
					
					if (frameCount !== undefined) {
						if (realFrame >= frameCount) {
							realFrame -= frameCount;
							self.fireEvent('animationend');
						}
					}
					
					beforeFrame = frame;
					frame = Math.floor(realFrame);
					
					if (self.checkIsRemoved() !== true) {
						
						if (pixiSprites !== undefined) {
							
							if (nowPixiSprite !== undefined) {
								self.removeFromPixiContainer(nowPixiSprite);
							}
							
							nowPixiSprite = pixiSprites[self.getFrame()];
							
							if (nowPixiSprite !== undefined) {
								self.addToPixiContainer(nowPixiSprite);
							}
						}
						
						else if (pixiTilingSprite !== undefined) {
							pixiTilingSprite.tilePosition.x = -spriteWidth * Math.floor(realFrame % (width / spriteWidth));
							pixiTilingSprite.tilePosition.y = -spriteHeight * Math.floor(realFrame / (width / spriteWidth));
						}
						
						self.fireEvent('framechange');
					}
				}
				
				origin(deltaTime);
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				srcs = undefined;
				
				if (img !== undefined) {
					img.onload = undefined;
					img = undefined;
				}
				
				EACH(imgs, (img) => {
					img.onload = undefined;
				});
				imgs = undefined;
				
				pixiTilingSprite = undefined;
				pixiSprites = undefined;
				nowPixiSprite = undefined;
				
				origin();
			};
		});
		
		let getRealFrame = inner.getRealFrame = () => {
			return realFrame;
		};
		
		let getSpriteWidth = self.getSpriteWidth = () => {
			return spriteWidth;
		};
		
		let getSpriteHeight = self.getSpriteHeight = () => {
			return spriteHeight;
		};
		
		let getWidth = self.getWidth = () => {
			return width;
		};
		
		let getHeight = self.getHeight = () => {
			return height;
		};
	}
});
