
		
		let left;
		let top;
		let width;
		let height;
		let ratio;
		
		let deltaTime;
		let isStepping;
		
		let registeredNodeMap = {};
		
		// 디버그 모드에서는 FPS 수치 표시
		if (BROWSER_CONFIG.SkyEngine.isDebugMode === true) {
			
			let fpsDom = DIV({
				style : {
					position : 'fixed',
					left : 5,
					top : 5,
					fontSize : 12,
					zIndex : 9999999
				}
			}).appendTo(BODY);
			
			INTERVAL(0.1, () => {
				
				if (deltaTime !== undefined) {
					fpsDom.empty();
					fpsDom.append('FPS: ' + parseInt(1 / deltaTime));
				}
			});
		}
		
		EACH([
			'tap',
			'touchstart',
			'touchend'
		], (eventName) => {
			
			canvas.on(eventName, (e) => {
				
				let isBubblingStoped;
				
				let check = (node) => {
					
					if (isBubblingStoped !== true) {
						
						REVERSE_EACH(node.getChildren(), check);
						
						if (
						node.checkIsRemoved() !== true &&
						node.checkIsEventExists(eventName) === true &&
						node.checkTouch((e.getLeft() - WIN_WIDTH() / 2) / ratio, (e.getTop() - WIN_HEIGHT() / 2) / ratio) === true) {
							
							let se = SkyEngine.E(e);
							
							node.fireEvent({
								eventName : eventName,
								e : se
							});
							
							if (se.checkIsBubblingStoped() === true) {
								isBubblingStoped = true;
							}
						}
					}
				};
				
				check(self);
			});
		});
		
		let loop = LOOP(BROWSER_CONFIG.SkyEngine.fps, (_deltaTime) => {
			
			deltaTime = _deltaTime;
			
			isStepping = true;
			
			if (self.checkIsPaused() !== true) {
				
				SkyEngine.Delay.step(deltaTime);
				SkyEngine.Interval.step(deltaTime);
				
				// 모든 노드의 step을 실행합니다.
				self.step(deltaTime);
				
				let fixedNodes = findNodesByClass(SkyEngine.FixedNode);
				
				for (let i = 0; i < fixedNodes.length; i += 1) {
					fixedNodes[i].step(0);
				}
			}
			
			nonePausableNode.step(deltaTime);
			
			isStepping = false;
			
			// 스테이지가 가운데 오도록
			stage.x = width / 2 - getCameraFollowX() + stageX;
			stage.y = height / 2 - getCameraFollowY() + stageY;
			
			renderer.render(stage);
		});
		
		if (BROWSER_CONFIG.SkyEngine.isNotUsingScreen === true) {
			loop.remove();
		}
		
		let changeFPS = self.changeFPS = (fps) => {
			//REQUIRED: fps
			
			loop.changeFPS(fps);
		};
		
		let clearFPS = self.clearFPS = () => {
			loop.clearFPS();
		};
		
		let getFPS = self.getFPS = () => {
			return loop.getFPS();
		};
		
		self.on('remove', () => {
			loop.remove();
			renderer.destroy(true);
			wrapper.remove();
		});
		
		let checkIsStepping = self.checkIsStepping = () => {
			return isStepping;
		};
		
		let cameraFollowX = self.cameraFollowX = (params) => {
			//REQUIRED: params
			//REQUIRED: params.target
			//OPTIONAL: params.centerX
			//OPTIONAL: params.minX
			//OPTIONAL: params.maxX
			
			cameraFollowXTarget = params.target;
			
			cameraFollowCenterX = params.centerX;
			if (cameraFollowCenterX === undefined) {
				cameraFollowCenterX = 0;
			}
			
			cameraMinFollowX = params.minX;
			cameraMaxFollowX = params.maxX;
		};
		
		let cameraFollowY = self.cameraFollowY = (params) => {
			//REQUIRED: params
			//REQUIRED: params.target
			//OPTIONAL: params.centerY
			//OPTIONAL: params.minY
			//OPTIONAL: params.maxY
			
			cameraFollowYTarget = params.target;
			
			cameraFollowCenterY = params.centerY;
			if (cameraFollowCenterY === undefined) {
				cameraFollowCenterY = 0;
			}
			
			cameraMinFollowY = params.minY;
			cameraMaxFollowY = params.maxY;
		};
		
		let cameraFollow = self.cameraFollow = (params) => {
			//REQUIRED: params
			//REQUIRED: params.target
			//OPTIONAL: params.centerX
			//OPTIONAL: params.centerY
			//OPTIONAL: params.minX
			//OPTIONAL: params.minY
			//OPTIONAL: params.maxX
			//OPTIONAL: params.maxY
			
			cameraFollowX(params);
			cameraFollowY(params);
		};
		
		let cameraUnfollowX = self.cameraUnfollowX = () => {
			cameraFollowXTarget = undefined;
			cameraMinFollowX = undefined;
			cameraMaxFollowX = undefined;
			
			followX = 0;
		};
		
		let cameraUnfollowY = self.cameraUnfollowY = () => {
			cameraFollowYTarget = undefined;
			cameraMinFollowY = undefined;
			cameraMaxFollowY = undefined;
			
			followY = 0;
		};
		
		let cameraUnfollow = self.cameraUnfollow = () => {
			cameraUnfollowX();
			cameraUnfollowY();
		};
		
		
		
		let getLeft = self.getLeft = () => {
			return left;
		};
		
		let getTop = self.getTop = () => {
			return top;
		};
		
		let getWidth = self.getWidth = () => {
			return width;
		};
		
		let getHeight = self.getHeight = () => {
			return height;
		};
		
		let getRatio = self.getRatio = () => {
			return ratio;
		};
		
		let getCanvas = self.getCanvas = () => {
			return canvas;
		};
		
		let getLeftLetterbox = self.getLeftLetterbox = () => {
			return leftLetterbox;
		};
		
		let getRightLetterbox = self.getRightLetterbox = () => {
			return rightLetterbox;
		};
		
		let getTopLetterbox = self.getTopLetterbox = () => {
			return topLetterbox;
		};
		
		let getBottomLetterbox = self.getBottomLetterbox = () => {
			return bottomLetterbox;
		};
		
		let getPixiRenderer = self.getPixiRenderer = () => {
			return renderer;
		};
		
		let setStageX = self.setStageX = (_stageX) => {
			//REQUIRED: stageX
			
			stageX = _stageX;
		};
		
		let getStageX = self.getStageX = () => {
			return stageX;
		};
		
		let setStageY = self.setStageY = (_stageY) => {
			//REQUIRED: stageY
			
			stageY = _stageY;
		};
		
		let getStageY = self.getStageY = () => {
			return stageY;
		};
		
		let nonePausableNode = SkyEngine.Node();
		
		let getNonePausableNode = self.getNonePausableNode = () => {
			return nonePausableNode;
		};
	}
});
