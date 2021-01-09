# 위치 고정 노드
스크린 노드의 위치와 관계 없이 고정된 위치를 유지하는 노드입니다. 배경이나 UI를 추가할 때 유용하게 사용할 수 있습니다. 실제로 [배경 노드](Image.md#배경-노드)가 위치 고정 노드를 상속하고 있습니다.

```javascript
Game.HomeUIPanel = CLASS({
	
	preset : () => {
		return SkyEngine.FixedNode;
	},
	
	init : (inner, self, start) => {
		//REQUIRED: start	게임 시작
		
		// 게임 타이틀
		self.append(SkyEngine.Image({
			y : -300,
			src : Game.R('title.png')
		}));
		
		// 게임 시작 버튼
		self.append(SkyEngine.Node({
			y : 300,
			dom : A({
				style : {
					backgroundColor : '#0000ff',
					padding : 10,
					borderRadius : 10,
					fontSize : 50
				},
				c : 'START',
				on : {
					tap : () => {
						start();
					}
				}
			})
		}));
	}
});

Game.HomeUIPanel(start).appendTo(SkyEngine.Screen);
```

위치 고정 노드의 파라미터 목록은 다음과 같습니다.
- `followScreenRatio` 스크린을 따라가는 비율을 지정합니다. 지정하지 않으면 스크린을 따라가지 않습니다.