/*
 * 이벤트 정보를 제공하는 객체를 생성하는 E 클래스
 */
SkyEngine.E = CLASS({
	
	preset : () => {
		return E;
	},

	init : (inner, self, e) => {
		//REQUIRED: e
		
		let stopDefault = self.stopDefault = () => {
			e.stopDefault();
		};

		let stopBubbling = self.stopBubbling = () => {
			e.stopBubbling();
		};
		
		let checkIsBubblingStoped = self.checkIsBubblingStoped = () => {
			return e.checkIsBubblingStoped();
		};

		let stop = self.stop = () => {
			e.stop();
		};

		let getX = self.getX = () => {
			return (e.getLeft() - WIN_WIDTH() / 2) / SkyEngine.Screen.getRatio();
		};

		let getY = self.getY = () => {
			return (e.getTop() - WIN_HEIGHT() / 2) / SkyEngine.Screen.getRatio();
		};

		let getKey = self.getKey = () => {
			return e.getKey();
		};
		
		let getWheelDelta = self.getWheelDelta = () => {
			return e.getWheelDelta();
		};
	}
});
