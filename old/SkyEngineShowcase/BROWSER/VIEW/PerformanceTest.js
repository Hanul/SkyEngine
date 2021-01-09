SkyEngineShowcase.PerformanceTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let character = SkyEngine.Sprite({
			x : -500,
			srcs : [
				SkyEngineShowcase.R('robot/run1.png'),
				SkyEngineShowcase.R('robot/run2.png'),
				SkyEngineShowcase.R('robot/run3.png'),
				SkyEngineShowcase.R('robot/run4.png'),
				SkyEngineShowcase.R('robot/run5.png'),
				SkyEngineShowcase.R('robot/run6.png'),
				SkyEngineShowcase.R('robot/run7.png'),
				SkyEngineShowcase.R('robot/run8.png')
			],
			fps : 10,
			scale : 0.2,
			collider : SkyEngine.Rect({
				width : 200,
				height : 400
			})
		}).appendTo(SkyEngine.Screen);
		
		character.onMeet(SkyEngine.Sprite, () => {
			console.log('ATTACKED!');
		});
		
		let missiles = [];
		
		REPEAT(500, () => {
			
			let speedX = RANDOM({
				min : -100,
				max : 100
			});
			
			let speedY = RANDOM({
				min : -100,
				max : 100
			});
			
			missiles.push(SkyEngine.Sprite({
				src : SkyEngineShowcase.R('fireball.png'),
				spriteWidth : 512,
				spriteHeight : 197,
				fps : 24,
				scale : 0.2,
				speedX : speedX,
				speedY : speedY,
				angle : (360 + Math.round(180 * Math.atan2(-speedY, -speedX) / Math.PI)) % 360,
				collider : SkyEngine.Rect({
					width : 512,
					height : 197
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		inner.on('close', () => {
			character.remove();
			
			EACH(missiles, (missile) => {
				missile.remove();
			});
		});
	}
});
