let hilbertInputs = {
	name: 'Hilbert',
	start: 'L',
	rules: {
		L: '+RF-LFL-FR+',
		R: '-LF+RFR+FL-'
	},
	iterations: 3,
	angleStep: 90,
	lengthStep: 50,
	strokeWeight: 3,
	strokeOpacity: 1
}

let initialInputs = hilbertInputs

setDOMvalues(initialInputs)
setRawInputs()
inputs = parseInputs(rawInputs)

let lsystem = new L_System({
	start: inputs.start,
	rules: inputs.rules,
	iterations: inputs.iterations
})

let turtle = new Turtle({
	instructions: lsystem.instructions,
	lengthStep: inputs.lengthStep,
	angleStep: inputs.angleStep,
	angleStart: 0
})
