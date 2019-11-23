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

for (let name of Object.keys(inputs)) {
	if (name == 'start' || name == 'rules') {
		inputNodes[name].addEventListener('input', updateDelegate(name))
	} else {
		inputNodes[name + 'Num'].addEventListener('input', updateDelegate(name))
		inputNodes[name + 'Range'].addEventListener('input', updateDelegate(name))
	}
}

document.getElementById('center-button').addEventListener('click', function() {
	centerLines = true
	redraw()
})
