# 서브스크린 노드
`SkyEngine.SubScreen`

화면의 특정 부분에 작게 스크린을 생성하고자 할 때 사용합니다.

기본적으로 [스크린 노드](Screen.md)와 유사하나, 툴 개발 등에 사용됩니다.

또한 [스크린 노드](Screen.md) 대비 몇 가지 제한사항이 있습니다.

- [FixedNode](FixedNode.md) 및 [Background](Image.md#배경-노드) 사용 불가
- 모든 노드의 `checkCollision` 및 `checkOffScreen` 함수 사용 불가
- DOM 추가 불가
- 화면이 커질수록 성능을 많이 필요로하므로, **모바일 환경에서는 가급적 사용하지 마시기 바랍니다.**

[스크린 노드](Screen.md)에는 있으나, 서브스크린 노드에는 없는 함수 목록은 다음과 같습니다.

- `findNodesByClass(cls)`

```javascript
let subScreen = SkyEngine.SubScreen({
	style : {
		position : 'absolute',
		left : 100,
		top : 100,
		backgroundColor : '#333'
	},
	width : 400,
	height : 400
}).appendTo(BODY);

let line = SkyEngine.Line({
	y : -140,
	startX : -100,
	startY : -10,
	endX : 100,
	endY : 10,
	border : '5px solid #FF0000',
}).appendTo(subScreen);

let rect = SkyEngine.Rect({
	width : 300,
	height : 200,
	color : '#008000'
}).appendTo(subScreen);

let circle = SkyEngine.Circle({
	width : 300,
	height : 200,
	color : '#FFFF00'
}).appendTo(subScreen);

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
	scale : 0.2
}).appendTo(subScreen);
```