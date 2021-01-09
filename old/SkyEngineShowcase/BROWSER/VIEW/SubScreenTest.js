SkyEngineShowcase.SubScreenTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let subScreen = SkyEngine.SubScreen({
			style : {
				position : 'absolute',
				left : 100,
				top : 100,
				backgroundColor : '#333'
			},
			width : 400,
			height : 400
		}).appendTo(BODY);
		
		let line = SkyEngine.Line({
			y : -140,
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10,
			border : '5px solid #FF0000',
		}).appendTo(subScreen);
		
		let rect = SkyEngine.Rect({
			width : 300,
			height : 200,
			color : '#008000'
		}).appendTo(subScreen);
		
		let circle = SkyEngine.Circle({
			width : 300,
			height : 200,
			color : '#FFFF00'
		}).appendTo(subScreen);
		
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
		}).appendTo(subScreen);
		
		inner.on('close', () => {
			subScreen.remove();
		});
	}
});
