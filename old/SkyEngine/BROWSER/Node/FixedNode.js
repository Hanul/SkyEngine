/*
 * 위치 고정 노드
 */
SkyEngine.FixedNode = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self, params) => {
		//OPTIONAL: params
		//OPTIONAL: params.followScreenRatio	스크린을 따라가는 비율을 지정합니다. 지정하지 않으면 스크린을 따라가지 않습니다.
		
		let followScreenRatio;
		
		if (params !== undefined) {
			followScreenRatio = params.followScreenRatio;
		}
		
		if (followScreenRatio === undefined) {
			followScreenRatio = 0;
		}
		
		let beforeScreenX = 0;
		let beforeScreenY = 0;
		
		let step;
		OVERRIDE(self.step, (origin) => {
			
			step = self.step = (deltaTime) => {
				
				if (followScreenRatio !== 1) {
					
					let screenX = SkyEngine.Screen.getCameraFollowX() - SkyEngine.Screen.getX();
					let screenY = SkyEngine.Screen.getCameraFollowY() - SkyEngine.Screen.getY();
					
					self.setX(self.getX() + (screenX - beforeScreenX) * (1 - followScreenRatio) / self.getRealScaleX());
					self.setY(self.getY() + (screenY - beforeScreenY) * (1 - followScreenRatio) / self.getRealScaleY());
					
					beforeScreenX = screenX;
					beforeScreenY = screenY;
				}
				
				origin(deltaTime);
			};
		});
	}
});
