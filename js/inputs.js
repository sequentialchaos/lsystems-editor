let stringInputs = [ 'start', 'rules' ]
let numericalInputs = [ 'angleStep', 'lengthStep', 'iterations', 'strokeWeight', 'strokeOpacity' ]

/////   Get input DOM elements   /////
let inputNodes = {
	start: document.getElementById('start-textarea'),
	rules: document.getElementById('rules-textarea'),
	angleStepNum: document.getElementById('angle-step-number'),
	angleStepRange: document.getElementById('angle-step-range'),
	lengthStepNum: document.getElementById('length-step-number'),
	lengthStepRange: document.getElementById('length-step-range'),
	iterationsNum: document.getElementById('iterations-number'),
	iterationsRange: document.getElementById('iterations-range'),
	strokeWeightNum: document.getElementById('stroke-weight-number'),
	strokeWeightRange: document.getElementById('stroke-weight-range'),
	strokeOpacityNum: document.getElementById('stroke-opacity-number'),
	strokeOpacityRange: document.getElementById('stroke-opacity-range')
}

/////   Initialize raw inputs   /////
let rawInputs = {}
stringInputs.forEach((name) => {
	rawInputs[name] = getInputValue(name)
})
numericalInputs.forEach((name) => {
	rawInputs[name] = getInputValue(name + 'Num')
})

/////   Get an input value   /////
function getInputValue(name) {
	return inputNodes[name].value
}

/////   Set an input value   /////
function setInputValue(name, type) {
	if (type === undefined) {
		rawInputs[name] = getInputValue(name)
	} else if (type === 'num') {
		rawInputs[name] = getInputValue(name + 'Num')
	} else if (type === 'range') {
		rawInputs[name] = getInputValue(name + 'Range')
	}
}

/////   Set the other input value to match the changed input value   /////
function setOtherValue(name, type) {
	if (type === 'num') {
		inputNodes[name + 'Range'].value = inputNodes[name + 'Num'].value
	} else if (type === 'range') {
		inputNodes[name + 'Num'].value = inputNodes[name + 'Range'].value
	}
}

/////   Set all numerical input values    /////
function setNumericalValues(name, type) {
	setInputValue(name, type)
	setOtherValue(name, type)
}
