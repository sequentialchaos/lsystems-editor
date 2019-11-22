class Turtle {
	constructor({ x = 0, y = 0, instructions = [], lengthStep = 1, angleStep = 1, angleStart = 1 } = {}) {
		this._x = x
		this._y = y
		this._instructions = instructions
		this._lengthStep = lengthStep
		this._angleStep = angleStep
		this._angleStart = angleStart
	}

	get instructions() {
		return this._instructions
	}
	get lengthStep() {
		return this._lengthStep
	}
	get angleStep() {
		return this._angleStep
	}
	get angleStart() {
		return this._angleStart
	}

	set instructions(newInstructions) {
		this._instructions = newInstructions
	}
	set lengthStep(newLengthStep) {
		this._lengthStep = newLengthStep
	}
	set angleStep(newAngleStep) {
		this._angleStep = newAngleStep
	}
	set angleStart(newAngleStart) {
		this._angleStart = newAngleStart
	}

	computeLines() {}
}
