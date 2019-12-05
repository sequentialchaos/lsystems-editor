function colorMap(
	{ name = 'rainbow', index = 0, length = 0, saturation = 1, brightness = 1, alpha = 1, colors = [], cycles = 3 } = {}
) {
	if (name == 'rainbow') {
		let hue = (index * cycles / length) % 1
		stroke(hue, saturation, brightness, alpha)
	}
}
