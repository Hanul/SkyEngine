# ![SkyEngine Logo](https://raw.githubusercontent.com/Hanul/SkyEngine/master/logo.png)
SkyEngine은 [UPPERCASE](http://uppercase.io) 기반 2D 게임 엔진입니다.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 특징
* HTML5 Canvas 기반의 게임 엔진입니다.
* 모든 게임 오브젝트는 [노드](DOC/Node.md) 트리로 이루어져 있습니다.
* 웹 페이지의 전체 화면을 게임 화면으로 사용합니다.
* 화면의 가운데가 0, 0 좌표 입니다.
* 이벤트를 기반으로 게임이 동작합니다. 즉 일반적인 게임 엔진 에서의 `step`, `update` 등의 함수를 작성하지 않습니다.

## 모듈 시스템
SkyEngine은 기본적으로 스프라이트 기반 2D 게임 개발에 적합합니다. 그러나 모듈들 통해 기능을 확장하여 다양한 장르의 게임을 만들 수 있습니다. 아래는 SkyEngine에서 제공하는 공식 모듈들입니다.

- [물리엔진 모듈](https://github.com/Hanul/SkyEnginePhysics)
- [Spine 모듈](https://github.com/Hanul/SkyEngineSpine)

직접 모듈을 만들어 사용하는 것도 가능합니다. 모듈을 개발하는 방법에 대해서는 [UPPERCASE의 BOX 문서](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/BOX.md)를 참고해주시기 바랍니다.

## 설치하기
SkyEngine은 UPPERCASE 모듈이기 때문에, 개발하기에 앞서 PC에 UPPERCASE가 설치되어 있어야 합니다.

1. [UPPERCASE 설치하기 문서](https://github.com/Hanul/UPPERCASE/blob/master/DOC/INSTALL.md)를 참고하여 UPPERCASE를 설치합니다.
2. [프로젝트 생성하기 문서](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/CREATE_PROJECT.md)를 참고하여 프로젝트를 생성합니다.
3. 프로젝트의 `DEPENDENCY` 파일에 `Hanul/SkyEngine`를 추가합니다.
4. [프로젝트를 실행](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/CREATE_PROJECT.md#프로젝트-실행)하면 자동으로 SkyEngine을 다운로드하고 설치한 후 실행합니다.

### Stand-alone 모드
UPPERCASE 설치 과정 없이, SkyEngine을 다운로드받아 JavaScript 라이브러리 형태로 사용하고자 하는 경우에는 다음 과정을 수행합니다.
1. [UPPERCASE-CORE의 `BROWSER.MIN.js`파일](https://github.com/Hanul/UPPERCASE/blob/master/UPPERCASE-CORE/BROWSER.MIN.js)을 다운로드 받습니다.
2. [UPPERCASE-BOOT의 `BASE_STYLE.MIN.css`파일](https://github.com/Hanul/UPPERCASE/blob/master/UPPERCASE-BOOT/R/BASE_STYLE.MIN.css)을 다운로드 받습니다.
3. `__PACK` 폴더에 패키징 된 `SkyEngine` 폴더를 복사합니다.
4. 위에서 다운받은 리소스들을 다음과 같이 웹 페이지에 포함하여 사용합니다.

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
		<title>Game</title>
		<link rel="stylesheet" type="text/css" href="UPPERCASE-BOOT/BASE_STYLE.MIN.css" />
	</head>
	<body>
	    <script src="UPPERCASE-CORE/BROWSER.MIN.js"></script>
	    <script>BOX('SkyEngine');</script>
	    <script src="SkyEngine/BROWSER.js"></script>
	    <script>
	    RUN(() => {
			
			FOR_BOX((box) => {
				if (box.OVERRIDE !== undefined) {
					box.OVERRIDE();
				}
			});
			
			INIT_OBJECTS();
			
			FOR_BOX((box) => {
				if (box.MAIN !== undefined) {
					box.MAIN();
				}
			});
		});
	    </script>
	    <!-- 게임 코드 입력 -->
	    <script src="game.js"></script>
	</body>
</html>
```
단, Stand-alone 모드에서는 UPPERCASE의 서버 관련 기술들을 사용할 수 없음에 유의하시기 바랍니다.

## 앱으로 포팅하기
SkyEngine으로 만든 게임을 앱으로 포팅하기 위해서는 [UPPERCASE의 하이브리드 앱 만들기 문서](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/HYBRID_APP.md)를 참고하시기 바랍니다.

## 구성 요소
SkyEngine은 다음과 같은 것들로 구성되어 있습니다.

### [노드](DOC/Node.md)
SkyEngine의 모든 구성요소는 노드를 확장합니다.

### [스크린 노드](DOC/Node/Screen.md)
게임 화면 전체를 다루는 노드입니다. 오로지 하나만 존재할 수 있으며 모든 노드는 스크린 노드의 하위 노드로 구성됩니다.

* [서브스크린 노드](DOC/Node/SubScreen.md)

### [위치 고정 노드](DOC/Node/FixedNode.md)
스크린 노드의 위치와 관계 없이 고정된 위치를 유지하는 노드입니다. 배경이나 UI를 추가할 때 유용하게 사용할 수 있습니다.

### [도형](DOC/Node/Figure.md)
* [직선 노드](DOC/Node/Figure.md#직선-노드)
* [사각형 노드](DOC/Node/Figure.md#사각형-노드)
* [원 노드](DOC/Node/Figure.md#원-노드)
* [다각형 노드](DOC/Node/Figure.md#다각형-노드)

### [이미지](DOC/Node/Image.md)
* [이미지 노드](DOC/Node/Image.md#이미지-노드)
* [스프라이트 애니메이션 노드](DOC/Node/Image.md#스프라이트-애니메이션-노드)
* [실루엣 노드](DOC/Node/Image.md#실루엣-노드)
* [배경 노드](DOC/Node/Image.md#배경-노드)

### [상태 세트 노드](DOC/Node/StateSet.md)

### [타일 시스템](DOC/Node/TileSystem.md)
* [타일 노드](DOC/Node/TileSystem.md#타일-노드)
* [충돌 타일 노드](DOC/Node/TileSystem.md#충돌-타일-노드)
* [타일맵 노드](DOC/Node/TileSystem.md#타일-맵)
* [아이소메트릭 타일맵 노드](DOC/Node/TileSystem.md#아이소메트릭-타일맵-노드)
* [헥사곤 타일맵 노드](DOC/Node/TileSystem.md#헥사곤-타일맵-노드)

### [파티클 시스템](DOC/Node/ParticleSystem.md)
* [파티클 시스템 노드](DOC/Node/ParticleSystem.md#파티클-시스템-노드)
* [일회성 파티클 시스템 노드](DOC/Node/ParticleSystem.md#일회성-파티클-시스템-노드)

### [`SkyEngine.Delay`](DOC/Delay.md)
주어진 초가 흐른 뒤에 함수를 실행하는 클래스

### [`SkyEngine.Interval`](DOC/Interval.md)
주어진 초 마다 함수를 반복해서 실행하는 클래스

### [`SkyEngine.TextBorderShadow`](DOC/TextBorderShadow.md)
`textShadow` 스타일을 이용해 글자의 테두리를 만들어주는 메소드

### [`SkyEngine.BGM`](DOC/BGM.md)
[UPPERCASE의 SOUND 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#sound)을 게임의 배경음악 재생에 어울리도록 확장한 클래스

## UPPERCASE의 기능 중 게임에서 사용할 만한 것들
* [사운드 재생](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#sound)
* [HTTP 요청 기능](https://github.com/Hanul/UPPERCASE/blob/master/DOC/GUIDE/UPPERCASE-CORE-BROWSER.md#http-%EC%9A%94%EC%B2%AD-%EA%B8%B0%EB%8A%A5)

## 기타 문서
* [설정](DOC/Configuration.md)
* [자주 묻는 질문](DOC/FAQ.md)
* [샘플 프로젝트](DOC/Samples.md)
* [UI 개발](DOC/UI.md)
* [API 문서](API/README.md)

## 포럼
[SkyEngine 포럼](https://forum.inos.io/skyengine)

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)