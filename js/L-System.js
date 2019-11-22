class L_System {
	constructor({ start = 'F', rules = { F: 'F+F-F' }, iterations = 6 } = {}) {
		this._start = start
		this._rules = rules
		this._iterations = iterations
		this.generateInstructions()
	}

	set start(newStart) {
		this._start = newStart
	}
	set rules(newRules) {
		this._rules = newRules
	}
	set iterations(newIterations) {
		this._iterations = newIterations
	}

	get start() {
		return this._start
	}
	get rules() {
		return this._rules
	}
	get iterations() {
		return this._iterations
	}

	generateInstructions() {
		let newInstructions = []
		for (let char of this.start) {
			newInstructions.push(char)
		}
		for (let i = 0; i < this.iterations; i++) {
			let nextInstructions = []
			for (let char of newInstructions) {
				if (char in this.rules) {
					for (let ruleChar of this.rules[char]) {
						nextInstructions.push(ruleChar)
					}
				} else {
					nextInstructions.push(char)
				}
			}
			newInstructions = nextInstructions
		}
		this.instructions = newInstructions
	}

	update({ start = undefined, rules = undefined, iterations = undefined } = {}) {
		this.start = start == undefined ? this.start : start
		this.rules = rules == undefined ? this.rules : rules
		this.iterations = iterations == undefined ? this.iterations : iterations
		this.generateInstructions()
	}
}
