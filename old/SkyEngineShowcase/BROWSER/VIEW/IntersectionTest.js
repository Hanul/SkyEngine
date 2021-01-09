SkyEngineShowcase.IntersectionTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let line = SkyEngine.Line({
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10,
			border : '5px solid #FF0000'
		}).appendTo(SkyEngine.Screen);
		
		line.addCollider(SkyEngine.Line({
			startX : -100,
			startY : -10,
			endX : 100,
			endY : 10
		}));
		
		let rect = SkyEngine.Rect({
			x : -50,
			y : 80,
			width : 60,
			height : 40,
			color : '#10B506',
			scale : 1.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Rect!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		rect.addCollider(SkyEngine.Rect({
			width : 60,
			height : 40
		}));
		
		let circle = SkyEngine.Circle({
			x : 50,
			y : -50,
			width : 60,
			height : 40,
			color : '#10B506',
			scale : 1.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Circle!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		circle.addCollider(SkyEngine.Circle({
			width : 60,
			height : 40
		}));
		
		let polygon = SkyEngine.Polygon({
			x : 250,
			y : 30,
			points : [{
				x : -30,
				y : 50
			}, {
				x : 50,
				y : 40
			}, {
				x : 20,
				y : -50
			}],
			color : '#10B506',
			scale : 0.7,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Polygon!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		polygon.addCollider(SkyEngine.Polygon({
			points : [{
				x : -30,
				y : 50
			}, {
				x : 50,
				y : 40
			}, {
				x : 20,
				y : -50
			}]
		}));
		
		let line2 = SkyEngine.Line({
			x : 50,
			y : -50,
			startX : -100,
			startY : 10,
			endX : 100,
			endY : -10,
			border : '5px solid #FF0000'
		}).appendTo(SkyEngine.Screen);
		
		line2.addCollider(SkyEngine.Line({
			startX : -100,
			startY : 10,
			endX : 100,
			endY : -10
		}));
		
		let circles = [];
		
		line2.onMeet(SkyEngine.Figure, (line) => {
			
			EACH(line2.findIntersectionPoints(line), (intersectionPoint) => {
				
				circles.push(SkyEngine.Circle({
					x : intersectionPoint.x,
					y : intersectionPoint.y,
					width : 10,
					height : 10,
					color : '#FFFF00'
				}).appendTo(SkyEngine.Screen));
			});
		});
		
		line2.moveRight(100);
		
		let delay = SkyEngine.Delay(1, () => {
			line2.stopRight();
			line2.moveDown(100);
			
			delay = SkyEngine.Delay(1, () => {
				
				line2.stopDown();
				line2.moveLeft(100);
				
				let repeat = RAR(() => {
				
					delay = SkyEngine.Delay(2, () => {
						
						line2.stopLeft();
						line2.moveUp(100);
						
						delay = SkyEngine.Delay(2, () => {
							
							line2.stopUp();
							line2.moveRight(100);
							
							delay = SkyEngine.Delay(2, () => {
								
								line2.stopRight();
								line2.moveDown(100);
								
								delay = SkyEngine.Delay(2, () => {
									
									line2.stopDown();
									line2.moveLeft(100);
									
									repeat();
								});
							});
						});
					});
				});
			});
		});
		
		inner.on('close', () => {
			line.remove();
			rect.remove();
			circle.remove();
			polygon.remove();
			line2.remove();
			
			EACH(circles, (circle) => {
				circle.remove();
			});
		});
	}
});
