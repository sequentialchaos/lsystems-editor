let max_iterations = 13

const l_systems = {
  'Penrose': {
    axiom: '[B]++[B]++[B]++[B]++[B]',
    rules: {
      A: 'CF++DF----BF[-CF----AF]++',
      B: '+CF--DF[---AF--BF]+',
      C: '-AF++BF[+++CF++DF]-',
      D: '--CF++++AF[+DF++++BF]--BF',
      F: ''
    },
    len: 40,
    angle: 36,
    max_iterations: max_iterations,
    len_ratio: 0.12
  },
  'Hilbert': {
    axiom: 'L', 
    rules: {
      L: '+RF-LFL-FR+',
      R: '-LF+RFR+FL-',
    },
    len: 80,
    angle: 90,
    max_iterations: max_iterations,
    len_ratio: 0.1
  },
  'Dragon Curve': {
    axiom: 'F', 
    rules: {
      F: 'F+G',
      G: 'F-G',
    },
    len: 80,
    angle: 90,
    max_iterations: max_iterations,
    len_ratio: 0.1
  },
  'Hexagonal Gosper': {
    axiom: 'XF',
    rules: {
      'X' : 'X+YF++YF-FX--FXFX-YF+', 
      'Y' : '-FX+YFYF++YF+FX--FX-Y',
    },
    len: 80,
    angle: 60,
    max_iterations: 5,
    len_ratio: 0.1
  },
  'Wavey Board': {
    axiom : 'F+F+F+F+F+F',
    rules : {
      F: 'F-FF+F+FF+F-FF+F'
    },
    len : 5,
    angle : 60,
    max_iterations : max_iterations,
    len_ratio: 0.03
  }
}