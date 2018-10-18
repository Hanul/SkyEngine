/*
 * 그라디언트 색상을 생성하는 클래스
 */
SkyEngine.Gradient = CLASS({
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.type
		//OPTIONAL: params.startX
		//OPTIONAL: params.startY
		//OPTIONAL: params.startRadius
		//OPTIONAL: params.endX
		//OPTIONAL: params.endY
		//OPTIONAL: params.endRadius
		//REQUIRED: params.colors
		
		let type = params.type;
		let startX = params.startX;
		let startY = params.startY;
		let startRadius = params.startRadius;
		let endX = params.endX;
		let endY = params.endY;
		let endRadius = params.endRadius;
		let colors = params.colors;
		
		if (startX === undefined) {
			startX = 0;
		}
		if (startY === undefined) {
			startY = 0;
		}
		if (endX === undefined) {
			endX = 0;
		}
		if (endY === undefined) {
			endY = 0;
		}
		
		let generateContextGradient = self.generateContextGradient = (context, baseX, baseY) => {
			//REQUIRED: context
			//REQUIRED: baseX
			//REQUIRED: baseY
			
			let contextGradient;
			
			if (type === 'radial') {
				contextGradient = context.createRadialGradient(baseX + startX, baseY + startY, startRadius, baseX + endX, baseY + endY, endRadius);
			} else {
				contextGradient = context.createLinearGradient(baseX + startX, baseY + startY, baseX + endX, baseY + endY);
			}
			
			EACH(colors, (color, i) => {
				contextGradient.addColorStop(i / (colors.length - 1), color);
			});
			
			return contextGradient;
		};
	}
});
