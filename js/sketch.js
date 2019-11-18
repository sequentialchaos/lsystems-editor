function setup() {
	// const sty = document.createElement('style');
	// if (Math.random() > 0.5) {
	//   print('yes')
	//   sty.innerHTML = 'p::before {content:"a "}'
	// } else {
	//   print('no')
	//   sty.innerHTML = 'p::before {content:"not a "}'

	// }
	// document.body.append(sty);

	width_ratio = 0.75
	canvas = createCanvas(innerWidth * width_ratio, innerHeight, P2D).mouseMoved(panCanvas)
	noLoop()

	offset = createVector(0, 0)
	poffset = createVector(0, 0)

	left_width = innerWidth - width
	slider_width_ratio = 0.9

	sidebar = createDiv().addClass('sidebar')

	title = createP('L-Systems Editor').style('font-weight', 'bold').style('font-size', '24px').parent(sidebar)

	first = l_systems['Penrose']
	l_system = new L_system(first.axiom, first.rules, first.len, first.angle, first.max_iterations, first.len_ratio)

	picked_l_system_name = 'Penrose'
	l_system_select = createSelect().parent(sidebar)
	Object.keys(l_systems).forEach((key) => {
		l_system_select.option(key)
	})

	l_system_select.changed(l_system_selection_changed)

	createP('Axiom').style('font-weight', 'bold').parent(sidebar)
	axiom = createElement('textarea').size(left_width * 0.4, 35).parent(sidebar)
	//   axiom.elt.innerHTML = '[B]++[B]++[B]++[B]++[B]'
	//   rule_string = `A: CF++DF----BF[-CF----AF]++
	//   B: +CF--DF[---AF--BF]+
	//   C: -AF++BF[+++CF++DF]-
	//   D: --CF++++AF[+DF++++BF]--BF
	//   F:
	// `.replace(/ /g,'')

	createP('Rules').style('font-weight', 'bold').parent(sidebar)
	rules = createElement('textarea').parent(sidebar)
	// rules.elt.innerHTML = rule_string

	angle_div = createDiv().parent(sidebar)
	angle_display = createP('angle:').parent(sidebar)
	angle = createSlider(0, 360, 36, 0.01).parent(sidebar)
	angle.input(angleChanges)
	angle_div.child(angle_display)
	angle_div.child(angle)

	length_display = createP('step length:').parent(sidebar)
	length = createSlider(0, height * 0.6, 30, 1).parent(sidebar)
	length.input(lengthChanges)

	iterations_display = createP('# of iterations:').parent(sidebar)
	iterations = createSlider(0, max_iterations, 2, 1).parent(sidebar)
	iterations.input(iterationsChange)

	stroke_weight_display = createP(`stroke weight: `).parent(sidebar)

	stroke_weight = createSlider(1, 100, 5, 1).parent(sidebar)
	stroke_weight.input(stroke_weight_changes)

	setValues()
	setSizes()

	createP().parent(sidebar)
	picked_color = 'none'
	color_mode = 'rainbow'
	color_select = createSelect().parent(sidebar)
	color_select.option('rainbow')
	color_select.option('rainbow remix')
	color_select.option('white')
	color_select.option('pick a color')
	color_select.changed(colorChanged)

	createP().parent(sidebar)

	save_input_button = createButton('Save').parent(sidebar)
	save_input_button.mousePressed(save_button_pressed)

	createP().parent(sidebar)
	load_input = createFileInput(handleLoad).parent(sidebar)

	createP().parent(sidebar)
	export_HPGL_button = createButton('Export HPGL').parent(sidebar)
	export_HPGL_button.mousePressed(export_hpgl_button_pressed)

	// copy_instructions_button = createButton("Copy Instructions")
	// copy_instructions_button.mousePressed(copy_instructions_button_pressed)

	angleChanges()
	iterationsChange()
	lengthChanges()

	axiom.input(axiomChanges)
	createP().parent(sidebar)

	rules.input(rulesChange)

	smooth()

	// getRuleString(l_systems[0])
}

