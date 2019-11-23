let mouse, offset, poffset, center, centerLines
function setup() {
	createCanvas(innerWidth, innerHeight).parent('canvas-container').mouseMoved(panCanvas)
	noLoop()

	mouse = createVector()
	offset = createVector()
	poffset = createVector()

	turtle.computeLines()

	colorMode(HSB, 1, 1, 1, 1)

	centerLines = true
}

function draw() {
	background(0)
	translate(width / 2, height / 2)
	translate(offset.x, offset.y)
	if (centerLines) {
		center = turtle.centerPoint()
		translate(-offset.x, -offset.y)
		translate(-center.x, -center.y)
		resetPan()
		offset.set(-center.x, -center.y)
		centerLines = false
	}
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

function resetPan() {
	offset.set(0, 0)
	mouse.set(0, 0)
	poffset.set(0, 0)
}

function mousePressed() {
	mouse = createVector(mouseX, mouseY)
	poffset.set(offset)
}

function windowResized() {
	redraw()
	resizeCanvas(innerWidth, innerHeight)
}

function keyPressed() {
	let keyCodes = {
		c: 67
	}
	if (keyCode == keyCodes['c']) {
		centerLines = true
		redraw()
	}
}

// TODO: move this to different file
