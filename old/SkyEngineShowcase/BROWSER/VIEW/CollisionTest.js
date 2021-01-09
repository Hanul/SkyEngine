SkyEngineShowcase.CollisionTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let line = SkyEngine.Line({
			y : -140,
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
			height : 40,
			c : SkyEngine.Rect({
				width : 40,
				height : 60
			})
		}));
		
		let circle = SkyEngine.Circle({
			x : 50,
			y : -50,
			width : 60,
			height : 40,
			color : '#FFFF00',
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
			height : 40,
			c : SkyEngine.Circle({
				width : 40,
				height : 60
			})
		}));
		
		circle.onMeet(SkyEngine.Line, () => {
			console.log('Met Line!');
		});
		
		circle.onPart(SkyEngine.Line, () => {
			console.log('Parted Line!');
		});
		
		circle.onMeet(SkyEngine.Rect, () => {
			console.log('Met Rect!');
		});
		
		circle.onPart(SkyEngine.Rect, () => {
			console.log('Parted Rect!');
		});
		
		circle.onMeet(SkyEngine.Polygon, () => {
			console.log('Met Polygon!');
		});
		
		circle.onPart(SkyEngine.Polygon, () => {
			console.log('Parted Polygon!');
		});
		
		let polygon = SkyEngine.Polygon({
			x : 100,
			y : 80,
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
			color : '#FFFF00',
			scale : 0.7,
			angle : -45,
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
			}],
			c : SkyEngine.Polygon({
				points : [{
					x : 30,
					y : -50
				}, {
					x : -50,
					y : -40
				}, {
					x : -20,
					y : 50
				}]
			})
		}));
		
		circle.moveRight(100);
		
		let delay = SkyEngine.Delay(1, () => {
			circle.stopRight();
			circle.moveDown(100);
			
			delay = SkyEngine.Delay(1, () => {
				
				circle.flipX();
				
				circle.stopDown();
				circle.moveLeft(100);
				
				let repeat = RAR(() => {
				
					delay = SkyEngine.Delay(2, () => {
						
						circle.stopLeft();
						circle.moveUp(100);
						
						delay = SkyEngine.Delay(2, () => {
						
							circle.flipX();
							
							circle.stopUp();
							circle.moveRight(100);
							
							delay = SkyEngine.Delay(2, () => {
								
								circle.stopRight();
								circle.moveDown(100);
								
								delay = SkyEngine.Delay(2, () => {
									
									circle.flipX();
									
									circle.stopDown();
									circle.moveLeft(100);
									
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
			
			delay.remove();
		});
	}
});