function draw() {
	background(0)

	push()
	translate(width / 2, height / 2)
	translate(offset.x, offset.y)
	strokeWeight(5)
	if (color_mode == 'white') {
		stroke('white')
		l_system.draw({
			len: length.value(),
			mode: 'absolute',
			stroke_weight: stroke_weight.value(),
			colormode: 'normal'
		})
	} else if (color_mode == 'pick a color') {
		stroke(picked_color)
		l_system.draw({
			len: length.value(),
			mode: 'absolute',
			stroke_weight: stroke_weight.value(),
			colormode: 'normal'
		})
	} else {
		l_system.draw({
			len: length.value(),
			mode: 'absolute',
			stroke_weight: stroke_weight.value(),
			colormode: color_mode,
			colors_ratio: 1 / 10
		})
	}
	pop()
}

function mousePressed() {
	mouse = createVector(mouseX, mouseY)
	poffset.set(offset)
}

function panCanvas() {
	if (mouseIsPressed) {
		offset.x = mouseX - mouse.x + poffset.x
		offset.y = mouseY - mouse.y + poffset.y
		redraw()
	}
}

function mouseWheel(event) {
	// event.preventDefault()

	if (event.target == canvas.elt) {
		// zoomy stuffr

		if (event.delta < 0) {
			old_length = length.value()
			new_length = length.value() / 10 * 9
			if (Math.ceil(new_length) >= old_length - 1) {
				new_length--
			}
		} else {
			old_length = length.value()
			new_length = old_length / 9 * 10 + 1
		}
		length.value(new_length)
		lengthChanges()
	} else {
	}
}

function windowResized() {
	resizeCanvas(innerWidth * width_ratio, innerHeight)
	setSizes()
}

function setValues() {
	axiom.elt.innerHTML = l_system.axiom
	rules.elt.innerHTML = l_system.getRuleString()
	angle.value(l_system.angle)
	length.value(min(width, height) * l_system.len_ratio)
	// iterations.elt.max = l_system.max_iterations
	stroke_weight_display.elt.innerHTML = `stroke weight: ${stroke_weight.value()} px`
}

function setSizes() {
	left_width = innerWidth - width
	angle.size(left_width * slider_width_ratio, 10)
	length.size(left_width * slider_width_ratio, 10)
	iterations.size(left_width * slider_width_ratio, 10)
	axiom.size(left_width * slider_width_ratio, 35)
	rules.size(left_width * slider_width_ratio, 100)
	stroke_weight.size(left_width * slider_width_ratio, 10)
}

function parseRules(rule_string) {
	let unparsed_rules = rule_string.split('\n')
	let rules = {}
	for (let unparsed_rule of unparsed_rules) {
		if (unparsed_rule.trim() !== '') {
			if (!isRuleValid(unparsed_rule)) {
				break
			}
			parts = unparsed_rule.split(':')
			name = parts[0].trim()
			rule = parts[1].trim()
			rules[name] = rule
		}
	}
	return rules
}

function angleChanges() {
	angle_display.elt.innerHTML = `angle Δ: ${angle.value()}°`
	l_system.angle = angle.value()
	redraw()
}

function lengthChanges() {
	length_display.elt.innerHTML = `step length: ${length.value()} px`
	redraw()
}

function iterationsChange() {
	iterations_display.elt.innerHTML = `# of iterations: ${iterations.value()}`
	l_system.iterations = 0
	l_system.instructions = axiom.value()
	for (let i = 0; i < iterations.value(); i++) {
		l_system.getNextInstructions()
	}
	redraw()
}

function stroke_weight_changes() {
	stroke_weight_display.elt.innerHTML = `stroke weight: ${stroke_weight.value()} px`
	redraw()
}

function axiomChanges() {
	let new_axiom = axiom.value()
	if (isAxiomValid(new_axiom)) {
		l_system.axiom = new_axiom
		l_system.iterations = 0
		l_system.instructions = new_axiom
		for (let i = 0; i < iterations.value(); i++) {
			l_system.getNextInstructions()
		}
	}
	redraw()
}

function rulesChange() {
	let new_rules = parseRules(rules.value())
	l_system.rules = new_rules
	l_system.iterations = 0
	l_system.instructions = axiom.value()
	for (let i = 0; i < iterations.value(); i++) {
		l_system.getNextInstructions()
	}
	redraw()
}

