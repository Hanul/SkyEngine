/*
 * Isometric 타일맵 노드
 */
SkyEngine.IsometricTileMap = CLASS({
	
	preset : () => {
		return SkyEngine.TileMap;
	},
	
	init : (inner, self, params) => {
		
		let addTile;
		OVERRIDE(self.addTile, (origin) => {
			
			addTile = self.addTile = (params) => {
				//REQUIRED: params
				//REQUIRED: params.row
				//REQUIRED: params.col
				//OPTIONAL: params.tile
				//OPTIONAL: params.key
				
				let row = params.row;
				let col = params.col;
				
				let tile = inner.createTile(params);
				
				if (tile !== undefined) {
					
					tile.setPosition({
						x : col * self.getTileWidth() + (row % 2) * self.getTileWidth() / 2,
						y : row * self.getTileHeight() / 2
					});
					
					// 충돌체 추가
					if (tile.checkIsInstanceOf(SkyEngine.CollisionTile) === true) {
						tile.addCollider(SkyEngine.Polygon({
							points : [{
								x : 0,
								y : -self.getTileHeight() / 2
							}, {
								x : self.getTileWidth() / 2,
								y : 0
							}, {
								x : 0,
								y : self.getTileHeight() / 2
							}, {
								x : -self.getTileWidth() / 2,
								y : 0
							}]
						}));
					}
				}
			};
		});
		
		let moveTile;
		OVERRIDE(self.moveTile, (origin) => {
			
			moveTile = self.moveTile = (params, endHandler) => {
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
				
				let swapResult = inner.swapTile(params);
				
				let fromTile = swapResult.fromTile;
				let toTile = swapResult.toTile;
				
				if (fromTile !== undefined) {
					
					if (speed !== undefined || accel !== undefined) {
						
						fromTile.moveTo({
							x : toCol * self.getTileWidth() + (toRow % 2) * self.getTileWidth() / 2,
							y : toRow * self.getTileHeight() / 2,
							speed : speed,
							accel : accel
						}, endHandler);
						
						endHandler = undefined;
					}
					
					else {
						
						fromTile.setPosition({
							x : toCol * self.getTileWidth() + (toRow % 2) * self.getTileWidth() / 2,
							y : toRow * self.getTileHeight() / 2
						});
					}
				}
				
				if (toTile !== undefined) {
					
					if (speed !== undefined || accel !== undefined) {
						
						toTile.moveTo({
							x : fromCol * self.getTileWidth() + (fromRow % 2) * self.getTileWidth() / 2,
							y : fromRow * self.getTileHeight() / 2,
							speed : speed,
							accel : accel
						}, endHandler);
						
						endHandler = undefined;
					}
					
					else {
						
						toTile.setPosition({
							x : fromCol * self.getTileWidth() + (fromRow % 2) * self.getTileWidth() / 2,
							y : fromRow * self.getTileHeight() / 2
						});
					}
				}
			};
		});
		
		let findPath;
		OVERRIDE(self.findPath, (origin) => {
			
			findPath = self.findPath = (params) => {
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
					
					if (self.getTile({
						row : row,
						col : col
					}) !== undefined && self.checkCollisionTile({
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
					
					if (point.row % 2 === 0) {
						register(point, point.row - 1, point.col - 1);
						register(point, point.row - 1, point.col);
						register(point, point.row + 1, point.col - 1);
						register(point, point.row + 1, point.col);
					} else {
						register(point, point.row - 1, point.col);
						register(point, point.row - 1, point.col + 1);
						register(point, point.row + 1, point.col);
						register(point, point.row + 1, point.col + 1);
					}
				}
			};
		});
	}
});
