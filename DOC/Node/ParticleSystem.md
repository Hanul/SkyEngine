# 파티클 시스템
파티클은 게임에서 타격감을 더욱 증대시키기 위한 타격 이펙트나, 폭발, 충돌 등의 각종 효과들을 구현하는데 유용하게 사용될 수 있습니다. SkyEngine의 파티클 시스템을 사용하면 쉽게 파티클을 생성하고 조작할 수 있습니다.

## 파티클 시스템 노드
파티클을 생성합니다.

![파티클 시스템 노드](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/ParticleSystem/particlesystem.png)

```javascript
let particle = SkyEngine.ParticleSystem({
	particleSrc : SkyEngineShowcase.R('star.png'),
	minParticleCount : 50,
	maxParticleCount : 100,
	minParticleLifetime : 0.2,
	maxParticleLifetime : 0.5,
	minParticleDirection : 0,
	maxParticleDirection : 360,
	minParticleSpeed : 100,
	maxParticleSpeed : 300,
	minParticleScale : 0.05,
	maxParticleScale : 0.2,
	particleRotationSpeed : 1000,
	particleFadingSpeed : -2
}).appendTo(SkyEngine.Screen);

// 화면을 터치하면 발동됩니다.
EVENT('touchstart', (e) => {
	particle.burst();
});
```

![파티클 시스템 노드2](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/ParticleSystem/particlesystem2.png)

```javascript
let rain = SkyEngine.ParticleSystem({
	particleFigure : 'line',
	particleStartX : -20,
	particleStartY : -50,
	particleEndX : 20,
	particleEndY : 50,
	particleBorder : '1px solid #ffffff',
	minParticleX : -SkyEngine.Screen.getWidth() / 2 - 100,
	maxParticleX : SkyEngine.Screen.getWidth() / 2,
	minParticleCount : 50,
	maxParticleCount : 100,
	particleLifetime : 1,
	minParticleSpeed : 300,
	maxParticleSpeed : 700,
	minParticleScale : 0.3,
	maxParticleScale : 0.7,
	minParticleDirection : 75,
	maxParticleDirection : 75
}).appendTo(SkyEngine.Screen);

// 0.1초마다 계속해서 발동됩니다.
SkyEngine.Interval(0.1, () => {
	rain.burst();
});
```

