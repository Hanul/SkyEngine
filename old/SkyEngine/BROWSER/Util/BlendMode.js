SkyEngine('Util').BlendMode = OBJECT({

	init : (inner, self) => {
		
		let getPixiBlendMode = self.getPixiBlendMode = (blendMode) => {
			//REQUIRED: blendMode
			
			if (blendMode === 'multiply') {
				return PIXI.BLEND_MODES.MULTIPLY;
			} else if (blendMode === 'screen') {
				return PIXI.BLEND_MODES.SCREEN;
			} else if (blendMode === 'overlay') {
				return PIXI.BLEND_MODES.OVERLAY;
			}
			
			return PIXI.BLEND_MODES.NORMAL;
		};
	}
});
