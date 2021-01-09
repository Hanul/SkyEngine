SkyEngineShowcase.TileMapTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let tileMap = SkyEngine.TileMap({
			x : -400,
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
		
		let path = tileMap.findPath({
			startRow : 0,
			startCol : 1,
			endRow : 4,
			endCol : 7
		});
		
		EACH(path, (point) => {
			tileMap.getTile(point).setAlpha('0.5');
		});
		
		tileMap.moveTile({
			fromRow : 0,
			fromCol : 1,
			toRow : 4,
			toCol : 7,
			speed : 100
		});
		
		let isomatricTileMap = SkyEngine.IsometricTileMap({
			scale : 0.8,
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
		
		let path2 = isomatricTileMap.findPath({
			startRow : 0,
			startCol : 0,
			endRow : 13,
			endCol : 7
		});
		
		EACH(path2, (point) => {
			isomatricTileMap.getTile(point).setAlpha('0.5');
		});
		
		isomatricTileMap.moveTile({
			fromRow : 0,
			fromCol : 0,
			toRow : 13,
			toCol : 7,
			speed : 200
		});
		
		let hexagonTileMap = SkyEngine.HexagonTileMap({
			x : 400,
			scale : 0.35,
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
		
		let path3 = hexagonTileMap.findPath({
			startRow : 0,
			startCol : 0,
			endRow : 5,
			endCol : 7
		});
		
		EACH(path3, (point) => {
			hexagonTileMap.getTile(point).setAlpha('0.5');
		});
		
		hexagonTileMap.moveTile({
			fromRow : 0,
			fromCol : 0,
			toRow : 5,
			toCol : 7,
			speed : 300
		});
		
		inner.on('close', () => {
			tileMap.remove();
			isomatricTileMap.remove();
			hexagonTileMap.remove();
		});
	}
});
