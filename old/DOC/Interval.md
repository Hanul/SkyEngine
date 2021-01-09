# `SkyEngine.Interval`
주어진 초 마다 함수를 반복해서 실행하는 클래스

아래와 같이 코드를 작성하게 되면, 함수가 3초마다 실행됩니다.
```javascript
let interval = SkyEngine.Interval(3, (interval) => {
	// 3초마다 실행됩니다.
});
```

함수의 실행을 취소하고 싶으면, `remove` 메소드를 실행하면 됩니다.
```javascript
// 실행을 취소합니다.
interval.remove();
```

또한 `pause`와 `resume` 메소드를 통해 일시정지 및 재개할 수 있습니다. 예를 들어 1초가 지난 뒤 `pause`를 실행하고, 이후에 `resume`을 실행하게 되면 `resume`을 실행한 후 2초 뒤 함수가 실행되고, 다시 3초마다 함수가 실행됩니다.
```javascript
// 일시정지합니다.
interval.pause();

// 재개합니다.
interval.resume();
```

단, [`SkyEngine.Screen`](Node/Screen.md)이 일시정지 한 상태에서는 `SkyEngine.Interval` 또한 일시정지됩니다.