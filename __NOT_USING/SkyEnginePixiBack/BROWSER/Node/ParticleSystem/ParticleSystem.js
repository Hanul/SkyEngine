OVERRIDE(SkyEngine.ParticleSystem, (origin) => {

	SkyEngine.ParticleSystem = CLASS(() => {

		let random = (min, max) => {
			return Math.random() * (max - min) + min;
		};

		return {

			preset: () => {
				return SkyEngine.Node;
			},

			init: (inner, self, params) => {
				//REQUIRED: params
				//OPTIONAL: params.particleSrc

				//OPTIONAL: params.particleFigure
				//OPTIONAL: params.particleStartX
				//OPTIONAL: params.particleStartY
				//OPTIONAL: params.particleEndX
				//OPTIONAL: params.particleEndY
				//OPTIONAL: params.particleWidth
				//OPTIONAL: params.particleHeight
				//OPTIONAL: params.particlePoints
				//OPTIONAL: params.particleColor
				//OPTIONAL: params.particleBorder
				//OPTIONAL: params.particleColorR
				//OPTIONAL: params.minParticleColorR
				//OPTIONAL: params.maxParticleColorR
				//OPTIONAL: params.particleColorG
				//OPTIONAL: params.minParticleColorG
				//OPTIONAL: params.maxParticleColorG
				//OPTIONAL: params.particleColorB
				//OPTIONAL: params.minParticleColorB
				//OPTIONAL: params.maxParticleColorB
				
				//OPTIONAL: params.particleCenterX
				//OPTIONAL: params.particleCenterY

				//OPTIONAL: params.particleCount
				//OPTIONAL: params.minParticleCount
				//OPTIONAL: params.maxParticleCount

				//OPTIONAL: params.particleLifetime
				//OPTIONAL: params.minParticleLifetime
				//OPTIONAL: params.maxParticleLifetime

				//OPTIONAL: params.particleSpeed
				//OPTIONAL: params.minParticleSpeed
				//OPTIONAL: params.maxParticleSpeed
				//OPTIONAL: params.particleAccelX
				//OPTIONAL: params.particleAccelY

				//OPTIONAL: params.particleScale
				//OPTIONAL: params.minParticleScale
				//OPTIONAL: params.maxParticleScale
				//OPTIONAL: params.particleScalingSpeed
				//OPTIONAL: params.minParticleScalingSpeed
				//OPTIONAL: params.maxParticleScalingSpeed

				//OPTIONAL: params.particleAngle
				//OPTIONAL: params.minParticleAngle
				//OPTIONAL: params.maxParticleAngle
				//OPTIONAL: params.particleRotationSpeed
				//OPTIONAL: params.minParticleRotationSpeed
				//OPTIONAL: params.minParticleRotationSpeed

				//OPTIONAL: params.particleAlpha
				//OPTIONAL: params.minParticleAlpha
				//OPTIONAL: params.maxParticleAlpha
				//OPTIONAL: params.particleFadingSpeed
				//OPTIONAL: params.minParticleFadingSpeed
				//OPTIONAL: params.minParticleFadingSpeed

				let particleSrc = params.particleSrc;
				
				let particleFigure = params.particleFigure;
				let particleStartX = params.particleStartX;
				let particleStartY = params.particleStartY;
				let particleEndX = params.particleEndX;
				let particleEndY = params.particleEndY;
				let particleWidth = params.particleWidth;
				let particleHeight = params.particleHeight;
				let particlePoints = params.particlePoints;
				let particleColor = params.particleColor;
				let particleBorder = params.particleBorder;
				let particleColorR = params.particleColorR;
				let minParticleColorR = params.minParticleColorR;
				let maxParticleColorR = params.maxParticleColorR;
				let particleColorG = params.particleColorG;
				let minParticleColorG = params.minParticleColorG;
				let maxParticleColorG = params.maxParticleColorG;
				let particleColorB = params.particleColorB;
				let minParticleColorB = params.minParticleColorB;
				let maxParticleColorB = params.maxParticleColorB;

				let particleCenterX = params.particleCenterX;
				let particleCenterY = params.particleCenterY;

				let particleCount = params.particleCount;
				let minParticleCount = params.minParticleCount;
				let maxParticleCount = params.maxParticleCount;

				let particleLifetime = params.particleLifetime;
				let minParticleLifetime = params.minParticleLifetime;
				let maxParticleLifetime = params.maxParticleLifetime;

				let particleSpeed = params.particleSpeed;
				let minParticleSpeed = params.minParticleSpeed;
				let maxParticleSpeed = params.maxParticleSpeed;
				let particleAccelX = params.particleAccelX;
				let particleAccelY = params.particleAccelY;

				let particleScale = params.particleScale;
				let minParticleScale = params.minParticleScale;
				let maxParticleScale = params.maxParticleScale;
				let particleScalingSpeed = params.particleScalingSpeed;
				let minParticleScalingSpeed = params.minParticleScalingSpeed;
				let maxParticleScalingSpeed = params.maxParticleScalingSpeed;

				let particleAngle = params.particleAngle;
				let minParticleAngle = params.minParticleAngle;
				let maxParticleAngle = params.maxParticleAngle;
				let particleRotationSpeed = params.particleRotationSpeed;
				let minParticleRotationSpeed = params.minParticleRotationSpeed;
				let maxParticleRotationSpeed = params.maxParticleRotationSpeed;

				let particleAlpha = params.particleAlpha;
				let minParticleAlpha = params.minParticleAlpha;
				let maxParticleAlpha = params.maxParticleAlpha;
				let particleFadingSpeed = params.particleFadingSpeed;
				let minParticleFadingSpeed = params.minParticleFadingSpeed;
				let maxParticleFadingSpeed = params.maxParticleFadingSpeed;

				if (particleColorR === undefined) {
					particleColorR = 0;
				}
				if (minParticleColorR === undefined) {
					minParticleColorR = particleColorR;
				}
				if (maxParticleColorR === undefined) {
					maxParticleColorR = particleColorR;
				}
				
				if (particleColorG === undefined) {
					particleColorG = 0;
				}
				if (minParticleColorG === undefined) {
					minParticleColorG = particleColorG;
				}
				if (maxParticleColorG === undefined) {
					maxParticleColorG = particleColorG;
				}
				
				if (particleColorB === undefined) {
					particleColorB = 0;
				}
				if (minParticleColorB === undefined) {
					minParticleColorB = particleColorB;
				}
				if (maxParticleColorB === undefined) {
					maxParticleColorB = particleColorB;
				}
				
				if (particleCenterX === undefined) {
					particleCenterX = 0;
				}
				if (particleCenterY === undefined) {
					particleCenterY = 0;
				}

				if (particleCount === undefined) {
					particleCount = 1;
				}

				if (minParticleCount === undefined) {
					minParticleCount = particleCount;
				}
				if (maxParticleCount === undefined) {
					maxParticleCount = particleCount;
				}

				if (minParticleLifetime === undefined) {
					minParticleLifetime = particleLifetime;
				}
				if (maxParticleLifetime === undefined) {
					maxParticleLifetime = particleLifetime;
				}

				if (minParticleSpeed === undefined) {
					minParticleSpeed = particleSpeed;
				}
				if (maxParticleSpeed === undefined) {
					maxParticleSpeed = particleSpeed;
				}

				if (particleAccelX === undefined) {
					particleAccelX = 0;
				}
				if (particleAccelY === undefined) {
					particleAccelY = 0;
				}

				if (particleScale === undefined) {
					particleScale = 1;
				}
				if (minParticleScale === undefined) {
					minParticleScale = particleScale;
				}
				if (maxParticleScale === undefined) {
					maxParticleScale = particleScale;
				}

				if (particleScalingSpeed === undefined) {
					particleScalingSpeed = 0;
				}
				if (minParticleScalingSpeed === undefined) {
					minParticleScalingSpeed = particleScalingSpeed;
				}
				if (maxParticleScalingSpeed === undefined) {
					maxParticleScalingSpeed = particleScalingSpeed;
				}

				if (particleAngle === undefined) {
					particleAngle = 0;
				}
				if (minParticleAngle === undefined) {
					minParticleAngle = particleAngle;
				}
				if (maxParticleAngle === undefined) {
					maxParticleAngle = particleAngle;
				}

				if (particleRotationSpeed === undefined) {
					particleRotationSpeed = 0;
				}
				if (minParticleRotationSpeed === undefined) {
					minParticleRotationSpeed = particleRotationSpeed;
				}
				if (maxParticleRotationSpeed === undefined) {
					maxParticleRotationSpeed = particleRotationSpeed;
				}

				if (particleAlpha === undefined) {
					particleAlpha = 1;
				}
				if (minParticleAlpha === undefined) {
					minParticleAlpha = particleAlpha;
				}
				if (maxParticleAlpha === undefined) {
					maxParticleAlpha = particleAlpha;
				}

				if (particleFadingSpeed === undefined) {
					particleFadingSpeed = 0;
				}
				if (minParticleFadingSpeed === undefined) {
					minParticleFadingSpeed = particleFadingSpeed;
				}
				if (maxParticleFadingSpeed === undefined) {
					maxParticleFadingSpeed = particleFadingSpeed;
				}
				
				let particleBorderPixel;
				let particleBorderStyle;
				let particleBorderColor;
				
				if (particleBorder !== undefined) {
					let split = particleBorder.split(' ');
					particleBorderPixel = INTEGER(split[0]);
					particleBorderStyle = split[1];
					particleBorderColor = split[2];
				}
				
				let texture;
				
				if (particleSrc !== undefined) {
					texture = PIXI.Texture.fromImage(particleSrc);
				}
				
				else {
					
					let graphics = new PIXI.Graphics();
					
					if (particleBorder !== undefined) {
						graphics.lineStyle(particleBorderPixel, parseInt(particleBorderColor.substring(1), 16), 1);
					}
					
					if (particleColor !== undefined) {
						graphics.beginFill(parseInt(particleColor.substring(1), 16));
					}
					
					else {
						particleColor = RANDOM({
							min : minParticleColorR,
							max : maxParticleColorR
						}) << 16 | RANDOM({
							min : minParticleColorG,
							max : maxParticleColorG
						}) << 8 | RANDOM({
							min : minParticleColorB,
							max : maxParticleColorB
						});
						
						graphics.beginFill(particleColor);
					}
					
					if (particleFigure === 'line') {
						graphics.moveTo(particleCenterX + particleStartX, particleCenterY + particleStartY);
						graphics.lineTo(particleCenterX + particleEndX, particleCenterY + particleEndY);
					}
					
					else if (particleFigure === 'rect') {
						graphics.drawRect(particleCenterX - particleWidth / 2, particleCenterX - particleHeight / 2, particleWidth, particleHeight);
					}
					
					else if (particleFigure === 'circle') {
						graphics.drawEllipse(particleCenterX, particleCenterY, particleWidth / 2, particleHeight / 2);
					}
					
					else if (particleFigure === 'polygon') {
						
						if (particlePoints.length > 0) {
							
							let pixiPoints = [];
							
							EACH(particlePoints, (particlePoint) => {
								pixiPoints.push(new PIXI.Point(particleCenterX + particlePoint.x, particleCenterY + particlePoint.y));
							});
							
							if (particlePoints.length > 0) {
								pixiPoints.push(new PIXI.Point(particleCenterX + particlePoints[0].x, particleCenterY + particlePoints[0].y));
							}
							
							graphics.drawPolygon(pixiPoints);
						}
					}
					
					if (particleColor !== undefined) {
						graphics.endFill();
					}
					
					texture = SkyEngine.Screen.getPixiRenderer().generateTexture(graphics);
					
					graphics.destroy();
					graphics = undefined;
				}

				let emitter = new PIXI.particles.Emitter(
					
					inner.getPixiContainer(),
					
					[texture],
					
					{
						alpha : {
							start : random(minParticleAlpha, maxParticleAlpha),
							end : random(minParticleAlpha, maxParticleAlpha) + random(minParticleFadingSpeed, maxParticleFadingSpeed) * maxParticleLifetime
						},
						scale : {
							start : random(minParticleScale, maxParticleScale),
							end : random(minParticleScale, maxParticleScale) + random(minParticleScalingSpeed, maxParticleScalingSpeed) * maxParticleLifetime
						},
						color : {
							start : 'ffffff',
							end : 'ffffff'
						},
						speed : {
							start : random(minParticleSpeed, maxParticleSpeed),
							end : random(minParticleSpeed, maxParticleSpeed)
						},
						acceleration : {
							x : particleAccelX,
							y : particleAccelY
						},
						startRotation : {
							min : minParticleAngle,
							max : maxParticleAngle === 0 ? 360 : maxParticleAngle
						},
						rotationSpeed : {
							min : minParticleRotationSpeed,
							max : maxParticleRotationSpeed
						},
						lifetime : {
							min : minParticleLifetime,
							max : maxParticleLifetime
						},
						frequency : 0.008,
						emitterLifetime : maxParticleLifetime,
						maxParticles : random(minParticleCount, maxParticleCount),
						pos : {
							x : particleCenterX,
							y : particleCenterY
						},
						addAtBack : false,
						spawnType : 'circle',
						spawnCircle : {
							x : 0,
							y : 0,
							r : 10
						}
					}
				);
				
				emitter.particleBlendMode = SkyEnginePixiBack.Util.getPixiBlendMode(self.getBlendMode());
				
				let endHandler;

				let burst = self.burst = (_endHandler) => {
					//OPTIONAL: endHandler
					
					endHandler = _endHandler;

					if (emitter !== undefined) {
						emitter.playOnce(() => {
							if (endHandler !== undefined) {
								endHandler(self);
							}
						});
					}
				};
				
				let remove;
				OVERRIDE(self.remove, (origin) => {
					
					remove = self.remove = () => {
						
						emitter.destroy();
						emitter = undefined;
						
						endHandler = undefined;
						
						origin();
					};
				});
			}
		};
	});
});