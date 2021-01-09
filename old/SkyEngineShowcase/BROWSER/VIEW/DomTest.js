SkyEngineShowcase.DomTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let node = SkyEngine.Node({
			dom : DIV({
				c : 'test'
			})
		}).appendTo(SkyEngine.Screen);
		
		inner.on('close', () => {
			node.remove();
		});
	}
});
