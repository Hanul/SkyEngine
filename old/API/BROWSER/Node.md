# `CLASS` SkyEngine.Node
노드 트리를 구성하기 위한 노드 클래스

## Parameters
* `OPTIONAL` *params*
* `OPTIONAL` *params.x* x 좌표
* `OPTIONAL` *params.y* y 좌표
* `OPTIONAL` *params.zIndex* 노드의 드로우 순서를 결정하기 위한 z 인덱스
* `OPTIONAL` *params.centerX* 중점의 x 좌표
* `OPTIONAL` *params.centerY* 중점의 y 좌표
* `OPTIONAL` *params.speedX* x 좌표 이동 속도
* `OPTIONAL` *params.speedY* y 좌표 이동 속도
* `OPTIONAL` *params.accelX* x 좌표 이동 가속도
* `OPTIONAL` *params.accelY* y 좌표 이동 가속도
* `OPTIONAL` *params.minSpeedX* x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
* `OPTIONAL` *params.minSpeedY* y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
* `OPTIONAL` *params.maxSpeedX* x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
* `OPTIONAL` *params.maxSpeedY* y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
* `OPTIONAL` *params.toX* x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
* `OPTIONAL` *params.toY* y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
* `OPTIONAL` *params.scale* 스케일
* `OPTIONAL` *params.scaleX* x 스케일
* `OPTIONAL` *params.scaleY* y 스케일
* `OPTIONAL` *params.scalingSpeed* 스케일이 커지는 속도
* `OPTIONAL` *params.scalingSpeedX* x 스케일이 커지는 속도
* `OPTIONAL` *params.scalingSpeedY* y 스케일이 커지는 속도
* `OPTIONAL` *params.scalingAccel* 스케일이 커지는 가속도
* `OPTIONAL` *params.scalingAccelX* x 스케일이 커지는 가속도
* `OPTIONAL` *params.scalingAccelY* y 스케일이 커지는 가속도
* `OPTIONAL` *params.minScalingSpeed* 스케일이 커지는 최소 속도
* `OPTIONAL` *params.minScalingSpeedX* x 스케일이 커지는 최소 속도
* `OPTIONAL` *params.minScalingSpeedY* y 스케일이 커지는 최소 속도
* `OPTIONAL` *params.maxScalingSpeed* 스케일이 커지는 최대 속도
* `OPTIONAL` *params.maxScalingSpeedX* x 스케일이 커지는 최대 속도
* `OPTIONAL` *params.maxScalingSpeedY* y 스케일이 커지는 최대 속도
* `OPTIONAL` *params.toScale* 스케일이 커지는 목적지
* `OPTIONAL` *params.toScaleX* x 스케일이 커지는 목적지
* `OPTIONAL` *params.toScaleY* y 스케일이 커지는 목적지
* `OPTIONAL` *params.angle* 회전 각도
* `OPTIONAL` *params.rotationSpeed* 회전 속도
* `OPTIONAL` *params.rotationAccel* 회전 가속도
* `OPTIONAL` *params.minRotationSpeed* 최소 회전 속도
* `OPTIONAL` *params.maxRotationSpeed* 최대 회전 속도
* `OPTIONAL` *params.toAngle* 회전 각도 목적지
* `OPTIONAL` *params.alpha* 알파 값
* `OPTIONAL` *params.fadingSpeed* 페이드 속도
* `OPTIONAL` *params.fadingAccel* 페이드 가속도
* `OPTIONAL` *params.minFadingSpeed* 최소 페이드 속도
* `OPTIONAL` *params.maxFadingSpeed* 최대 페이드 속도
* `OPTIONAL` *params.toAlpha* 페이드 알파 값 목적지
* `OPTIONAL` *params.filter* 필터
* `OPTIONAL` *params.blendMode* 블렌드 모드 (multiply, screen, overlay)
* `OPTIONAL` *params.collider* 충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.touchArea* 터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.on* 이벤트
* `OPTIONAL` *params.onDisplayResize* 화면 크기가 변경될 때 실행되는 함수를 지정할 수 있습니다.
* `OPTIONAL` *params.domStyle* dom으로 지정한 DOM 객체의 스타일을 지정합니다.
* `OPTIONAL` *params.dom* 노드를 따라다니는 DOM 객체를 지정할 수 있습니다. 노드의 크기가 변경되거나, 움직이거나, 회전하여도 똑같이 반영됩니다.
* `OPTIONAL` *params.c* 자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
* `OPTIONAL` *params.isToCheckCollision* true로 지정하면 최대 충돌 계산 크기 설정에 관계없이 해당 노드는 충돌 계산을 하게끔 강제합니다.
* `OPTIONAL` *params.isY2ZIndex* true로 지정하면 y값이 변경되는 것을 감지하여 z 인덱스에 반영합니다.

