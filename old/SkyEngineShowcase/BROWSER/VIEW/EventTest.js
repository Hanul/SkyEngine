SkyEngineShowcase.EventTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let rect = SkyEngine.Rect({
			x : -50,
			y : -50,
			width : 60,
			height : 40,
			color : '#008000',
			scale : 1.2,
			angle : 45,
			on : {
				touchstart : () => {
					console.log('This is Rect!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		rect.addTouchArea(SkyEngine.Rect({
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
				},
				offscreen :  () => {
					console.log('Offscreen!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		circle.moveRight(100);
		
		let delay = SkyEngine.Delay(5, () => {
			circle.stopRight();
			circle.moveDown(100);
			
			delay = SkyEngine.Delay(5, () => {
				
				circle.flipX();
				
				circle.stopDown();
				circle.moveLeft(100);
				
				let repeat = RAR(() => {
				
					delay = SkyEngine.Delay(5, () => {
						
						circle.stopLeft();
						circle.moveUp(100);
						
						delay = SkyEngine.Delay(5, () => {
						
							circle.flipX();
							
							circle.stopUp();
							circle.moveRight(100);
							
							delay = SkyEngine.Delay(5, () => {
								
								circle.stopRight();
								circle.moveDown(100);
								
								delay = SkyEngine.Delay(5, () => {
									
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
		
		circle.addTouchArea(SkyEngine.Circle({
			width : 60,
			height : 40,
			c : SkyEngine.Circle({
				width : 40,
				height : 60
			})
		}));
		
		let polygon = SkyEngine.Polygon({
			x : -50,
			y : 0,
			z : 1,
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
				touchstart : (e) => {
					console.log('This is Polygon!');
					e.stopBubbling();
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		polygon.addTouchArea(SkyEngine.Polygon({
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
		
		let character = SkyEngine.Silhouette({
			src : SkyEngineShowcase.R('robot/run1.png'),
			x : 50,
			y : 50,
			fps : 10,
			scale : 0.2,
			angle : 45,
			color : '#008000',
			on : {
				touchstart : () => {
					console.log('This is Silhouette!');
				}
			}
		}).appendTo(SkyEngine.Screen);
		
		character.addTouchArea(SkyEngine.Silhouette({
			src : SkyEngineShowcase.R('robot/run1.png')
		}));
		
		inner.on('close', () => {
			rect.remove();
			circle.remove();
			polygon.remove();
			character.remove();
			
			delay.remove();
		});
	}
});
