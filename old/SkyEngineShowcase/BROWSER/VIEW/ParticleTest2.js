SkyEngineShowcase.ParticleTest2 = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner) => {
		
		let touchEvent = EVENT('touchstart', (e) => {
			
			SkyEngine.ParticleSystemOnce({
				x : (e.getLeft() - WIN_WIDTH() / 2) / SkyEngine.Screen.getRatio(),
				y : (e.getTop() - WIN_HEIGHT() / 2) / SkyEngine.Screen.getRatio(),
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
			
			e.stop();
		});
		
		inner.on('close', () => {
			touchEvent.remove();
		});
	}
});
