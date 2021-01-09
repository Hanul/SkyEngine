# 도형
도형 노드들을 사용하여 직선, 사각형, 원, 다각형을 생성할 수 있습니다. 이러한 도형 노드들은 [터치 영역 및 충돌 영역으로도 사용](#영역으로-사용되는-도형-노드들)될 수 있습니다.

![도형들](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/figures.png)

## 도형 노드 공통 파라미터
[노드의 파라미터](../Node.md#파라미터) 외에 모든 도형 노드들에서 공통으로 설정할 수 있는 파라미터 목록은 다음과 같습니다.

### `color`
도형의 색상을 설정할 수 있습니다.

![도형의 색상](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/color.png)

```javascript
// 빨간 원을 생성합니다.
let circle = SkyEngine.Circle({
	x : -100,
	width : 100,
	height : 100,
	color : '#ff0000'
}).appendTo(SkyEngine.Screen);

// 파란 사각형을 생성합니다.
let rect = SkyEngine.Rect({
	x : 100,
	width : 100,
	height : 100,
	color : '#0000ff'
}).appendTo(SkyEngine.Screen);
```

### `border`
도형의 테두리를 설정할 수 있습니다. `두께 모양 색상` 순서대로 문자열로 지정합니다.

![도형의 테두리](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/border.png)

```javascript
// 빨간 테두리의 원을 생성합니다.
let circle = SkyEngine.Circle({
	x : -100,
	width : 100,
	height : 100,
	border : '5px solid #ff0000'
}).appendTo(SkyEngine.Screen);

// 파란 점선 테두리의 사각형을 생성합니다.
let rect = SkyEngine.Rect({
	x : 100,
	width : 100,
	height : 100,
	border : '5px solid #0000ff'
}).appendTo(SkyEngine.Screen);
```

## 직선 노드
직선을 생성합니다.

![직선](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/line.png)

```javascript
let line = SkyEngine.Line({
	startX : -100,
	startY : -10,
	endX : 100,
	endY : 10,
	border : '5px solid red'
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#도형-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `startX` 직선의 시작 x 좌표
- `startY` 직선의 시작 y 좌표
- `endX` 직선의 끝 x 좌표
- `endY` 직선의 끝 Y 좌표
- `isEndless` `true`로 지정하면 양 끝이 무한인 직선을 생성합니다.

## 사각형 노드
사각형을 생성합니다.

![사각형](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/rect.png)

```javascript
let rect = SkyEngine.Rect({
    width : 100,
    height : 100,
	color : 'blue'
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#도형-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `width` 사각형의 너비
- `height` 사각형의 높이

## 원 노드
원을 생성합니다.

![원](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/circle.png)

```javascript
let circle = SkyEngine.Circle({
    width : 100,
    height : 100,
	color : 'blue'
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#도형-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `width` 원의 너비
- `height` 원의 높이

## 다각형 노드
다각형을 생성합니다.

![다각형](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/polygon.png)

```javascript
let polygon = SkyEngine.Polygon({
    points : [{
    	x : -30,
    	y : 50
    }, {
    	x : 50,
    	y : 40
    }, {
    	x : 20,
    	y : -50
    }],
	color : 'blue'
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#도형-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `points` 다각형을 이루는 점들의 좌표들

## 영역으로 사용되는 도형 노드들
도형 노드들은 터치 영역 및 충돌 영역으로도 사용될 수 있습니다.

![영역](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Figure/area.png)

```javascript
let ball = SkyEngine.Image({
	x : -100,
	speedX : 100,
	src : Sample.R('ball.png'),
	collider : SkyEngine.Circle({
		width : 99,
		height : 96
	})
}).appendTo(SkyEngine.Screen);

let box = SkyEngine.Image({
	x : 100,
	src : Sample.R('box.png'),
	scale : 0.3,
	collider : SkyEngine.Rect({
		width : 512,
		height : 512
	})
}).appendTo(SkyEngine.Screen);

ball.onMeet(box, () => {
	console.log('공이 박스에 부딫혔습니다.');
	ball.stopRight();
});
```