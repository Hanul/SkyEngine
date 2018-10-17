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
		
		let img = new Image();
		
		let pixiTilingSprite;
		let pixiSprites;
		
		let draw = () => {
			
			if (isNotToRepeatX === true && isNotToRepeatY === true) {
				
				if (pixiSprites.length === 0) {
					
					let pixiSprite = new PIXI.Sprite.fromImage(src);
					
					pixiSprite.x = -width / 2;
					pixiSprite.y = -height / 2;
					pixiSprite.zIndex = -9999999;
					
					pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
					
					pixiSprites.push(pixiSprite);
					
					self.addToPixiContainer(pixiSprite);
				}
			}
			
			else if (isNotToRepeatX === true) {
				
				let _y = -height / 2;
				
				let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY()) / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
				
				let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.y + self.getY() < screenY - halfScreenHeight - (topMargin + height + bottomMargin) ||
					pixiSprite.y + self.getY() > screenY + halfScreenHeight) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenY - halfScreenHeight < _y + self.getY()) {
					_y -= topMargin + height + bottomMargin;
				}
				
				while (_y + self.getY() < screenY + halfScreenHeight) {
					
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
						
						pixiSprite.x = -width / 2;
						pixiSprite.y = _y;
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites.push(pixiSprite);
						
						self.addToPixiContainer(pixiSprite);
					}
					
					_y += topMargin + height + bottomMargin;
				}
			}
			
			else if (isNotToRepeatY === true) {
				
				let _x = -width / 2;
				
				let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX()) / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
				
				let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.x + self.getX() < screenX - halfScreenWidth - (leftMargin + width + rightMargin) ||
					pixiSprite.x + self.getX() > screenX + halfScreenWidth) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenX - halfScreenWidth < _x + self.getX()) {
					_x -= leftMargin + width + rightMargin;
				}
				
				while (_x + self.getX() < screenX + halfScreenWidth) {
					
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
						
						pixiSprite.x = _x;
						pixiSprite.y = -height / 2;
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						pixiSprites.push(pixiSprite);
						
						self.addToPixiContainer(pixiSprite);
					}
					
					_x += leftMargin + width + rightMargin;
				}
			}
			
			else {
				
				let _x = -width / 2;
				let _y = -height / 2;
				
				let screenX = (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX()) / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
				let screenY = (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY()) / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
				
				let halfScreenWidth = SkyEngine.Screen.getWidth() / 2 / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
				let halfScreenHeight = SkyEngine.Screen.getHeight() / 2 / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
				
				// 화면 밖으로 벗어난 스프라이트 제거
				for (let i = 0; i < pixiSprites.length; i += 1) {
					
					let pixiSprite = pixiSprites[i];
					
					if (
					pixiSprite.x + self.getX() < screenX - halfScreenWidth - (leftMargin + width + rightMargin) ||
					pixiSprite.y + self.getY() < screenY - halfScreenHeight - (topMargin + height + bottomMargin) ||
					pixiSprite.x + self.getX() > screenX + halfScreenWidth ||
					pixiSprite.y + self.getY() > screenY + halfScreenHeight) {
						self.removeFromPixiContainer(pixiSprite);
						pixiSprites.splice(i, 1);
						i -= 1;
					}
				}
				
				while (screenX - halfScreenWidth < _x + self.getX()) {
					_x -= leftMargin + width + rightMargin;
				}
				
				while (screenY - halfScreenHeight < _y + self.getY()) {
					_y -= topMargin + height + bottomMargin;
				}
				
				while (_y + self.getY() < screenY + halfScreenHeight) {
					
					let _x2 = _x;
					
					while (_x2 + self.getX() < screenX + halfScreenWidth) {
						
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
							
							pixiSprite.x = _x2;
							pixiSprite.y = _y;
							pixiSprite.zIndex = -9999999;
							
							pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
							
							pixiSprites.push(pixiSprite);
							
							self.addToPixiContainer(pixiSprite);
						}
						
						_x2 += leftMargin + width + rightMargin;
					}
					
					_y += topMargin + height + bottomMargin;
				}
			}
		};
		
		img.onload = () => {
			
			img.onload = undefined;
			
			if (self.checkIsRemoved() !== true) {
				
				width = img.width;
				height = img.height;
				
				if (isNotToRepeatX !== true && isNotToRepeatY !== true && leftMargin === 0 && rightMargin === 0 && topMargin === 0 && bottomMargin === 0) {
					
					let screenWidth = SkyEngine.Screen.getWidth() / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
					let screenHeight = SkyEngine.Screen.getHeight() / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
					
					pixiTilingSprite = new PIXI.extras.TilingSprite.fromImage(src, screenWidth, screenHeight);
					
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
				
				self.fireEvent('load');
			}
		};
		
		img.src = src;
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				origin(deltaTime);
				
				if (pixiTilingSprite !== undefined) {
					
					let screenWidth = SkyEngine.Screen.getWidth() / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
					let screenHeight = SkyEngine.Screen.getHeight() / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
					
					pixiTilingSprite.x = -self.getX() + (SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX()) / SkyEngine.Screen.getRealScaleX() / self.getRealScaleX();
					pixiTilingSprite.y = -self.getY() + (SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY()) / SkyEngine.Screen.getRealScaleY() / self.getRealScaleY();
					
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
				
				img.onload = undefined;
				img = undefined;
				
				pixiTilingSprite = undefined;
				pixiSprites = undefined;
				
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
});
