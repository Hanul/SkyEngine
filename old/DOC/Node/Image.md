# 이미지

## 이미지 노드 공통 파라미터
[노드의 파라미터](../Node.md#파라미터) 외에 모든 이미지 관련 노드들에서 공통으로 설정할 수 있는 파라미터 목록은 다음과 같습니다.

### `src`
이미지의 경로를 지정합니다. [스프라이트 애니메이션 노드](#스프라이트-애니메이션-노드)의 경우, 여러장의 이미지를 포함할 때는 `srcs`를 사용합니다.

![이미지의 경로](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/src.png)

```javascript
let creature = SkyEngine.Image({
	src : Sample.R('creature.png')
}).appendTo(SkyEngine.Screen);
```

## 공통 이벤트
- `'load'` 이미지 로딩이 완료되었을 때. `load` 이벤트가 발생한 이후에는 `getWidth`, `getHeight` 함수를 통해 이미지 크기를 가져올 수 있습니다.

## 이미지 노드
이미지를 생성합니다.

![이미지](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/image.png)

```javascript
let creature = SkyEngine.Image({
	x : -100,
	src : Sample.R('creature.png')
}).appendTo(SkyEngine.Screen);

let golem = SkyEngine.Image({
	x : 100,
	src : Sample.R('golem.png')
}).appendTo(SkyEngine.Screen);
```

## 스프라이트 애니메이션 노드
스프라이트 애니메이션을 생성합니다.

![스프라이트 애니메이션](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/sprite.gif)

```javascript
let sprite = SkyEngine.Sprite({
	src : Sample.R('spritesheet.png'),
	spriteWidth : 320,
	fps : 8
}).appendTo(SkyEngine.Screen);
```

```javascript
let sprite = SkyEngine.Sprite({
	srcs : [
		Sample.R('sprite/frame1.png'),
		Sample.R('sprite/frame2.png'),
		Sample.R('sprite/frame3.png'),
		Sample.R('sprite/frame4.png'),
		Sample.R('sprite/frame5.png')
	],
	fps : 8
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#이미지-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `spriteWidth` 스프라이트의 너비를 지정할 수 있습니다.
- `spriteHeight` 스프라이트의 높이를 지정할 수 있습니다.
- `fps` 애니메이션의 속도를 초당 프레임 수로 지정할 수 있습니다.

### 이미지가 스프라이트 시트(단일 이미지)인 경우
이미지가 단일 이미지에 여러 그림이 그려져 있는 스프라이트 시트인 경우에는 `src` 파라미터에 이미지 경로를 설정합니다.

![스프라이트 시트](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/spritesheet.png)

### 여러 이미지로 구성된 경우
애니메이션의 각 프레임이 개별 이미지로 구성되어 있는 경우에는 `srcs` 파라미터에 이미지 경로들을 배열로 설정합니다.

![스프라이트 폴더](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/spritefolder.png)

여러 이미지로 애니메이션을 생성하는 경우 단일 이미지의 크기를 알 수 있으므로 `spriteWidth`와 `spriteHeight` 설정이 불필요합니다.

### 이벤트
- `'animationend'` 애니메이션이 끝날 때
- `'framechange'` 애니메이션의 프레임이 변경될 때

## 실루엣 노드
이미지의 실루엣을 생성합니다.

![실루엣](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/silhouette.png)

```javascript
let golem = SkyEngine.Image({
	src : Sample.R('golem.png'),
	alpha : 0.5
}).appendTo(SkyEngine.Screen);

let silhouette = SkyEngine.Silhouette({
	src : Sample.R('golem.png'),
	border : '5px solid #00ff00'
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#이미지-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `color` 실루엣의 색상을 설정할 수 있습니다.
- `border` 실루엣의 테두리를 설정할 수 있습니다. `두께 모양 색상` 순서대로 문자열로 지정합니다. 모양으로는 `'solid'`, `'dotted'`, `'dashed'`를 지정할 수 있습니다.
- `width` 이미지를 잘라 사용하고자 할 때 설정하는 가로 길이입니다.
- `height` 이미지를 잘라 사용하고자 할 때 설정하는 세로 길이입니다.

## 배경 노드
이미지를 패턴으로 하는 배경을 생성합니다.

![배경](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/Image/background.png)

```javascript
let background = SkyEngine.Background({
	src : Sample.R('pattern.png')
}).appendTo(SkyEngine.Screen);
```

[공통 파라미터](#이미지-노드-공통-파라미터) 외에 사용 가능한 파라미터는 다음과 같습니다.
- `isNotToRepeatX` `true`로 설정하면 패턴 이미지를 x축으로 반복하지 않습니다.
- `isNotToRepeatY` `true`로 설정하면 패턴 이미지를 y축으로 반복하지 않습니다.
- `followScreenRatio` 화면의 움직임에 따라 배경이 얼마만큼 따라갈지 그 비율을 설정합니다. 기본은 0, 즉 화면의 움직임을 따라가지 않습니다.
- `leftMargin` 이미지 패턴의 왼쪽 여백을 지정합니다.
- `rightMargin` 이미지 패턴의 오른쪽 여백을 지정합니다.
- `topMargin` 이미지 패턴의 위 여백을 지정합니다.
- `bottomMargin` 이미지 패턴의 아래 여백을 지정합니다.