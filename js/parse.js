function isStartValid(start) {
	return /^\s*[A-Zf\+\-\[\]<>|#!]*\s*$/.test(start)
}

function isRuleValid(rule) {
	return /^\s*[A-Zf]\s*:\s*[A-Zf\+\-\[\]<>|#!]*\s*$/.test(rule)
}

function rulesObjectToString(rules) {
	let string = ''
	for (let [ k, v ] of Object.entries(rules)) {
		string += `${k}: ${v}\n`
	}
	return string
}

function parseRules(rawRules) {
	let unparsedRules = rawRules.split('\n')
	let rules = {}
	for (let unparsedRule of unparsedRules) {
		if (unparsedRule.trim() !== '') {
			if (!isRuleValid(unparsedRule)) {
				break
			}
			const parts = unparsedRule.split(':')
			const name = parts[0].trim()
			const rule = parts[1].trim()
			rules[name] = rule
		}
	}
	return rules
}

function parseInputs(rawInputs) {
	let inputs = {
		start: rawInputs.start,
		rules: parseRules(rawInputs.rules)
	}
	for (let numericalInput of numericalInputs) {
		let value = rawInputs[numericalInput]
		if (!isNaN(value)) {
			inputs[numericalInput] = Number(value)
		}
	}
	return inputs
}
