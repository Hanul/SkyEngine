# 스크린 노드
`SkyEngine.Screen`

게임 화면 전체를 다루는 노드입니다. 모든 노드는 스크린 노드의 하위 노드로 구성됩니다.

```javascript
let someNode = SkyEngine.Node(...).appendTo(SkyEngine.Screen);
```

따라서 스크린 노드를 `pause` 함수로 일시정지 시키면, 게임 전체가 일시정지 됩니다.

## 화면 이동 관련 함수
화면이 주인공 캐릭터를 따라다녀야 하는 경우와 같이, 화면이 특정 노드를 따라다니게 할 때 사용하는 함수들입니다.

```javascript
// 플랫포머 게임의 경우
SkyEngine.Screen.cameraFollowX({
	target : player,
	minX : 0,
	maxX : mapWidth
});
```

```javascript
// 세로형 레이싱 게임의 경우
SkyEngine.Screen.cameraFollowY({
	target : car,
	centerY : 300
});
```

- `cameraFollow({target:})` `cameraFollow({target:, centerX:, centerY:, minX:, minY:, maxX:, maxY:})` 화면이 특정 노드를 따라 움직입니다.
- `cameraFollowX({target:})` `cameraFollowX({target:, centerX:, minX:, maxX:})` 화면이 특정 노드들 x축에 따라 움직입니다.
- `cameraFollowY({target:})` `cameraFollowY({target:, centerY:, minY:, maxY:})` 화면이 특정 노드들 y축에 따라 움직입니다.
- `cameraUnfollow()` 화면이 더 이상 특정 노드를 따라다니지 않습니다.
- `cameraUnfollowX()` 화면이 x축으로 더 이상 특정 노드를 따라다니지 않습니다.
- `cameraUnfollowY()` 화면이 y축으로 더 이상 특정 노드를 따라다니지 않습니다.
- `getCameraFollowingX()` 화면이 특정 노드를 따라다니는 경우 x축으로 얼마나 이동했는지 가져옵니다.
- `getCameraFollowingY()`  화면이 특정 노드를 따라다니는 경우 y축으로 얼마나 이동했는지 가져옵니다.

## 기타 함수
- `findNodesByClass(cls)` 특정 클래스의 노드들을 가져옵니다.
- `getNonePausableNode()` 스크린 노드가 일시정지 되어도, 덩달아 일시정지 되지 않고 움직이는 노드를 가져옵니다.
- `getLeftLetterbox()` 왼쪽 레터박스 DOM을 가져옵니다.
- `getRightLetterbox()` 오른쪽 레터박스 DOM을 가져옵니다.
- `getTopLetterbox()` 위쪽 레터박스 DOM을 가져옵니다.
- `getBottomLetterbox()` 아래쪽 레터박스 DOM을 가져옵니다.