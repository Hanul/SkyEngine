# 영역 설정
노드에 충돌 영역 혹은 터치 영역을 설정할 수 있습니다.

```javascript

```

영역으로 사용될 수 있는 노드는 아래 도형 노드들에 한합니다.
* [직선 노드](Figure/Line.md)
* [사각형 노드](Figure/Rect.md)
* [원형 노드](Figure/Circle.md)
* [폴리곤 노드](Figure/Polygon.md)

## 충돌 영역 지정

```javascript
let node = SkyEngine.Node().appendTo(SkyEngine.Screen);

node.addCollider(SkyEngine.Circle({
	width : 50,
	height : 50
}));
```

## 터치 영역 지정

```javascript
let node = SkyEngine.Node().appendTo(SkyEngine.Screen);

node.addTouchArea(SkyEngine.Rect({
	width : 50,
	height : 50
}));
```