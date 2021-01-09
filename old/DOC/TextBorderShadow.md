# `SkyEngine.TextBorderShadow`
`textShadow` 스타일을 이용해 글자의 테두리를 만들어주는 메소드

기본적으로 CSS에는 글자의 테두리를 만들어주는 기능이 없기 때문에, `textShadow`를 이용해 테두리와 같은 것을 생성하는 변칙적인 방법을 사용해야 합니다.

```javascript
SkyEngine.Node({
	dom : H1({
		style : {
			fontSize : 30,
			textShadow : '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000, 0px 1px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, 2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0px 2px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000, 2px 0px 0 #000, 1px 2px 0 #000, -1px 2px 0 #000, 1px -2px 0 #000, -1px -2px 0 #000, 2px 1px 0 #000, -2px 1px 0 #000, 2px -1px 0 #000, -2px -1px 0 #000'
		},
		c : '전략 시뮬레이션 게임'
	})
}).appendTo(SkyEngine.Screen);
```

하지만 위와 같은 방법은 코드가 너무 길어지고 복잡해지기 때문에, `SkyEngine.TextBorderShadow`를 이용해서 간결하게 표시할 수 있습니다. 파라미터로 테두리의 색상 코드값만 넣어주면 됩니다.

```javascript
SkyEngine.Node({
	dom : H1({
		style : {
			fontSize : 30,
			textShadow : SkyEngine.TextBorderShadow('#000')
		},
		c : '전략 시뮬레이션 게임'
	})
}).appendTo(SkyEngine.Screen);
```

게임에서는 글자에 테두리를 추가하는 경우가 많기 때문에 유용하게 사용할 수 있습니다.