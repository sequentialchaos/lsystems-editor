const lsystem = new L_System()

function setup() {
	createCanvas(innerWidth, innerHeight).parent('canvas-container')
	noLoop()
	// frameRate(20)
}

function draw() {
	background(20)
	circle(600, 0, 100)
	circle(600, 600, 100)
	// fill(frameCount % 127, frameCount % 50 + 100, frameCount % 100 + 50)
	// circle(frameCount % (width / 2) + width / 2, frameCount % (height / 2) + height / 2, frameCount % 200 + 50)
}

function windowResized() {
	resizeCanvas(innerWidth, innerHeight)
}
