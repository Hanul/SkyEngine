
			
			let isFirst = true;
			
			let pixiFilter;
			
			let cachedFilter;
			let cachedPixiFilter;
			
			let step;
			OVERRIDE(self.step, (origin) => {
				
				step = self.step = (deltaTime) => {
					
					
					let filter = self.getFilter();
					
					if (pixiFilter === undefined && filter !== undefined) {
						
						if (filter === cachedFilter) {
							pixiFilter = cachedPixiFilter;
							
							pixiContainer.filters = [pixiFilter];
							
							filter = cachedFilter;
						}
						
						else if (filter.indexOf('grayscale(') !== -1) {
							pixiFilter = cachedPixiFilter = new PIXI.filters.ColorMatrixFilter();
							pixiFilter.desaturate(filter.substring(10, filter.indexOf('%')) / 100);
							
							pixiContainer.filters = [pixiFilter];
							
							cachedFilter = filter;
						}
						
						else if (filter.indexOf('saturate(') !== -1) {
							pixiFilter = cachedPixiFilter = new PIXI.filters.ColorMatrixFilter();
							pixiFilter.saturate(filter.substring(9, filter.indexOf(')')) / 100);
							
							pixiContainer.filters = [pixiFilter];
							
							cachedFilter = filter;
						}
					}
					
					if (pixiFilter !== undefined && filter === undefined) {
						pixiContainer.filters = TO_DELETE;
						pixiFilter = undefined;
					}
					
					if (centerPixiGraphics !== undefined) {
						centerPixiGraphics.x = self.getCenterX();
						centerPixiGraphics.y = self.getCenterY();
					}
					