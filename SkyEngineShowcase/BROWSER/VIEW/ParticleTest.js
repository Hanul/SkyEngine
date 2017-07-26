SkyEngineShowcase.ParticleTest = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let particle = SkyEngine.ParticleSystem({
			particleSrc : SkyEngineShowcase.R('star.png'),
			minParticleCount : 50,
			maxParticleCount : 100,
			minParticleLifetime : 200,
			maxParticleLifetime : 500,
			minParticleDirection : 0,
			maxParticleDirection : 360,
			minParticleSpeed : 100,
			maxParticleSpeed : 300,
			minParticleScale : 0.05,
			maxParticleScale : 0.2,
			particleRotationSpeed : 1000,
			particleFadingSpeed : -2
		}).appendTo(SkyEngine.Screen);
		
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
			particleLifetime : 1000,
			minParticleSpeed : 300,
			maxParticleSpeed : 700,
			minParticleScale : 0.3,
			maxParticleScale : 0.7,
			minParticleDirection : 30,
			maxParticleDirection : 30
		}).appendTo(SkyEngine.Screen);
		
		let moveRainEvent = EVENT('resize', RAR(() => {
			rain.setY(-SkyEngine.Screen.getHeight() / 2);
		}));
		
		let touchEvent = EVENT('touchstart', (e) => {
			particle.burst();
			e.stop();
		});
		
		let rainInterval = INTERVAL(0.1, () => {
			rain.burst();
		});
		
		inner.on('close', () => {
			
			particle.remove();
			rain.remove();
			
			touchEvent.remove();
			
			rainInterval.remove();
		});
	}
});