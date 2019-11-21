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
	strokeWeightNum: document.getElementById('stroke-weight-number'),
	strokeWeightRange: document.getElementById('stroke-weight-range'),
	strokeOpacityNum: document.getElementById('stroke-opacity-number'),
	strokeOpacityRange: document.getElementById('stroke-opacity-range')
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
	inputNodes.angleNum.value = inputNodes.angleRange.value
	setInputValue('angle')
}

function onLengthNumChange() {
	setInputValue('length')
	inputNodes.lengthRange.value = inputNodes.lengthNum.value
}

function onLengthRangeChange() {
	inputNodes.lengthNum.value = inputNodes.lengthRange.value
	setInputValue('length')
}

function onIterationsNumChange() {
	setInputValue('iterations')
	inputNodes.iterationsRange.value = inputNodes.iterationsNum.value
}

function onIterationsRangeChange() {
	inputNodes.iterationsNum.value = inputNodes.iterationsRange.value
	setInputValue('iterations')
}

function onStrokeWeightNumChange() {
	setInputValue('strokeWeight')
	inputNodes.strokeWeightRange.value = inputNodes.strokeWeightNum.value
}

function onStrokeWeightRangeChange() {
	inputNodes.strokeWeightNum.value = inputNodes.strokeWeightRange.value
	setInputValue('strokeWeight')
}

function onStrokeOpacityNumChange() {
	setInputValue('strokeOpacity')
	inputNodes.strokeOpacityRange.value = inputNodes.strokeOpacityNum.value
}

function onStrokeOpacityRangeChange() {
	inputNodes.strokeOpacityNum.value = inputNodes.strokeOpacityRange.value
	setInputValue('strokeOpacity')
}

/////   Event Listeners   /////
inputNodes.start.addEventListener('input', onStartChange)
inputNodes.rules.addEventListener('input', onRulesChange)
inputNodes.angleNum.addEventListener('input', onAngleNumChange)
inputNodes.angleRange.addEventListener('input', onAngleRangeChange)
inputNodes.lengthNum.addEventListener('input', onLengthNumChange)
inputNodes.lengthRange.addEventListener('input', onLengthRangeChange)
inputNodes.iterationsNum.addEventListener('input', onIterationsNumChange)
inputNodes.iterationsRange.addEventListener('input', onIterationsRangeChange)
inputNodes.strokeWeightNum.addEventListener('input', onStrokeWeightNumChange)
inputNodes.strokeWeightRange.addEventListener('input', onStrokeWeightRangeChange)
inputNodes.strokeOpacityNum.addEventListener('input', onStrokeOpacityNumChange)
inputNodes.strokeOpacityRange.addEventListener('input', onStrokeOpacityRangeChange)
