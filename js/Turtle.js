class Turtle {
	constructor({ xStart = 0, yStart = 0, instructions = [], lengthStep = 20, angleStep = 90, angleStart = 0 } = {}) {
		this._xStart = xStart
		this._yStart = yStart
		this._instructions = instructions
		this._lengthStep = lengthStep
		this._angleStep = angleStep
		this._angleStart = angleStart
		this._angle = angleStart
		this._lines = []
		this._stack = []
	}

	get xStart() {
		return this._xStart
	}
	get yStart() {
		return this._yStart
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
	get angle() {
		return this._angle
	}
	get lines() {
		return this._lines
	}
	get stack() {
		return this._stack
	}

	set xStart(newxStart) {
		this._xStart = newxStart
	}
	set yStart(newyStart) {
		this._yStart = newyStart
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
	set angle(newAngle) {
		this._angle = newAngle
	}
	set lines(newLines) {
		this._lines = newLines
	}
	set stack(newStack) {
		this._stack = newStack
	}

	computeLines(show = true) {
		this.lines = []
		this.stack = []
		let x = this.xStart
		let y = this.yStart
		this.angle = radians(this.angleStart)
		let a = radians(this.angleStep)
		for (let instruction of this.instructions) {
			if (instruction == '+') {
				this.angle -= a
			} else if (instruction == '-') {
				this.angle += a
			} else if (instruction == 'F' || instruction == 'G') {
				let x2 = x + this.lengthStep * cos(this.angle),
					y2 = y + this.lengthStep * sin(this.angle)
				if (show) {
					line(x, y, x2, y2)
				}
				this.lines.push({
					x1: x,
					y1: y,
					x2: x2,
					y2: y2
				})
				x = x2
				y = y2
			} else if (instruction == 'f') {
				x = x + this.lengthStep * cos(this.angle)
				y = y + this.lengthStep * sin(this.angle)
			} else if (instruction == '[') {
				this.stack.push({
					x: x,
					y: y,
					len: this.lengthStep,
					angle: this.angle
				})
			} else if (instruction == ']') {
				if (this.stack != []) {
					let prev = this.stack.pop()
					x = prev.x
					y = prev.y
					this.lengthStep = prev.len
					this.angle = prev.angle
				}
			} else if (instruction == '|') {
				this.angle += PI
			} else if (instruction == '#') {
				this.line_width += line_width_inc
			} else if (instruction == '!') {
				this.line_width -= line_width_inc
			} else if (instruction == '>') {
				this.lengthStep *= line_len_scale
			} else if (instruction == '<') {
				this.lengthStep /= line_len_scale
			}
		}
	}

	draw() {
		for (let { x1, y1, x2, y2 } of this.lines) {
			line(x1, y1, x2, y2)
		}
	}
}
