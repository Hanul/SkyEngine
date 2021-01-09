/*
 * 주어진 초가 흐른 뒤에 함수를 실행하는 클래스
 */
SkyEngine.Delay = CLASS((cls) => {
	
	let delays = [];
	
	let step = cls.step = (deltaTime) => {
		for (let i = 0; i < delays.length; i += 1) {
			delays[i].step(deltaTime);
		}
	};
	
	return {
	
		init : (inner, self, seconds, func) => {
			//REQUIRED: seconds
			//OPTIONAL: func
	
			if (func === undefined) {
				func = seconds;
				seconds = 0;
			}
			
			let afterTime = 0;
			
			let resume = self.resume = RAR(() => {
				
				if (CHECK_IS_IN({
					array : delays,
					value : self
				}) !== true) {
					delays.push(self);
				}
			});
			
			let pause = self.pause = () => {
				REMOVE({
					array : delays,
					value : self
				});
			};
			
			let remove = self.remove = () => {
				pause();
			};
			
			let step = self.step = (deltaTime) => {
				afterTime += deltaTime;
				
				if (afterTime >= seconds) {
					func();
					remove();
				}
			};
		}
	};
});