function colorChanged() {
	color_mode = color_select.value()
	if (color_mode == 'pick a color') {
	}
	redraw()
}

function l_system_selection_changed() {
	picked_l_system_name = l_system_select.value()
	let lsys = l_systems[picked_l_system_name]
	axiom.elt.innerHTML = lsys.axiom
	rules.elt.innerHTML = rulesDictToString(lsys.rules)
	angle.value(lsys.angle)
	length.value(min(width, height) * lsys.len_ratio)
	axiomChanges()
	rulesChange()
	angleChanges()
	lengthChanges()
	l_system.max_iterations = lsys.max_iterations
	// iterations.elt.max = l_sys.max_iterations
	// redraw()
}

function export_hpgl_button_pressed() {
	let plot_txt = formatForPlotterAutoCenter(l_system.turtle.lines, (width + height) / 2)
	let id = `${int(random(0, 999))}`.padStart(3, '0')
	download(`${random(adjectives)}_${random(nouns)}_${id}.hpgl`, plot_txt)
	// console.log("hi")
}

function save_button_pressed() {
	let id = `${int(random(0, 999))}`.padStart(3, '0')
	download(`${random(adjectives)}_${random(nouns)}_${id}.txt`, l_system.toString())
	// console.log("hi")
}

function copy_instructions_button_pressed() {
	copyToClipboard(l_system.instructions)
}

function handleLoad(file) {
	let string = file.data
	fromString(string)
	axiomChanges()
	rulesChange()
	angleChanges()
	lengthChanges()
	l_system.max_iterations = max_iterations
}

function fromString(string) {
	let rows = string.split('\n')
	let i = 0
	while (i < rows.length) {
		if (rows[i].trim() == 'Axiom:') {
			axiom.elt.innerHTML = rows[i + 1]
			console.log('Axiom:', axiom.value())
			i++
		} else if (rows[i].trim() == 'Rules:') {
			rule_string = ''
			let j = i + 1
			while (rows[j].trim() != 'Angle:' && j < 20) {
				rule_string += rows[j] + '\n'
				j++
			}
			i = j
			rules.elt.innerHTML = rule_string
			continue
		} else if (rows[i].trim() == 'Angle:') {
			let loaded_angle = float(rows[i + 1])
			if (loaded_angle >= 0 && loaded_angle <= 360) {
				angle.value(loaded_angle)
				i++
			}
		} else if (rows[i].trim() == 'Length:') {
			let loaded_length = float(rows[i + 1])
			if (loaded_length >= 0 && loaded_length <= 1000) {
				length.value(loaded_length)
				i++
			}
		}
		i++
	}
}

function isRuleValid(rule_string) {
	return /^\s*[A-Zf]\s*:\s*[A-Zf\+\-\[\]<>|#!]*\s*$/.test(rule_string)
}

function isAxiomValid(axiom_string) {
	return /^\s*[A-Zf\+\-\[\]<>|#!]*\s*$/.test(axiom_string)
}

function rulesDictToString(rules) {
	let string = ''
	for (let [ k, v ] of Object.entries(rules)) {
		string += `${k}: ${v}\n`
	}
	return string
}

// from: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
	var element = document.createElement('a')
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
	element.setAttribute('download', filename)

	element.style.display = 'none'
	document.body.appendChild(element)

	element.click()

	document.body.removeChild(element)
}

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
// From: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyToClipboard(text) {
	if (window.clipboardData && window.clipboardData.setData) {
		// IE specific code path to prevent textarea being shown while dialog is visible.
		return clipboardData.setData('Text', text)
	} else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
		var textarea = document.createElement('textarea')
		textarea.textContent = text
		textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
		document.body.appendChild(textarea)
		textarea.select()
		try {
			return document.execCommand('copy') // Security exception may be thrown by some browsers.
		} catch (ex) {
			console.warn('Copy to clipboard failed.', ex)
			return false
		} finally {
			document.body.removeChild(textarea)
		}
	}
}

function getRuleString(rules) {
	for (let [ k, v ] in Object.entries(rules)) {
		console.log(`${k}, ${v}`)
	}
}

// Start file download.
