SkyEngineShowcase.GradientTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rect = SkyEngine.Rect({
			width : 300,
			height : 200,
			color : SkyEngine.Gradient({
				type : 'radial',
				startX : 0,
				startY : 0,
				startRadius : 0,
				endX : 0,
				endY : 500,
				endRadius : 640,
				colors : ['#000', '#fff']
			})
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			rect.remove();
		});
	}
});
