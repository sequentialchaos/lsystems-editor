/////   Initialize inputs   /////
let inputs = {
	start: null,
	rules: null,
	angle: null,
	length: null,
	iterations: null,
	strokeWeight: null,
	strokeOpacity: null
}

let numericalInputs = [ 'angle', 'length', 'iterations', 'strokeWeight', 'strokeOpacity' ]

/////   Get input DOM elements   /////
let inputNodes = {
	start: document.getElementById('start-textarea'),
	rules: document.getElementById('rules-textarea'),
	angleNum: document.getElementById('angle-number'),
	angleRange: document.getElementById('angle-range'),
	lengthNum: document.getElementById('length-number'),
	lengthRange: document.getElementById('length-range'),
	iterationsNum: document.getElementById('iterations-number'),
	iterationsRange: document.getElementById('iterations-range'),
	strokeWeightNum: document.getElementById('stroke-weight-number'),
	strokeWeightRange: document.getElementById('stroke-weight-range'),
	strokeOpacityNum: document.getElementById('stroke-opacity-number'),
	strokeOpacityRange: document.getElementById('stroke-opacity-range')
}

/////   Get an input value   /////
function getInputValue(name) {
	return inputNodes[name].value
}

/////   Set an input value   /////
function setInputValue(name, type) {
	if (type === undefined) {
		inputs[name] = getInputValue(name)
	} else if (type === 'num') {
		inputs[name] = getInputValue(name + 'Num')
	} else if (type === 'range') {
		inputs[name] = getInputValue(name + 'Range')
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

/////   Change input values   /////
function onStartChange() {
	setInputValue('start')
}

function onRulesChange() {
	setInputValue('rules')
}

function onNumericalChange(name, type) {
	setNumericalValues(name, type)
}

function onNumericalChangeDelegate(name, type) {
	return function() {
		onNumericalChange(name, type)
	}
}

/////   Event Listeners   /////
inputNodes.start.addEventListener('input', onStartChange)
inputNodes.rules.addEventListener('input', onRulesChange)

numericalInputs.forEach((name) => {
	inputNodes[name + 'Num'].addEventListener('input', onNumericalChangeDelegate(name, 'num'))
	inputNodes[name + 'Range'].addEventListener('input', onNumericalChangeDelegate(name, 'range'))
})
