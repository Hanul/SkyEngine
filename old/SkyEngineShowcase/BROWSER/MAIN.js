SkyEngineShowcase.MAIN = METHOD({

	run : (params) => {
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : '',
			target : SkyEngineShowcase.MainMenu
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'hello',
			target : SkyEngineShowcase.HelloSkyEngine
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/draw',
			target : SkyEngineShowcase.DrawTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/node',
			target : SkyEngineShowcase.NodeTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/dom',
			target : SkyEngineShowcase.DomTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/moving',
			target : SkyEngineShowcase.MovingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/scaling',
			target : SkyEngineShowcase.ScalingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/rotation',
			target : SkyEngineShowcase.RotationTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/fading',
			target : SkyEngineShowcase.FadingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/background',
			target : SkyEngineShowcase.BackgroundTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/filter',
			target : SkyEngineShowcase.FilterTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/blendmode',
			target : SkyEngineShowcase.BlendModeTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/event',
			target : SkyEngineShowcase.EventTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/collision',
			target : SkyEngineShowcase.CollisionTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/intersection',
			target : SkyEngineShowcase.IntersectionTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/performance',
			target : SkyEngineShowcase.PerformanceTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/raycast',
			target : SkyEngineShowcase.RaycastTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/hitscan',
			target : SkyEngineShowcase.HitscanShootingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/projectile',
			target : SkyEngineShowcase.ProjectileShootingTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/stateset',
			target : SkyEngineShowcase.StateSetTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/tilemap',
			target : SkyEngineShowcase.TileMapTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/particle',
			target : SkyEngineShowcase.ParticleTest
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/particle2',
			target : SkyEngineShowcase.ParticleTest2
		});
		
		SkyEngineShowcase.MATCH_VIEW({
			uri : 'test/subscreen',
			target : SkyEngineShowcase.SubScreenTest
		});
	}
});
