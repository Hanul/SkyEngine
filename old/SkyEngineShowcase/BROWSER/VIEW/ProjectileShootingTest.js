SkyEngineShowcase.ProjectileShootingTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let Enemy = CLASS({
			preset : () => {
				return SkyEngine.Sprite;
			}
		});
		
		let enemies = [];
		REPEAT(100, () => {
			
			enemies.push(Enemy({
				x : 500 + RANDOM({
					min : -300,
					max : 300
				}),
				y : RANDOM({
					min : -300,
					max : 300
				}),
				scale : -0.5,
				srcs : RUN(() => {
					
					let srcs = [];
					
					REPEAT(20, (i) => {
						srcs.push(SkyEngineShowcase.R('knife/idle/survivor-idle_knife_' + i + '.png'));
					});
					
					return srcs;
				}),
				fps : 24,
				collider : SkyEngine.Rect({
					x : -30,
					width : 70,
					height : 70
				})
			}).appendTo(SkyEngine.Screen));
		});
		
		let hero = SkyEngine.StateSet({
			x : -500,
			scale : 0.5,
			stateNodes : {
				idle : SkyEngine.Sprite({
					srcs : RUN(() => {
						
						let srcs = [];
						
						REPEAT(20, (i) => {
							srcs.push(SkyEngineShowcase.R('rifle/idle/survivor-idle_rifle_' + i + '.png'));
						});
						
						return srcs;
					}),
					fps : 10
				}),
				shoot : SkyEngine.Sprite({
					srcs : RUN(() => {
						
						let srcs = [];
						
						REPEAT(3, (i) => {
							srcs.push(SkyEngineShowcase.R('rifle/shoot/survivor-shoot_rifle_' + i + '.png'));
						});
						
						return srcs;
					}),
					fps : 10,
					on : {
						framechange : (e, sprite) => {
							if (sprite.getBeforeFrame() === 0) {
								
								let bullet = SkyEngine.Sprite({
									src : SkyEngineShowcase.R('bullet.png'),
									x : hero.getX() + 70,
									y : hero.getY() + 24,
									spriteWidth : 16,
									fps : 10,
									speedX : 2000,
									on : {
										offscreen : (e, bullet) => {
											bullet.remove();
										}
									},
									collider : SkyEngine.Circle({
										width : 16,
										height : 16
									})
								}).appendTo(SkyEngine.Screen);
								
								bullet.onMeet(Enemy, (enemy) => {
									bullet.remove();
									
									REMOVE({
										array : enemies,
										value : enemy
									});
									
									enemy.remove();
								});
							}
						}
					}
				})
			},
			baseState : 'idle'
		}).appendTo(SkyEngine.Screen);
		
		let keydownEvent = EVENT('keydown', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				hero.setState('shoot');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				hero.moveUp(200);
			} else if (e.getKey() === 'ArrowDown') {
				hero.moveDown(200);
			} else if (e.getKey() === 'ArrowLeft') {
				hero.moveLeft(200);
			} else if (e.getKey() === 'ArrowRight') {
				hero.moveRight(200);
			}
		});
		
		let keyupEvent = EVENT('keyup', (e) => {
			
			if (e.getKey().toUpperCase() === 'A') {
				hero.setState('idle');
			}
			
			else if (e.getKey() === 'ArrowUp') {
				hero.stopUp();
			} else if (e.getKey() === 'ArrowDown') {
				hero.stopDown();
			} else if (e.getKey() === 'ArrowLeft') {
				hero.stopLeft();
			} else if (e.getKey() === 'ArrowRight') {
				hero.stopRight();
			}
		});
		
		inner.on('close', () => {
			hero.remove();
			EACH(enemies, (enemy) => {
				enemy.remove();
			});
			
			keydownEvent.remove();
			keyupEvent.remove();
		});
	}
});
