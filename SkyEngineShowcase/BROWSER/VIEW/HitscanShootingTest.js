SkyEngineShowcase.HitscanShootingTest = CLASS({
	
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
					fps : 24
				}),
				shoot : SkyEngine.Sprite({
					srcs : RUN(() => {
						
						let srcs = [];
						
						REPEAT(3, (i) => {
							srcs.push(SkyEngineShowcase.R('rifle/shoot/survivor-shoot_rifle_' + i + '.png'));
						});
						
						return srcs;
					}),
					fps : 24,
					on : {
						framechange : (e, sprite) => {
							if (sprite.getBeforeFrame() === 0) {
								
								let targetEnemy;
								let targetEnemyIntersectionPointX;
								
								let bullet = SkyEngine.Line({
									startX : hero.getX() + 65,
									startY : hero.getY() + 24,
									endX : hero.getX() + 1280,
									endY : hero.getY() + 24,
									border : '1px solid #ffffff',
									collider : SkyEngine.Line({
										startX : hero.getX() + 65,
										startY : hero.getY() + 24,
										endX : hero.getX() + 1280,
										endY : hero.getY() + 24
									}),
									on : {
										nextstep : (e, bullet) => {
											
											if (targetEnemy !== undefined) {
												
												REMOVE({
													array : enemies,
													value : targetEnemy
												});
												
												targetEnemy.remove();
											}
										} 
									}
								}).appendTo(SkyEngine.Screen);
								
								bullet.delay(0.1, () => {
									bullet.remove();
								});
								
								bullet.onMeet(Enemy, (enemy) => {
									
									let intersectionPoints = bullet.findIntersectionPoints(enemy.getCollider());
									let intersectionPointX;
									
									EACH(intersectionPoints, (intersectionPoint) => {
										if (intersectionPointX === undefined || intersectionPointX > intersectionPoint.x) {
											intersectionPointX = intersectionPoint.x;
										}
									});
									
									if (targetEnemy === undefined || targetEnemyIntersectionPointX > intersectionPointX) {
										targetEnemyIntersectionPointX = intersectionPointX;
										targetEnemy = enemy;
										bullet.setEndX(intersectionPointX);
										bullet.getCollider().setEndX(intersectionPointX);
									}
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
