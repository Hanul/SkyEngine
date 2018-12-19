/*
 * 배경 노드
 */
SkyEngine.Background = CLASS({
	
	preset : () => {
		return SkyEngine.FixedNode;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.src
		//OPTIONAL: params.isNotToRepeatX
		//OPTIONAL: params.isNotToRepeatY
		//OPTIONAL: params.leftMargin
		//OPTIONAL: params.rightMargin
		//OPTIONAL: params.topMargin
		//OPTIONAL: params.bottomMargin
		
		let src = params.src;
		let isNotToRepeatX = params.isNotToRepeatX;
		let isNotToRepeatY = params.isNotToRepeatY;
		let leftMargin = params.leftMargin;
		let rightMargin = params.rightMargin;
		let topMargin = params.topMargin;
		let bottomMargin = params.bottomMargin;
		
		if (leftMargin === undefined) {
			leftMargin = 0;
		}
		if (rightMargin === undefined) {
			rightMargin = 0;
		}
		if (topMargin === undefined) {
			topMargin = 0;
		}
		if (bottomMargin === undefined) {
			bottomMargin = 0;
		}
		
		let width;
		let height;
		
		let img;
		
		let pixiTilingSprite;
		let pixiSprites;
		
		let draw = () => {
			
			let xs = leftMargin + width + rightMargin;
			let ys = topMargin + height + bottomMargin;
			
			let realScaleX = SkyEngine.Screen.getRealScaleX() * self.getRealScaleX();
			let realScaleY = SkyEngine.Screen.getRealScaleY() * self.getRealScaleY();
			
			let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX()) / realScaleX;
			let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY()) / realScaleY;
			
			let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / realScaleX;
			let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / realScaleY;
			
			let realX = self.getX() / realScaleX;
			let realY = self.getY() / realScaleY;
			
			if (isNotToRepeatX === true && isNotToRepeatY === true) {
				
				if (pixiSprites.length === 0) {
					
					let pixiSprite = new PIXI.Sprite.fromImage(src);
					
					pixiSprite.anchor.x = 0.5;
					pixiSprite.anchor.y = 0.5;
					
					pixiSprite.zIndex = -9999999;
					
					pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					pixiSprites.push(pixiSprite);
					
					self.addToPixiContainer(pixiSprite);
				}
			}
			
			else if (isNotToRepeatX === true) {
				
				let _y = 0;
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.y + realY < screenY - halfScreenHeight - ys ||
					pixiSprite.y + realY > screenY + halfScreenHeight) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenY - halfScreenHeight < _y + realY) {
					_y -= ys;
				}
				
				while (_y + realY < screenY + halfScreenHeight + ys) {
					
					let existed;
					
					for (let i = 0; i < pixiSprites.length; i += 1)  {
						
						let pixiSprite = pixiSprites[i];
						
						if (pixiSprite.y === _y) {
							existed = true;
						}
					}
					
					// 스프라이트 생성
					if (existed !== true) {
						
						let pixiSprite = new PIXI.Sprite.fromImage(src);
						
						pixiSprite.anchor.x = 0.5;
						pixiSprite.anchor.y = 0.5;
						
						pixiSprite.y = _y;
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites.push(pixiSprite);
						
						self.addToPixiContainer(pixiSprite);
					}
					
					_y += ys;
				}
			}
			
			else if (isNotToRepeatY === true) {
				
				let _x = 0;
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.x + realX < screenX - halfScreenWidth - xs ||
					pixiSprite.x + realX > screenX + halfScreenWidth) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenX - halfScreenWidth < _x + realX) {
					_x -= xs;
				}
				
				while (_x + realX < screenX + halfScreenWidth + xs) {
					
					let existed;
					
					for (let i = 0; i < pixiSprites.length; i += 1)  {
						
						let pixiSprite = pixiSprites[i];
						
						if (pixiSprite.x === _x) {
							existed = true;
						}
					}
					
					// 스프라이트 생성
					if (existed !== true) {
						
						let pixiSprite = new PIXI.Sprite.fromImage(src);
						
						pixiSprite.anchor.x = 0.5;
						pixiSprite.anchor.y = 0.5;
						
						pixiSprite.x = _x;
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites.push(pixiSprite);
						
						self.addToPixiContainer(pixiSprite);
					}
					
					_x += xs;
				}
			}
			
			else {
				
				let _x = 0;
				let _y = 0;
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.x + realX < screenX - halfScreenWidth ||
					pixiSprite.y + realY < screenY - halfScreenHeight ||
					pixiSprite.x + realX > screenX + halfScreenWidth ||
					pixiSprite.y + realY > screenY + halfScreenHeight) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenX - halfScreenWidth < _x + realX) {
					_x -= xs;
				}
				
				while (screenY - halfScreenHeight < _y + realY) {
					_y -= ys;
				}
				
				while (_y + realY < screenY + halfScreenHeight + ys) {
					
					let _x2 = _x;
					
					while (_x2 + realX < screenX + halfScreenWidth + xs) {
						
						let existed;
						
						for (let i = 0; i < pixiSprites.length; i += 1)  {
							
							let pixiSprite = pixiSprites[i];
							
							if (pixiSprite.x === _x2 && pixiSprite.y === _y) {
								existed = true;
							}
						}
						
						// 스프라이트 생성
						if (existed !== true) {
							
							let pixiSprite = new PIXI.Sprite.fromImage(src);
							
							pixiSprite.anchor.x = 0.5;
							pixiSprite.anchor.y = 0.5;
							
							pixiSprite.x = _x2;
							pixiSprite.y = _y;
							pixiSprite.zIndex = -9999999;
							
							pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
							
							pixiSprites.push(pixiSprite);
							
							self.addToPixiContainer(pixiSprite);
						}
						
						_x2 += xs;
					}
					
					_y += ys;
				}
			}
		};
		
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
				
				if (isNotToRepeatX !== true && isNotToRepeatY !== true && leftMargin === 0 && rightMargin === 0 && topMargin === 0 && bottomMargin === 0) {
					
					let realScaleX = SkyEngine.Screen.getRealScaleX() * self.getRealScaleX();
					let realScaleY = SkyEngine.Screen.getRealScaleY() * self.getRealScaleY();
					
					let screenWidth = SkyEngine.Screen.getWidth() / realScaleX;
					let screenHeight = SkyEngine.Screen.getHeight() / realScaleY;
					
					pixiTilingSprite = new PIXI.extras.TilingSprite.from(texture, screenWidth, screenHeight);
					
					pixiTilingSprite.anchor.x = 0.5;
					pixiTilingSprite.anchor.y = 0.5;
					
					pixiTilingSprite.tilePosition.x = (screenWidth - width) / 2;
					pixiTilingSprite.tilePosition.y = (screenHeight - height) / 2;
					
					pixiTilingSprite.zIndex = -9999999;
					
					pixiTilingSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					self.addToPixiContainer(pixiTilingSprite);
				}
				
				else {
					pixiSprites = [];
					draw();
				}
				
				DELAY(() => {
					self.fireEvent('load');
				});
			};
		}]);
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				origin(deltaTime);
				
				if (pixiTilingSprite !== undefined) {
					
					let realScaleX = SkyEngine.Screen.getRealScaleX() * self.getRealScaleX();
					let realScaleY = SkyEngine.Screen.getRealScaleY() * self.getRealScaleY();
					
					let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX()) / realScaleX;
					let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY()) / realScaleY;
					
					let screenWidth = SkyEngine.Screen.getWidth() / realScaleX;
					let screenHeight = SkyEngine.Screen.getHeight() / realScaleY;
					
					let realX = self.getX() / realScaleX;
					let realY = self.getY() / realScaleY;
					
					pixiTilingSprite.x = -realX + screenX;
					pixiTilingSprite.y = -realY + screenY;
					
					pixiTilingSprite.tilePosition.x = (screenWidth - width) / 2 - pixiTilingSprite.x;
					pixiTilingSprite.tilePosition.y = (screenHeight - height) / 2 - pixiTilingSprite.y;
				}
				
				else if (pixiSprites !== undefined) {
					draw();
				}
			};
		});
		
		let remove;
		OVERRIDE(self.remove, (origin) => {
			
			remove = self.remove = () => {
				
				if (img !== undefined) {
					img.onload = undefined;
					img = undefined;
				}
				
				pixiTilingSprite = undefined;
				pixiSprites = undefined;
				
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
