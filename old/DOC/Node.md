# 노드
```javascript
SkyEngine.Node({
	x : 30,
	y : -40,
	c : SkyEngine.Circle({
		width : 50,
		height : 60,
		color : 'yellow'
	})
}).appendTo(SkyEngine.Screen);
```

SkyEngine의 모든 구성요소는 노드입니다. 즉 SkyEngine을 기반으로 한 게임은 노드들의 집합이라 할 수 있습니다. 따라서 SkyEngine의 모든 구성요소는 `SkyEngine.Node`를 상속합니다.

`SkyEngine.Node`에는 움직임, 크기조절, 회전, 페이드 인/아웃 등 각종 기능들이 포함되어 있습니다.

## 목차
- [파라미터](#파라미터)
    - [위치 관련 파라미터](#위치-관련-파라미터)
    - [스케일 관련 파라미터](#스케일-관련-파라미터)
    - [회전 관련 파라미터](#회전-관련-파라미터)
    - [페이드 관련 파라미터](#페이드-관련-파라미터)
    - [그래픽 관련 파라미터](#그래픽-관련-파라미터)
    - [영역 관련 파라미터](#영역-관련-파라미터)
    - [이벤트 관련 파라미터](#이벤트-관련-파라미터)
    - [DOM 관련 파라미터](#dom-관련-파라미터)
    - [기타 파라미터](#기타-파라미터)
- [함수](#함수)
    - [파라미터 설정 함수](#파라미터-설정-함수)
    - [노드 관계 함수](#노드-관계-함수)
    - [이벤트 관련 함수](#이벤트-관련-함수)
    - [이동 관련 함수](#이동-관련-함수)
    - [회전 관련 함수](#회전-관련-함수)
    - [페이드 관련 함수](#페이드-관련-함수)
    - [필터 관련 함수](#필터-관련-함수)
    - [블렌드 모드 관련 함수](#블렌드-모드-관련-함수)
    - [기타 함수](#기타-함수)
- [이벤트](#이벤트)
- [필터](#필터)
- [블렌드 모드](#블렌드-모드)
- [노드 확장하기](#노드-확장하기)
- [내장 확장 노드](#내장-확장-노드)

## 파라미터
사용 가능한 파라미터는 다음과 같습니다.

### 위치 관련 파라미터
- `x` x 좌표
- `y` y 좌표
- `zIndex` 노드의 드로우 순서를 결정하기 위한 z 인덱스
- `speedX` x 좌표 이동 속도
- `speedY` y 좌표 이동 속도
- `accelX` x 좌표 이동 가속도
- `accelY` y 좌표 이동 가속도
- `minSpeedX` x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
- `minSpeedY` y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
- `maxSpeedX` x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
- `maxSpeedY` y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
- `toX` x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
- `toY` y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.

### 스케일 관련 파라미터
- `scale` 스케일
- `scaleX` x 스케일
- `scaleY` y 스케일
- `scalingSpeed` 스케일이 커지는 속도
- `scalingSpeedX` x 스케일이 커지는 속도
- `scalingSpeedY` y 스케일이 커지는 속도
- `scalingAccel` 스케일이 커지는 가속도
- `scalingAccelX` x 스케일이 커지는 가속도
- `scalingAccelY` y 스케일이 커지는 가속도
- `minScalingSpeed` 스케일이 커지는 최소 속도
- `minScalingSpeedX` x 스케일이 커지는 최소 속도
- `minScalingSpeedY` y 스케일이 커지는 최소 속도
- `maxScalingSpeed` 스케일이 커지는 최대 속도
- `maxScalingSpeedX` x 스케일이 커지는 최대 속도
- `maxScalingSpeedY` y 스케일이 커지는 최대 속도
- `toScale` 스케일이 커지는 목적지
- `toScaleX` x 스케일이 커지는 목적지
- `toScaleY` y 스케일이 커지는 목적지

### 회전 관련 파라미터
- `angle` 회전 각도
- `rotationSpeed` 회전 속도
- `rotationAccel` 회전 가속도
- `minRotationSpeed` 최소 회전 속도
- `maxRotationSpeed` 최대 회전 속도
- `toAngle` 회전 각도 목적지

### 페이드 관련 파라미터
- `alpha` 알파 값
- `fadingSpeed` 페이드 속도
- `fadingAccel` 페이드 가속도
- `minFadingSpeed` 최소 페이드 속도
- `maxFadingSpeed` 최대 페이드 속도
- `toAlpha` 페이드 알파 값 목적지

### 그래픽 관련 파라미터
- `filter` 필터
- `blendMode` 블렌드 모드

### 영역 관련 파라미터
- `collider` 충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다. 영역에 대한 자세한 내용은 [영역 설정 문서](Node/Area.md)를 참고해주시기 바랍니다.
- `touchArea` 터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다. 영역에 대한 자세한 내용은 [영역 설정 문서](Node/Area.md)를 참고해주시기 바랍니다.

### 이벤트 관련 파라미터
- `on` 이벤트. 이벤트에 대한 자세한 내용은 [이벤트 항목](#이벤트)을 참고해주시기 바랍니다.
- `onDisplayResize` 화면 크기가 변경될 때 실행되는 함수를 지정할 수 있습니다. 자세한 내용은 [이벤트 항목](#이벤트)을 참고해주시기 바랍니다.

### DOM 관련 파라미터
- `dom` 노드를 따라다니는 [DOM 객체](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#dom-객체-생성)를 지정할 수 있습니다. 노드의 크기가 변경되거나, 움직이거나, 회전하여도 똑같이 반영됩니다.
- `domStyle` `dom`으로 지정한 [DOM 객체](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#dom-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1)의 스타일을 지정합니다.

### 기타 파라미터
- `c` 자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
- `isToCheckCollision` `true`로 지정하면 [최대 충돌 계산 크기 설정](Configuration.md#최대-충돌-계산-크기)에 관계없이 해당 노드는 충돌 계산을 하게끔 강제합니다.
- `isY2ZIndex` `true`로 지정하면 y값이 변경되는 것을 감지하여 z 인덱스에 반영합니다.

## 함수
노드에서 사용 가능한 함수들은 다음과 같습니다.

### 파라미터 설정 함수
이하 파라미터 설정 함수들은 노드 생성 이후 파라미터를 새로 지정하고자 할 때 사용합니다.
```javascript
let circle = SkyEngine.Circle({
	width : 50,
	height : 60,
	color : 'yellow'
}).appendTo(SkyEngine.Screen);

// 위치 지정
circle.setPosition({
    x : 100
    y : 200
});
```

#### [위치 관련 파라미터](#위치-관련-파라미터) 설정 함수
- `setX(x)`
- `getX()`
- `setY(y)`
- `getY()`
- `setZ(z)`
- `getZ()`
- `setPosition({x:, y:, zIndex:})` x, y, zIndex를 한번에 지정합니다.
- `setSpeedX(speedX)`
- `getSpeedX()`
- `setSpeedY(speedY)`
- `getSpeedY()`
- `setAccelX(accelX)`
- `getAccelX()`
- `setAccelY(accelY)`
- `getAccelY()`
- `setMinSpeedX(minSpeedX)`
- `getMinSpeedX()`
- `setMinSpeedY(minSpeedY)`
- `getMinSpeedY()`
- `setMaxSpeedX(maxSpeedX)`
- `getMaxSpeedX()`
- `setMaxSpeedY(maxSpeedY)`
- `getMaxSpeedY()`
- `setToX(toX)`
- `getToX()`
- `setToY(toY)`
- `getToY()`

#### [스케일 관련 파라미터](#스케일-관련-파라미터) 설정 함수
- `setScaleX(scaleX)`
- `getScaleX()`
- `setScaleY(scaleY)`
- `getScaleY()`
- `setScale(scale)` x 스케일과 y 스케일을 동시에 설정합니다.
- `setScalingSpeedX(scalingSpeedX)`
- `getScalingSpeedX()`
- `setScalingSpeedY(scalingSpeedY)`
- `getScalingSpeedY()` x 스케일과 y 스케일이 커지는 속도를 동시에 설정합니다.
- `setScalingSpeed(scalingSpeed)`
- `setScalingAccelX(scalingAccelX)`
- `getScalingAccelX()`
- `setScalingAccelY(scalingAccelY)`
- `getScalingAccelY()`
- `setScalingAccel(scalingAccel)` x 스케일과 y 스케일이 커지는 가속도를 동시에 설정합니다.
- `setMinScalingSpeedX(minScalingSpeedX)`
- `getMinScalingSpeedX()`
- `setMinScalingSpeedY(minScalingSpeedY)`
- `getMinScalingSpeedY()`
- `setMinScalingSpeed(minScalingSpeed)` x 스케일과 y 스케일이 커지는 최소 속도를 동시에 설정합니다.
- `setMaxScalingSpeedX(maxScalingSpeedX)`
- `getMaxScalingSpeedX()`
- `setMaxScalingSpeedY(maxScalingSpeedY)`
- `getMaxScalingSpeedY()`
- `setMaxScalingSpeed(maxScalingSpeed)` x 스케일과 y 스케일이 커지는 최대 속도를 동시에 설정합니다.
- `setToScaleX(toScaleX)`
- `getToScaleX()`
- `setToScaleY(toScaleY)`
- `getToScaleY()`
- `setToScale(toScale)` x 스케일과 y 스케일의 목적지를 동시에 설정합니다.

#### [회전 관련 파라미터](#회전-관련-파라미터) 설정 함수
- `setAngle(angle)`
- `getAngle()`
- `setRotationSpeed(rotationSpeed)`
- `getRotationSpeed()`
- `setRotationAccel(rotationAccel)`
- `getRotationAccel()`
- `setMinRotationSpeed(minRotationSpeed)`
- `getMinRotationSpeed()`
- `setMaxRotationSpeed(maxRotationSpeed)`
- `getMaxRotationSpeed()`
- `setToAngle(toAngle)`
- `getToAngle()`

#### [페이드 관련 파라미터](#페이드-관련-파라미터) 설정 함수
- `setAlpha(alpha)`
- `getAlpha()`
- `setFadingSpeed(fadingSpeed)`
- `getFadingSpeed()`
- `setFadingAccel(fadingAccel)`
- `getFadingAccel()`
- `setMinFadingSpeed(minFadingSpeed)`
- `getMinFadingSpeed()`
- `setMaxFadingSpeed(maxFadingSpeed)`
- `getMaxFadingSpeed()`
- `setToAlpha(toAlpha)`
- `getToAlpha()`

### 노드 관계 함수
노드 트리를 구성하는데 사용되는 함수들입니다.
- `append(node)` 주어진 노드를 자식 노드로 추가합니다.
- `appendTo(node)` 주어진 노드의 자식 노드로 추가됩니다.
- `getParent()` 부모 노드를 가져옵니다.
- `getChildren()` 자식 노드 배열을 가져옵니다.
- `remove()` 노드를 삭제합니다.
- `checkIsRemoved()` 삭제된 노드인지 확인합니다.

### 영역 관련 함수
- `addTouchArea(touchArea)` 터치 영역을 추가합니다.
- `getTouchAreas()` 터치 영역 배열을 가져옵니다.
- `getTouchArea()` 터치 영역 하나를 가져옵니다.
- `addCollider(collider)` 충돌 영역을 추가합니다.
- `getColliders()` 충돌 영역 배열을 가져옵니다.
- `getCollider()` 충돌 영역 하나를 가져옵니다.

### 이벤트 관련 함수
이벤트에 대한 자세한 내용은 [이벤트 항목](#이벤트)을 참고해주시기 바랍니다.
- `on(eventName, eventHandler)` 이벤트를 등록합니다.
- `off(eventName, eventHandler)` 등록된 이벤트를 해제합니다.
- `fireEvent(eventName)` 이벤트를 강제로 발생시킵니다.
- `onMeet(target, handler)`  `target` 노드와 만나면 발생하는 이벤트를 등록합니다.
- `offMeet(target, handler)` `onMeet`으로 등록한 이벤트를 해제합니다.
- `onPart(target, handler)` `target` 노드에서 떨어지면 발생하는 이벤트를 등록합니다.
- `offPart(target, handler)` `onPart`로 등록한 이벤트를 해제합니다.

### 이동 관련 함수
- `moveLeft(speed)` `moveLeft({speed:, accel:, maxSpeed:}, moveEndHandler)` 왼쪽으로 이동합니다.
- `stopLeft()` `stopLeft(accel)` 왼쪽으로의 이동을 멈춥니다. `accel`을 지정하면 가속도에 따라 서서히 멈추게 할 수 있습니다.
- `moveRight(speed)` `moveRight({speed:, accel:, maxSpeed:}, moveEndHandler)` 오른쪽으로 이동합니다.
- `stopRight()` `stopRight(accel)` 오른쪽으로의 이동을 멈춥니다. `accel`을 지정하면 가속도에 따라 서서히 멈추게 할 수 있습니다.
- `moveUp(speed)` `moveUp({speed:, accel:, maxSpeed:}, moveEndHandler)` 위로 이동합니다.
- `stopUp()` `stopUp(accel)` 위로의 이동을 멈춥니다. `accel`을 지정하면 가속도에 따라 서서히 멈추게 할 수 있습니다.
- `moveDown(speed)` `moveDown({speed:, accel:, maxSpeed:}, moveEndHandler)` 아래로 이동합니다.
- `stopDown()` `stopDown(accel)` 아래로의 이동을 멈춥니다. `accel`을 지정하면 가속도에 따라 서서히 멈추게 할 수 있습니다.
- `moveTo({toX:, toY:, speed:, accel:, maxSpeed:}, moveEndHandler)` 특정 위치로 이동합니다.
- `stuckLeft()` 왼쪽으로의 이동을 차단합니다. (내부적으로 속도와 가속도를 유지합니다.)
- `unstuckLeft()` 왼쪽 이동의 차단을 해제합니다.
- `stuckRight()` 오른쪽으로의 이동을 차단합니다. (내부적으로 속도와 가속도를 유지합니다.)
- `unstuckRight()` 오른쪽 이동의 차단을 해제합니다.
- `stuckUp()` 위로의 이동을 차단합니다. (내부적으로 속도와 가속도를 유지합니다.)
- `unstuckUp()` 위로 이동의 차단을 해제합니다.
- `stuckDown()` 아래로의 이동을 차단합니다. (내부적으로 속도와 가속도를 유지합니다.)
- `unstuckDown()` 아래로 이동의 차단을 해제합니다.

### 회전 관련 함수
- `rotate(speed)` `rotate({speed:, accel:, maxSpeed:})` 노드를 회전시킵니다.
- `stopRotation()` `stopRotation(accel)` 회전을 멈춥니다.
- `rotateTo({toAngle:, speed:, accel:, minSpeed:, maxSpeed:})` 특정 각도까지 회전합니다.

### 페이드 관련 함수
- `fadeIn(speed)` `fadeIn({speed:, accel:, maxSpeed:})` 노드가 서서히 나타납니다.
- `fadeOut(speed)` `fadeOut({speed:, accel:, maxSpeed:})` 노드가 서서히 사라잡니다.
- `stopFading()` `stopFading(accel)` 페이드를 중지합니다.
- `fadeTo({toAlpha:, accel:, minSpeed:, maxSpeed:})` 특정 알파 값 까지 페이드합니다.

### 필터 관련 함수
필터에 대한 자세한 내용은 [필터 항목](#필터)을 참고해주시기 바랍니다.
- `setFilter(filter)` 노드에 필터를 적용합니다.
- `getFilter()` `setFilter`로 지정한 값을 가져옵니다.
- `removeFilter()` 필터를 제거합니다.

### 블렌드 모드 관련 함수
블렌드 모드에 대한 자세한 내용은 [블렌드 모드 항목](#블렌드-모드)을 참고해주시기 바랍니다.
- `setBlendMode(blendMode)` 노드에 블렌드 모드를 적용합니다.
- `getBlendMode()` `setBlendMode`로 지정한 값을 가져옵니다.
- `removeBlendMode()` 블렌드 모드를 제거합니다.

### 기타 함수
- `hide()` 노드를 숨깁니다.
- `show()` 숨겨진 노드를 다시 보입니다.
- `checkIsHiding()` 노드가 숨겨져 있는지 확인합니다.
- `flipX()` 노드를 x축으로 반전시킵니다.
- `flipY()` 노드를 y축으로 반전시킵니다.
- `pause()` 노드의 모든 변화를 일시정지합니다. 참고로, `SkyEngine.Screen`를 `pause`한 경우, `SkyEngine.Delay` 및 `SkyEngine.Interval` 또한 일시정지 됩니다.
- `checkIsPaused()` 노드가 일시정지 되었는지 확인합니다.
- `resume()` 일시정지를 해제합니다.
- `addDom(dom)` [DOM 객체](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#dom-객체-생성)를 노드에 추가합니다. 
- `delay(seconds, func)` 주어진 초가 흐른 뒤에 함수를 실행합니다. 중간에 노드가 삭제되면 실행되지 않습니다.
- `interval(seconds, func)` 주어진 초 마다 함수를 반복해서 실행합니다. 중간에 노드가 삭제되면 실행되지 않습니다.

## 이벤트
노드에 이벤트를 등록합니다.

### `on(eventName, eventHandler)`

```javascript
let rect = SkyEngine.Rect({
	width : 60,
	height : 40,
	color : '#008000',
	touchArea : SkyEngine.Rect({
		width : 60,
		height : 40
	})
}).appendTo(SkyEngine.Screen);

// 사각형을 터치합니다.
rect.on('tap', (e) => {
	console.log('This is Rect! (' + e.getX() + ', ' + e.getY() + ')');
});
```

- `'tap'` 노드를 터치했을 때
- `'touchstart'` 노드에 손을 댈 때
- `'touchend'` 노드에서 손을 뗐을 때
- `'offscreen'` 노드가 화면을 벗어날 때
- `'nextstep'` 다음 프레임으로 넘어갈 때
- `'move'` 노드가 움직일 때
- `'remove'` 노드가 삭제될 때

`on`으로 등록한 이벤트는 `off` 함수로 제거할 수 있습니다.

### `onMeet(target, eventHandler)`
특정 노드와 만날 때 발생하는 이벤트를 등록합니다.

```javascript
hero.onMeet(Game.Enemy, () => {
	// die.
});
```

`onMeet`으로 등록한 이벤트는 `offMeet` 함수로 제거할 수 있습니다.

### `onPart(target, eventHandler)`
특정 노드로부터 떨어질 때 발생하는 이벤트를 등록합니다.

`onPart`로 등록한 이벤트는 `offPart` 함수로 제거할 수 있습니다.

### `onDisplayResize`
브라우저의 화면 크기가 변경될 때 발생하는 이벤트를 등록합니다. [UPPERCASE의 `onDisplayResize`](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER/STYLE-LIST.md#%ED%81%AC%EA%B8%B0-%EA%B4%80%EB%A0%A8)와 사용 방법이 비슷합니다.

```javascript
let rect = SkyEngine.Rect({
	color : '#008000',
	onDisplayResize : (width, height) => {
		
		// 사각형의 크기를 화면의 1/10으로 지정
		return {
			width : width / 10,
			height : height / 10
		};
	}
}).appendTo(SkyEngine.Screen);
```

## 필터
노드에 블러 효과나 흑백 효과와 같은 그래픽 필터를 적용시킬 수 있습니다. 아래 목록에 해당하는 필터를 적용할 수 있습니다.

- `'blur(<length>px)'`
- `'brightness(<percentage>%)'`
- `'contrast(<percentage>%)'`
- `'drop-shadow(<offset-x>px <offset-y>px <blur-radius>px #<color>)'`
- `'grayscale(<percentage>%)'`
- `'hue-rotate(<degree>deg)'`
- `'saturate(<percentage>%)'`

![필터](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/filter.png)

```javascript
let rect = SkyEngine.Rect({
	width : 300,
	height : 200,
	color : '#00CC66'
}).appendTo(SkyEngine.Screen);

let circle = SkyEngine.Circle({
	width : 300,
	height : 200,
	color : '#FFCC33'
}).appendTo(SkyEngine.Screen);

let character = SkyEngine.Sprite({
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
	fps : 10,
	scale : 0.2,
	dom : DIV({
		style : {
			color : 'red',
			fontSize : 300
		},
		c : 'Test'
	})
}).appendTo(SkyEngine.Screen);

SkyEngine.Screen.setFilter('grayscale(100%)');
```

## 블렌드 모드
기존의 도형 뒤에 새로운 도형을 그리거나, 도형의 일정한 영역을 보이지 않도록 하는 등의 효과를 위해 아래 목록에 해당하는 블렌드 모드를 적용할 수 있습니다.

- `'multiply'`
- `'screen'`
- `'overlay'`

![블렌드 모드](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/blendmode.png)

```javascript
let rect = SkyEngine.Rect({
	width : 300,
	height : 200,
	color : '#0000FF'
}).appendTo(SkyEngine.Screen);

let circle = SkyEngine.Circle({
	width : 320,
	height : 220,
	color : '#FFFF00'
}).appendTo(SkyEngine.Screen);

circle.setBlendMode('multiply');
```

## 노드 확장하기
[UPPERCASE의 상속 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/OOP.md#%EC%83%81%EC%86%8D)을 사용하여 노드를 확장시킬 수 있습니다.

```javascript
Game.Hero = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.hp
		//REQUIRED: params.damage
		
		let hp = params.hp;
		let damage = params.damage;
		
		self.append(SkyEngine.Image({
			src : Game.R('hero.png')
		}));
		
		self.addCollider(SkyEngine.Rect({
			y : 15,
			width : 40,
			height : 60
		}));
		
		self.onMeet(Game.Enemy, () => {
			// die.
		});
		
		...
	}
});
```

## 내장 확장 노드
SkyEngine에서 자체적으로 지원하는 확장 노드의 종류는 다음과 같습니다.

### [스크린 노드](Node/Screen.md)
게임 화면 전체를 다루는 노드입니다. 오로지 하나만 존재할 수 있으며 모든 노드는 스크린 노드의 하위 노드로 구성됩니다.

### [위치 고정 노드](Node/FixedNode.md)
스크린 노드의 위치와 관계 없이 고정된 위치를 유지하는 노드입니다. 배경이나 UI를 추가할 때 유용하게 사용할 수 있습니다.

### [도형](Node/Figure.md)
* [직선 노드](Node/Figure.md#직선-노드)
* [사각형 노드](Node/Figure.md#사각형-노드)
* [원 노드](Node/Figure.md#원-노드)
* [다각형 노드](Node/Figure.md#다각형-노드)

### [이미지](Node/Image.md)
* [이미지 노드](Node/Image.md#이미지-노드)
* [스프라이트 애니메이션 노드](Node/Image.md#스프라이트-애니메이션-노드)
* [실루엣 노드](Node/Image.md#실루엣-노드)
* [배경 노드](Node/Image.md#배경-노드)

### [상태 세트 노드](Node/StateSet.md)

### [타일 시스템](Node/TileSystem.md)
* [타일 노드](Node/TileSystem.md#타일-노드)
* [충돌 타일 노드](Node/TileSystem.md#충돌-타일-노드)
* [타일맵 노드](Node/TileSystem.md#타일-맵)
* [아이소메트릭 타일맵 노드](Node/TileSystem.md#아이소메트릭-타일맵-노드)
* [헥사곤 타일맵 노드](Node/TileSystem.md#헥사곤-타일맵-노드)

### [파티클 시스템](Node/ParticleSystem.md)
* [파티클 시스템 노드](Node/ParticleSystem.md#파티클-시스템-노드)
* [일회성 파티클 시스템 노드](Node/ParticleSystem.md#일회성-파티클-시스템-노드)
