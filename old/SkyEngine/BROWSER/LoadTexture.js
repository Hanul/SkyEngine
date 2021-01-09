/*
 * 텍스쳐를 불러오는 메소드
 */
SkyEngine.LoadTexture = METHOD({
		
	run : (src, callback) => {
		//REQUIRED: src
		//OPTIONAL: callback
		
		let texture = PIXI.utils.TextureCache[src];
		
		if (texture === undefined) {
			
			let retry = RAR(() => {
				
				let img = new Image();
				
				img.crossOrigin = 'anonymous';
				
				img.onload = () => {
					
					img.onload = undefined;
					
					if (PIXI.utils.TextureCache[src] !== undefined) {
						texture = PIXI.utils.TextureCache[src];
					}
					
					else {
						
						texture = new PIXI.Texture.from(img);
						
						PIXI.Texture.addToCache(texture, src);
					}
					
					if (callback !== undefined) {
						callback(texture);
					}
				};
				
				// 로드 오류 시 재시도
				img.onerror = () => {
					retry();
				};
				
				img.src = src;
			});
		}
		
		else if (callback !== undefined) {
			callback(texture);
		}
	}
});