## Public Members

### `addToPixiContainer(pixiChild)`

### `removeFromPixiContainer(pixiChild)`

### `setX(x)`
#### Parameters
* `REQUIRED` *x*

### `getX()`

### `setY(y)`
#### Parameters
* `REQUIRED` *y*

### `getY()`

### `setZIndex(zIndex)`
#### Parameters
* `REQUIRED` *zIndex*

### `getZIndex()`

### `setPosition(position)`
x, y, zIndex를 한번에 지정합니다.
#### Parameters
* `REQUIRED` *position*
* `OPTIONAL` *position.x*
* `OPTIONAL` *position.y*
* `OPTIONAL` *position.zIndex*

### `setCenterX(centerX)`
#### Parameters
* `REQUIRED` *centerX*

### `getCenterX()`

### `setCenterY(centerY)`
#### Parameters
* `REQUIRED` *centerY*

### `getCenterY()`

### `setSpeedX(speedX)`
#### Parameters
* `REQUIRED` *speedX*

### `getSpeedX()`

### `setSpeedY(speedY)`
#### Parameters
* `REQUIRED` *speedY*

### `getSpeedY()`

### `setAccelX(accelX)`
#### Parameters
* `REQUIRED` *accelX*

### `getAccelX()`

### `setAccelY(accelY)`
#### Parameters
* `REQUIRED` *accelY*

### `getAccelY()`

### `setMinSpeedX(minSpeedX)`
#### Parameters
* `REQUIRED` *minSpeedX*

### `getMinSpeedX()`

### `setMinSpeedY(minSpeedY)`
#### Parameters
* `REQUIRED` *minSpeedY*

### `getMinSpeedY()`

### `setMaxSpeedX(maxSpeedX)`
#### Parameters
* `REQUIRED` *maxSpeedX*

### `getMaxSpeedX()`

### `setMaxSpeedY(maxSpeedY)`
#### Parameters
* `REQUIRED` *maxSpeedY*

### `getMaxSpeedY()`

### `setToX(toX)`
#### Parameters
* `REQUIRED` *toX*

### `getToX()`

### `setToY(toY)`
#### Parameters
* `REQUIRED` *toY*

### `getToY()`

### `setScaleX(scaleX)`
#### Parameters
* `REQUIRED` *scaleX*

### `getScaleX()`

### `setScaleY(scaleY)`
#### Parameters
* `REQUIRED` *scaleY*

### `getScaleY()`

### `setScale(scale)`
x 스케일과 y 스케일을 동시에 설정합니다.
#### Parameters
* `REQUIRED` *scale*

### `setScalingSpeedX(scalingSpeedX)`
#### Parameters
* `REQUIRED` *scalingSpeedX*

### `getScalingSpeedX()`

### `setScalingSpeedY(scalingSpeedY)`
#### Parameters
* `REQUIRED` *scalingSpeedY*

### `getScalingSpeedY()`

### `setScalingSpeed(scalingSpeed)`
x 스케일과 y 스케일이 커지는 속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *scalingSpeed*

### `setScalingAccelX(scalingAccelX)`
#### Parameters
* `REQUIRED` *scalingAccelX*

### `getScalingAccelX()`

### `setScalingAccelY(scalingAccelY)`
#### Parameters
* `REQUIRED` *scalingAccelY*

### `getScalingAccelY()`

### `setScalingAccel(scalingAccel)`
x 스케일과 y 스케일이 커지는 가속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *scalingAccel*

### `setMinScalingSpeedX(minScalingSpeedX)`
#### Parameters
* `REQUIRED` *minScalingSpeedX*

### `getMinScalingSpeedX()`

### `setMinScalingSpeedY(minScalingSpeedY)`
#### Parameters
* `REQUIRED` *minScalingSpeedY*

### `getMinScalingSpeedY()`

