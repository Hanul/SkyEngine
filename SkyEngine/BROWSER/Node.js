/*
 * 노드 트리를 구성하기 위한 노드 클래스
 */
SkyEngine.Node = CLASS({

	init: (inner, self, params) => {
		//OPTIONAL: params

		//OPTIONAL: params.x					x 좌표
		//OPTIONAL: params.y					y 좌표
		//OPTIONAL: params.zIndex				노드의 드로우 순서를 결정하기 위한 z 인덱스
		//OPTIONAL: params.centerX				중점의 x 좌표
		//OPTIONAL: params.centerY				중점의 y 좌표
		//OPTIONAL: params.speedX				x 좌표 이동 속도
		//OPTIONAL: params.speedY				y 좌표 이동 속도
		//OPTIONAL: params.accelX				x 좌표 이동 가속도
		//OPTIONAL: params.accelY				y 좌표 이동 가속도
		//OPTIONAL: params.minSpeedX			x 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
		//OPTIONAL: params.minSpeedY			y 좌표 최소 이동 속도. 가속도로 줄어드는 속도의 최소값입니다.
		//OPTIONAL: params.maxSpeedX			x 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
		//OPTIONAL: params.maxSpeedY			y 좌표 최대 이동 속도. 가속도로 늘어나는 속도의 최대값입니다.
		//OPTIONAL: params.toX					x 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.
		//OPTIONAL: params.toY					y 좌표 목적지. 이동하다 목적지에 도착하면 속도가 0이 됩니다.

		//OPTIONAL: params.scale				스케일
		//OPTIONAL: params.scaleX				x 스케일
		//OPTIONAL: params.scaleY				y 스케일
		//OPTIONAL: params.scalingSpeed			스케일이 커지는 속도
		//OPTIONAL: params.scalingSpeedX		x 스케일이 커지는 속도
		//OPTIONAL: params.scalingSpeedY		y 스케일이 커지는 속도
		//OPTIONAL: params.scalingAccel			스케일이 커지는 가속도
		//OPTIONAL: params.scalingAccelX		x 스케일이 커지는 가속도
		//OPTIONAL: params.scalingAccelY		y 스케일이 커지는 가속도
		//OPTIONAL: params.minScalingSpeed		스케일이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedX		x 스케일이 커지는 최소 속도
		//OPTIONAL: params.minScalingSpeedY		y 스케일이 커지는 최소 속도
		//OPTIONAL: params.maxScalingSpeed		스케일이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedX		x 스케일이 커지는 최대 속도
		//OPTIONAL: params.maxScalingSpeedY		y 스케일이 커지는 최대 속도
		//OPTIONAL: params.toScale				스케일이 커지는 목적지
		//OPTIONAL: params.toScaleX				x 스케일이 커지는 목적지
		//OPTIONAL: params.toScaleY				y 스케일이 커지는 목적지

		//OPTIONAL: params.angle				회전 각도
		//OPTIONAL: params.rotationSpeed		회전 속도
		//OPTIONAL: params.rotationAccel		회전 가속도
		//OPTIONAL: params.minRotationSpeed		최소 회전 속도
		//OPTIONAL: params.maxRotationSpeed		최대 회전 속도
		//OPTIONAL: params.toAngle				회전 각도 목적지

		//OPTIONAL: params.alpha				알파 값
		//OPTIONAL: params.fadingSpeed			페이드 속도
		//OPTIONAL: params.fadingAccel			페이드 가속도
		//OPTIONAL: params.minFadingSpeed		최소 페이드 속도
		//OPTIONAL: params.maxFadingSpeed		최대 페이드 속도
		//OPTIONAL: params.toAlpha				페이드 알파 값 목적지
		
		//OPTIONAL: params.filter				필터
		//OPTIONAL: params.blendMode			블렌드 모드 (multiply, screen, overlay)

		//OPTIONAL: params.collider				충돌 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.touchArea			터치 영역. 하나의 영역을 지정하거나, 영역들의 배열을 지정할 수 있습니다.
		
		//OPTIONAL: params.on					이벤트
		//OPTIONAL: params.onDisplayResize		화면 크기가 변경될 때 실행되는 함수를 지정할 수 있습니다.
		
		//OPTIONAL: params.domStyle				dom으로 지정한 DOM 객체의 스타일을 지정합니다.
		//OPTIONAL: params.dom					노드를 따라다니는 DOM 객체를 지정할 수 있습니다. 노드의 크기가 변경되거나, 움직이거나, 회전하여도 똑같이 반영됩니다.
		
		//OPTIONAL: params.c					자식 노드. 하나의 노드를 지정하거나, 노드들의 배열을 지정할 수 있습니다.
		//OPTIONAL: params.isToCheckCollision	true로 지정하면 최대 충돌 계산 크기 설정에 관계없이 해당 노드는 충돌 계산을 하게끔 강제합니다.
		//OPTIONAL: params.isY2ZIndex			true로 지정하면 y값이 변경되는 것을 감지하여 z 인덱스에 반영합니다.
		
		// properties
		let x, y, zIndex, centerX, centerY, scaleX, scaleY, angle, alpha;
		let speedX, speedY, scalingSpeedX, scalingSpeedY, rotationSpeed, fadingSpeed;
		let accelX, accelY, scalingAccelX, scalingAccelY, rotationAccel, fadingAccel;

		// min, max speed (undefined면 무제한)
		let minSpeedX, minSpeedY, minScalingSpeedX, minScalingSpeedY, minRotationSpeed, minFadingSpeed;
		let maxSpeedX, maxSpeedY, maxScalingSpeedX, maxScalingSpeedY, maxRotationSpeed, maxFadingSpeed;

		// to properties
		let toX, toY, toScaleX, toScaleY, toAngle, toAlpha;

		// real properties
		// real x, y는 center x, y를 고려한 노드의 실제 위치이며, drawing x, y는 center x, y를 고려하지 않은 중앙 기준의 위치 
		let realX, realY, drawingX, drawingY, realScaleX, realScaleY, realRadian, realSin, realCos;

		// before properties
		let beforeX, beforeY;
		
		let moveEndHandler;
		let moveXEndHandler;
		let moveYEndHandler;
		let scaleEndHandler;
		let scaleXEndHandler;
		let scaleYEndHandler;
		let rotateEndHandler;
		let fadeEndHandler;

		let parentNode, targetNode;
		let childNodes = [];

		let isHiding = false;
		let isRemoved = false;
		let isToRemove = false;

		let eventMap = {};

		let colliders = [];
		let touchAreas = [];
		let collisionTargets = [];
		let collidingNodeIds = {};

		let meetHandlerMap = {};

		let partHandlerMap = {};

		let filter;
		let blendMode;
		let isToCheckCollision;
		let isY2ZIndex;

		let isStuckLeft;
		let isStuckRight;
		let isStuckUp;
		let isStuckDown;
		
		let pauseCount = 0;
		
		let domWrapper;
		let isFirstFixDomStyle = true;
		
		let onDisplayResize;
		let displayResizeEvent;
		
		let maxCollisionWidth = BROWSER_CONFIG.SkyEngine.maxCollisionWidth;
		let maxCollisionHeight = BROWSER_CONFIG.SkyEngine.maxCollisionHeight;
		
		// PixiJS 컨테이너
		let pixiContainer = new PIXI.Container();
		let areaGraphics;
		
		let getPixiContainer = inner.getPixiContainer = () => {
			return pixiContainer;
		};
		
		let addToPixiContainer = self.addToPixiContainer = (pixiChild) => {
			
			let pixiChildren = pixiContainer.children;
			
			let low = 0;
			let high = pixiChildren.length;
			
			while (low < high) {
			
				// >>> 1은 2로 나누고 나머지를 버리는 것과 동일
				let mid = (low + high) >>> 1;
				
				if (pixiChildren[mid].zIndex <= pixiChild.zIndex) {
					low = mid + 1;
				} else {
					high = mid;
				}
			}
			
			pixiContainer.addChildAt(pixiChild, low);
		};
		
		let removeFromPixiContainer = self.removeFromPixiContainer = (pixiChild) => {
			pixiContainer.removeChild(pixiChild);
		};

		let genRealPosition = () => {

			if (targetNode === undefined) {
				realX = x;
				realY = y;
				drawingX = x;
				drawingY = y;
			} else {

				let plusX = x * targetNode.getRealScaleX();
				let plusY = y * targetNode.getRealScaleY();

				realX = targetNode.getDrawingX() + plusX * targetNode.getRealCos() - plusY * targetNode.getRealSin();
				realY = targetNode.getDrawingY() + plusX * targetNode.getRealSin() + plusY * targetNode.getRealCos();

				let plusCenterX = centerX * realScaleX;
				let plusCenterY = centerY * realScaleY;

				drawingX = realX - plusCenterX * realCos + plusCenterY * realSin;
				drawingY = realY - plusCenterX * realSin - plusCenterY * realCos;
			}
		};

		let setX = self.setX = (_x) => {
			//REQUIRED: x

			x = _x;
			genRealPosition();
		};

		let getX = self.getX = () => {
			return x;
		};

		let setY = self.setY = (_y) => {
			//REQUIRED: y

			y = _y;
			genRealPosition();
			
			if (isY2ZIndex === true) {
				setZIndex(y);
			}
		};

		let getY = self.getY = () => {
			return y;
		};

		let setZIndex = self.setZIndex = (_zIndex) => {
			//REQUIRED: zIndex

			if (parentNode === undefined) {
				pixiContainer.zIndex = zIndex = _zIndex;
			} else {
				removeFromParent();
				pixiContainer.zIndex = zIndex = _zIndex;
				appendToParent();
			}
		};

		let getZIndex = self.getZIndex = () => {
			return zIndex;
		};

		// x, y, zIndex를 한번에 지정합니다.
		let setPosition = self.setPosition = (position) => {
			//REQUIRED: position
			//OPTIONAL: position.x
			//OPTIONAL: position.y
			//OPTIONAL: position.zIndex

			if (position.x !== undefined) {
				x = position.x;
			}
			if (position.y !== undefined) {
				y = position.y;
				if (isY2ZIndex === true) {
					setZIndex(y);
				}
			}

			if (position.x !== undefined || position.y !== undefined) {
				genRealPosition();
			}

			if (position.zIndex !== undefined) {
				setZIndex(position.zIndex);
			}
		};

		let setCenterX = self.setCenterX = (_centerX) => {
			//REQUIRED: centerX

			centerX = _centerX;
		};

		let getCenterX = self.getCenterX = () => {
			return centerX;
		};

		let setCenterY = self.setCenterY = (_centerY) => {
			//REQUIRED: centerY

			centerY = _centerY;
		};

		let getCenterY = self.getCenterY = () => {
			return centerY;
		};

		let setSpeedX = self.setSpeedX = (_speedX) => {
			//REQUIRED: speedX

			speedX = _speedX;
			
			if (speedX < minSpeedX) {
				minSpeedX = undefined;
			}
			if (speedX > maxSpeedX) {
				maxSpeedX = undefined;
			}
		};

		let getSpeedX = self.getSpeedX = () => {
			return speedX;
		};

		let setSpeedY = self.setSpeedY = (_speedY) => {
			//REQUIRED: speedY

			speedY = _speedY;
			
			if (speedY < minSpeedY) {
				minSpeedY = undefined;
			}
			if (speedY > maxSpeedY) {
				maxSpeedY = undefined;
			}
		};

		let getSpeedY = self.getSpeedY = () => {
			return speedY;
		};

		let setAccelX = self.setAccelX = (_accelX) => {
			//REQUIRED: accelX

			accelX = _accelX;
		};

		let getAccelX = self.getAccelX = () => {
			return accelX;
		};

		let setAccelY = self.setAccelY = (_accelY) => {
			//REQUIRED: accelY

			accelY = _accelY;
		};

		let getAccelY = self.getAccelY = () => {
			return accelY;
		};

		let setMinSpeedX = self.setMinSpeedX = (_minSpeedX) => {
			//REQUIRED: minSpeedX

			minSpeedX = _minSpeedX;
		};

		let getMinSpeedX = self.getMinSpeedX = () => {
			return minSpeedX;
		};

		let setMinSpeedY = self.setMinSpeedY = (_minSpeedY) => {
			//REQUIRED: minSpeedY

			minSpeedY = _minSpeedY;
		};

		let getMinSpeedY = self.getMinSpeedY = () => {
			return minSpeedY;
		};

		let setMaxSpeedX = self.setMaxSpeedX = (_maxSpeedX) => {
			//REQUIRED: maxSpeedX

			maxSpeedX = _maxSpeedX;
		};

		let getMaxSpeedX = self.getMaxSpeedX = () => {
			return maxSpeedX;
		};

		let setMaxSpeedY = self.setMaxSpeedY = (_maxSpeedY) => {
			//REQUIRED: maxSpeedY

			maxSpeedY = _maxSpeedY;
		};

		let getMaxSpeedY = self.getMaxSpeedY = () => {
			return maxSpeedY;
		};

		let setToX = self.setToX = (_toX) => {
			//REQUIRED: toX

			toX = _toX;
		};

		let getToX = self.getToX = () => {
			return toX;
		};

		let setToY = self.setToY = (_toY) => {
			//REQUIRED: toY

			toY = _toY;
		};

		let getToY = self.getToY = () => {
			return toY;
		};

		let setScaleX = self.setScaleX = (_scaleX) => {
			//REQUIRED: scaleX

			scaleX = _scaleX;

			if (targetNode === undefined) {
				realScaleX = scaleX;
			} else {
				realScaleX = targetNode.getRealScaleX() * scaleX;
			}
		};

		let getScaleX = self.getScaleX = () => {
			return scaleX;
		};

		let setScaleY = self.setScaleY = (_scaleY) => {
			//REQUIRED: scaleY

			scaleY = _scaleY;

			if (targetNode === undefined) {
				realScaleY = _scaleY;
			} else {
				realScaleY = targetNode.getRealScaleY() * scaleY;
			}
		};

		let getScaleY = self.getScaleY = () => {
			return scaleY;
		};

		// x 스케일과 y 스케일을 동시에 설정합니다.
		let setScale = self.setScale = (scale) => {
			//REQUIRED: scale

			setScaleX(scale);
			setScaleY(scale);
		};

		let setScalingSpeedX = self.setScalingSpeedX = (_scalingSpeedX) => {
			//REQUIRED: scalingSpeedX

			scalingSpeedX = _scalingSpeedX;
			
			if (scalingSpeedX < minScalingSpeedX) {
				minScalingSpeedX = undefined;
			}
			if (scalingSpeedX > maxScalingSpeedX) {
				maxScalingSpeedX = undefined;
			}
		};

		let getScalingSpeedX = self.getScalingSpeedX = () => {
			return scalingSpeedX;
		};

		let setScalingSpeedY = self.setScalingSpeedY = (_scalingSpeedY) => {
			//REQUIRED: scalingSpeedY

			scalingSpeedY = _scalingSpeedY;
			
			if (scalingSpeedY < minScalingSpeedY) {
				minScalingSpeedY = undefined;
			}
			if (scalingSpeedY > maxScalingSpeedY) {
				maxScalingSpeedY = undefined;
			}
		};

		let getScalingSpeedY = self.getScalingSpeedY = () => {
			return scalingSpeedY;
		};

		// x 스케일과 y 스케일이 커지는 속도를 동시에 설정합니다.
		let setScalingSpeed = self.setScalingSpeed = (scalingSpeed) => {
			//REQUIRED: scalingSpeed

			scalingSpeedX = scalingSpeed;
			scalingSpeedY = scalingSpeed;
		};

		let setScalingAccelX = self.setScalingAccelX = (_scalingAccelX) => {
			//REQUIRED: scalingAccelX

			scalingAccelX = _scalingAccelX;
		};

		let getScalingAccelX = self.getScalingAccelX = () => {
			return scalingAccelX;
		};

		let setScalingAccelY = self.setScalingAccelY = (_scalingAccelY) => {
			//REQUIRED: scalingAccelY

			scalingAccelY = _scalingAccelY;
		};

		let getScalingAccelY = self.getScalingAccelY = () => {
			return scalingAccelY;
		};

		// x 스케일과 y 스케일이 커지는 가속도를 동시에 설정합니다.
		let setScalingAccel = self.setScalingAccel = (scalingAccel) => {
			//REQUIRED: scalingAccel

			scalingAccelX = scalingAccel;
			scalingAccelY = scalingAccel;
		};

		let setMinScalingSpeedX = self.setMinScalingSpeedX = (_minScalingSpeedX) => {
			//REQUIRED: minScalingSpeedX

			minScalingSpeedX = _minScalingSpeedX;
		};

		let getMinScalingSpeedX = self.getMinScalingSpeedX = () => {
			return minScalingSpeedX;
		};

		let setMinScalingSpeedY = self.setMinScalingSpeedY = (_minScalingSpeedY) => {
			//REQUIRED: minScalingSpeedY

			minScalingSpeedY = _minScalingSpeedY;
		};

		let getMinScalingSpeedY = self.getMinScalingSpeedY = () => {
			return minScalingSpeedY;
		};

		// x 스케일과 y 스케일이 커지는 최소 속도를 동시에 설정합니다.
		let setMinScalingSpeed = self.setMinScalingSpeed = (minScalingSpeed) => {
			//REQUIRED: minScalingSpeed

			minScalingSpeedX = minScalingSpeed;
			minScalingSpeedY = minScalingSpeed;
		};

		let setMaxScalingSpeedX = self.setMaxScalingSpeedX = (_maxScalingSpeedX) => {
			//REQUIRED: maxScalingSpeedX

			maxScalingSpeedX = _maxScalingSpeedX;
		};

		let getMaxScalingSpeedX = self.getMaxScalingSpeedX = () => {
			return maxScalingSpeedX;
		};

		let setMaxScalingSpeedY = self.setMaxScalingSpeedY = (_maxScalingSpeedY) => {
			//REQUIRED: maxScalingSpeedY

			maxScalingSpeedY = _maxScalingSpeedY;
		};

		let getMaxScalingSpeedY = self.getMaxScalingSpeedY = () => {
			return maxScalingSpeedY;
		};

		// x 스케일과 y 스케일이 커지는 최대 속도를 동시에 설정합니다.
		let setMaxScalingSpeed = self.setMaxScalingSpeed = (maxScalingSpeed) => {
			//REQUIRED: maxScalingSpeed

			maxScalingSpeedX = maxScalingSpeed;
			maxScalingSpeedY = maxScalingSpeed;
		};

		let setToScaleX = self.setToScaleX = (_toScaleX) => {
			//REQUIRED: toScaleX

			toScaleX = _toScaleX;
		};

		let getToScaleX = self.getToScaleX = () => {
			return toScaleX;
		};

		let setToScaleY = self.setToScaleY = (_toScaleY) => {
			//REQUIRED: toScaleY

			toScaleY = _toScaleY;
		};

		let getToScaleY = self.getToScaleY = () => {
			return toScaleY;
		};

		// x 스케일과 y 스케일의 목적지를 동시에 설정합니다.
		let setToScale = self.setToScale = (toScale) => {
			//REQUIRED: toScale

			toScaleX = toScale;
			toScaleY = toScale;
		};

		let setAngle = self.setAngle = (_angle) => {
			//REQUIRED: angle

			angle = _angle;

			if (targetNode === undefined) {
				realRadian = angle * Math.PI / 180;
			} else {
				realRadian = targetNode.getRealRadian() + angle * Math.PI / 180;
			}

			realSin = Math.sin(realRadian);
			realCos = Math.cos(realRadian);
		};

		let getAngle = self.getAngle = () => {
			return angle;
		};

		let setRotationSpeed = self.setRotationSpeed = (_rotationSpeed) => {
			//REQUIRED: rotationSpeed

			rotationSpeed = _rotationSpeed;
			
			if (rotationSpeed < minRotationSpeed) {
				minRotationSpeed = undefined;
			}
			if (rotationSpeed > maxRotationSpeed) {
				maxRotationSpeed = undefined;
			}
		};

		let getRotationSpeed = self.getRotationSpeed = () => {
			return rotationSpeed;
		};

		let setRotationAccel = self.setRotationAccel = (_rotationAccel) => {
			//REQUIRED: rotationAccel

			rotationAccel = _rotationAccel;
		};

		let getRotationAccel = self.getRotationAccel = () => {
			return rotationAccel;
		};

		let setMinRotationSpeed = self.setMinRotationSpeed = (_minRotationSpeed) => {
			//REQUIRED: minRotationSpeed

			minRotationSpeed = _minRotationSpeed;
		};

		let getMinRotationSpeed = self.getMinRotationSpeed = () => {
			return minRotationSpeed;
		};

		let setMaxRotationSpeed = self.setMaxRotationSpeed = (_maxRotationSpeed) => {
			//REQUIRED: maxRotationSpeed

			maxRotationSpeed = _maxRotationSpeed;
		};

		let getMaxRotationSpeed = self.getMaxRotationSpeed = () => {
			return maxRotationSpeed;
		};

		let setToAngle = self.setToAngle = (_toAngle) => {
			//REQUIRED: toAngle

			toAngle = _toAngle;
		};

		let getToAngle = self.getToAngle = () => {
			return toAngle;
		};

		let setAlpha = self.setAlpha = (_alpha) => {
			//REQUIRED: alpha

			alpha = _alpha;
		};

		let getAlpha = self.getAlpha = () => {
			return alpha;
		};

		let setFadingSpeed = self.setFadingSpeed = (_fadingSpeed) => {
			//REQUIRED: fadingSpeed

			fadingSpeed = _fadingSpeed;
			
			if (fadingSpeed < minFadingSpeed) {
				minFadingSpeed = undefined;
			}
			if (fadingSpeed > maxFadingSpeed) {
				maxFadingSpeed = undefined;
			}
		};

		let getFadingSpeed = self.getFadingSpeed = () => {
			return fadingSpeed;
		};

		let setFadingAccel = self.setFadingAccel = (_fadingAccel) => {
			//REQUIRED: fadingAccel

			fadingAccel = _fadingAccel;
		};

		let getFadingAccel = self.getFadingAccel = () => {
			return fadingAccel;
		};

		let setMinFadingSpeed = self.setMinFadingSpeed = (_minFadingSpeed) => {
			//REQUIRED: minFadingSpeed

			minFadingSpeed = _minFadingSpeed;
		};

		let getMinFadingSpeed = self.getMinFadingSpeed = () => {
			return minFadingSpeed;
		};

		let setMaxFadingSpeed = self.setMaxFadingSpeed = (_maxFadingSpeed) => {
			//REQUIRED: maxFadingSpeed

			maxFadingSpeed = _maxFadingSpeed;
		};

		let getMaxFadingSpeed = self.getMaxFadingSpeed = () => {
			return maxFadingSpeed;
		};

		let setToAlpha = self.setToAlpha = (_toAlpha) => {
			//REQUIRED: toAlpha

			toAlpha = _toAlpha;
		};

		let getToAlpha = self.getToAlpha = () => {
			return toAlpha;
		};

		let getDrawingX = self.getDrawingX = () => {
			return drawingX;
		};

		let getDrawingY = self.getDrawingY = () => {
			return drawingY;
		};

		let getRealX = self.getRealX = () => {
			return realX;
		};

		let getRealY = self.getRealY = () => {
			return realY;
		};

		let getRealScaleX = self.getRealScaleX = () => {
			return realScaleX;
		};

		let getRealScaleY = self.getRealScaleY = () => {
			return realScaleY;
		};

		let getRealRadian = self.getRealRadian = () => {
			return realRadian;
		};

		let getRealSin = self.getRealSin = () => {
			return realSin;
		};

		let getRealCos = self.getRealCos = () => {
			return realCos;
		};

		let getBeforeX = self.getBeforeX = () => {
			return beforeX;
		};

		let getBeforeY = self.getBeforeY = () => {
			return beforeY;
		};

		let genRealProperties = () => {
			setAngle(angle);
			setScaleX(scaleX);
			setScaleY(scaleY);
			genRealPosition();
		};

		// 파라미터 초기화
		if (params !== undefined) {

			x = params.x;
			y = params.y;
			centerX = params.centerX;
			centerY = params.centerY;
			pixiContainer.zIndex = zIndex = params.zIndex;
			if (params.scale !== undefined) {
				setScale(params.scale);
			}
			if (params.scaleX !== undefined) {
				scaleX = params.scaleX;
			}
			if (params.scaleY !== undefined) {
				scaleY = params.scaleY;
			}
			angle = params.angle;
			alpha = params.alpha;

			speedX = params.speedX;
			speedY = params.speedY;
			if (params.scalingSpeed !== undefined) {
				setScalingSpeed(params.scalingSpeed);
			}
			if (params.scalingSpeedX !== undefined) {
				scalingSpeedX = params.scalingSpeedX;
			}
			if (params.scalingSpeedY !== undefined) {
				scalingSpeedY = params.scalingSpeedY;
			}
			rotationSpeed = params.rotationSpeed;
			fadingSpeed = params.fadingSpeed;

			accelX = params.accelX;
			accelY = params.accelY;
			if (params.scalingAccel !== undefined) {
				setScalingAccel(params.scalingAccel);
			}
			if (params.scalingAccelX !== undefined) {
				scalingAccelX = params.scalingAccelX;
			}
			if (params.scalingAccelY !== undefined) {
				scalingAccelY = params.scalingAccelY;
			}
			rotationAccel = params.rotationAccel;
			fadingAccel = params.fadingAccel;

			minSpeedX = params.minSpeedX;
			minSpeedY = params.minSpeedY;
			if (params.minScaleSpeed !== undefined) {
				setMinScaleSpeed(params.minScaleSpeed);
			}
			if (params.minScaleSpeedX !== undefined) {
				minScaleSpeedX = params.minScaleSpeedX;
			}
			if (params.minScaleSpeedY !== undefined) {
				minScaleSpeedY = params.minScaleSpeedY;
			}
			minRotationSpeed = params.minRotationSpeed;
			minFadingSpeed = params.minFadingSpeed;

			maxSpeedX = params.maxSpeedX;
			maxSpeedY = params.maxSpeedY;
			if (params.maxScaleSpeed !== undefined) {
				setMaxScaleSpeed(params.maxScaleSpeed);
			}
			if (params.maxScaleSpeedX !== undefined) {
				maxScaleSpeedX = params.maxScaleSpeedX;
			}
			if (params.maxScaleSpeedY !== undefined) {
				maxScaleSpeedY = params.maxScaleSpeedY;
			}
			maxRotationSpeed = params.maxRotationSpeed;
			maxFadingSpeed = params.maxFadingSpeed;

			toX = params.toX;
			toY = params.toY;
			if (params.toScale !== undefined) {
				setToScale(params.toScale);
			}
			if (params.toScaleX !== undefined) {
				toScaleX = params.toScaleX;
			}
			if (params.toScaleY !== undefined) {
				toScaleY = params.toScaleY;
			}
			toAngle = params.toAngle;
			toAlpha = params.toAlpha;

			if (params.isHiding !== undefined) {
				isHiding = params.isHiding;
			}
			
			filter = params.filter;
			blendMode = params.blendMode;
			isToCheckCollision = params.isToCheckCollision;
			isY2ZIndex = params.isY2ZIndex;
			
			onDisplayResize = params.onDisplayResize;
		}

		// 초기화 되지 않은 파라미터에 기본값 지정
		if (x === undefined) {
			x = 0;
		}
		if (y === undefined) {
			y = 0;
		}
		if (centerX === undefined) {
			centerX = 0;
		}
		if (centerY === undefined) {
			centerY = 0;
		}
		if (zIndex === undefined) {
			pixiContainer.zIndex = zIndex = 0;
		}
		if (speedX === undefined) {
			speedX = 0;
		}
		if (speedY === undefined) {
			speedY = 0;
		}
		if (accelX === undefined) {
			accelX = 0;
		}
		if (accelY === undefined) {
			accelY = 0;
		}

		if (scaleX === undefined) {
			scaleX = 1;
		}
		if (scaleY === undefined) {
			scaleY = 1;
		}
		if (scalingSpeedX === undefined) {
			scalingSpeedX = 0;
		}
		if (scalingSpeedY === undefined) {
			scalingSpeedY = 0;
		}
		if (scalingAccelX === undefined) {
			scalingAccelX = 0;
		}
		if (scalingAccelY === undefined) {
			scalingAccelY = 0;
		}

		if (angle === undefined) {
			angle = 0;
		}
		if (rotationSpeed === undefined) {
			rotationSpeed = 0;
		}
		if (rotationAccel === undefined) {
			rotationAccel = 0;
		}

		if (alpha === undefined) {
			alpha = 1;
		}
		if (fadingSpeed === undefined) {
			fadingSpeed = 0;
		}
		if (fadingAccel === undefined) {
			fadingAccel = 0;
		}
		
		if (onDisplayResize !== undefined) {
			displayResizeEvent = EVENT('resize', RAR(() => {
				let result = onDisplayResize(WIN_WIDTH(), WIN_HEIGHT());
				
				if (result.x !== undefined) {
					setX(result.x);
				}
				if (result.y !== undefined) {
					setY(result.y);
				}
				
				if (result.scaleX !== undefined) {
					setScaleX(result.scaleX);
				}
				if (result.scaleY !== undefined) {
					setScaleY(result.scaleY);
				}
				
				if (result.width !== undefined && self.setWidth !== undefined) {
					self.setWidth(result.width);
				}
				if (result.height !== undefined && self.setHeight !== undefined) {
					self.setHeight(result.height);
				}
			}));
		}
		
		if (isY2ZIndex === true) {
			setZIndex(y);
		}

		// 노드 등록
		if (SkyEngine.Screen !== self) {
			SkyEngine.Screen.registerNode(self);
		}

		let setFilter = self.setFilter = (_filter) => {
			//REQUIRED: filter

			filter = _filter;
			
			if (filter.indexOf('blur(') !== -1) {
				
				let pixiFilter = new PIXI.filters.BlurFilter(filter.substring(5, filter.indexOf('px')));
				
				pixiContainer.filters = [pixiFilter];
			}
			
			else if (filter.indexOf('brightness(') !== -1) {
				
				let pixiFilter = new PIXI.filters.ColorMatrixFilter();
				pixiFilter.brightness(filter.substring(11, filter.indexOf('%')) / 100);
				
				pixiContainer.filters = [pixiFilter];
			}
			
			else if (filter.indexOf('contrast(') !== -1) {
				
				let pixiFilter = new PIXI.filters.ColorMatrixFilter();
				pixiFilter.contrast(filter.substring(9, filter.indexOf('%')) / 100 - 1);
				
				pixiContainer.filters = [pixiFilter];
			}
			
			else if (filter.indexOf('drop-shadow(') !== -1) {
				
				let filterSplit = filter.substring(12, filter.indexOf(')')).split(' ');
				
				let offsetX = filterSplit[0];
				offsetX = REAL(offsetX.substring(0, offsetX.indexOf('px'))) * realScaleX;
				
				let offsetY = filterSplit[1];
				offsetY = REAL(offsetY.substring(0, offsetY.indexOf('px'))) * realScaleY;
				
				let blurRadius = filterSplit[2];
				blurRadius = REAL(blurRadius.substring(0, blurRadius.indexOf('px')));
				
				let color = parseInt(filterSplit[3].substring(1), 16);
				
				let pixiFilter = new PIXI.filters.DropShadowFilter({
					rotation : Math.atan2(offsetY, offsetX) * 180 / Math.PI,
					distance : Math.sqrt(offsetX * offsetX + offsetY * offsetY),
					blur : blurRadius,
					color : color
				});
				
				console.log({
					rotation : Math.atan2(offsetY, offsetX) * 180 / Math.PI,
					distance : Math.sqrt(offsetX * offsetX + offsetY * offsetY),
					blur : blurRadius,
					color : color
				});
				
				pixiContainer.filters = [pixiFilter];
			}
			
			else if (filter.indexOf('grayscale(') !== -1) {
				
				let pixiFilter = new PIXI.filters.ColorMatrixFilter();
				pixiFilter.saturate(-filter.substring(10, filter.indexOf('%')) / 100);
				
				pixiContainer.filters = [pixiFilter];
			}
			
			else if (filter.indexOf('hue-rotate(') !== -1) {
				
				let pixiFilter = new PIXI.filters.ColorMatrixFilter();
				pixiFilter.hue(filter.substring(11, filter.indexOf('deg')));
				
				pixiContainer.filters = [pixiFilter];
			}
			
			else if (filter.indexOf('saturate(') !== -1) {
				
				let pixiFilter = new PIXI.filters.ColorMatrixFilter();
				pixiFilter.saturate(filter.substring(9, filter.indexOf('%')) / 100 - 1);
				
				pixiContainer.filters = [pixiFilter];
			}
		};
		
		if (filter !== undefined) {
			setFilter(filter);
		}

		let getFilter = self.getFilter = () => {
			return filter;
		};

		let removeFilter = self.removeFilter = () => {
			
			filter = undefined;
			
			pixiContainer.filters = TO_DELETE;
		};

		let setBlendMode = self.setBlendMode = (_blendMode) => {
			//REQUIRED: blendMode

			blendMode = _blendMode;
		};

		let getBlendMode = self.getBlendMode = () => {
			return blendMode;
		};

		let removeBlendMode = self.removeBlendMode = () => {
			blendMode = undefined;
		};

		let moveLeft = self.moveLeft = (speedOrParams, _moveEndHandler) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: speedOrParams.toX
			//OPTIONAL: moveEndHandler

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedX = -speedOrParams.speed;
				}

				if (speedOrParams.accel === undefined) {
					accelX = 0;
				} else {
					accelX = -speedOrParams.accel;
				}
				
				maxSpeedX = 0;

				if (speedOrParams.maxSpeed !== undefined) {
					minSpeedX = -speedOrParams.maxSpeed;
				} else {
					minSpeedX = undefined;
				}

				if (speedOrParams.toX !== undefined) {
					toX = speedOrParams.toX;
					moveXEndHandler = _moveEndHandler;
				}
				
			} else {
				accelX = 0;
				speedX = minSpeedX = -speedOrParams;
			}
		};

		let stopLeft = self.stopLeft = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelX = accel;
				maxSpeedX = 0;
			} else if (speedX < 0) {
				if (accelX < 0) {
					accelX = 0;
				}
				speedX = 0;
			}
		};

		let moveRight = self.moveRight = (speedOrParams, _moveEndHandler) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: speedOrParams.toX
			//OPTIONAL: moveEndHandler

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedX = speedOrParams.speed;
				}

				if (speedOrParams.accel === undefined) {
					accelX = 0;
				} else {
					accelX = speedOrParams.accel;
				}
				
				minSpeedX = 0;

				if (speedOrParams.maxSpeed !== undefined) {
					maxSpeedX = speedOrParams.maxSpeed;
				} else {
					maxSpeedX = undefined;
				}
				
				if (speedOrParams.toX !== undefined) {
					toX = speedOrParams.toX;
					moveXEndHandler = _moveEndHandler;
				}
				
			} else {
				accelX = 0;
				speedX = maxSpeedX = speedOrParams;
			}
		};

		let stopRight = self.stopRight = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelX = -accel;
				minSpeedX = 0;
			} else if (speedX > 0) {
				if (accelX > 0) {
					accelX = 0;
				}
				speedX = 0;
			}
		};

		let moveUp = self.moveUp = (speedOrParams, _moveEndHandler) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: speedOrParams.toY
			//OPTIONAL: moveEndHandler
			
			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedY = -speedOrParams.speed;
				}

				if (speedOrParams.accel === undefined) {
					accelY = 0;
				} else {
					accelY = -speedOrParams.accel;
				}
				
				maxSpeedY = 0;

				if (speedOrParams.maxSpeed !== undefined) {
					minSpeedY = -speedOrParams.maxSpeed;
				} else {
					minSpeedY = undefined;
				}
				
				if (speedOrParams.toY !== undefined) {
					toY = speedOrParams.toY;
					moveYEndHandler = _moveEndHandler;
				}
				
			} else {
				accelY = 0;
				speedY = minSpeedY = -speedOrParams;
			}
		};

		let stopUp = self.stopUp = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelY = accel;
				maxSpeedY = 0;
			} else if (speedY < 0) {
				if (accelY < 0) {
					accelY = 0;
				}
				speedY = 0;
			}
		};

		let moveDown = self.moveDown = (speedOrParams, _moveEndHandler) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: speedOrParams.toY
			//OPTIONAL: moveEndHandler

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					speedY = speedOrParams.speed;
				}

				if (speedOrParams.accel === undefined) {
					accelY = 0;
				} else {
					accelY = speedOrParams.accel;
				}
				
				minSpeedY = 0;

				if (speedOrParams.maxSpeed !== undefined) {
					maxSpeedY = speedOrParams.maxSpeed;
				} else {
					maxSpeedY = undefined;
				}
				
				if (speedOrParams.toY !== undefined) {
					toY = speedOrParams.toY;
					moveYEndHandler = _moveEndHandler;
				}
				
			} else {
				accelY = 0;
				speedY = maxSpeedY = speedOrParams;
			}
		};

		let stopDown = self.stopDown = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				accelY = -accel;
				minSpeedY = 0;
			} else if (speedY > 0) {
				if (accelY > 0) {
					accelY = 0;
				}
				speedY = 0;
			}
		};

		let moveTo = self.moveTo = (params, _moveEndHandler) => {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: moveEndHandler

			if (params.y === undefined) {
				
				params.toX = params.x;
				delete params.x;
				
				params.toX < x ? moveLeft(params, _moveEndHandler) : moveRight(params, _moveEndHandler);
			}
			
			else if (params.x === undefined) {
				
				params.toY = params.y;
				delete params.y;
				
				params.toY < y ? moveUp(params, _moveEndHandler) : moveDown(params, _moveEndHandler);
			}
			
			else {
				toX = params.x;
				toY = params.y;
				
				let dx = toX - x;
				let dy = toY - y;

				let length = Math.sqrt(dx * dx + dy * dy);

				if (params.speed !== undefined) {
					speedX = params.speed * dx / length;
					speedY = params.speed * dy / length;
				}

				if (params.accel !== undefined) {
					accelX = params.accel * dx / length;
					accelY = params.accel * dy / length;
				}

				if (params.maxSpeed !== undefined) {
					
					if (toX < x) {
						minSpeedX = -params.maxSpeed * dx / length;
					} else {
						maxSpeedX = params.maxSpeed * dx / length;
					}
					
					if (toY < y) {
						minSpeedY = -params.maxSpeed * dy / length;
					} else {
						maxSpeedY = params.maxSpeed * dy / length;
					}
				}
				
				moveEndHandler = _moveEndHandler;
			}
		};

		let scaleTo = self.scaleTo = (params, _scaleEndHandler) => {
			//REQUIRED: params
			//OPTIONAL: params.x
			//OPTIONAL: params.y
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: scaleEndHandler
			
			let speed = params.speed;
			let accel = params.accel;
			let minSpeed = params.minSpeed;
			let maxSpeed = params.maxSpeed;

			if (params.y === undefined) {
				
				toScaleX = params.x;
				
				if (toScaleX < scaleX) {
					if (speed !== undefined) {
						scalingSpeedX = -speed;
					}
					if (accel !== undefined) {
						scalingAccelX = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedX = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedX = speed;
					}
					if (accel !== undefined) {
						scalingAccelX = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedX = maxSpeed;
					}
				}
				
				scaleXEndHandler = _scaleEndHandler;
			}
			
			else if (params.x === undefined) {
				
				toScaleY = params.y;
				
				if (toScaleY < scaleY) {
					if (speed !== undefined) {
						scalingSpeedY = -speed;
					}
					if (accel !== undefined) {
						scalingAccelY = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedY = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedY = speed;
					}
					if (accel !== undefined) {
						scalingAccelY = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedY = maxSpeed;
					}
				}
				
				scaleYEndHandler = _scaleEndHandler;
			}
			
			else {
				
				toScaleX = params.x;
				
				if (toScaleX < scaleX) {
					if (speed !== undefined) {
						scalingSpeedX = -speed;
					}
					if (accel !== undefined) {
						scalingAccelX = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedX = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedX = speed;
					}
					if (accel !== undefined) {
						scalingAccelX = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedX = maxSpeed;
					}
				}
				
				toScaleY = params.y;
				
				if (toScaleY < scaleY) {
					if (speed !== undefined) {
						scalingSpeedY = -speed;
					}
					if (accel !== undefined) {
						scalingAccelY = -accel;
					}
					if (maxSpeed !== undefined) {
						minScalingSpeedY = -maxSpeed;
					}
				}
				
				else {
					if (speed !== undefined) {
						scalingSpeedY = speed;
					}
					if (accel !== undefined) {
						scalingAccelY = accel;
					}
					if (maxSpeed !== undefined) {
						maxScalingSpeedY = maxSpeed;
					}
				}
				
				scaleEndHandler = _scaleEndHandler;
			}
		};

		let stuckLeft = self.stuckLeft = () => {
			isStuckLeft = true;
		};

		let unstuckLeft = self.unstuckLeft = () => {
			isStuckLeft = false;
		};

		let stuckRight = self.stuckRight = () => {
			isStuckRight = true;
		};

		let unstuckRight = self.unstuckRight = () => {
			isStuckRight = false;
		};

		let stuckUp = self.stuckUp = () => {
			isStuckUp = true;
		};

		let unstuckUp = self.unstuckUp = () => {
			isStuckUp = false;
		};

		let stuckDown = self.stuckDown = () => {
			isStuckDown = true;
		};

		let unstuckDown = self.unstuckDown = () => {
			isStuckDown = false;
		};

		let rotate = self.rotate = (speedOrParams) => {
			//REQUIRED: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.minSpeed
			//OPTIONAL: speedOrParams.maxSpeed

			if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					rotationSpeed = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					rotationAccel = speedOrParams.accel;
				}

				if (speedOrParams.minSpeed !== undefined) {
					minRotationSpeed = speedOrParams.minSpeed;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxRotationSpeed = speedOrParams.maxSpeed;
				}
			} else {
				rotationSpeed = speedOrParams;
			}
		};

		let stopRotation = self.stopRotation = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				rotationAccel = -accel;
				if (accel > 0) {
					minRotationSpeed = 0;
				} else if (accel < 0) {
					maxRotationSpeed = 0;
				}
			} else if (rotationSpeed > 0) {
				rotationSpeed = 0;
			}
		};

		let rotateTo = self.rotateTo = (params, _rotateEndHandler) => {
			//REQUIRED: params
			//REQUIRED: params.toAngle
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.minSpeed
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: rotateEndHandler

			toAngle = params.toAngle;

			if (params.speed !== undefined) {
				rotationSpeed = params.speed;
			}

			if (params.accel !== undefined) {
				rotationAccel = params.accel;
			}

			if (params.minSpeed !== undefined) {
				minRotationSpeed = params.minSpeed;
			}

			if (params.maxSpeed !== undefined) {
				maxRotationSpeed = params.maxSpeed;
			}
			
			rotateEndHandler = _rotateEndHandler;
		};

		let flipX = self.flipX = () => {
			scaleX = -scaleX;
		};

		let flipY = self.flipY = () => {
			scaleY = -scaleY;
		};

		let fadeIn = self.fadeIn = (speedOrParams, _fadeEndHandler) => {
			//OPTIONAL: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: fadeEndHandler
			
			if (alpha === 1) {
				alpha = 0;
			}
			toAlpha = 1;

			if (speedOrParams === undefined) {
				fadingSpeed = 2;
			}
			
			else if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					fadingSpeed = speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					fadingAccel = speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					maxFadingSpeed = speedOrParams.maxSpeed;
				}
			}
			
			else if (isNaN(speedOrParams) === true) {
				_fadeEndHandler = speedOrParams;
				fadingSpeed = 2;
			}
			
			else {
				fadingSpeed = speedOrParams;
			}
			
			fadeEndHandler = _fadeEndHandler;
		};

		let fadeOut = self.fadeOut = (speedOrParams, _fadeEndHandler) => {
			//OPTIONAL: speedOrParams
			//OPTIONAL: speedOrParams.speed
			//OPTIONAL: speedOrParams.accel
			//OPTIONAL: speedOrParams.maxSpeed
			//OPTIONAL: fadeEndHandler
			
			toAlpha = 0;

			if (speedOrParams === undefined) {
				fadingSpeed = -2;
			}
			
			else if (CHECK_IS_DATA(speedOrParams) === true) {

				if (speedOrParams.speed !== undefined) {
					fadingSpeed = -speedOrParams.speed;
				}

				if (speedOrParams.accel !== undefined) {
					fadingAccel = -speedOrParams.accel;
				}

				if (speedOrParams.maxSpeed !== undefined) {
					minFadingSpeed = -speedOrParams.maxSpeed;
				}
			}
			
			else if (isNaN(speedOrParams) === true) {
				_fadeEndHandler = speedOrParams;
				fadingSpeed = -2;
			}
			
			else {
				fadingSpeed = -speedOrParams;
			}
			
			fadeEndHandler = _fadeEndHandler;
		};

		let stopFading = self.stopFading = (accel) => {
			//OPTIONAL: accel

			if (accel !== undefined) {
				fadingAccel = -accel;
				if (accel > 0) {
					minFadingSpeed = 0;
				} else if (accel < 0) {
					maxFadingSpeed = 0;
				}
			} else if (fadingSpeed > 0) {
				fadingSpeed = 0;
			}
		};

		let fadeTo = self.fadeTo = (params, _fadeEndHandler) => {
			//REQUIRED: params
			//REQUIRED: params.toAlpha
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: params.minSpeed
			//OPTIONAL: params.maxSpeed
			//OPTIONAL: fadeEndHandler

			toAlpha = params.toAlpha;

			if (params.speed !== undefined) {
				fadingSpeed = params.speed;
			}

			if (params.accel !== undefined) {
				fadingAccel = params.accel;
			}

			if (params.minSpeed !== undefined) {
				minFadingSpeed = params.minSpeed;
			}

			if (params.maxSpeed !== undefined) {
				maxFadingSpeed = params.maxSpeed;
			}
			
			fadeEndHandler = _fadeEndHandler;
		};

		let hide = self.hide = () => {
			isHiding = true;
			
			pixiContainer.visible = false;
			
			if (domWrapper !== undefined) {
				domWrapper.hide();
			}
		};

		let show = self.show = () => {
			isHiding = false;
			
			pixiContainer.visible = true;
			
			if (domWrapper !== undefined) {
				domWrapper.show();
			}
		};

		let checkIsHiding = self.checkIsHiding = () => {
			return isHiding;
		};

		let checkIsShowing = self.checkIsShowing = () => {
			return isHiding !== true;
		};

		let getChildren = self.getChildren = () => {
			return childNodes;
		};

		let getParent = self.getParent = () => {
			return parentNode;
		};

		let setTarget = self.setTarget = (_targetNode) => {
			targetNode = _targetNode;

			if (isRemoved !== true && targetNode !== undefined) {

				genRealProperties();

				// 모든 터치 영역에 대해 실행
				for (let i = 0; i < touchAreas.length; i += 1) {
					touchAreas[i].setTarget(self);
				}

				// 모든 충돌 영역에 대해 실행
				for (let i = 0; i < colliders.length; i += 1) {
					colliders[i].setTarget(self);
				}

				// 모든 자식 노드들에 대해 실행
				for (let i = 0; i < childNodes.length; i += 1) {
					childNodes[i].setTarget(self);
				}
			}
		};

		let setParent = self.setParent = (_parentNode) => {
			parentNode = _parentNode;
			setTarget(parentNode);
		};

		let removeFromParent = () => {

			let parentChildren = parentNode.getChildren();

			let minIndex = 0;
			let maxIndex = parentChildren.length - 1;

			let level = 0;

			while (minIndex <= maxIndex) {

				let index = Math.ceil((minIndex + maxIndex) / 2);

				let node = parentChildren[index];

				if (node.getZIndex() < zIndex) {
					minIndex = index + 1;
				} else if (node.getZIndex() > zIndex) {
					maxIndex = index - 1;
				} else {

					while (true) {

						if (parentChildren[index - level] === self) {
							parentChildren.splice(index - level, 1);
							break;
						}

						if (level > 0 && parentChildren[index + level] === self) {
							parentChildren.splice(index + level, 1);
							break;
						}

						if (
							parentChildren[index - level].getZIndex() !== zIndex &&
							parentChildren[index + level].getZIndex() !== zIndex) {
							break;
						}

						level += 1;
					}

					break;
				}
			}
			
			parentNode.removeFromPixiContainer(pixiContainer);
		};

		let appendToParent = () => {

			let parentChildren = parentNode.getChildren();

			let low = 0;
			let high = parentChildren.length;

			while (low < high) {

				// >>> 1은 2로 나누고 나머지를 버리는 것과 동일
				let mid = (low + high) >>> 1;

				if (parentChildren[mid].getZIndex() <= zIndex) {
					low = mid + 1;
				} else {
					high = mid;
				}
			}
			
			parentNode.addToPixiContainer(pixiContainer);

			parentChildren.splice(low, 0, self);
		};

		let appendTo = self.appendTo = (node) => {
			//REQUIRED: node

			if (parentNode !== undefined) {
				removeFromParent();
			}

			setParent(node);

			appendToParent();

			return self;
		};

		let append = self.append = (node) => {
			//REQUIRED: node

			node.appendTo(self);
		};
		
		let empty = self.empty = () => {
			
			for (let i = 0; i < childNodes.length; i += 1) {
				
				let childNode = childNodes[i];
				
				childNode.setParent(undefined);
				childNode.remove();
			}
			
			childNodes = [];
		};

		let remove = self.remove = () => {
			
			// fire remove event.
			fireEvent('remove');

			empty();
			
			childNodes = undefined;

			if (parentNode !== undefined) {
				removeFromParent();
				setParent(undefined);
			}

			if (SkyEngine.Screen !== self) {
				SkyEngine.Screen.unregisterNode(self);
			}

			// 모든 이벤트 제거
			eventMap = undefined;

			// 모든 터치 영역 제거
			for (let i = 0; i < touchAreas.length; i += 1) {
				touchAreas[i].remove();
			}
			touchAreas = undefined;

			// 모든 충돌 영역 제거
			for (let i = 0; i < colliders.length; i += 1) {
				colliders[i].remove();
			}
			colliders = undefined;

			collisionTargets = undefined
			collidingNodeIds = undefined;
			meetHandlerMap = undefined;
			partHandlerMap = undefined;
			
			if (domWrapper !== undefined) {
				domWrapper.remove();
			}

			isRemoved = true;
			
			if (displayResizeEvent !== undefined) {
				displayResizeEvent.remove();
				displayResizeEvent = undefined;
			}
		};

		let checkIsRemoved = self.checkIsRemoved = () => {
			return isRemoved;
		};
		
		let setToRemove = self.setToRemove = () => {
			pixiContainer.visible = false;
			isToRemove = true;
		};
		
		let addDom = self.addDom = (dom) => {
			//REQUIRED: dom
			
			if (domWrapper === undefined) {
				
				let ratio = SkyEngine.Screen.getRatio();
				
				domWrapper = DIV({
					style : {
						position : 'fixed',
						left : SkyEngine.Screen.getLeft() + (SkyEngine.Screen.getWidth() / 2 + drawingX - SkyEngine.Screen.getCameraFollowX()) * ratio,
						top : SkyEngine.Screen.getTop() + (SkyEngine.Screen.getHeight() / 2 + drawingY - SkyEngine.Screen.getCameraFollowY()) * ratio,
						transform : 'rotate(' + realRadian + 'rad) scale(' + ratio * realScaleX + ', ' + ratio * realScaleY + ')',
						opacity : 0,
						filter : filter
					}
				}).appendTo(BODY);
				
				DELAY(() => {
					domWrapper.addStyle({
						opacity : pixiContainer.worldAlpha
					});
				});
			}
			
			domWrapper.append(dom);
		};
		
		inner.getDomWrapper = () => {
			return domWrapper;
		};
		
		let getDomWrapper = self.getDomWrapper = () => {
			
			if (domWrapper === undefined) {
				
				let ratio = SkyEngine.Screen.getRatio();
				
				domWrapper = DIV({
					style : {
						position : 'fixed',
						left : SkyEngine.Screen.getLeft() + (SkyEngine.Screen.getWidth() / 2 + drawingX - SkyEngine.Screen.getCameraFollowX()) * ratio,
						top : SkyEngine.Screen.getTop() + (SkyEngine.Screen.getHeight() / 2 + drawingY - SkyEngine.Screen.getCameraFollowY()) * ratio,
						transform : 'rotate(' + realRadian + 'rad) scale(' + ratio * realScaleX + ', ' + ratio * realScaleY + ')',
						opacity : 0,
						filter : filter
					}
				}).appendTo(BODY);
				
				DELAY(() => {
					domWrapper.addStyle({
						opacity : pixiContainer.worldAlpha
					});
				});
			}
			
			return domWrapper;
		};
		
		let addDomStyle = self.addDomStyle = (domStyle) => {
			
			if (domWrapper === undefined) {
				
				domWrapper = DIV({
					style : {
						position : 'fixed',
						left : -999999,
						top : -999999
					}
				}).appendTo(BODY);
			}
			
			domWrapper.addStyle(domStyle);
		};
		
		let removeAllDoms = self.removeAllDoms = () => {
			
			if (domWrapper !== undefined) {
				domWrapper.empty();
			}
		};

		let on = self.on = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//REQUIRED: eventHandler
			
			if (isRemoved === true) {
				if (eventName === 'remove') {
					eventHandler(EMPTY_E(), self);
				}
			}
			
			else {
					
				if (eventMap[eventName] === undefined) {
					eventMap[eventName] = [];
				}
	
				eventMap[eventName].push(eventHandler);
			}
		};
		
		let checkIsEventExists = self.checkIsEventExists = (eventName) => {
			//REQUIRED: eventName
			
			return eventMap[eventName] !== undefined;
		};

		let off = self.off = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//OPTIONAL: eventHandler

			if (isRemoved !== true && eventMap[eventName] !== undefined) {

				if (eventHandler !== undefined) {

					REMOVE({
						array: eventMap[eventName],
						value: eventHandler
					});
				}

				if (eventHandler === undefined || eventMap[eventName].length === 0) {
					delete eventMap[eventName];
				}
			}
		};

		let fireEvent = self.fireEvent = (eventNameOrParams) => {
			//REQUIRED: eventNameOrParams
			//REQUIRED: eventNameOrParams.eventName
			//OPTIONAL: eventNameOrParams.e
			
			let eventName;
			let e;
			
			if (CHECK_IS_DATA(eventNameOrParams) !== true) {
				eventName = eventNameOrParams;
			} else {
				eventName = eventNameOrParams.eventName;
				e = eventNameOrParams.e;
			}
			
			let eventHandlers = eventMap[eventName];

			if (eventHandlers !== undefined) {
				
				for (let i = 0; i < eventHandlers.length; i += 1) {
					eventHandlers[i](e === undefined ? EMPTY_E() : e, self);
				}
			}
		};

		let onMeet = self.onMeet = (target, handler) => {

			collisionTargets.push(target);

			if (meetHandlerMap[target.id] === undefined) {
				meetHandlerMap[target.id] = [];
			}

			meetHandlerMap[target.id].push(handler);

			checkAllCollisions();
		};

		let offMeet = self.offMeet = (target, handler) => {

			if (handler === undefined) {
				delete meetHandlerMap[target.id];
			} else {
				REMOVE({
					array: meetHandlerMap[target.id],
					value: handler
				});
			}
		};

		let runMeetHandlers = self.runMeetHandlers = (target, realTarget) => {
			
			let meetHandlers = meetHandlerMap[target.id];

			if (meetHandlers !== undefined) {

				for (let i = 0; i < meetHandlers.length; i += 1) {
					meetHandlers[i](realTarget);
				}
			}
		};

		let onPart = self.onPart = (target, handler) => {

			collisionTargets.push(target);

			if (partHandlerMap[target.id] === undefined) {
				partHandlerMap[target.id] = [];
			}

			partHandlerMap[target.id].push(handler);
		};

		let offPart = self.offPart = (target, handler) => {

			if (handler === undefined) {
				delete partHandlerMap[target.id];
			} else {
				REMOVE({
					array: partHandlerMap[target.id],
					value: handler
				});
			}
		};

		let runPartHandlers = self.runPartHandlers = (target, realTarget) => {

			let partHandlers = partHandlerMap[target.id];

			if (partHandlers !== undefined) {

				for (let i = 0; i < partHandlers.length; i += 1) {
					partHandlers[i](realTarget);
				}
			}
		};

		let addTouchArea = self.addTouchArea = (touchArea) => {
			//REQUIRED: touchArea
			
			if (areaGraphics !== undefined) {
				areaGraphics.lineStyle(1, 0xFF00FF);
				touchArea.drawArea(areaGraphics);
			}

			touchAreas.push(touchArea);
			touchArea.setTarget(self);
			
			touchArea.on('remove', () => {
				
				REMOVE({
					array : touchAreas,
					value : touchArea
				});
			});
		};

		let getTouchAreas = self.getTouchAreas = () => {
			return touchAreas;
		};

		let getTouchArea = self.getTouchArea = () => {
			return touchAreas[0];
		};
		
		let addCollider = self.addCollider = (collider) => {
			//REQUIRED: collider
			
			if (areaGraphics !== undefined) {
				areaGraphics.lineStyle(1, 0x00FF00);
				collider.drawArea(areaGraphics);
			}

			colliders.push(collider);
			collider.setTarget(self);
			
			collider.on('remove', () => {
				
				REMOVE({
					array : colliders,
					value : collider
				});
			});
		};

		let getColliders = self.getColliders = () => {
			return colliders;
		};

		let getCollider = self.getCollider = () => {
			return colliders[0];
		};

		let checkPoint = self.checkPoint = (pointX, pointY) => {
			
			for (let i = 0; i < childNodes.length; i += 1) {
				if (childNodes[i].checkPoint(pointX, pointY) === true) {
					return true;
				}
			}
			
			return false;
		};

		let checkArea = self.checkArea = (area) => {
			
			for (let i = 0; i < childNodes.length; i += 1) {
				
				let childNode = childNodes[i];
				
				if (childNode.checkArea(area) === true || area.checkArea(childNode) === true) {
					return true;
				}
			}
			
			return false;
		};

		let checkTouch = self.checkTouch = (touchX, touchY) => {

			if (isRemoved === true || self.checkIsHiding() === true) {
				return false;
			}
			
			for (let i = 0; i < touchAreas.length; i += 1) {
				if (touchAreas[i].checkPoint(touchX, touchY) === true) {
					return true;
				}
			}
			
			for (let i = 0; i < childNodes.length; i += 1) {
				if (childNodes[i].checkTouch(touchX, touchY) === true) {
					return true;
				}
			}
			
			return false;
		};

		let checkOneSideCollision = self.checkOneSideCollision = (target) => {
			//REQUIRED: target

			if (isRemoved === true || self.checkIsHiding() === true) {
				return false;
			}
			
			else if (target.type === CLASS) {
				
				let registeredNodes = SkyEngine.Screen.findNodesByClass(target);
				
				for (let i = 0; i < registeredNodes.length; i += 1) {
					
					let realTarget = registeredNodes[i];
					
					if (realTarget !== self && self.checkOneSideCollision(realTarget) === true) {
						return true;
					}
				}
			}
			
			else {

				if (target.checkIsHiding() === true) {
					return false;
				}
				
				for (let i = 0; i < colliders.length; i += 1) {
					
					if (target.checkIsRemoved() !== true) {
						
						let collider = colliders[i];
						
						let targetColliders = target.getColliders();
						
						for (let j = 0; j < targetColliders.length; j += 1) {
							
							let targetCollider = targetColliders[j];
							
							if (collider.checkArea(targetCollider) === true || targetCollider.checkArea(collider) === true) {
								
								return true;
							}
						}
					}
				}
				
				for (let i = 0; i < childNodes.length; i += 1) {
					if (childNodes[i].checkOneSideCollision(target) === true) {
						return true;
					}
				}
			}
			
			return false;
		};
		
		let checkCollision = self.checkCollision = (target) => {
			//REQUIRED: target
			
			if (target.type === CLASS) {
				
				let registeredNodes = SkyEngine.Screen.findNodesByClass(target);
				
				for (let i = 0; i < registeredNodes.length; i += 1) {
					let realTarget = registeredNodes[i];
					
					if (realTarget !== self && realTarget.checkIsRemoved() !== true && (self.checkOneSideCollision(realTarget) === true || (self.type !== realTarget.type && realTarget.checkOneSideCollision(self) === true))) {
						return true;
					}
				}
			}
			
			else if (target.checkIsRemoved() !== true && (self.checkOneSideCollision(target) === true || (self.type !== target.type && target.checkOneSideCollision(self) === true))) {
				return true;
			}
			
			return false;
		};

		let checkOffScreen = self.checkOffScreen = () => {
			
			for (let i = 0; i < childNodes.length; i += 1) {
				if (childNodes[i].checkOffScreen() !== true) {
					return false;
				}
			}
			
			return true;
		};

		let checkAllCollisions = () => {
			
			for (let i = 0; i < collisionTargets.length; i += 1) {
				let target = collisionTargets[i];
				
				if (target.type === CLASS) {
					
					let registeredNodes = SkyEngine.Screen.findNodesByClass(target);
					
					for (let j = 0; j < registeredNodes.length; j += 1) {
						let realTarget = registeredNodes[j];
						
						if (realTarget !== self) {

							if (realTarget.checkIsRemoved() !== true) {

								if (
									(
										checkIsToCheckCollision() === true || realTarget.checkIsToCheckCollision() === true || (
											(maxCollisionWidth === undefined || Math.abs(realX - realTarget.getRealX()) < maxCollisionWidth) &&
											(maxCollisionHeight === undefined || Math.abs(realY - realTarget.getRealY()) < maxCollisionHeight)
										)
									) &&
									(self.checkOneSideCollision(realTarget) === true || (self.type !== realTarget.type && realTarget.checkOneSideCollision(self) === true))
								) {

									if (isRemoved !== true) {
										collidingNodeIds[realTarget.id] = true;

										runMeetHandlers(target, realTarget);
									}
								}
								
								else if (isRemoved !== true && collidingNodeIds[realTarget.id] !== undefined) {
									delete collidingNodeIds[realTarget.id];

									runPartHandlers(target, realTarget);
								}
								
							} else {
								delete collidingNodeIds[realTarget.id];
							}
						}
					}
				}
				
				else if (target.checkIsRemoved() !== true) {

					if (
						(
							checkIsToCheckCollision() === true || target.checkIsToCheckCollision() === true || (
								(maxCollisionWidth === undefined || Math.abs(realX - target.getRealX()) < maxCollisionWidth) &&
								(maxCollisionHeight === undefined || Math.abs(realY - target.getRealY()) < maxCollisionHeight)
							)
						) &&
						(self.checkOneSideCollision(target) === true || (self.type !== target.type && target.checkOneSideCollision(self) === true))
					) {

						if (collidingNodeIds[target.id] === undefined) {
							collidingNodeIds[target.id] = true;

							runMeetHandlers(target, target);
						}
					}
					
					else if (collidingNodeIds[target.id] !== undefined) {
						delete collidingNodeIds[target.id];

						runPartHandlers(target, target);
					}
				}
				
				else {

					collisionTargets.splice(i, 1);
					i -= 1;

					delete collidingNodeIds[target.id];
					delete meetHandlerMap[target.id];
					delete partHandlerMap[target.id];
				}
				
				if (collisionTargets === undefined) {
					break;
				}
			}
		};

		let step = self.step = (deltaTime) => {
			
			if (isToRemove === true) {
				remove();
			}
			
			else if (pauseCount === 0) {
				
				beforeX = x;
				beforeY = y;
				
				if (accelX !== 0) {
					speedX += accelX * deltaTime;
				}
				
				if (minSpeedX !== undefined && speedX < minSpeedX) {
					speedX = minSpeedX;
					
					if (speedX === 0) {
						
						if (moveXEndHandler !== undefined) {
							let _moveXEndHandler = moveXEndHandler;
							moveXEndHandler = undefined;
							_moveXEndHandler();
						}
						
						if (moveEndHandler !== undefined && speedY === 0) {
							let _moveEndHandler = moveEndHandler;
							moveEndHandler = undefined;
							_moveEndHandler();
						}
					}
				}
				
				if (maxSpeedX !== undefined && speedX > maxSpeedX) {
					speedX = maxSpeedX;
					
					if (speedX === 0) {
						
						if (moveXEndHandler !== undefined) {
							let _moveXEndHandler = moveXEndHandler;
							moveXEndHandler = undefined;
							_moveXEndHandler();
						}
						
						if (moveEndHandler !== undefined && speedY === 0) {
							let _moveEndHandler = moveEndHandler;
							moveEndHandler = undefined;
							_moveEndHandler();
						}
					}
				}
				
				if (accelY !== 0) {
					speedY += accelY * deltaTime;
				}
				
				if (minSpeedY !== undefined && speedY < minSpeedY) {
					speedY = minSpeedY;
					
					if (speedY === 0) {
						
						if (moveYEndHandler !== undefined) {
							let _moveYEndHandler = moveYEndHandler;
							moveYEndHandler = undefined;
							_moveYEndHandler();
						}
						
						if (moveEndHandler !== undefined && speedX === 0) {
							let _moveEndHandler = moveEndHandler;
							moveEndHandler = undefined;
							_moveEndHandler();
						}
					}
				}
				
				if (maxSpeedY !== undefined && speedY > maxSpeedY) {
					speedY = maxSpeedY;
					
					if (speedY === 0) {
						
						if (moveYEndHandler !== undefined) {
							let _moveYEndHandler = moveYEndHandler;
							moveYEndHandler = undefined;
							_moveYEndHandler();
						}
						
						if (moveEndHandler !== undefined && speedX === 0) {
							let _moveEndHandler = moveEndHandler;
							moveEndHandler = undefined;
							_moveEndHandler();
						}
					}
				}
				
				if (speedX !== 0) {
	
					let dx = speedX * deltaTime;
	
					if ((dx < 0 && isStuckLeft !== true) || (dx > 0 && isStuckRight !== true)) {
	
						x += dx;
	
						if (toX !== undefined) {
	
							if ((speedX > 0 && x > toX) || (speedX < 0 && x < toX)) {
								
								x = toX;
								
								toX = undefined;
								minSpeedX = undefined;
								maxSpeedX = undefined;
								
								speedX = 0;
								accelX = 0;
								
								if (moveXEndHandler !== undefined) {
									let _moveXEndHandler = moveXEndHandler;
									moveXEndHandler = undefined;
									_moveXEndHandler();
								}
								
								if (moveEndHandler !== undefined && speedY === 0) {
									let _moveEndHandler = moveEndHandler;
									moveEndHandler = undefined;
									_moveEndHandler();
								}
							}
						}
					}
				}
				
				if (speedY !== 0) {
	
					let dy = speedY * deltaTime;
					
					if ((dy < 0 && isStuckUp !== true) || (dy > 0 && isStuckDown !== true)) {

						y += dy;
	
						if (toY !== undefined) {
	
							if ((speedY > 0 && y > toY) || (speedY < 0 && y < toY)) {
								
								y = toY;
								
								toY = undefined;
								minSpeedY = undefined;
								maxSpeedY = undefined;
								
								speedY = 0;
								accelY = 0;
								
								if (moveYEndHandler !== undefined) {
									let _moveYEndHandler = moveYEndHandler;
									moveYEndHandler = undefined;
									_moveYEndHandler();
								}
								
								if (moveEndHandler !== undefined && speedX === 0) {
									let _moveEndHandler = moveEndHandler;
									moveEndHandler = undefined;
									_moveEndHandler();
								}
							}
						}
						
						if (isY2ZIndex === true) {
							setZIndex(y);
						}
					}
				}
				
				if (scalingAccelX !== 0) {
					scalingSpeedX += scalingAccelX * deltaTime;
				}
				
				if (minScalingSpeedX !== undefined && scalingSpeedX < minScalingSpeedX) {
					scalingSpeedX = minScalingSpeedX;
				}
				
				if (maxScalingSpeedX !== undefined && scalingSpeedX > maxScalingSpeedX) {
					scalingSpeedX = maxScalingSpeedX;
				}
				
				if (scalingAccelY !== 0) {
					scalingSpeedY += scalingAccelY * deltaTime;
				}
				
				if (minScalingSpeedY !== undefined && scalingSpeedY < minScalingSpeedY) {
					scalingSpeedY = minScalingSpeedY;
				}
				
				if (maxScalingSpeedY !== undefined && scalingSpeedY > maxScalingSpeedY) {
					scalingSpeedY = maxScalingSpeedY;
				}
				
				if (scalingSpeedX !== 0) {
					scaleX += scalingSpeedX * deltaTime;
	
					if (toScaleX !== undefined) {
	
						if ((scalingSpeedX > 0 && scaleX > toScaleX) || (scalingSpeedX < 0 && scaleX < toScaleX)) {
							
							scaleX = toScaleX;
							
							toScaleX = undefined;
							minScalingSpeedX = undefined;
							maxScalingSpeedX = undefined;
							
							scalingSpeedX = 0;
							scalingAccelX = 0;
							
							if (scaleXEndHandler !== undefined) {
								let _scaleXEndHandler = scaleXEndHandler;
								scaleXEndHandler = undefined;
								_scaleXEndHandler();
							}
							
							if (scaleEndHandler !== undefined && scalingSpeedY === 0) {
								let _scaleEndHandler = scaleEndHandler;
								scaleEndHandler = undefined;
								_scaleEndHandler();
							}
						}
					}
				}
				
				if (scalingSpeedY !== 0) {
					scaleY += scalingSpeedY * deltaTime;
					
					if (toScaleY !== undefined) {
						
						if ((scalingSpeedY > 0 && scaleY > toScaleY) || (scalingSpeedY < 0 && scaleY < toScaleY)) {
							
							scaleY = toScaleY;
							
							toScaleY = undefined;
							minScalingSpeedY = undefined;
							maxScalingSpeedY = undefined;
							
							scalingSpeedY = 0;
							scalingAccelY = 0;
							
							if (scaleYEndHandler !== undefined) {
								let _scaleYEndHandler = scaleYEndHandler;
								scaleYEndHandler = undefined;
								_scaleYEndHandler();
							}
							
							if (scaleEndHandler !== undefined && scalingSpeedX === 0) {
								let _scaleEndHandler = scaleEndHandler;
								scaleEndHandler = undefined;
								_scaleEndHandler();
							}
						}
					}
				}
				
				if (rotationAccel !== 0) {
					rotationSpeed += rotationAccel * deltaTime;
				}
				
				if (minRotationSpeed !== undefined && rotationSpeed < minRotationSpeed) {
					rotationSpeed = minRotationSpeed;
				}
				
				if (maxRotationSpeed !== undefined && rotationSpeed > maxRotationSpeed) {
					rotationSpeed = maxRotationSpeed;
				}
				
				if (rotationSpeed !== 0) {
					angle += rotationSpeed * deltaTime;
	
					if (toAngle !== undefined) {
	
						if (angle + toAngle < 360 && ((rotationSpeed > 0 && angle >= toAngle) || (rotationSpeed < 0 && angle <= toAngle))) {
							
							angle = toAngle;
							
							toAngle = undefined;
							minRotationSpeed = undefined;
							maxRotationSpeed = undefined;
							
							rotationSpeed = 0;
							rotationAccel = 0;
							
							if (rotateEndHandler !== undefined) {
								let _rotateEndHandler = rotateEndHandler;
								rotateEndHandler = undefined;
								_rotateEndHandler();
							}
						}
					}
	
					if (angle >= 360) {
						angle = 0;
					} else if (angle <= 0) {
						angle = 360;
					}
				}
				
				if (fadingAccel !== 0) {
					fadingSpeed += fadingAccel * deltaTime;
				}
				
				if (minFadingSpeed !== undefined && fadingSpeed < minFadingSpeed) {
					fadingSpeed = minFadingSpeed;
				}
				
				if (maxFadingSpeed !== undefined && fadingSpeed > maxFadingSpeed) {
					fadingSpeed = maxFadingSpeed;
				}
				
				if (fadingSpeed !== 0) {
					alpha += fadingSpeed * deltaTime;
	
					if (toAlpha !== undefined) {
	
						if ((fadingSpeed > 0 && alpha > toAlpha) || (fadingSpeed < 0 && alpha < toAlpha)) {
							
							alpha = toAlpha;
							
							toAlpha = undefined;
							minFadingSpeed = undefined;
							maxFadingSpeed = undefined;
							
							fadingSpeed = 0;
							fadingAccel = 0;
							
							if (fadeEndHandler !== undefined) {
								let _fadeEndHandler = fadeEndHandler;
								fadeEndHandler = undefined;
								_fadeEndHandler();
							}
						}
					}
	
					if (alpha > 1) {
						alpha = 1;
					} else if (alpha < 0) {
						alpha = 0;
					}
				}
				
				genRealProperties();
				
				// 모든 터치 영역에 대해 실행
				if (isRemoved !== true) {
					for (let i = 0; i < touchAreas.length; i += 1) {
						touchAreas[i].step(deltaTime);
					}
				}
				
				// 모든 충돌 영역에 대해 실행
				if (isRemoved !== true) {
					for (let i = 0; i < colliders.length; i += 1) {
						colliders[i].step(deltaTime);
					}
				}
				
				if (isRemoved !== true) {
					
					// 충돌 체크
					checkAllCollisions();
				}
				
				// 모든 자식 노드들에 대해 실행
				if (isRemoved !== true) {
					for (let i = 0; i < childNodes.length; i += 1) {
						childNodes[i].step(deltaTime);
						if (childNodes === undefined) {
							break;
						}
					}
				}
				
				if (isRemoved !== true && eventMap.offscreen !== undefined && self.checkOffScreen() === true) {
					fireEvent('offscreen');
				}
				
				if (isRemoved !== true && eventMap.nextstep !== undefined) {
					fireEvent('nextstep');
					off('nextstep');
				}
				
				if (isRemoved !== true && eventMap.move !== undefined && (x !== beforeX || y !== beforeY)) {
					fireEvent('move');
				}
				
				// PixiJS 컨테이너 재조정
				pixiContainer.x = x;
				pixiContainer.y = y;
				pixiContainer.pivot.set(centerX, centerY);
				pixiContainer.scale.set(scaleX, scaleY);
				pixiContainer.rotation = angle * Math.PI / 180;
				pixiContainer.alpha = alpha;
				
				if (areaGraphics !== undefined) {
					areaGraphics.x = centerX;
					areaGraphics.y = centerY;
				}
				
				if (isRemoved !== true && domWrapper !== undefined) {
					
					let ratio = SkyEngine.Screen.getRatio();
					let domFilter = TO_DELETE;
					
					let target = self;
					while (target !== undefined) {
						
						if (target.getFilter() !== undefined) {
							domFilter = target.getFilter();
							break;
						}
						
						target = target.getParent();
					}
					
					domWrapper.addStyle({
						left : SkyEngine.Screen.getLeft() + (SkyEngine.Screen.getWidth() / 2 + drawingX - SkyEngine.Screen.getCameraFollowX()) * ratio - domWrapper.getWidth() / 2,
						top : SkyEngine.Screen.getTop() + (SkyEngine.Screen.getHeight() / 2 + drawingY - SkyEngine.Screen.getCameraFollowY()) * ratio - domWrapper.getHeight() / 2,
						transform : 'rotate(' + realRadian + 'rad) scale(' + ratio * realScaleX + ', ' + ratio * realScaleY + ')',
						opacity : isFirstFixDomStyle === true ? 0 : pixiContainer.worldAlpha,
						filter : domFilter
					});
					
					isFirstFixDomStyle = false;
				}
			}
		};

		let drawArea = self.drawArea = (graphics) => {
			//REQUIRED: graphics
			
			let children = self.getChildren();
			
			for (let i = 0; i < children.length; i += 1) {
				children[i].drawArea(graphics);
			}
		};
		
		let pause = self.pause = () => {
			pauseCount += 1;
		};
		
		let checkIsPaused = self.checkIsPaused = () => {
			return pauseCount > 0;
		};
		
		let resume = self.resume = () => {
			
			pauseCount -= 1;
			
			if (pauseCount < 0) {
				pauseCount = 0;
			}
		};
		
		let checkIsToCheckCollision = self.checkIsToCheckCollision = () => {
			return isToCheckCollision;
		};
		
		let delay = self.delay = (seconds, func) => {
			
			let _delay = SkyEngine.Delay(seconds, func);
			
			on('remove', () => {
				_delay.remove();
				_delay = undefined;
			});
			
			return _delay;
		};
		
		let interval = self.interval = (seconds, func) => {
			
			let _interval = SkyEngine.Interval(seconds, func);
			
			on('remove', () => {
				_interval.remove();
				_interval = undefined;
			});
			
			return _interval;
		};

		genRealProperties();
		
		// 개발 모드에서는 중점 및 영역 표시
		if (BROWSER_CONFIG.SkyEngine.isDebugMode === true) {
			
			areaGraphics = new PIXI.Graphics();
			
			// 중점을 그립니다.
			areaGraphics.lineStyle(1, 0x00FFFF);
			areaGraphics.drawRect(-1, -1, 2, 2);
			
			areaGraphics.moveTo(-15, 0);
			areaGraphics.lineTo(15, 0);
			areaGraphics.moveTo(0, -15);
			areaGraphics.lineTo(0, 15);
			
			// 터치 영역을 그립니다.
			let touchAreas = self.getTouchAreas();
			
			areaGraphics.lineStyle(1, 0xFF00FF);
			
			for (let i = 0; i < touchAreas.length; i += 1) {
				touchAreas[i].drawArea(areaGraphics);
			}
			
			// 충돌 영역을 그립니다.
			let colliders = self.getColliders();
			
			areaGraphics.lineStyle(1, 0x00FF00);
			
			for (let i = 0; i < colliders.length; i += 1) {
				colliders[i].drawArea(areaGraphics);
			}
			
			areaGraphics.zIndex = 9999999;
			
			addToPixiContainer(areaGraphics);
		}
	},

	afterInit: (inner, self, params) => {

		if (params !== undefined) {

			if (params.c !== undefined) {
				if (CHECK_IS_ARRAY(params.c) === true) {
					EACH(params.c, (childNode) => {
						if (childNode !== undefined) {
							self.append(childNode);
						}
					});
				} else {
					self.append(params.c);
				}
			}

			if (params.dom !== undefined) {
				if (CHECK_IS_ARRAY(params.dom) === true) {
					EACH(params.dom, (childNode) => {
						self.addDom(childNode);
					});
				} else {
					self.addDom(params.dom);
				}
			}
			
			if (params.domStyle !== undefined) {
				self.addDomStyle(params.domStyle);
			}

			if (params.on !== undefined) {
				EACH(params.on, (eventHandler, eventName) => {
					if (eventHandler !== undefined) {
						self.on(eventName, eventHandler);
					}
				});
			}

			if (params.touchArea !== undefined) {
				if (CHECK_IS_ARRAY(params.touchArea) === true) {
					EACH(params.touchArea, (touchArea) => {
						self.addTouchArea(touchArea);
					});
				} else {
					self.addTouchArea(params.touchArea);
				}
			}

			if (params.collider !== undefined) {
				if (CHECK_IS_ARRAY(params.collider) === true) {
					EACH(params.collider, (collider) => {
						self.addCollider(collider);
					});
				} else {
					self.addCollider(params.collider);
				}
			}
		}
	}
});