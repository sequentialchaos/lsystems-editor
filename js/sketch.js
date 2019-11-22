let inputs = parseInputs(rawInputs)
console.log(inputs)

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

let canvas
let mouse, offset, poffset
function setup() {
	canvas = createCanvas(innerWidth, innerHeight).parent('canvas-container').mouseMoved(panCanvas)
	noLoop()

	mouse = createVector()
	offset = createVector()
	poffset = createVector()

	turtle.computeLines()

	colorMode(HSB, 1, 1, 1, 1)
}

function draw() {
	background(0)
	translate(width / 2, height / 2)
	translate(offset.x, offset.y)
	strokeColor = color(0.6, 0.8, 1, inputs.strokeOpacity)
	stroke(strokeColor)
	strokeWeight(inputs.strokeWeight)
	fill('white')

	turtle.draw()
}

function panCanvas() {
	if (mouseIsPressed) {
		offset.x = mouseX - mouse.x + poffset.x
		offset.y = mouseY - mouse.y + poffset.y
		redraw()
	}
}

function mousePressed() {
	mouse = createVector(mouseX, mouseY)
	poffset.set(offset)
}

function windowResized() {
	redraw()
	resizeCanvas(innerWidth, innerHeight)
}