### `setMinScalingSpeed(minScalingSpeed)`
x 스케일과 y 스케일이 커지는 최소 속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *minScalingSpeed*

### `setMaxScalingSpeedX(maxScalingSpeedX)`
#### Parameters
* `REQUIRED` *maxScalingSpeedX*

### `getMaxScalingSpeedX()`

### `setMaxScalingSpeedY(maxScalingSpeedY)`
#### Parameters
* `REQUIRED` *maxScalingSpeedY*

### `getMaxScalingSpeedY()`

### `setMaxScalingSpeed(maxScalingSpeed)`
x 스케일과 y 스케일이 커지는 최대 속도를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *maxScalingSpeed*

### `setToScaleX(toScaleX)`
#### Parameters
* `REQUIRED` *toScaleX*

### `getToScaleX()`

### `setToScaleY(toScaleY)`
#### Parameters
* `REQUIRED` *toScaleY*

### `getToScaleY()`

### `setToScale(toScale)`
x 스케일과 y 스케일의 목적지를 동시에 설정합니다.
#### Parameters
* `REQUIRED` *toScale*

### `setAngle(angle)`
#### Parameters
* `REQUIRED` *angle*

### `getAngle()`

### `setRotationSpeed(rotationSpeed)`
#### Parameters
* `REQUIRED` *rotationSpeed*

### `getRotationSpeed()`

### `setRotationAccel(rotationAccel)`
#### Parameters
* `REQUIRED` *rotationAccel*

### `getRotationAccel()`

### `setMinRotationSpeed(minRotationSpeed)`
#### Parameters
* `REQUIRED` *minRotationSpeed*

### `getMinRotationSpeed()`

### `setMaxRotationSpeed(maxRotationSpeed)`
#### Parameters
* `REQUIRED` *maxRotationSpeed*

### `getMaxRotationSpeed()`

### `setToAngle(toAngle)`
#### Parameters
* `REQUIRED` *toAngle*

### `getToAngle()`

### `setAlpha(alpha)`
#### Parameters
* `REQUIRED` *alpha*

### `getAlpha()`

### `setFadingSpeed(fadingSpeed)`
#### Parameters
* `REQUIRED` *fadingSpeed*

### `getFadingSpeed()`

### `setFadingAccel(fadingAccel)`
#### Parameters
* `REQUIRED` *fadingAccel*

### `getFadingAccel()`

### `setMinFadingSpeed(minFadingSpeed)`
#### Parameters
* `REQUIRED` *minFadingSpeed*

### `getMinFadingSpeed()`

### `setMaxFadingSpeed(maxFadingSpeed)`
#### Parameters
* `REQUIRED` *maxFadingSpeed*

### `getMaxFadingSpeed()`

### `setToAlpha(toAlpha)`
#### Parameters
* `REQUIRED` *toAlpha*

### `getToAlpha()`

### `getDrawingX()`

### `getDrawingY()`

### `getRealX()`

### `getRealY()`

### `getRealScaleX()`

### `getRealScaleY()`

### `getRealRadian()`

### `getRealSin()`

### `getRealCos()`

### `getBeforeX()`

### `getBeforeY()`

### `setFilter(filter)`
#### Parameters
* `REQUIRED` *filter*

### `getFilter()`

### `removeFilter()`

### `setBlendMode(blendMode)`
#### Parameters
* `REQUIRED` *blendMode*

### `getBlendMode()`

### `removeBlendMode()`

### `moveLeft(speedOrParams, moveEndHandler)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*
* `OPTIONAL` *speedOrParams.toX*
* `OPTIONAL` *moveEndHandler*

### `stopLeft(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveRight(speedOrParams, moveEndHandler)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*
* `OPTIONAL` *speedOrParams.toX*
* `OPTIONAL` *moveEndHandler*

### `stopRight(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveUp(speedOrParams, moveEndHandler)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*
* `OPTIONAL` *speedOrParams.toY*
* `OPTIONAL` *moveEndHandler*

### `stopUp(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveDown(speedOrParams, moveEndHandler)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*
* `OPTIONAL` *speedOrParams.toY*
* `OPTIONAL` *moveEndHandler*

### `stopDown(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `moveTo(params, moveEndHandler)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.x*
* `OPTIONAL` *params.y*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.maxSpeed*
* `OPTIONAL` *moveEndHandler*

