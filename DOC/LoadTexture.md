# `SkyEngine.LoadTexture`
텍스쳐를 불러오는 메소드

게임에서 사용되는 텍스쳐를 불러오는 메소드입니다.

```javascript
SkyEngine.LoadTexture(src, (texture) => {
	...
});
```

미리 텍스쳐를 불러와 캐싱해둘 수도 있습니다.
```javascript
SkyEngine.LoadTexture(src);
```