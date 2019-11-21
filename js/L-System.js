class L_System {
	constructor(
		{ start = 'F', rules = { F: 'F+F-F' }, angleStep = 90, lengthStep = 1, angleStart = 0, maxIterations = 6 } = {}
	) {
		this._start = start
		this._rules = rules
		this._lengthStep = lengthStep
		this._angleStep = angleStep
		this._angleStart = angleStart
		this._maxIterations = maxIterations
		this._instructions = start
	}

	set start(newStart) {
		this._start = newStart
	}
	set rules(newRules) {
		this._rules = newRules
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
	set maxIterations(newMaxIterations) {
		this._maxIterations = newMaxIterations
	}
	set angleStart(newAngleStart) {
		return this._angleStart
	}

	get start() {
		return this._start
	}
	get rules() {
		return this._rules
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
	get maxIterations() {
		return this._maxIterations
	}

	generate(numIterations) {}
}

String.prototype.count = function(s) {
	let c = 0
	for (let i = 0; i < this.length - s.length + 1; i++) {
		if (this.substring(i, i + s.length) == s) {
			c++
		}
	}
	return c
}
