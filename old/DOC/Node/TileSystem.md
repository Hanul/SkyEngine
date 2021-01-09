# 타일 시스템
타일을 배치하여 맵을 구성할 수 있도록 도와주는 시스템 입니다.

타일 노드는 다음과 같이 2종류가 있습니다.
* [`SkyEngine.Tile`](#타일-노드)
* [`SkyEngine.CollisionTile`](#충돌-타일-노드)

타일 맵 노드는 다음과 같이 3종류가 있습니다.
* [`SkyEngine.TileMap`](#타일-맵-노드)
* [`SkyEngine.IsomatricTileMap`](#isomatric-타일-맵-노드)
* [`SkyEngine.HexagonTileMap`](#hexagon-타일-맵-노드)

## 타일 노드
`SkyEngine.Tile`

일반적인 타일을 생성합니다.

## 충돌 타일 노드
`SkyEngine.CollisionTile`

충돌 처리용 타일을 생성합니다.

## 타일 맵 노드
`SkyEngine.TileMap`

일반적인 사각형 타일 맵을 생성합니다.

![타일 맵](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/TileSystem/tilemap.png)

```javascript
let tileMap = SkyEngine.TileMap({
	centerX : 32 * 3.5,
	centerY : 32 * 3.5,
	tileWidth : 32,
	tileHeight : 32,
	tileSet : {
		grass : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/grass.png')
				})
			});
		},
		dirt : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/dirt.png')
				})
			});
		},
		stone : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/stone.png')
				})
			});
		},
	},
	tileKeyMap : [
		['grass', 'dirt',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'dirt',  'dirt',  'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'dirt',  'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'dirt',  'grass', 'grass'],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'dirt',  'dirt',  'dirt' ],
		['grass', 'dirt',  'grass', 'dirt',  'grass', 'grass', 'grass', 'grass'],
		['grass', 'dirt',  'dirt',  'dirt',  'grass', 'stone', 'stone', 'stone'],
		['grass', 'grass', 'grass', 'grass', 'grass', 'stone', 'stone', 'stone']
	]
}).appendTo(SkyEngine.Screen);
```

타일 맵 노드들이 공통으로 사용하는 파라미터 목록은 다음과 같습니다.
- `tileWidth` 타일의 너비
- `tileHeight` 타일의 높이
- `tileMap` 타일 맵을 구성하는 타일들의 2차원 배열
- `tileSet` `tileKeyMap`으로 타일 맵을 구성하기 위한 타일에 해당하는 키와 타일의 목록
- `tileKeyMap` `tileSet`에 선언한 타일들을 기반으로 타일 맵을 구성하기 위한 키들의 2차원 배열

타일 맵 노드들에서 공통으로 사용 가능한 함수들은 다음과 같습니다.
- `getTileWidth()` 타일의 너비를 가져옵니다.
- `getTileHeight()` 타일의 높이를 가져옵니다.
- `addTile({row:, col:, tile:})` `addTile({row:, col:, key:})` 특정 위치에 타일을 추가합니다.
- `getTile({row:, col:})` 특정 위치의 타일을 가져옵니다.
- `getTileKey({row:, col:})` 특정 위치의 타일의 키를 가져옵니다.
- `moveTile({fromRow:, fromCol:, toRow:, toCol:})` `moveTile({fromRow:, fromCol:, toRow:, toCol:, speed:, accel:}, endHandler)` 타일을 이동시킵니다.

## Isomatric 타일 맵 노드
`SkyEngine.IsomatricTileMap`

Isomatric 타일 맵을 생성합니다.

![Isomatric 타일 맵](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/TileSystem/isomatrictilemap.png)

```javascript
let isomatricTileMap = SkyEngine.IsometricTileMap({
	centerX : 64 * 4,
	centerY : 33 * 4,
	tileWidth : 64,
	tileHeight : 33,
	tileSet : {
		grass : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					centerY : 10,
					src : SkyEngineShowcase.R('tile/igrass.png')
				})
			});
		},
		water : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					centerY : 16,
					src : SkyEngineShowcase.R('tile/iwater.png')
				})
			});
		},
		sand : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					centerY : 16,
					src : SkyEngineShowcase.R('tile/isand.png')
				})
			});
		}
	},
	tileKeyMap : [
		['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
			['water', 'sand',  'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
		['water', 'water', 'sand',  'sand',  'grass', 'grass', 'grass', 'grass'],
			['water', 'water', 'sand',  'sand',  'grass', 'grass', 'grass', 'grass'],
		['water', 'water', 'water', 'water', 'sand',  'grass', 'grass', 'grass'],
			['water', 'water', 'water', 'water', 'sand',  'grass', 'grass', 'grass'],
		['water', 'water', 'water', 'water', 'water', 'sand',  'sand',  'grass'],
			['water', 'water', 'water', 'water', 'water', 'sand',  'sand',  'sand' ],
		['water', 'water', 'water', 'water', 'water', 'water', 'water', 'sand' ],
			['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
		['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water'],
			['water', 'water', 'water', 'water', 'water', 'water', 'water', 'water']
	]
}).appendTo(SkyEngine.Screen);
```

## Hexagon 타일 맵 노드
`SkyEngine.HexagonTileMap`

Haxegon 타일 맵을 생성합니다.

![Haxegon 타일 맵](https://raw.githubusercontent.com/Hanul/SkyEngine/master/DOC/Node/TileSystem/hexagontilemap.png)

```javascript
let hexagonTileMap = SkyEngine.HexagonTileMap({
	centerX : 110 * 3.5,
	centerY : (128 - 31) * 3.5,
	tileWidth : 110,
	tileHeight : 128,
	overlapHeight : 31,
	tileSet : {
		grass : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hgrass.png')
				})
			});
		},
		water : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hwater.png')
				})
			});
		},
		sand : () => {
			return SkyEngine.Tile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hsand.png')
				})
			});
		},
		mountain : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hmountain.png')
				})
			});
		},
		fire : () => {
			return SkyEngine.CollisionTile({
				c : SkyEngine.Image({
					src : SkyEngineShowcase.R('tile/hfire.png')
				})
			});
		}
	},
	tileKeyMap : [
		['sand',  'water', 'sand',  'grass', 'grass', 'grass', 'mountain', 'mountain'],
		['sand',  'water', 'sand',  'water', 'water', 'water', 'grass',    'mountain'],
		['sand',  'water', 'sand',  'water', 'grass', 'water', 'grass',    'grass'   ],
		['sand',  'water', 'grass', 'water', 'grass', 'water', 'grass',    'grass'   ],
		['sand',  'water', 'grass', 'water', 'grass', 'water', 'water',    'water'   ],
		['grass', 'water', 'grass', 'water', 'grass', 'grass', 'grass',    'grass'   ],
		['grass', 'water', 'water', 'water', 'grass', 'grass', 'fire',     'fire'    ],
		['grass', 'grass', 'grass', 'grass', 'grass', 'fire',  'fire',     'fire'    ]
	]
}).appendTo(SkyEngine.Screen);
```

Hexagon 타일 맵에서는 `overlapHeight` 파라미터를 통해 타일들 끼리 겹치는 정도를 지정할 수 있습니다.

## 캐릭터와 충돌 타일의 상호작용 예제
다음은 캐릭터가 이동중에 충돌 타일과 부딫혔을 때와 떨어졌을 때, 캐릭터가 멈추거나 다시 이동하도록 하는 예시 코드입니다.

```javascript
let shw = hero.getCollider().getWidth() / 2;
let sh = hero.getCollider().getHeight();

// 충돌 타일과 부딪힌 경우
hero.onMeet(SkyEngine.CollisionTile, (tile) => {
	
	let hw = tile.getCollider().getWidth() / 2;
	let hh = tile.getCollider().getHeight() / 2;
	
	// 아래로 부딪힘
	if (
	hero.getBeforeY() <= tile.getY() - hh &&
	
	hero.getX() - shw < tile.getX() + hw &&
	tile.getX() - hw < hero.getX() + shw) {
		
		hero.setY(tile.getY() - hh);
		hero.stopDown();
		
		if (hero.getState() === 'jump') {
			// 이동중이고, 가속도가 없어야 합니다. (가속도가 있다는 것은 멈추는 중인 상황)
			if (hero.getSpeedX() !== 0 && hero.getAccelX() === 0) {
				hero.setState('walk');
			} else {
				hero.setState('idle');
			}
		}
	}
	
	// 위로 부딪힘
	else if (
	hero.getBeforeY() - sh >= tile.getY() + hh &&
	
	hero.getX() - shw < tile.getX() + hw &&
	tile.getX() - hw < hero.getX() + shw) {
		
		hero.setY(tile.getY() + hh + sh);
		hero.stopUp();
	}
	
	// 좌우로 부딪힘
	else {
		
		// 왼쪽으로 부딪힘
		if (
		hero.getBeforeX() - shw >= tile.getX() + hw &&
		
		hero.getY() - sh < tile.getY() + hh &&
		tile.getY() - hh < hero.getY()) {
			
			hero.setX(tile.getX() + hw + shw);
			hero.stuckLeft();
		}
		
		// 오른쪽으로 부딪힘
		if (
		hero.getBeforeX() + shw <= tile.getX() - hw &&
		
		hero.getY() - sh < tile.getY() + hh &&
		tile.getY() - hh < hero.getY()) {
			
			hero.setX(tile.getX() - hw - shw);
			hero.stuckRight();
		}
	}
});

// 충돌 타일과 떨어진 경우
hero.onPart(SkyEngine.CollisionTile, (tile) => {
	
	let hw = tile.getCollider().getWidth() / 2;
	let hh = tile.getCollider().getHeight() / 2;
	
	// 왼쪽 타일로부터 떨어진 경우
	if (tile.getX() + hw <= hero.getX() - shw) {
		hero.unstuckLeft();
		
		// 떨어지는 경우
		if (tile.getY() - hh <= hero.getY()) {
			hero.setAccelY(3000);
		}
	}
	
	// 오른쪽 타일로부터 떨어진 경우
	else if (hero.getX() + shw <= tile.getX() - hw) {
		hero.unstuckRight();
		
		// 떨어지는 경우
		if (tile.getY() - hh <= hero.getY()) {
			hero.setAccelY(3000);
		}
	}
	
	// 왼쪽도 오른쪽도 아니면, 점프한 경우
	else {
		hero.setAccelY(3000);
	}
});
```