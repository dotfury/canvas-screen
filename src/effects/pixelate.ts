import { getBrightness } from "@/utils/pixel";

// XbyX squares of pixels
const SIZE = 5;

function calculateValue(dataArray: Uint8ClampedArray): number {
	const length = dataArray.length;
	let total = 0;

	for (let i = 0; i < length; i += 4) {
		total += getBrightness(dataArray[i], dataArray[i + 1], dataArray[i + 2]);
	}

	return Math.round(total / (SIZE * SIZE));
}

export default function pixelate(dataContext: CanvasRenderingContext2D, width: number, height: number): ImageData {
	const outputs: number[][] = [];
	for (let i = 0; i < width; i += SIZE) {
		outputs.push([]);
		for (let j = 0; j < height; j += SIZE) {
			const content = dataContext.getImageData(i, j, SIZE, SIZE);
			// get brightness of sized block
			outputs[i / SIZE].push(calculateValue(content.data));
		}
	}

	const outputLength = outputs.length;
	dataContext.clearRect(0, 0, width, height);

	for (let i = 0; i < outputLength; i++) {
		const innerLength = outputs[i].length;

		for (let j = 0; j < innerLength; j++) {
			// 0 - 255
			const fill = outputs[i][j];
			dataContext.fillStyle = fill < 125 ? "black" : fill < 190 ? "grey" : "white";
			dataContext.fillRect(i * SIZE, j * SIZE, SIZE, SIZE);

			// TODO: circles - make option
			// dataContext.beginPath();
			// dataContext.ellipse(i * SIZE, j * SIZE, SIZE / 2, SIZE / 2, 0, 0, Math.PI * 2);
			// dataContext.fill();
		}
	}

	return dataContext.getImageData(0, 0, width, height);
}
