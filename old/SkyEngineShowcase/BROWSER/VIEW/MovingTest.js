SkyEngineShowcase.MovingTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let character2;
		let character3;
		
		let character = SkyEngine.Sprite({
			srcs : [
				SkyEngineShowcase.R('robot/run1.png'),
				SkyEngineShowcase.R('robot/run2.png'),
				SkyEngineShowcase.R('robot/run3.png'),
				SkyEngineShowcase.R('robot/run4.png'),
				SkyEngineShowcase.R('robot/run5.png'),
				SkyEngineShowcase.R('robot/run6.png'),
				SkyEngineShowcase.R('robot/run7.png'),
				SkyEngineShowcase.R('robot/run8.png')
			],
			fps : 10,
			scale : 0.5,
			angle : 10,
			c : [character2 = SkyEngine.Sprite({
				srcs : [
					SkyEngineShowcase.R('robot/run1.png'),
					SkyEngineShowcase.R('robot/run2.png'),
					SkyEngineShowcase.R('robot/run3.png'),
					SkyEngineShowcase.R('robot/run4.png'),
					SkyEngineShowcase.R('robot/run5.png'),
					SkyEngineShowcase.R('robot/run6.png'),
					SkyEngineShowcase.R('robot/run7.png'),
					SkyEngineShowcase.R('robot/run8.png')
				],
				fps : 10,
				scale : 0.5
			}), character3 = SkyEngine.Sprite({
				srcs : [
					SkyEngineShowcase.R('robot/run1.png'),
					SkyEngineShowcase.R('robot/run2.png'),
					SkyEngineShowcase.R('robot/run3.png'),
					SkyEngineShowcase.R('robot/run4.png'),
					SkyEngineShowcase.R('robot/run5.png'),
					SkyEngineShowcase.R('robot/run6.png'),
					SkyEngineShowcase.R('robot/run7.png'),
					SkyEngineShowcase.R('robot/run8.png')
				],
				fps : 10,
				scale : 0.5
			})]
		}).appendTo(SkyEngine.Screen);
		
		character.moveRight(100);
		
		let delay = SkyEngine.Delay(1, () => {
			character.stopRight();
			character.moveDown(100);
			
			delay = SkyEngine.Delay(1, () => {
				
				character.flipX();
				
				character.stopDown();
				character.moveLeft(100);
				
				let repeat = RAR(() => {
				
					delay = SkyEngine.Delay(2, () => {
						
						character.stopLeft();
						character.moveUp(100);
						
						delay = SkyEngine.Delay(2, () => {
						
							character.flipX();
							
							character.stopUp();
							character.moveRight(100);
							
							delay = SkyEngine.Delay(2, () => {
								
								character.stopRight();
								character.moveDown(100);
								
								delay = SkyEngine.Delay(2, () => {
									
									character.flipX();
									
									character.stopDown();
									character.moveLeft(100);
									
									repeat();
								});
							});
						});
					});
				});
			});
		});
		
		character2.moveTo({
			toX : 100,
			accel : 100
		});
		
		character3.moveTo({
			toX : 100,
			toY : 100,
			accel : 100
		});
		
		inner.on('close', () => {
			character.remove();
			delay.remove();
		});
	}
});
