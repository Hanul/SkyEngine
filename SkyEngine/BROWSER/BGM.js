/*
 * 배경음악
 */
SkyEngine.BGM = CLASS({
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//OPTIONAL: params.ogg
		//OPTIONAL: params.mp3
		//OPTIONAL: params.volume
		//OPTIONAL: params.isAudioTagMode
		
		let ogg = params.ogg;
		let mp3 = params.mp3;
		let volume = params.volume;
		let isAudioTagMode = params.isAudioTagMode;
		
		if (isAudioTagMode !== true) {
			
			let sound = SOUND({
				ogg : ogg,
				mp3 : mp3,
				volume : volume,
				isLoop : true
			});
			
			// 다른 화면을 보는 중에는 배경 음악을 일시정지합니다.
			let visibilitychangeEvent = EVENT('visibilitychange', () => {
				if (document.hidden === true) {
					sound.pause();
				} else {
					sound.play();
				}
			});
			
			let play = self.play = () => {
				sound.play();
			};
			
			let pause = self.pause = () => {
				sound.pause();
			};
			
			let stop = self.stop = () => {
				
				visibilitychangeEvent.remove();
				
				sound.stop();
				sound = undefined;
			};
			
			let setVolume = self.setVolume = (volume) => {
				//REQUIRED: volume
				
				sound.setVolume(volume);
			};
			
			let getVolume = self.getVolume = () => {
				return sound.getVolume();
			};
			
			let fadeIn = self.fadeIn = (seconds) => {
				//REQUIRED: seconds
				
				sound.fadeIn(seconds);
			};
			
			let fadeOut = self.fadeOut = (seconds) => {
				//REQUIRED: seconds
				
				visibilitychangeEvent.remove();
				
				sound.fadeOut(seconds);
				sound = undefined;
			};
		}
		
		else {
			
			if (volume === undefined) {
				volume = 0.8;
			}
			
			let audio = AUDIO({
				ogg : ogg,
				mp3 : mp3,
				isLoop : true
			});
			
			// 다른 화면을 보는 중에는 배경 음악을 일시정지합니다.
			let visibilitychangeEvent = EVENT('visibilitychange', () => {
				if (document.hidden === true) {
					audio.pause();
				} else {
					audio.play();
				}
			});
			
			let isPlaying = false;
			
			let play = self.play = () => {
				
				// iOS 기기에서는 세부 볼륨 설정이 불가능합니다. 볼륨을 0으로 하면 소리가 재생되지 않으며, 이외에는 소리의 크기가 모두 동일합니다. - 참고 문서: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
				if (INFO.getOSName() === 'iOS') {
					if (volume === 0) {
						audio.stop();
					} else {
						audio.play();
					}
				}
				
				else {
					audio.play();
				}
				
				isPlaying = true;
			};
			
			let pause = self.pause = () => {
				
				audio.pause();
				
				isPlaying = false;
			};
			
			let stop = self.stop = () => {
				
				visibilitychangeEvent.remove();
				
				audio.stop();
				audio = undefined;
				
				isPlaying = false;
			};
			
			let setVolume = self.setVolume = (_volume) => {
				//REQUIRED: volume
				
				volume = _volume;
				
				// iOS 기기에서는 세부 볼륨 설정이 불가능합니다. 볼륨을 0으로 하면 소리가 재생되지 않으며, 이외에는 소리의 크기가 모두 동일합니다. - 참고 문서: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
				if (INFO.getOSName() === 'iOS') {
					if (volume === 0) {
						audio.stop();
					} else if (isPlaying === true) {
						audio.play();
					}
				}
				
				else {
					audio.getEl().volume = volume;
				}
			};
			
			setVolume(volume);
			
			let getVolume = self.getVolume = () => {
				return volume;
			};
			
			let fadeIn = self.fadeIn = (seconds) => {
				//REQUIRED: seconds
				
				play();
			};
			
			let fadeOut = self.fadeOut = (seconds) => {
				//REQUIRED: seconds
				
				stop();
			};
		}
	}
});
