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

// get input
inputNodes.start.addEventListener('input', onStartChange)
inputNodes.rules.addEventListener('input', onRulesChange)

numericalInputs.forEach((name) => {
	inputNodes[name + 'Num'].addEventListener('input', onNumericalChangeDelegate(name, 'num'))
	inputNodes[name + 'Range'].addEventListener('input', onNumericalChangeDelegate(name, 'range'))
})

// update L-System and Turtle
function update(name) {
	inputs = parseInputs(rawInputs)

	if (name == 'start') {
		lsystem.update({ start: inputs[name] })
	} else if (name == 'rules') {
		lsystem.update({ rules: inputs[name] })
	} else if (name == 'iterations') {
		lsystem.update({ iterations: inputs[name] })
	} else if (name == 'angleStep') {
		turtle.angleStep = inputs[name]
	} else if (name == 'lengthStep') {
		turtle.lengthStep = inputs[name]
	} else if (name == 'strokeWeight' || name == 'strokeOpacity') {
		redraw()
		return
	}

	turtle.instructions = lsystem.instructions
	turtle.computeLines((show = false))

	redraw()
}

function updateDelegate(name) {
	return function() {
		update(name)
	}
}
let inputNames = [ 'start', 'rules', 'angleStep', 'lengthStep', 'iterations', 'strokeWeight', 'strokeOpacity' ]
for (let name of inputNames) {
	if (name == 'start' || name == 'rules') {
		inputNodes[name].addEventListener('input', updateDelegate(name))
	} else {
		inputNodes[name + 'Num'].addEventListener('input', updateDelegate(name))
		inputNodes[name + 'Range'].addEventListener('input', updateDelegate(name))
	}
}

// inputNodes.start.addEventListener('input', function() {
// 	update('start')
// })

// inputNodes.rules.addEventListener('input', function() {
// 	update('rules')
// })

// inputNodes.iterationsNum.addEventListener('input', function() {
// 	update('iterations')
// })

// inputNodes.iterationsRange.addEventListener('input', function() {
// 	update('iterations')
// })

// inputNodes.angleStepNum.addEventListener('input', function() {
// 	update('angleStep')
// })

// inputNodes.angleStepRange.addEventListener('input', function() {
// 	update('angleStep')
// })

// inputNodes.lengthStepNum.addEventListener('input', function() {
// 	update('lengthStep')
// })

// inputNodes.lengthStepRange.addEventListener('input', function() {
// 	update('lengthStep')
// })

// inputNodes.strokeWeightNum.addEventListener('input', function() {
// 	inputs = parseInputs(rawInputs)
// 	redraw()
// })

// inputNodes.strokeWeightRange.addEventListener('input', function() {
// 	inputs = parseInputs(rawInputs)
// 	redraw()
// })

// inputNodes.strokeOpacityNum.addEventListener('input', function() {
// 	inputs = parseInputs(rawInputs)
// 	redraw()
// })

// inputNodes.strokeOpacityRange.addEventListener('input', function() {
// 	inputs = parseInputs(rawInputs)
// 	redraw()
// })
