SkyEngineShowcase.StateSetTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let robot = SkyEngine.StateSet({
			stateNodes : {
				idle : SkyEngine.Sprite({
					srcs : [
						SkyEngineShowcase.R('robot/idle1.png'),
						SkyEngineShowcase.R('robot/idle2.png'),
						SkyEngineShowcase.R('robot/idle3.png'),
						SkyEngineShowcase.R('robot/idle4.png'),
						SkyEngineShowcase.R('robot/idle5.png'),
						SkyEngineShowcase.R('robot/idle6.png'),
						SkyEngineShowcase.R('robot/idle7.png'),
						SkyEngineShowcase.R('robot/idle8.png'),
						SkyEngineShowcase.R('robot/idle9.png'),
						SkyEngineShowcase.R('robot/idle10.png')
					],
					fps : 10,
					scale : 0.5
				}),
				run : SkyEngine.Sprite({
					srcs : [
						SkyEngineShowcase.R('robot/run1.png'),
						SkyEngineShowcase.R('robot/run2.png'),
						SkyEngineShowcase.R('robot/run3.png'),
						SkyEngineShowcase.R('robot/run4.png'),
						SkyEngineShowcase.R('robot/run5.png'),
						SkyEngineShowcase.R('robot/run6.png'),
						SkyEngineShowcase.R('robot/run7.png'),
						SkyEngineShowcase.R('robot/run8.png')
					],
					fps : 30,
					scale : 0.5
				}),
				attack : SkyEngine.Sprite({
					srcs : [
						SkyEngineShowcase.R('robot/attack1.png'),
						SkyEngineShowcase.R('robot/attack2.png'),
						SkyEngineShowcase.R('robot/attack3.png'),
						SkyEngineShowcase.R('robot/attack4.png'),
						SkyEngineShowcase.R('robot/attack5.png'),
						SkyEngineShowcase.R('robot/attack6.png'),
						SkyEngineShowcase.R('robot/attack7.png'),
						SkyEngineShowcase.R('robot/attack8.png')
					],
					fps : 30,
					scale : 0.5
				})
			},
			baseState : 'idle'
		}).appendTo(SkyEngine.Screen);
		
		let savedSpeedX;
		let savedState;
		
		// 키를 누를 때
		let keydownEvent = EVENT('keydown', (e) => {
			
			// 공격 모션
			if (robot.getState() !== 'attack' && e.getKey().toUpperCase() === 'A') {
				
				// 현재의 상태와 속도 저장
				savedSpeedX = robot.getSpeedX();
				savedState = robot.getState();
				
				// 이동 중지
				robot.setSpeedX(0);
				
				// 모션이 끝난 후에는 저장된 상태와 속도를 복구
				robot.setState('attack', () => {
					robot.setState(savedState);
					robot.setSpeedX(savedSpeedX);
				});
			}
			
			// 왼쪽으로 이동
			else if (e.getKey() === 'ArrowLeft') {
				
				// 왼쪽을 바라봄
				robot.setScaleX(-1);
				
				// 공격 중이면 상태 저장
				if (robot.getState() === 'attack') {
					savedState = 'run';
					savedSpeedX = -300;
				} else {
					robot.moveLeft(300);
					robot.setState('run');
				}
			}
			
			// 오른쪽으로 이동
			else if (e.getKey() === 'ArrowRight') {
				
				// 오른쪽을 바라봄
				robot.setScaleX(1);
				
				// 공격중이면 상태 저장
				if (robot.getState() === 'attack') {
					savedState = 'run';
					savedSpeedX = 300;
				} else {
					robot.moveRight(300);
					robot.setState('run');
				}
			}
		});
		
		// 키를 뗄 때
		let keyupEvent = EVENT('keyup', (e) => {
			
			// 왼쪽으로 이동 중지
			if (robot.getScaleX() === -1 && e.getKey() === 'ArrowLeft') {
				
				// 공격중이면 상태 저장
				if (robot.getState() === 'attack') {
					savedState = 'idle';
					savedSpeedX = 0;
				} else {
					robot.setState('idle');
					robot.stopLeft();
				}
			}
			
			// 오른쪽으로 이동 중지
			else if (robot.getScaleX() === 1 && e.getKey() === 'ArrowRight') {
				
				// 공격중이면 상태 저장
				if (robot.getState() === 'attack') {
					savedState = 'idle';
					savedSpeedX = 0;
				} else {
					robot.setState('idle');
					robot.stopRight();
				}
			}
		});
		
		inner.on('close', () => {
			robot.remove();
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
