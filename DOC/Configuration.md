# 설정
[UPPERCASE의 프로젝트 실행을 위한 코드](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/CREATE_PROJECT.md#프로젝트-실행을-위한-코드-작성)의 `BROWSER_CONFIG` 부분에 `SkyEngine` 설정을 등록합니다.

```javascript
require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		...
	},
	
	BROWSER_CONFIG : {
		SkyEngine : {
			isDebugMode : true,
			width : 720,
			height : 1280
		}
	},
	
	NODE_CONFIG : {
		...
	}
});
```

SkyEngine에는 다음과 같은 설정들을 사용할 수 있습니다.
- `isDebugMode` 디버그 모드. `true`로 지정하면 활성화됩니다. [디버그 모드](#디버그-모드) 항목을 참고해주시기 바랍니다.
- `width` 게임의 고정 너비. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `height` 게임의 고정 높이. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `minWidth` 게임 화면이 가변적인 경우 최소 너비. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `maxWidth` 게임 화면이 가변적인 경우 최대 너비. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `minHeight` 게임 화면이 가변적인 경우 최소 높이. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `maxHeight` 게임 화면이 가변적인 경우 최대 높이. [게임 화면 크기](#게임-화면-크기) 항목을 참고해주시기 바랍니다.
- `maxCollisionWidth` 성능 최적화를 위한 최대 충돌 범위의 너비. [최대 충돌 계산 범위](#최대-충돌-계산-범위) 항목을 참고해주시기 바랍니다.
- `maxCollisionHeight` 성능 최적화를 위한 최대 충돌 범위의 높이. [최대 충돌 계산 범위](#최대-충돌-계산-범위) 항목을 참고해주시기 바랍니다.
- `fps` 게임 화면을 고정 프레임으로 출력하고자 할 때 설정합니다.

## 디버그 모드
`isDebugMode`를 `true`로 설정하여 디버그 모드를 활성화 하면,

- 게임 성능의 지표가 되는 FPS 수치를 화면의 좌측 상단에 표시합니다.
- 노드들의 중점을 표시하고 터치 영역과 충돌 영역을 표시합니다.

![디버그 모드](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Configuration/debugmode.png)

## 게임 화면 크기
`width`와 `height` 설정을 지정하게 되면 게임 화면 크기를 고정합니다. 이 때 브라우저의 크기를 조절하면 게임 화면 크기가 고정비율로 확대 혹은 축소됩니다.

![고정 크기](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Configuration/fixedsize.png)

`maxWidth`를 설정하게 되면 브라우저의 크기가 조절될 때 게임 화면의 너비가 브라우저의 너비와 동일하게 커지다가, `maxWidth` 이상으로 커지면 더 이상 게임 화면이 커지지 않고 고정됩니다.

![최대 크기](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Configuration/maxsize.png)

`maxHeight`를 설정하게 되면 `maxWidth`와 마찬가지로 브라우저의 크기가 조절될 때 게임 화면의 높이가 브라우저의 높이와 동일하게 커지다가, `maxHeight` 이상으로 커지면 더 이상 게임 화면이 커지지 않고 고정됩니다.

`minWidth`를 설정하게 되면 브라우저의 크기가 조절될 때 게임 화면의 너비가 브라우저의 너비와 동일하게 작아지다가, `minWidth` 이하로 작아지면 더 이상 게임 화면이 작아지지 않고 고정됩니다.

`minHeight`를 설정하게 되면 `minWidth`와 마찬가지로 브라우저의 크기가 조절될 때 게임 화면의 높이가 브라우저의 높이와 동일하게 작아지다가, `minHeight` 이하로 작아지면 더 이상 게임 화면이 작아지지 않고 고정됩니다.

## 최대 충돌 계산 범위
게임의 성능을 최적화 하기 위해 `maxCollisionWidth`와 `maxCollisionHeight`를 설정하여 최대 충돌 계산 범위를 지정합니다. 이러면 충돌을 계산할 때, 정해진 범위 내의 노드들만 계산합니다.

![최대 충돌 계산 범위](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Configuration/maxcollisionsize.png)
