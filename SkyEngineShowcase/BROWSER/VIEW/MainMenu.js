SkyEngineShowcase.MainMenu = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let wrapper = DIV({
			style : {
				position : 'fixed',
				left : 0,
				top : 0,
				width : '100%',
				height : '100%',
				overflowY : 'scroll',
				textAlign : 'center'
			},
			c : [H1({
				style : {
					marginTop : 20,
					fontSize : 30
				},
				c : 'SkyEngine 쇼케이스'
			}), UL({
				style : {
					marginTop : 20,
					fontSize : 15
				},
				c : [LI({
					c : A({
						c : 'Hello, SkyEngine!',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('hello');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '드로우 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/draw');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '노드 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/node');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '움직임 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/moving');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '스케일 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/scaling');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '회전 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/rotation');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '페이드 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/fading');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '필터 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/filter');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '블렌드 모드 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/blendmode');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '이벤트 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/event');
							}
						}
					})
				}), LI({
					style : {
						marginTop : 15
					},
					c : A({
						c : '충돌 테스트',
						on : {
							tap : () => {
								SkyEngineShowcase.GO('test/collision');
							}
						}
					})
				})]
			})]
		}).appendTo(BODY);
		
		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
