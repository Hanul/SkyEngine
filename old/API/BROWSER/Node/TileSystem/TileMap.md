# `CLASS` SkyEngine.TileMap
타일맵 노드

## Mom CLASS
`SkyEngine.Node`

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.tileWidth* 타일의 너비
* `REQUIRED` *params.tileHeight* 타일의 높이
* `OPTIONAL` *params.tileMap* 타일 맵을 구성하는 타일들의 2차원 배열
* `OPTIONAL` *params.tileSet* tileKeyMap으로 타일 맵을 구성하기 위한 타일과 타일에 해당하는 키의 목록
* `OPTIONAL` *params.tileKeyMap* tileSet에 선언한 타일들과 키를 기반으로 타일 맵을 구성하기 위한 키들의 2차원 배열

## Public Members

### `getTileWidth()`

### `getTileHeight()`

### `addTile(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.row*
* `REQUIRED` *params.col*
* `OPTIONAL` *params.tile*
* `OPTIONAL` *params.key*

### `getTileKey(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.row*
* `REQUIRED` *params.col*

### `getTile(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.row*
* `REQUIRED` *params.col*

### `moveTile(params, endHandler)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.fromRow*
* `REQUIRED` *params.fromCol*
* `REQUIRED` *params.toRow*
* `REQUIRED` *params.toCol*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *endHandler*

### `removeTile(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.row*
* `REQUIRED` *params.col*

### `checkCollisionTile(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.row*
* `REQUIRED` *params.col*

### `findPath(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.startRow*
* `REQUIRED` *params.startCol*
* `REQUIRED` *params.endRow*
* `REQUIRED` *params.endCol*
