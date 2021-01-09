# 상태 세트 노드
게임 캐릭터는 대기, 이동, 공격 등 여러가지 상태를 가질 수 있습니다. 상태 세트 노드를 사용하면 여러가지 상태들을 쉽게 관리할 수 있습니다.

![여러 상태들](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/StateSet/states.png)

```javascript
let robot = SkyEngine.StateSet({
	stateNodes : {
		idle : SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/idle1.png'),
				SkyEngineShowcase.R('robot/idle2.png')
			],
			fps : 10,
			scale : 0.5
		}),
		run : SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/run1.png'),
				SkyEngineShowcase.R('robot/run2.png'),
				SkyEngineShowcase.R('robot/run3.png'),
				SkyEngineShowcase.R('robot/run4.png')
			],
			fps : 30,
			scale : 0.5
		}),
		attack : SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/attack1.png'),
				SkyEngineShowcase.R('robot/attack2.png'),
				SkyEngineShowcase.R('robot/attack3.png')
			],
			fps : 30,
			scale : 0.5
		})
	},
	baseState : 'idle'
}).appendTo(SkyEngine.Screen);
```

사용 가능한 파라미터는 다음과 같습니다.
- `stateNodes` 상태 별 노드
- `baseState` 기본 상태 이름

상태 세트 노드에서 사용 가능한 함수들은 다음과 같습니다.
- `setStateNode({state:, node:})` 특정 상태의 노드를 지정합니다.
- `setState(state)` 상태를 지정합니다.
- `getState()` 현재 상태를 가져옵니다.

## 공격과 이동 예시
```javascript
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
```