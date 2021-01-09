SkyEngineShowcase.HelloSkyEngine = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let image = SkyEngine.Image({
			src : SkyEngineShowcase.R('hello.png')
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			image.remove();
		});
	}
});
