export default class Sound {

    private static readonly audioContext = new AudioContext();
    private static readonly playableOGG = new Audio().canPlayType('audio/ogg') !== '';

    private static bufferCache: { [src: string]: AudioBuffer } = {};

    private static async loadBuffer(src: string): Promise<AudioBuffer> {
        if (this.bufferCache[src] !== undefined) {
            return this.bufferCache[src];
        } else {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', src, true);
                request.responseType = 'arraybuffer';
                request.onload = () => {
                    this.audioContext.decodeAudioData(request.response, (buffer) => {
                        this.bufferCache[src] = buffer;
                        resolve(buffer);
                    });
                };
                request.onerror = (error) => reject(error);
                request.send();
            });
        }
    }

    constructor() {

    }
}
