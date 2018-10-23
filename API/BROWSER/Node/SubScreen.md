# `CLASS` SkyEngine.SubScreen
서브스크린 노드

## Mom CLASS
`SkyEngine.Node`

## Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.style*
* `REQUIRED` *params.width*
* `REQUIRED` *params.height*
* `OPTIONAL` *params.isDebugMode*

## Public Members

### `setSize(params)`
화면 크기가 변경되는 경우, 캔버스의 크기 또한 변경되어야 합니다.
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.width*
* `REQUIRED` *params.height*

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

### `getCanvas()`

### `getPixiRenderer()`

### `getNonePausableNode()`
