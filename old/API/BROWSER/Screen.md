# `OBJECT` SkyEngine.Screen
게임 화면 전체를 다루는 오브젝트

## Mom CLASS
`SkyEngine.Node`

## Public Members

### `registerNode(node)`
노드 등록

### `unregisterNode(node)`
노드 해제

### `findNodesByClass(cls)`
노드 검색

### `cameraFollowX(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.target*
* `OPTIONAL` *params.centerX*
* `OPTIONAL` *params.minX*
* `OPTIONAL` *params.maxX*

### `cameraFollowY(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.target*
* `OPTIONAL` *params.centerY*
* `OPTIONAL` *params.minY*
* `OPTIONAL` *params.maxY*

### `cameraFollow(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.target*
* `OPTIONAL` *params.centerX*
* `OPTIONAL` *params.centerY*
* `OPTIONAL` *params.minX*
* `OPTIONAL` *params.minY*
* `OPTIONAL` *params.maxX*
* `OPTIONAL` *params.maxY*

### `cameraUnfollowX()`

### `cameraUnfollowY()`

### `cameraUnfollow()`

### `getCameraFollowX()`

### `getCameraFollowY()`

### `getLeft()`

### `getTop()`

### `getWidth()`

### `getHeight()`

### `getRatio()`

### `getCanvas()`

### `getPixiRenderer()`

### `getNonePausableNode()`
