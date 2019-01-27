# `SkyEngine.BGM`
배경음악 클래스는 기본적으로 음악을 반복 재생하며, PC 환경의 웹 브라우저에서 다른 탭으로 이동하거나, 모바일 환경에서 웹 브라우저를 내리면 사운드가 일시정지합니다.

아래와 같은 파라미터들을 사용할 수 있습니다.

- `ogg` OGG 사운드 파일 경로
- `mp3` MP3 사운드 파일 경로
- `volume` 초기 배경음악 볼륨
- `isAudioTagMode` 이 설정을 `true`로 지정하면 Audio 태그를 기반으로 배경음악을 재생합니다. 이 경우 `fadeIn`과 `fadeOut` 함수가 제대로 동작하지 않으나, 모바일 환경에서는 성능 개선을 위해 사용하는 것이 좋습니다.

OGG 파일과 MP3 파일 중 브라우저가 지원하는 포맷의 사운드 파일을 재생합니다.

```javascript
let bgm = SkyEngine.BGM({
	ogg : 'bgm.ogg',
	mp3 : 'bgm.mp3'
});

// 배경음악 재생
bgm.play();

// 배경음악 일시정지
bgm.pause();

// 배경음악 중단
bgm.stop();

// 배경음악 볼륨 설정
bgm.setVolume(0.5);

// 배경음악 볼륨 가져오기
bgm.setVolume(0.5);
```

*iOS 기기에서는 페이지 접속 후 터치 이벤트가 한번 이상 발생해야 사운드가 재생됩니다. 처음부터 자동으로 재생되지 않습니다.*

*iOS 기기에서는 세부 볼륨 설정이 불가능합니다. 볼륨을 0으로 하면 소리가 재생되지 않으며, 이외에는 소리의 크기가 모두 동일합니다. - 참고 문서: https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html*