# `CLASS` SkyEngine.Line
직선 노드

## Mom CLASS
`SkyEngine.Figure`

## Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.startX* 직선의 시작 x 좌표
* `REQUIRED` *params.startY* 직선의 시작 y 좌표
* `REQUIRED` *params.endX* 직선의 끝 x 좌표
* `REQUIRED` *params.endY* 직선의 끝 Y 좌표
* `REQUIRED` *params.border*
* `OPTIONAL` *params.isEndless* true로 지정하면 양 끝이 무한인 직선을 생성합니다.

## Static Members

### `findLineIntersectionPoint(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, targetX, targetY, targetStartX, targetStartY, targetEndX, targetEndY, targetScaleX, targetScaleY, targetSin, targetCos)`

### `findRectIntersectionPoints(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, rectX, rectY, rectWidth, rectHeight, rectScaleX, rectScaleY, rectSin, rectCos)`

### `findCircleIntersectionPoints(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, circleX, circleY, circleWidth, circleHeight, circleScaleX, circleScaleY, circleSin, circleCos)`

### `findPolygonIntersectionPoints(lineX, lineY, lineStartX, lineStartY, lineEndX, lineEndY, lineScaleX, lineScaleY, lineSin, lineCos, polygonX, polygonY, polygonPoints, polygonScaleX, polygonScaleY, polygonSin, polygonCos)`

### `generateGraphics(params)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.startX*
* `REQUIRED` *params.startY*
* `REQUIRED` *params.endX*
* `REQUIRED` *params.endY*
* `OPTIONAL` *params.border*
* `OPTIONAL` *params.blendMode*

## Public Members

### `setStartX(startX)`

### `getStartX()`

### `setStartY(startY)`

### `getStartY()`

### `setEndX(endX)`

### `getEndX()`

### `setEndY(endY)`

### `getEndY()`

### `findIntersectionPoints(target)`
