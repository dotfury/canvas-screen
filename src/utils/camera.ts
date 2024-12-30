export default class Camera {
	dataCanvas: HTMLCanvasElement;
	dataContext: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	video: HTMLVideoElement | null;
  height: number;
  width: number;

	constructor(canvas: HTMLCanvasElement) {
    this.video = null;
    this.height = 0;
    this.width = 0;
		this.dataCanvas = document.createElement("canvas");
		this.dataContext = this.dataCanvas.getContext("2d")!;
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d")!;
	}

	async init(): Promise<void> {
		this.video = await this.getVideo();
		this.height = this.video.videoHeight;
		this.width = this.video.videoWidth;

		this.dataCanvas.width = this.width;
		this.dataCanvas.height = this.height;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	async getVideo(): Promise<HTMLVideoElement> {
		const avStream = await navigator.mediaDevices.getUserMedia({
			video: true,
		});

		const video = document.createElement("video");

		try {
			// modern browsers
			video.srcObject = avStream;
		} catch (e) {
			// old browsers
			video.src = window.URL.createObjectURL(avStream as any);
		}

		await video.play();

		return video;
	}

	startVideo(): void {
		this.drawVideo();
	}

	// setEffect(effect) {
	// 	this.currentEffect = effect;
	// }

	drawVideo(): void {
    if (!this.video) return;

		// data to read from
		this.dataContext.clearRect(0, 0, this.width, this.height);
		this.dataContext.drawImage(this.video, 0, 0);
		const imageData = this.dataContext.getImageData(0, 0, this.width, this.height);

		// data to output
		this.context.clearRect(0, 0, this.width, this.height);
		// const newImageData = this.context.createImageData(this.width, this.height);

		let finalData;
		// if (EFFECT_MAP[this.currentEffect]) {
		// 	finalData = EFFECT_MAP[this.currentEffect](this.dataContext, this.width, this.height);
		// 	// finalData = EFFECT_MAP[this.currentEffect](imageData, newImageData);
		// } else {
		// 	for (let i = 0; i < imageData.data.length; i += 4) {
		// 		// r
		// 		newImageData.data[i] = imageData.data[i];
		// 		// g
		// 		newImageData.data[i + 1] = imageData.data[i + 1];
		// 		//b
		// 		newImageData.data[i + 2] = imageData.data[i + 2];
		// 		//a
		// 		newImageData.data[i + 3] = imageData.data[i + 3];
		// 	}

		// 	finalData = newImageData;
		// }

    finalData = imageData;
		this.context.putImageData(finalData, 0, 0);

		requestAnimationFrame(() => {
			this.drawVideo();
		});
	}
}
