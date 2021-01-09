/*
 * 타일맵 노드
 */
SkyEngine.TileMap = CLASS({
	
	preset : () => {
		return SkyEngine.Node;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.tileWidth	타일의 너비
		//REQUIRED: params.tileHeight	타일의 높이
		//OPTIONAL: params.tileMap		타일 맵을 구성하는 타일들의 2차원 배열
		//OPTIONAL: params.tileSet		tileKeyMap으로 타일 맵을 구성하기 위한 타일과 타일에 해당하는 키의 목록
		//OPTIONAL: params.tileKeyMap	tileSet에 선언한 타일들과 키를 기반으로 타일 맵을 구성하기 위한 키들의 2차원 배열
		
		let tileWidth = params.tileWidth;
		let tileHeight = params.tileHeight;
		let tileSet = params.tileSet;
		let tileKeyMap = params.tileKeyMap;
		
		if (tileSet === undefined) {
			tileSet = {};
		}
		if (tileKeyMap === undefined) {
			tileKeyMap = [];
		}
		
		let tileMap = [];
		
		let getTileWidth = self.getTileWidth = () => {
			return tileWidth;
		};
		
		let getTileHeight = self.getTileHeight = () => {
			return tileHeight;
		};
		
		let createTile = inner.createTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			//OPTIONAL: params.tile
			//OPTIONAL: params.key
			
			let row = params.row;
			let col = params.col;
			let tile = params.tile;
			let key = params.key;
			
			if (key !== undefined && tileSet[key] !== undefined) {
				tile = tileSet[key](row, col);
				
				if (tileKeyMap[row] === undefined) {
					tileKeyMap[row] = [];
				}
				tileKeyMap[row][col] = key;
			}
			
			if (tile !== undefined) {
				
				self.append(tile);
				
				if (tileMap[row] === undefined) {
					tileMap[row] = [];
				}
				tileMap[row][col] = tile;
			}
			
			return tile;
		};
		
		let addTile = self.addTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			//OPTIONAL: params.tile
			//OPTIONAL: params.key
			
			let row = params.row;
			let col = params.col;
			
			let tile = createTile(params);
			
			if (tile !== undefined) {
				
				tile.setPosition({
					x : col * tileWidth,
					y : row * tileHeight
				});
				
				// 충돌체 추가
				if (tile.checkIsInstanceOf(SkyEngine.CollisionTile) === true) {
					tile.addCollider(SkyEngine.Rect({
						width : tileWidth,
						height : tileHeight
					}));
				}
			}
		};
		
		let getTileKey = self.getTileKey = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			
			let row = params.row;
			let col = params.col;
			
			if (tileKeyMap !== undefined && tileKeyMap[row] !== undefined) {
				return tileKeyMap[row][col];
			}
		};
		
		let getTile = self.getTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			
			let row = params.row;
			let col = params.col;
			
			if (tileMap[row] !== undefined) {
				return tileMap[row][col];
			}
		};
		
		let swapTile = inner.swapTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.fromRow
			//REQUIRED: params.fromCol
			//REQUIRED: params.toRow
			//REQUIRED: params.toCol
			
			let fromRow = params.fromRow;
			let fromCol = params.fromCol;
			let toRow = params.toRow;
			let toCol = params.toCol;
			
			let t;
			
			if (tileKeyMap[toRow] === undefined) {
				tileKeyMap[toRow] = [];
			} else {
				t = tileKeyMap[toRow][toCol];
			}
			
			if (tileKeyMap[fromRow] === undefined) {
				tileKeyMap[fromRow] = [];
			} else {
				tileKeyMap[toRow][toCol] = tileKeyMap[fromRow][fromCol];
			}
			
			tileKeyMap[fromRow][fromCol] = t;
			
			let fromTile;
			if (tileMap[fromRow] !== undefined) {
				fromTile = tileMap[fromRow][fromCol];
			}
			
			let toTile;
			if (tileMap[toRow] !== undefined) {
				toTile = tileMap[toRow][toCol];
			}
			
			if (tileMap[toRow] === undefined) {
				tileMap[toRow] = [];
			}
			tileMap[toRow][toCol] = fromTile;
			
			if (toTile === undefined) {
				if (tileMap[fromRow] !== undefined) {
					tileMap[fromRow][fromCol] = undefined;
				}
			}
			
			else {
				
				if (tileMap[fromRow] === undefined) {
					tileMap[fromRow] = [];
				}
				tileMap[fromRow][fromCol] = toTile;
			}
			
			return {
				fromTile : fromTile,
				toTile : toTile
			};
		};
		
		let moveTile = self.moveTile = (params, endHandler) => {
			//REQUIRED: params
			//REQUIRED: params.fromRow
			//REQUIRED: params.fromCol
			//REQUIRED: params.toRow
			//REQUIRED: params.toCol
			//OPTIONAL: params.speed
			//OPTIONAL: params.accel
			//OPTIONAL: endHandler
			
			let fromRow = params.fromRow;
			let fromCol = params.fromCol;
			let toRow = params.toRow;
			let toCol = params.toCol;
			let speed = params.speed;
			let accel = params.accel;
			
			let swapResult = swapTile(params);
			
			let fromTile = swapResult.fromTile;
			let toTile = swapResult.toTile;
			
			if (fromTile !== undefined) {
				
				if (speed !== undefined || accel !== undefined) {
					
					fromTile.moveTo({
						x : toCol * tileWidth,
						y : toRow * tileHeight,
						speed : speed,
						accel : accel
					}, endHandler);
					
					endHandler = undefined;
				}
				
				else {
					
					fromTile.setPosition({
						x : toCol * tileWidth,
						y : toRow * tileHeight
					});
				}
			}
			
			if (toTile !== undefined) {
				
				if (speed !== undefined || accel !== undefined) {
					
					toTile.moveTo({
						x : fromCol * tileWidth,
						y : fromRow * tileHeight,
						speed : speed,
						accel : accel
					}, endHandler);
					
					endHandler = undefined;
				}
				
				else {
					
					toTile.setPosition({
						x : fromCol * tileWidth,
						y : fromRow * tileHeight
					});
				}
			}
		};
		
		let removeTile = self.removeTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			
			let row = params.row;
			let col = params.col;
			
			if (tileKeyMap[row] !== undefined) {
				tileKeyMap[row][col] = undefined;
			}
			
			if (tileMap[row] !== undefined && tileMap[row][col] !== undefined) {
				tileMap[row][col].remove();
				tileMap[row][col] = undefined;
			}
		};
		
		let empty;
		OVERRIDE(self.empty, (origin) => {
			
			empty = self.empty = () => {
				
				tileKeyMap = [];
				tileMap = [];
				
				origin();
			};
		});
		
		let checkCollisionTile = self.checkCollisionTile = (params) => {
			//REQUIRED: params
			//REQUIRED: params.row
			//REQUIRED: params.col
			
			let row = params.row;
			let col = params.col;
			
			return tileMap[row] !== undefined && tileMap[row][col] !== undefined && tileMap[row][col].checkIsInstanceOf(SkyEngine.CollisionTile) === true;
		};
		
		let findPath = self.findPath = (params) => {
			//REQUIRED: params
			//REQUIRED: params.startRow
			//REQUIRED: params.startCol
			//REQUIRED: params.endRow
			//REQUIRED: params.endCol
			
			let startRow = params.startRow;
			let startCol = params.startCol;
			let endRow = params.endRow;
			let endCol = params.endCol;
			
			let costMap = [];
			
			let queue = [];
			
			let register = (parent, row, col) => {
				
				if (getTile({
					row : row,
					col : col
				}) !== undefined && checkCollisionTile({
					row : row,
					col : col
				}) !== true) {
					
					if (costMap[row] === undefined) {
						costMap[row] = [];
					}
					
					let cost = parent.cost + 1;
					
					if (costMap[row][col] === undefined || costMap[row][col] > cost) {
						
						costMap[row][col] = cost;
						
						queue.push({
							parent : parent,
							row : row,
							col : col,
							cost : cost
						});
					}
				}
			};
			
			register({
				cost : -1
			}, startRow, startCol);
			
			while (queue.length > 0) {
				let point = queue.shift();
				
				// 찾았다.
				if (point.row === endRow && point.col === endCol) {
					
					let path = [];
					
					let nowPoint = point;
					
					while (nowPoint.cost >= 0) {
						
						path.unshift({
							row : nowPoint.row,
							col : nowPoint.col
						});
						
						nowPoint = nowPoint.parent;
					}
					
					return path;
				}
				
				register(point, point.row - 1, point.col);
				register(point, point.row, point.col + 1);
				register(point, point.row + 1, point.col);
				register(point, point.row, point.col - 1);
			}
		};
	},
	
	afterInit : (inner, self, params) => {
		
		let tileMap = params.tileMap;
		let tileKeyMap = params.tileKeyMap;
		
		if (tileMap !== undefined) {
			
			EACH(tileMap, (tiles, i) => {
				EACH(tiles, (tile, j) => {
					if (tile !== undefined) {
						self.addTile({
							row : i,
							col : j,
							tile : tile
						});
					}
				});
			});
			
			tileMap = undefined;
		}
		
		if (tileKeyMap !== undefined) {
			
			EACH(tileKeyMap, (tileKeys, i) => {
				EACH(tileKeys, (tileKey, j) => {
					
					self.addTile({
						row : i,
						col : j,
						key : tileKey
					});
				});
			});
		}
	}
});
