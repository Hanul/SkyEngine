/*
 * 그라디언트 색상을 생성하는 클래스
 */
SkyEngine.Gradient = CLASS({
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.type
		//REQUIRED: params.startX
		//REQUIRED: params.startY
		//OPTIONAL: params.startRadius
		//REQUIRED: params.endX
		//REQUIRED: params.endY
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
		
		let generateContextGradient = self.generateContextGradient = (context) => {
			//REQUIRED: context
			
			let contextGradient;
			
			if (type === 'radial') {
				contextGradient = context.createRadialGradient(startX, startY, startRadius, endX, endY, endRadius);
			} else {
				contextGradient = context.createLinearGradient(startX, startY, endX, endY);
			}
			
			EACH(colors, (color, i) => {
				contextGradient.addColorStop(i / (colors.length - 1), color);
			});
			
			return contextGradient;
		};
	}
});
