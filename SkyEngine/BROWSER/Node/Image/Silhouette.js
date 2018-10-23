/*
 * 실루엣 노드
 */
SkyEngine.Silhouette = CLASS((cls) => {
	
	const TRANSPARENT_ALPHA = 20;
	
	return {
		
		preset : () => {
			return SkyEngine.Node;
		},
		
		init : (inner, self, params) => {
			//REQUIRED: params
			//REQUIRED: params.src
			//OPTIONAL: params.color
			//OPTIONAL: params.border
			//OPTIONAL: params.width
			//OPTIONAL: params.height
			
			let src = params.src;
			let color = params.color;
			let border = params.border;
			let width = params.width;
			let height = params.height;
			
			let checkRectRect = SkyEngine.Util.Collision.checkRectRect;
			
			let borderPixel;
			let borderStyle;
			let borderColor;
			
			if (border !== undefined) {
				let split = border.split(' ');
				borderPixel = INTEGER(split[0]);
				borderStyle = split[1];
				borderColor = split[2];
			}
			
			let img;
			let imageData;
			
			let pixiSprite;
			
			let setSrc = self.setSrc = (_src) => {
				src = _src;
				
				img = new Image();
				
				img.onload = () => {
					
					img.onload = undefined;
					
					if (self.checkIsRemoved() !== true) {
						
						if (width === undefined) {
							width = img.width;
						}
						if (height === undefined) {
							height = img.height;
						}
						
						let imageCanvas = CANVAS({
							style : {
								display : 'none'
							},
							width : width,
							height : height
						}).appendTo(BODY);
						
						let imageContext = imageCanvas.getContext('2d');
						
						imageContext.save();
						
						imageContext.drawImage(img, 0, 0, img.width, img.height);
						
						let imgData = imageContext.getImageData(0, 0, width, height);
						imageData = imgData.data;
						
						let i, length = imageData.length;
						for (i = 0; i < length; i += 4){
							imageData[i] = 0;
							imageData[i + 1] = 0;
							imageData[i + 2] = 0;
						}
						
						imageContext.clearRect(0, 0, width, height);
						
						if (color !== undefined) {
							
							imageContext.putImageData(imgData, 0, 0);
							imageContext.globalCompositeOperation = 'source-in';
							
							imageContext.rect(0, 0, width, height);
							imageContext.fillStyle = color;
							imageContext.fill();
						}
						
						imageContext.restore();
						
						if (border !== undefined) {
							
							let polygonPoints = SkyEngine.Util.ImageData.convertImageDataToPolygonPoints(imageData, width);
							
							if (polygonPoints.length > 0) {
								
								imageContext.beginPath();
								imageContext.moveTo(polygonPoints[0].x, polygonPoints[0].y);
								
								for (let i = 1; i < polygonPoints.length; i += 1) {
									let point = polygonPoints[i];
									imageContext.lineTo(point.x, point.y);
								}
								
								imageContext.lineTo(polygonPoints[0].x, polygonPoints[0].y);
								
								imageContext.lineWidth = borderPixel;
								imageContext.strokeStyle = borderColor;
								
								if (borderStyle === 'dashed') {
									imageContext.setLineDash([5]);
								} else if (borderStyle === 'dotted') {
									imageContext.setLineDash([2]);
								}
								
								imageContext.stroke();
								imageContext.closePath();
							}
							
							polygonPoints = undefined;
						}
						
						img.src = imageCanvas.getEl().toDataURL();
						
						// clear.
						imgData = undefined;
						imageContext = undefined;
						imageCanvas.remove();
						
						pixiSprite = new PIXI.Sprite.from(img);
						
						pixiSprite.anchor.x = 0.5;
						pixiSprite.anchor.y = 0.5;
						
						pixiSprite.zIndex = -9999999;
						
						pixiSprite.blendMode = SkyEngine.Util.BlendMode.getPixiBlendMode(self.getBlendMode());
						
						self.addToPixiContainer(pixiSprite);
						
						self.fireEvent('load');
					}
				};
				
				img.src = src;
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
