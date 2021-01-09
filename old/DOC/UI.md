# UI 개발
SkyEngine에서는 [UPPERCASE의 DOM 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#dom-객체-생성)을 이용하여 UI를 개발합니다.

모든 DOM은 [노드의 `dom` 파라미터](Node.md#dom-관련-파라미터)나 [`addDom` 함수](Node.md#기타-함수)를 통해 노드에 종속시킬 수 있습니다. 이를 응용하여 각종 UI를 개발할 수 있습니다.

![UI](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/UI/ui.png)

```javascript
// 타이틀
SkyEngine.Node({
	y : -300,
	dom : H1({
		style : {
			fontSize : 100
		},
		c : 'Good Game'
	})
}).appendTo(SkyEngine.Screen);

// 시작 버튼
SkyEngine.Node({
	y : 300,
	dom : A({
		style : {
			backgroundColor : '#cc0000',
			padding : 30,
			border : '15px solid #ffff00',
			borderRadius : 10,
			fontSize : 60
		},
		c : 'GAME START'
	})
}).appendTo(SkyEngine.Screen);
```

UI를 개발하는 데에 [UPPERCASE의 DOM 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#dom-객체-생성)을 사용하기 때문에, [UUI](https://github.com/Hanul/UUI)나 [Yogurt](https://github.com/Hanul/Yogurt) 같은 UI 관련 BOX들을 사용할 수 있습니다.