사용 가능한 파라미터는 다음과 같습니다.
- `particleSrc` 파티클이 이미지인 경우, 파티클 이미지의 경로
- `particleFigure` 파티클이 이미지가 아닌 경우, 파티클의 형태 (`'line'`, `'rect'`, `'circle'`, `'polygon'` 중 하나)
- `particleStartX` 파티클의 형태가 line인 경우, 시작점의 x 좌표
- `particleStartY` 파티클의 형태가 line인 경우, 시작점의 y 좌표
- `particleEndX` 파티클의 형태가 line인 경우, 끝점의 x 좌표
- `particleEndY` 파티클의 형태가 line인 경우, 끝점의 y 좌표
- `particleWidth` 파티클의 형태가 rect나 circle인 경우, 가로 길이
- `particleHeight` 파티클의 형태가 rect나 circle인 경우, 세로 길이
- `particlePoints` 파티클의 형태가 polygon인 경우, 폴리곤을 이루는 `{x:, y:}`로 이루어진 점들의 좌표 목록
- `particleColor` 파티클의 색상
- `particleBorder` 파티클의 테두리 설정
- `particleColorR` 파티클 색상의 RGB 값 중, R 값
- `minParticleColorR` R의 최소 값
- `maxParticleColorR` R의 최대 값
- `particleColorG` 파티클 색상의 RGB 값 중, G 값
- `minParticleColorG` G의 최소 값
- `maxParticleColorG` G의 최대 값
- `particleColorB` 파티클 색상의 RGB 값 중, B 값
- `minParticleColorB` B의 최소 값
- `maxParticleColorB` B의 최대 값
- `particleCenterX` 각 파티클의 가운데 x 좌표
- `particleCenterY` 각 파티클의 가운데 y 좌표
- `particleCount` 파티클 개수
- `minParticleCount` 파티클의 최소 개수
- `maxParticleCount` 파티클의 최대 개수
- `particleX` 파티클의 x 좌표
- `minParticleX` 파티클의 최소 x 좌표
- `maxParticleX` 파티클의 최대 x 좌표
- `particleY` 파티클의 y 좌표
- `minParticleY` 파티클의 최소 y 좌표
- `maxParticleY` 파티클의 최대 y 좌표
- `particleLifetime` 파티클의 지속 시간
- `minParticleLifetime` 파티클의 최소 지속 시간
- `maxParticleLifetime` 파티클의 최대 지속 시간
- `particleDirection` 파티클 방향의 각도
- `minParticleDirection` 파티클 방향의 최소 각도
- `maxParticleDirection` 파티클 방향의 최대 각도
- `particleSpeed` 파티클의 속도
- `minParticleSpeed` 파티클의 최소 속도
- `maxParticleSpeed` 파티클의 최대 속도
- `particleAccelX` 파티클의 x 가속도
- `particleAccelY` 파티클의 y 가속도
- `particleAccel` 파티클의 가속도
- `minParticleAccel` 파티클의 최소 가속도
- `maxParticleAccel` 파티클의 최대 가속도
- `particleScale` 파티클의 스케일
- `minParticleScale` 파티클의 최소 스케일
- `maxParticleScale` 파티클의 최대 스케일
- `particleScalingSpeed` 파티클이 커지는 속도
- `minParticleScalingSpeed` 파티클이 커지는 최소 속도
- `maxParticleScalingSpeed` 파티클이 커지는 최대 속도
- `isParticleAngleToDirection` 파티클의 각도가 방향의 각도를 따르는지 여부
- `particleAngle` 파티클의 각도
- `minParticleAngle` 파티클의 최소 각도
- `maxParticleAngle` 파티클의 최대 각도
- `particleRotationSpeed` 파티클의 회전 속도
- `minParticleRotationSpeed` 파티클의 최소 회전 속도
- `maxParticleRotationSpeed` 파티클의 최대 회전 속도
- `particleAlpha` 파티클의 투명도
- `minParticleAlpha` 파티클의 최소 투명도
- `maxParticleAlpha` 파티클의 최대 투명도
- `particleFadingSpeed` 파티클의 페이딩 속도
- `minParticleFadingSpeed` 파티클의 최소 페이딩 속도
- `maxParticleFadingSpeed` 파티클의 최대 페이딩 속도
- `particleFadingAccel` 파티클의 페이딩 가속도

### 이벤트
- `'load'` 파티클 이미지 로딩이 완료되었을 때

## 일회성 파티클 시스템 노드
파티클을 1회 생성하고 사라집니다.

![일회성 파티클 시스템 노드](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/ParticleSystem/particlesystemonce.png)

```javascript
EVENT('touchstart', (e) => {
	
	SkyEngine.ParticleSystemOnce({
		x : e.getLeft() - SkyEngine.Screen.getWidth() / 2,
		y : e.getTop() - SkyEngine.Screen.getHeight() / 2,
		particleFigure : 'circle',
		particleWidth : 5,
		particleHeight : 5,
		particleAccelY : 200,
		minParticleColorR : 0,
		maxParticleColorR : 255,
		minParticleColorG : 0,
		maxParticleColorG : 255,
		minParticleColorB : 0,
		maxParticleColorB : 255,
		minParticleCount : 200,
		maxParticleCount : 300,
		minParticleLifetime : 1,
		maxParticleLifetime : 2,
		minParticleDirection : 0,
		maxParticleDirection : 360,
		minParticleSpeed : 50,
		maxParticleSpeed : 100,
		minParticleScale : 0.5,
		maxParticleScale : 1,
		particleFadingSpeed : -1,
		blendMode : 'lighter'
	}).appendTo(SkyEngine.Screen);
});
```

사용 가능한 파라미터와 이벤트는 [파티클 시스템 노드](#파티클-시스템-노드)와 동일합니다.
