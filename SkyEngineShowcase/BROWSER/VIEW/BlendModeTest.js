SkyEngineShowcase.BlendModeTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rect = SkyEngine.Rect({
			width : 300,
			height : 200,
			color : '#0000FF'
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
		
		let circle = SkyEngine.Circle({
			width : 320,
			height : 220,
			color : '#FFFF00'
		}).appendTo(SkyEngine.Screen);
		
		circle.setBlendMode('multiply');
		
		inner.on('close', () => {
			
			rect.remove();
			character.remove();
			circle.remove();
		});
	}
});
