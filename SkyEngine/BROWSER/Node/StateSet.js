/*
 * 상태 세트 노드
 */
SkyEngine.StateSet = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.stateNodes
		//REQUIRED: params.baseState
		
		let stateNodes = {};
		let state;
		let toState;
		let animationEndHandler;
		
		let setStateNode = self.setStateNode = (params) => {
			//REQUIRED: params
			//REQUIRED: params.state
			//REQUIRED: params.node
			
			let state = params.state;
			let node = params.node;
			
			// 기존 상태 노드 제거
			if (stateNodes[name] !== undefined) {
				stateNodes[name].remove();
			}
			
			node.hide();
			
			self.append(node);
			
			stateNodes[state] = node;
		};
		
		EACH(params.stateNodes, (node, state) => {
			setStateNode({
				state : state,
				node : node
			});
		});
		
		let setState = self.setState = (_state, _animationEndHandler) => {
			//REQUIRED: state
			//OPTIONAL: animationEndHandler
			
			if (animationEndHandler !== undefined) {
				stateNodes[state].off('animationend', animationEndHandler);
				animationEndHandler = undefined;
			}
			
			state = _state;
			animationEndHandler = _animationEndHandler;
			
			EACH(stateNodes, (stateNode, state) => {
				stateNode.hide();
			});
			
			let stateNode = stateNodes[state];
			
			if (stateNode !== undefined) {
				stateNode.show();
			}
			
			if (animationEndHandler !== undefined) {
				stateNode.on('animationend', animationEndHandler);
			}
		};
		
		setState(params.baseState);
		
		let getState = self.getState = () => {
			return state;
		};
	}
});
