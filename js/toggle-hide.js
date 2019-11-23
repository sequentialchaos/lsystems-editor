// toggle inputs box
const inputsMain = document.getElementById('inputs-main')
const toggleInputsButton = document.getElementById('toggle-inputs')

function toggleInputs() {
	let inputsMainClasses = inputsMain.classList
	if (inputsMainClasses.contains('hide')) {
		inputsMainClasses.remove('hide')
		toggleInputsButton.innerHTML = 'hide inputs (I)'
	} else {
		inputsMainClasses.add('hide')
		toggleInputsButton.innerHTML = 'show inputs (I)'
	}
}

// toggle full-screen
let isFullScreen = false
const header = document.getElementById('header-nav')
const canvasContainer = document.getElementById('canvas-container')
const inputsContainer = document.getElementById('inputs-container')
const centerButtonContainer = document.getElementById('center-button-container')
const toggleFullScreenButton = document.getElementById('toggle-fullscreen')
function toggleFullScreen() {
	if (!isFullScreen) {
		header.classList.add('hide')
		canvasContainer.classList.add('fullscreen')
		toggleFullScreenButton.classList.add('top')
		toggleFullScreenButton.innerHTML = 'no full-screen (ESC)'
		inputsContainer.classList.add('top')
		centerButtonContainer.classList.add('top')
		isFullScreen = true
	} else {
		header.classList.remove('hide')
		canvasContainer.classList.remove('fullscreen')
		toggleFullScreenButton.classList.remove('top')
		toggleFullScreenButton.innerHTML = 'go full-screen (ESC)'
		inputsContainer.classList.remove('top')
		centerButtonContainer.classList.remove('top')

		isFullScreen = false
	}
}

// toggle UI
let uiToggledOn = true
const toggleUiButton = document.getElementById('toggleUI-button')
const uiNodes = [ inputsContainer, centerButtonContainer, toggleFullScreenButton, toggleUiButton ]
function toggleUI() {
	uiNodes.forEach((node) => {
		if (uiToggledOn) {
			// UI is on, turn it off!
			if (!node.classList.contains('hide')) {
				node.classList.add('hide')
			}
		} else {
			// UI is off, turn it on!
			if (node.classList.contains('hide')) {
				node.classList.remove('hide')
			}
		}
	})
	uiToggledOn = !uiToggledOn
}

// add event listeners
toggleInputsButton.addEventListener('click', toggleInputs)
toggleFullScreenButton.addEventListener('click', toggleFullScreen)

document.addEventListener('keydown', (event) => {
	if (event.key.toLowerCase() == 'i') {
		toggleInputs()
	} else if (event.key == 'Escape') {
		toggleFullScreen()
	} else if (event.key == 'q') {
		toggleUI()
	}
})
