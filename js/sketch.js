const lsystem = new L_System({
	start: 'F',
	rules: {
		F: 'F+G',
		G: 'F-G'
	},
	iterations: 9
})
const turtle = new Turtle({
	instructions: lsystem.instructions
})

function setup() {
	createCanvas(innerWidth, innerHeight).parent('canvas-container')
	noLoop()
	// frameRate(20)
}

function draw() {
	background(20)
	translate(width / 2, height / 2)
	stroke('white')
	fill('white')
	turtle.computeLines()
	circle(600, 0, 100)
	circle(600, 600, 100)
	// fill(frameCount % 127, frameCount % 50 + 100, frameCount % 100 + 50)
	// circle(frameCount % (width / 2) + width / 2, frameCount % (height / 2) + height / 2, frameCount % 200 + 50)
}

function windowResized() {
	redraw()
	resizeCanvas(innerWidth, innerHeight)
}
