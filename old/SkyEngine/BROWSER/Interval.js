/*
 * 주어진 초 마다 함수를 반복해서 실행하는 클래스
 */
SkyEngine.Interval = CLASS((cls) => {
	
	let intervals = [];
	
	let step = cls.step = (deltaTime) => {
		for (let i = 0; i < intervals.length; i += 1) {
			intervals[i].step(deltaTime);
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
			let count = 0;
			
			let resume = self.resume = RAR(() => {
				
				if (CHECK_IS_IN({
					array : intervals,
					value : self
				}) !== true) {
					intervals.push(self);
				}
			});
			
			let pause = self.pause = () => {
				REMOVE({
					array : intervals,
					value : self
				});
			};
			
			let remove = self.remove = () => {
				pause();
			};
			
			let step = self.step = (deltaTime) => {
				afterTime += deltaTime;
				
				if (afterTime >= seconds) {
					afterTime -= seconds;
					
					count += 1;
					
					if (func(self, count) === false) {
						remove();
					}
				}
			};
		}
	};
});
