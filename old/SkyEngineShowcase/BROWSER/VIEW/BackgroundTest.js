SkyEngineShowcase.BackgroundTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let background = SkyEngine.Background({
			speedX : 100,
			src : SkyEngineShowcase.R('cloud.png'),
			leftMargin : 100,
			rightMargin : 100,
			topMargin : 100,
			bottomMargin : 100
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			
			background.remove();
		});
	}
});
