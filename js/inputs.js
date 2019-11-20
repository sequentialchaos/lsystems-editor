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
	strokeWeight: document.getElementById('stroke-weight-range'),
	strokeOpacity: document.getElementById('stroke-opacity-range')
}

/////   Get an input value   /////
function getInputValue(name) {
	name = name.toLowerCase()
	if (name == 'start') {
		return inputNodes.start.value
	} else if (name == 'rules') {
		return inputNodes.rules.value
	} else if (name == 'angle') {
		return inputNodes.angleNum.value
	} else if (name == 'length') {
		return inputNodes.lengthNum.value
	} else if (name == 'iterations') {
		return inputNodes.iterationsNum.value
	} else if (name == 'strokeweight') {
		return inputNodes.strokeWeight.value
	} else if (name == 'strokeopacity') {
		return inputNodes.strokeOpacity.value
	} else {
		return undefined
	}
}

/////   Set an input value   /////
function setInputValue(name) {
	inputs[name] = getInputValue(name)
}

/////   Change input values   /////
function onStartChange() {
	setInputValue('start')
}

function onRulesChange() {
	setInputValue('rules')
}

function onAngleNumChange() {
	setInputValue('angle')
	inputNodes.angleRange.value = inputNodes.angleNum.value
}

function onAngleRangeChange() {
	setInputValue('angle', inputNodes.angleRange)
	inputNodes.angleNum.value = inputNodes.angleRange.value
}

function onLengthNumChange() {
	setInputValue('length')
	inputNodes.lengthRange.value = inputNodes.lengthNum.value
}

function onLengthRangeChange() {
	setInputValue('length', inputNodes.lengthRange)
	inputNodes.lengthNum.value = inputNodes.lengthRange.value
}

function onIterationsNumChange() {
	setInputValue('iterations')
	inputNodes.iterationsRange.value = inputNodes.iterationsNum.value
}

function onIterationsRangeChange() {
	setInputValue('iterations', inputNodes.iterationsRange)
	inputNodes.iterationsNum.value = inputNodes.iterationsRange.value
}

function onStrokeWeightChange() {
	setInputValue('strokeWeight')
}

function onStrokeOpacityChange() {
	setInputValue('strokeOpacity')
}

/////   Event Listeners   /////
inputNodes.start.addEventListener('change', onStartChange)
inputNodes.rules.addEventListener('change', onRulesChange)
inputNodes.angleNum.addEventListener('input', onAngleNumChange)
inputNodes.angleRange.addEventListener('input', onAngleRangeChange)
inputNodes.lengthNum.addEventListener('input', onLengthNumChange)
inputNodes.lengthRange.addEventListener('input', onLengthRangeChange)
inputNodes.iterationsNum.addEventListener('input', onIterationsNumChange)
inputNodes.iterationsRange.addEventListener('input', onIterationsRangeChange)
inputNodes.strokeWeight.addEventListener('input', onStrokeWeightChange)
inputNodes.strokeOpacity.addEventListener('input', onStrokeOpacityChange)

// test closing github issue via commit message on a different branch than master.
