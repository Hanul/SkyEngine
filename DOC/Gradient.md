# `SkyEngine.Gradient`
그라디언트 색상을 생성하는 클래스

아래와 같은 파라미터들을 사용할 수 있습니다.

- `type` 색상의 타입을 지정합니다. `linear`나 `radial`로 지정할 수 있습니다.
- `startX` 색상이 시작되는 `x` 좌표
- `startY` 색상이 시작되는 `y` 좌표
- `startRadius` 색상이 시작되는 반지름
- `endX` 색상이 끝나는 `x` 좌표
- `endY` 색상이 끝나는 `y` 좌표
- `endRadius` 색상이 끝나는 반지름
- `colors` 그라디언트를 이루는 색상들

![그라디언트](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Gradient/gradient.png)

```javascript
let rect = SkyEngine.Rect({
	width : 300,
	height : 200,
	color : SkyEngine.Gradient({
		type : 'radial',
		startX : 0,
		startY : 0,
		startRadius : 0,
		endX : 0,
		endY : 500,
		endRadius : 640,
		colors : ['#000', '#fff']
	})
}).appendTo(SkyEngine.Screen);
```