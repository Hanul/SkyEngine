# `CLASS` SkyEngine.ParticleSystem
파티클 시스템 노드

## Mom CLASS
`SkyEngine.Node`

## Parameters
* `REQUIRED` *params*
* `OPTIONAL` *params.particleSrc* 파티클이 이미지인 경우, 파티클 이미지의 경로
* `OPTIONAL` *params.particleFigure* 파티클이 이미지가 아닌 경우, 파티클의 형태	(line, rect, circle, polygon 중 하나)
* `OPTIONAL` *params.particleStartX* 파티클의 형태가 line인 경우, 시작점의 x 좌표
* `OPTIONAL` *params.particleStartY* 파티클의 형태가 line인 경우, 시작점의 y 좌표
* `OPTIONAL` *params.particleEndX* 파티클의 형태가 line인 경우, 끝점의 x 좌표
* `OPTIONAL` *params.particleEndY* 파티클의 형태가 line인 경우, 끝점의 y 좌표
* `OPTIONAL` *params.particleWidth* 파티클의 형태가 rect나 circle인 경우, 가로 길이
* `OPTIONAL` *params.particleHeight* 파티클의 형태가 rect나 circle인 경우, 세로 길이
* `OPTIONAL` *params.particlePoints* 파티클의 형태가 polygon인 경우, 폴리곤을 이루는 {x, y}로 이루어진 점들의 좌표 목록
* `OPTIONAL` *params.particleColor* 파티클의 색상
* `OPTIONAL` *params.particleBorder* 파티클의 테두리 설정
* `OPTIONAL` *params.particleColorR* 파티클 색상의 RGB 값 중, R 값
* `OPTIONAL` *params.minParticleColorR* R의 최소 값
* `OPTIONAL` *params.maxParticleColorR* R의 최대 값
* `OPTIONAL` *params.particleColorG* 파티클 색상의 RGB 값 중, G 값
* `OPTIONAL` *params.minParticleColorG* G의 최소 값
* `OPTIONAL` *params.maxParticleColorG* G의 최대 값
* `OPTIONAL` *params.particleColorB* 파티클 색상의 RGB 값 중, B 값
* `OPTIONAL` *params.minParticleColorB* B의 최소 값
* `OPTIONAL` *params.maxParticleColorB* B의 최대 값
* `OPTIONAL` *params.particleCenterX* 각 파티클의 가운데 x 좌표
* `OPTIONAL` *params.particleCenterY* 각 파티클의 가운데 y 좌표
* `OPTIONAL` *params.particleCount* 파티클 개수
* `OPTIONAL` *params.minParticleCount* 파티클의 최소 개수
* `OPTIONAL` *params.maxParticleCount* 파티클의 최대 개수
* `OPTIONAL` *params.particleX* 파티클의 x 좌표
* `OPTIONAL` *params.minParticleX* 파티클의 최소 x 좌표
* `OPTIONAL` *params.maxParticleX* 파티클의 최대 x 좌표
* `OPTIONAL` *params.particleY* 파티클의 y 좌표
* `OPTIONAL` *params.minParticleY* 파티클의 최소 y 좌표
* `OPTIONAL` *params.maxParticleY* 파티클의 최대 y 좌표
* `OPTIONAL` *params.particleLifetime* 파티클의 지속 시간
* `OPTIONAL` *params.minParticleLifetime* 파티클의 최소 지속 시간
* `OPTIONAL` *params.maxParticleLifetime* 파티클의 최대 지속 시간
* `OPTIONAL` *params.particleDirection* 파티클 방향의 각도
* `OPTIONAL` *params.minParticleDirection* 파티클 방향의 최소 각도
* `OPTIONAL` *params.maxParticleDirection* 파티클 방향의 최대 각도
* `OPTIONAL` *params.particleSpeed* 파티클의 속도
* `OPTIONAL` *params.minParticleSpeed* 파티클의 최소 속도
* `OPTIONAL` *params.maxParticleSpeed* 파티클의 최대 속도
* `OPTIONAL` *params.particleAccelX* 파티클의 x 가속도
* `OPTIONAL` *params.particleAccelY* 파티클의 y 가속도
* `OPTIONAL` *params.particleAccel* 파티클의 가속도
* `OPTIONAL` *params.minParticleAccel* 파티클의 최소 가속도
* `OPTIONAL` *params.maxParticleAccel* 파티클의 최대 가속도
* `OPTIONAL` *params.particleScale* 파티클의 스케일
* `OPTIONAL` *params.minParticleScale* 파티클의 최소 스케일
* `OPTIONAL` *params.maxParticleScale* 파티클의 최대 스케일
* `OPTIONAL` *params.particleScalingSpeed* 파티클이 커지는 속도
* `OPTIONAL` *params.minParticleScalingSpeed* 파티클이 커지는 최소 속도
* `OPTIONAL` *params.maxParticleScalingSpeed* 파티클이 커지는 최대 속도
* `OPTIONAL` *params.isParticleAngleToDirection* 파티클의 각도가 방향의 각도를 따르는지 여부
* `OPTIONAL` *params.particleAngle* 파티클의 각도
* `OPTIONAL` *params.minParticleAngle* 파티클의 최소 각도
* `OPTIONAL` *params.maxParticleAngle* 파티클의 최대 각도
* `OPTIONAL` *params.particleRotationSpeed* 파티클의 회전 속도
* `OPTIONAL` *params.minParticleRotationSpeed* 파티클의 최소 회전 속도
* `OPTIONAL` *params.maxParticleRotationSpeed* 파티클의 최대 회전 속도
* `OPTIONAL` *params.particleAlpha* 파티클의 투명도
* `OPTIONAL` *params.minParticleAlpha* 파티클의 최소 투명도
* `OPTIONAL` *params.maxParticleAlpha* 파티클의 최대 투명도
* `OPTIONAL` *params.particleFadingSpeed* 파티클의 페이딩 속도
* `OPTIONAL` *params.minParticleFadingSpeed* 파티클의 최소 페이딩 속도
* `OPTIONAL` *params.maxParticleFadingSpeed* 파티클의 최대 페이딩 속도
* `OPTIONAL` *params.particleFadingAccel* 파티클의 페이딩 가속도

## Public Members

### `burst(endHandler)`