### `scaleTo(params, scaleEndHandler)`
#### Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.x*
* `OPTIONAL` *params.y*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.maxSpeed*
* `OPTIONAL` *scaleEndHandler*

### `stuckLeft()`

### `unstuckLeft()`

### `stuckRight()`

### `unstuckRight()`

### `stuckUp()`

### `unstuckUp()`

### `stuckDown()`

### `unstuckDown()`

### `rotate(speedOrParams)`
#### Parameters
* `REQUIRED` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.minSpeed*
* `OPTIONAL` *speedOrParams.maxSpeed*

### `stopRotation(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `rotateTo(params, rotateEndHandler)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.toAngle*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.minSpeed*
* `OPTIONAL` *params.maxSpeed*
* `OPTIONAL` *rotateEndHandler*

### `flipX()`

### `flipY()`

### `fadeIn(speedOrParams, fadeEndHandler)`
#### Parameters
* `OPTIONAL` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*
* `OPTIONAL` *fadeEndHandler*

### `fadeOut(speedOrParams, fadeEndHandler)`
#### Parameters
* `OPTIONAL` *speedOrParams*
* `OPTIONAL` *speedOrParams.speed*
* `OPTIONAL` *speedOrParams.accel*
* `OPTIONAL` *speedOrParams.maxSpeed*
* `OPTIONAL` *fadeEndHandler*

### `stopFading(accel)`
#### Parameters
* `OPTIONAL` *accel*

### `fadeTo(params, fadeEndHandler)`
#### Parameters
* `REQUIRED` *params*
* `REQUIRED` *params.toAlpha*
* `OPTIONAL` *params.speed*
* `OPTIONAL` *params.accel*
* `OPTIONAL` *params.minSpeed*
* `OPTIONAL` *params.maxSpeed*
* `OPTIONAL` *fadeEndHandler*

### `hide()`

### `show()`

### `checkIsHiding()`

### `checkIsShowing()`

### `getChildren()`

### `getParent()`

### `setTarget(targetNode)`

### `setParent(parentNode)`

### `appendTo(node)`
#### Parameters
* `REQUIRED` *node*

### `append(node)`
#### Parameters
* `REQUIRED` *node*

### `empty()`

### `remove()`

### `checkIsRemoved()`

### `setToRemove(setToRemoveCallback)`
#### Parameters
* `OPTIONAL` *setToRemoveCallback*

### `addDom(dom)`
#### Parameters
* `REQUIRED` *dom*

### `getDomWrapper()`

### `addDomStyle(domStyle)`

### `removeAllDoms()`

### `on(eventName, eventHandler)`
#### Parameters
* `REQUIRED` *eventName*
* `REQUIRED` *eventHandler*

### `checkIsEventExists(eventName)`
#### Parameters
* `REQUIRED` *eventName*

### `off(eventName, eventHandler)`
#### Parameters
* `REQUIRED` *eventName*
* `OPTIONAL` *eventHandler*

### `fireEvent(eventNameOrParams)`
#### Parameters
* `REQUIRED` *eventNameOrParams*
* `REQUIRED` *eventNameOrParams.eventName*
* `OPTIONAL` *eventNameOrParams.e*

### `onMeet(target, handler)`

### `offMeet(target, handler)`

### `runMeetHandlers(target, realTarget)`

### `onPart(target, handler)`

### `offPart(target, handler)`

### `runPartHandlers(target, realTarget)`

### `addTouchArea(touchArea)`
#### Parameters
* `REQUIRED` *touchArea*

### `getTouchAreas()`

### `getTouchArea()`

### `addCollider(collider)`
#### Parameters
* `REQUIRED` *collider*

### `getColliders()`

### `getCollider()`

### `checkPoint(pointX, pointY)`

### `checkArea(area)`

### `checkTouch(touchX, touchY)`

### `checkOneSideCollision(target)`
#### Parameters
* `REQUIRED` *target*

### `checkCollision(target)`
#### Parameters
* `REQUIRED` *target*

### `checkOffScreen()`

### `step(deltaTime)`

### `drawArea(graphics)`
#### Parameters
* `REQUIRED` *graphics*

### `pause()`

### `checkIsPaused()`

### `resume()`

### `checkIsToCheckCollision()`

### `delay(seconds, func)`

### `interval(seconds, func)`
