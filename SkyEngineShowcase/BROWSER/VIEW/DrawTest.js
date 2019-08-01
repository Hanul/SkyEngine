SkyEngineShowcase.DrawTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let line = SkyEngine.Line({
			y : -140,
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10,
			border : '5px solid #FF0000'
		}).appendTo(SkyEngine.Screen);
		
		let rect = SkyEngine.Rect({
			width : 300,
			height : 200,
			color : '#008000'
		}).appendTo(SkyEngine.Screen);
		
		let circle = SkyEngine.Circle({
			width : 300,
			height : 200,
			color : '#FFFF00'
		}).appendTo(SkyEngine.Screen);
		
		let character = SkyEngine.Sprite({
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
			scale : 0.2
		}).appendTo(SkyEngine.Screen);
		
		let sprite = SkyEngine.Sprite({
			src : SkyEngineShowcase.R('sprite.png'),
			frameCount : 16,
			spriteWidth : 128,
			spriteHeight : 128,
			fps : 10
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			line.remove();
			rect.remove();
			circle.remove();
			character.remove();
			sprite.remove();
		});
	}
});
