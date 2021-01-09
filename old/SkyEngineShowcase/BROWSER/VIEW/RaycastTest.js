SkyEngineShowcase.RaycastTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let light;
		
		// 앵글의 제곱을 계산합니다.
		let genAngleSquare = (point) => {
			
			let xs = point.x - torch.getX();
			let ys = point.y - torch.getY();
			
			point.angleSquare = Math.acos(xs / Math.sqrt(xs * xs + ys * ys));
			
			if (point.y > torch.getY()) {
			    point.angleSquare = Math.PI + Math.PI - point.angleSquare;
			}
		};
		
		// 빛을 생성합니다.
		let genLight = () => {
			
			// 이미 빛이 있다면 제거
			if (light !== undefined) {
				light.remove();
			}
			
			// 화면의 끝 지점을 포함합니다.
			let points = [{
				x : -SkyEngine.Screen.getWidth() / 2,
				y : -SkyEngine.Screen.getHeight() / 2
			}, {
				x : SkyEngine.Screen.getWidth() / 2,
				y : -SkyEngine.Screen.getHeight() / 2
			}, {
				x : SkyEngine.Screen.getWidth() / 2,
				y : SkyEngine.Screen.getHeight() / 2
			}, {
				x : -SkyEngine.Screen.getWidth() / 2,
				y : SkyEngine.Screen.getHeight() / 2
			}];
			
			// 모든 공들 확인
			balls.forEach((ball) => {
				ball.getCollider().findRaycastPoints(torch.getX(), torch.getY()).forEach((point) => {
					point.target = ball;
					points.push(point);
				});
			});
			
			// 모든 박스들 확인
			boxes.forEach((box) => {
				box.getCollider().findRaycastPoints(torch.getX(), torch.getY()).forEach((point) => {
					point.target = box;
					points.push(point);
				});
			});
			
			// 모든 별들 확인
			stars.forEach((star) => {
				star.getCollider().findRaycastPoints(torch.getX(), torch.getY()).forEach((point) => {
					point.target = star;
					points.push(point);
				});
			});
			
			let foundPoints = [];
			
			// 모든 점들 검사
			points.forEach((point) => {
				
				let originX = point.x;
				let originY = point.y;
				
				let xs = point.x - torch.getX();
				let ys = point.y - torch.getY();
				let originDistance = xs * xs + ys * ys;
				
				// 무한한 직선 그림
				if (Math.abs(point.x - torch.getX()) < Math.abs(point.y - torch.getY())) {
					point.x = ((point.y - torch.getY() < 0 ? -999999 : 999999) - torch.getY()) / (point.y - torch.getY()) * (point.x - torch.getX()) + torch.getX();
					point.y = point.y - torch.getY() < 0 ? -999999 : 999999;
				} else {
					point.y = (point.y - torch.getY()) / (point.x - torch.getX()) * ((point.x - torch.getX() < 0 ? -999999 : 999999) - torch.getX()) + torch.getY();
					point.x = point.x - torch.getX() < 0 ? -999999 : 999999;
				}
				
				let minDistance, foundPoint;
				
				// 직선과 스크린의 교점을 검색
				EACH(SkyEngine.Line.findRectIntersectionPoints(
					0, 0,
					torch.getX(), torch.getY(),
					point.x, point.y,
					1, 1,
					0, 1,
					
					0, 0,
					SkyEngine.Screen.getWidth(), SkyEngine.Screen.getHeight(),
					1, 1,
					0, 1
				), (point) => {
					
					let xs = point.x - torch.getX();
					let ys = point.y - torch.getY();
					
					minDistance = xs * xs + ys * ys;
					foundPoint = point;
				});
				
				// 직선과 모든 공들의 교점을 검색
				balls.forEach((ball) => {
					
					if (point.target !== ball) {
						
						let collider = ball.getCollider();
						
						EACH(SkyEngine.Line.findCircleIntersectionPoints(
							0, 0,
							torch.getX(), torch.getY(),
							point.x, point.y,
							1, 1,
							0, 1,
							
							collider.getDrawingX(), collider.getDrawingY(),
							collider.getWidth(), collider.getHeight(),
							collider.getRealScaleX(), collider.getRealScaleY(),
							collider.getRealSin(), collider.getRealCos()
						), (point) => {
							
							let xs = point.x - torch.getX();
							let ys = point.y - torch.getY();
							let distance = xs * xs + ys * ys;
							
							if (distance < minDistance) {
								minDistance = distance;
								foundPoint = point;
							}
						});
					}
				});
				
				// 직선과 모든 박스들의 교점을 검색
				boxes.forEach((box) => {
					
					if (point.target !== box) {
						
						let collider = box.getCollider();
						
						EACH(SkyEngine.Line.findRectIntersectionPoints(
							0, 0,
							torch.getX(), torch.getY(),
							point.x, point.y,
							1, 1,
							0, 1,
							
							collider.getDrawingX(), collider.getDrawingY(),
							collider.getWidth(), collider.getHeight(),
							collider.getRealScaleX(), collider.getRealScaleY(),
							collider.getRealSin(), collider.getRealCos()
						), (point) => {
							
							let xs = point.x - torch.getX();
							let ys = point.y - torch.getY();
							let distance = xs * xs + ys * ys;
							
							if (distance < minDistance) {
								minDistance = distance;
								foundPoint = point;
							}
						});
					}
				});
				
				// 직선과 모든 별들의 교점을 검색
				stars.forEach((star) => {
					
					if (point.target !== star) {
						
						let collider = star.getCollider();
						
						EACH(SkyEngine.Line.findPolygonIntersectionPoints(
							0, 0,
							torch.getX(), torch.getY(),
							point.x, point.y,
							1, 1,
							0, 1,
							
							collider.getDrawingX(), collider.getDrawingY(),
							collider.getPoints(),
							collider.getRealScaleX(), collider.getRealScaleY(),
							collider.getRealSin(), collider.getRealCos()
						), (point) => {
							
							let xs = point.x - torch.getX();
							let ys = point.y - torch.getY();
							let distance = xs * xs + ys * ys;
							
							if (distance < minDistance) {
								minDistance = distance;
								foundPoint = point;
							}
						});
					}
				});
				
				if (foundPoint !== undefined) {
					foundPoints.push(foundPoint);
					
					// 원래 타겟의 거리보다 먼 교점인 경우, 타겟 내부 점 추가
					if (point.target !== undefined && originDistance < minDistance) {
						foundPoints.push({
							x : (originX * 2 + point.target.getX()) / 3,
							y : (originY * 2 + point.target.getY()) / 3
						});
					}
				}
			});
			
			// 모든 교점들 각도로 정렬
			foundPoints.sort((pointA, pointB) => {
				
				if (pointA.angleSquare === undefined) {
					genAngleSquare(pointA);
				}
				
				if (pointB.angleSquare === undefined) {
					genAngleSquare(pointB);
				}
				
				return pointA.angleSquare - pointB.angleSquare;
			});
			
			// 빛 생성
			light = SkyEngine.Polygon({
				points : foundPoints,
				color : '#FFCC00',
				zIndex : -1
			}).appendTo(SkyEngine.Screen);
		};
		
		let torch = SkyEngine.Sprite({
			src : SkyEngineShowcase.R('torch.png'),
			spriteWidth : 32,
			fps : 10,
			on : {
				move : () => {
					DELAY(genLight);
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		let balls = [];
		
		REPEAT(10, () => {
			
			balls.push(SkyEngine.Image({
				src : SkyEngineShowcase.R('ball.png'),
				x : RANDOM({
					min : -600,
					max : 600
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : 0.2,
				collider : SkyEngine.Circle({
					width : 99,
					height : 96
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		let boxes = [];
		
		REPEAT(10, () => {
			
			boxes.push(SkyEngine.Image({
				src : SkyEngineShowcase.R('box.png'),
				x : RANDOM({
					min : -600,
					max : 600
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : 0.05,
				collider : SkyEngine.Rect({
					width : 512,
					height : 512
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		let stars = [];
		
		REPEAT(10, () => {
			
			stars.push(SkyEngine.Image({
				src : SkyEngineShowcase.R('star.png'),
				x : RANDOM({
					min : -600,
					max : 600
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : 0.1,
				collider : SkyEngine.Polygon({
					points : [{
						x : 0,
						y : -100
					}, {
						x : 50,
						y : -38
					}, {
						x : 100,
						y : -26
					}, {
						x : 63,
						y : 26
					}, {
						x : 65,
						y : 100
					}, {
						x : 0,
						y : 70
					}, {
						x : -65,
						y : 100
					}, {
						x : -63,
						y : 26
					}, {
						x : -100,
						y : -26
					}, {
						x : -50,
						y : -38
					}]
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		genLight();
		
		let keydownEvent = EVENT('keydown', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				torch.setState('shoot');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				torch.moveUp(200);
			} else if (e.getKey() === 'ArrowDown') {
				torch.moveDown(200);
			} else if (e.getKey() === 'ArrowLeft') {
				torch.moveLeft(200);
			} else if (e.getKey() === 'ArrowRight') {
				torch.moveRight(200);
			}
		});
		
		let keyupEvent = EVENT('keyup', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				torch.setToState('idle');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				torch.stopUp();
			} else if (e.getKey() === 'ArrowDown') {
				torch.stopDown();
			} else if (e.getKey() === 'ArrowLeft') {
				torch.stopLeft();
			} else if (e.getKey() === 'ArrowRight') {
				torch.stopRight();
			}
		});
		
		inner.on('close', () => {
			torch.remove();
			EACH(balls, (ball) => {
				ball.remove();
			});
			EACH(boxes, (box) => {
				box.remove();
			});
			EACH(stars, (star) => {
				star.remove();
			});
			
			if (light !== undefined) {
				light.remove();
			}
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
