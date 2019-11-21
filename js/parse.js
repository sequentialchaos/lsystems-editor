const validRuleCharacters = /[A-Zf\+\-\[\]<>|#!]/

function isRuleValid(rule) {
	return /^\s*[A-Zf]\s*:\s*[A-Zf\+\-\[\]<>|#!]*\s*$/.test(rule)
}
// function isRuleValid(rule) {
// 	return /^\s*${validRuleCharacters}\s*:\s*${validRuleCharacters}*\s*$/.test(rule)
// }

function isAxiomValid(axiom_string) {
	return /^\s*[A-Zf\+\-\[\]<>|#!]*\s*$/.test(axiom_string)
}

console.log(isRuleValid('F: F+F'))
