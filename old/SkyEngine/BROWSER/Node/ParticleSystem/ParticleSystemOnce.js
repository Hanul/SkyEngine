/*
 * 한번 출력 후 사라지는 파티클 시스템 노드
 */
SkyEngine.ParticleSystemOnce = CLASS({
	
	preset : () => {
		return SkyEngine.ParticleSystem;
	},
	
	init : (inner, self, params) => {
		
		self.burst((particle) => {
			particle.remove();
		});
	}
});
