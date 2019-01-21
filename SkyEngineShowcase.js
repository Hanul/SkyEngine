require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'SkyEngineShowcase',
		
		title : 'SkyEngine 쇼케이스',
		
		isDevMode : true,
		webServerPort : 8127
	},
	
	BROWSER_CONFIG : {
		isNotToConnectServer : true,
		
		SkyEngine : {
			isDebugMode : true,
			fps : 24
		}
	},
	
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true
	}
});
