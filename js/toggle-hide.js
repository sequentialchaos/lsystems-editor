/////   toggle inputs box   /////
const inputsMain = document.getElementById('inputs-main')
const toggleInputsButton = document.getElementById('toggle-inputs')

function toggleInputs() {
	let inputsMainClasses = inputsMain.classList
	if (inputsMainClasses.contains('hide')) {
		inputsMainClasses.remove('hide')
		toggleInputsButton.innerHTML = 'hide inputs'
	} else {
		inputsMainClasses.add('hide')
		toggleInputsButton.innerHTML = 'show inputs'
	}
}

/////   toggle full-screen   /////
let isFullScreen = false
const header = document.getElementById('header-nav')
const canvasContainer = document.getElementById('canvas-container')
const inputsContainer = document.getElementById('inputs-container')
const toggleFullScreenButton = document.getElementById('toggle-fullscreen')
function toggleFullScreen() {
	if (!isFullScreen) {
		header.classList.add('hide')
		canvasContainer.classList.add('fullscreen')
		toggleFullScreenButton.classList.add('top-right')
		toggleFullScreenButton.innerHTML = 'no full-screen'
		inputsContainer.classList.add('top-left')
		isFullScreen = true
	} else {
		header.classList.remove('hide')
		canvasContainer.classList.remove('fullscreen')
		toggleFullScreenButton.classList.remove('top-right')
		toggleFullScreenButton.innerHTML = 'go full-screen'
		inputsContainer.classList.remove('top-left')
		isFullScreen = false
	}
}

/////   add event listeners   /////
toggleInputsButton.addEventListener('click', toggleInputs)
toggleFullScreenButton.addEventListener('click', toggleFullScreen)
