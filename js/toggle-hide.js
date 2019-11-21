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

toggleInputsButton.addEventListener('click', toggleInputs)
