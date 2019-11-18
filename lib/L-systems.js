String.prototype.count = function(s) {
  let c = 0;
  for (let i = 0; i < this.length - s.length + 1; i++) {
    if (this.substring(i, i + s.length) == s) {
      c++;
    }
  }
  return c;
};

function calculateCenterPoint(lines) {
  let sum_x = 0;
  let sum_y = 0;
  for (let l of lines) {
    sum_x += l.x1;
    sum_y += l.y1;
  }
  let avg_x = int(sum_x / lines.length);
  let avg_y = int(sum_y / lines.length);
  return { x: avg_x, y: avg_y };
}

function formatForPlotter(lines, w, x_offset_ratio, y_offset_ratio) {
  let plotter_points = [];
  let scale_factor = 7650 / w;
  let x_offset = 7650 * x_offset_ratio,
    y_offset = 7650 * y_offset_ratio;
  plotter_points.push("SP1;");
  for (let [i, l] of lines.entries()) {
    let x1 = round(l.x1 * scale_factor) + x_offset,
      y1 = round(l.y1 * scale_factor) + y_offset;
    plotter_points.push(`PA${x1},${y1};`);
    if (i == 0) {
      plotter_points.push("PD;");
    }
  }
  plotter_points.push("PU;");
  plotter_points.push("SP0;");
  return plotter_points.join("\n");
}

function formatForPlotterAutoCenter(lines, w) {
  let plotter_points = [];
  let scale_factor = 7650 / w;
  let c = calculateCenterPoint(lines);
  let x_offset = 5150,
    y_offset = 3825;
  plotter_points.push("SP1;");
  for (let [i, l] of lines.entries()) {
    let x1 = round((l.x1 - c.x) * scale_factor) + x_offset,
      y1 = round((l.y1 - c.y) * scale_factor) + y_offset;
    plotter_points.push(`PA${x1},${y1};`);
    if (i == 0) {
      plotter_points.push("PD;");
    }
  }
  plotter_points.push("PU;");
  plotter_points.push("SP0;");
  return plotter_points.join("\n");
}

function nextInstructions(instructions, rules) {
  let new_instructions = "";
  for (let c of instructions) {
    if (c in rules) {
      new_instructions += rules[c];
    } else {
      new_instructions += c;
    }
  }
  return new_instructions;
}

class L_system {
  constructor(axiom, rules, len, angle, max_iterations, len_ratio = 0.2) {
    this.axiom = axiom;
    this.rules = rules;
    this.len = len;
    this.angle = angle;
    this.initial_angle = angle;
    this.instructions = axiom;
    this.iterations = 0;
    this.max_iterations = max_iterations;
    this.len_ratio = len_ratio;
    this.instructions_stack = [axiom];
    this.direction = 1;
  }

  copy({
    axiom = this.axiom,
    rules = this.rules,
    len = this.len,
    angle = this.angle,
    max_iterations = this.max_iterations
  } = {}) {
    return new L_system(axiom, rules, len, angle, max_iterations);
  }

  toString() {
    return `Axiom: 
${this.axiom}

Rules:
${this.getRuleString()}
Angle: 
${this.angle}

Length: 
${this.len}`;
  }

  fromString(string) {}

  getRuleString() {
    let string = "";
    for (let key in this.rules) {
      string += `${key}: ${this.rules[key]}\n`;
    }
    return string;
  }

  getNextInstructions({ backwards = true } = {}) {
    if (this.direction == 1 && this.iterations >= this.max_iterations) {
      this.direction = -1;
    }

    if (this.direction == -1 && this.iterations <= 1) {
      this.iterations = 1;
      this.direction = 1;
    }

    if (this.direction == -1 && backwards) {
      this.iterations -= 1;
      this.instructions = this.instructions_stack[this.iterations];
      return;
    }

    if (this.instructions.length > 10 ** 5) {
      return;
    }

    let next_instructions = "";
    for (let i of this.instructions) {
      if (i in this.rules) {
        next_instructions += this.rules[i];
      } else {
        next_instructions += i;
      }
    }
    this.instructions = next_instructions;
    this.instructions_stack.push(this.instructions);
    this.iterations += 1;
  }

  draw({
    x = 0,
    y = 0,
    len = this.len,
    angle = this.angle,
    mode = "relative",
    show = true,
    colormode = "normal",
    colors_ratio = 1 / 1.2,
    line_len_scale = 1.2,
    stroke_weight = 3
  } = {}) {
    translate(x, y);
    // let maxStrokeWeight = map(len, 0, 200, 1, 8)
    // strokeWeight(map(this.iterations, 1, this.max_iterations, maxStrokeWeight, 1))
    strokeWeight(stroke_weight);
    this.turtle = new Turtle({
      x: x,
      y: y,
      len: len,
      angle_delta: angle,
      instructions: this.instructions,
      line_len_scale: this.line_len_scale
    });
    if (colormode == "normal") {
      this.turtle.go({
        mode: mode,
        show: show
      });
    } else if (colormode == "rainbow") {
      this.turtle.goRainbow({
        mode: mode,
        show: show
      });
    } else if (colormode == "rainbow remix") {
      this.turtle.goRainbowRemix({
        mode: mode,
        show: show,
        colors_ratio: colors_ratio
      });
    }
  }
}

class Turtle {
  constructor({
    x = 0,
    y = 0,
    len = 1,
    angle_delta = 90,
    instructions = "",
    line_width = 1,
    line_width_inc = 1,
    line_len_scale = 1.2
  }) {
    this.x = x;
    this.y = y;
    this.len = len;
    this.line_width = line_width;
    this.line_width_inc = line_width_inc;
    this.line_len_scale = line_len_scale;
    this.angle = 0;
    this.angle_delta = angle_delta;
    this.instructions = instructions;
    this.stack = [];
    this.lines = [];
  }

  performInstruction({
    i = "F",
    len = this.len,
    angle_delta = this.angle_delta,
    mode = "relative",
    show = true,
    line_width_inc = this.line_width_inc,
    line_len_scale = this.line_len_scale
  } = {}) {
    let a = radians(angle_delta);
    if (mode == "relative") {
      if (i == "+") {
        rotate(-a);
      } else if (i == "-") {
        rotate(a);
      } else if (i == "F" || i == "G" || i == "H" || i == "I") {
        if (show) {
          line(0, 0, len, 0);
        }
        translate(len, 0);
      } else if (i == "f" || i == "g" || i == "h" || i == "i") {
        translate(len, 0);
      } else if (i == "[") {
        push();
      } else if (i == "]") {
        pop();
      } else if (i == "|") {
        rotate(PI);
      } else if (i == "{") {
        beginShape();
      } else if (i == "}") {
        endShape();
      } else if (i == "#") {
        this.line_width += line_width_inc;
      } else if (i == "!") {
        this.line_width -= line_width_inc;
      } else if (i == ">") {
        this.len *= line_len_scale;
      } else if (i == "<") {
        this.len /= line_len_scale;
      }
    } else if (mode == "absolute") {
      if (i == "+") {
        this.angle -= a;
      } else if (i == "-") {
        this.angle += a;
      } else if (i == "F" || i == "G") {
        let x2 = this.x + this.len * cos(this.angle),
          y2 = this.y + this.len * sin(this.angle);
        if (show) {
          // if (i =='F') {
          //   stroke('red')
          // } else {
          //   stroke('white')
          // }
          line(this.x, this.y, x2, y2);
        }
        this.lines.push({
          x1: this.x,
          y1: this.y,
          x2: x2,
          y2: y2
        });
        this.x = x2;
        this.y = y2;
      } else if (i == "f") {
        this.x = this.x + this.len * cos(this.angle);
        this.y = this.y + this.len * sin(this.angle);
      } else if (i == "[") {
        this.stack.push({
          x: this.x,
          y: this.y,
          len: this.len,
          angle: this.angle
        });
      } else if (i == "]") {
        if (this.stack != []) {
          let p = this.stack.pop();
          this.x = p.x;
          this.y = p.y;
          this.len = p.len;
          this.angle = p.angle;
        }
      } else if (i == "|") {
        this.angle += PI;
      } else if (i == "#") {
        this.line_width += line_width_inc;
      } else if (i == "!") {
        this.line_width -= line_width_inc;
      } else if (i == ">") {
        this.len *= line_len_scale;
      } else if (i == "<") {
        this.len /= line_len_scale;
      }
    }
  }

  go({
    x = this.x,
    y = this.y,
    len = this.len,
    angle_delta = this.angle_delta,
    mode = "relative",
    show = true
  } = {}) {
    // Go turtle, go! :D
    push();
    if (mode == "relative") {
      translate(x, y);
    } else if (mode == "absolute") {
      this.lines = [];
    }
    for (let i of this.instructions) {
      this.performInstruction({
        i: i,
        len: len,
        angle_delta: angle_delta,
        mode: mode,
        show: show
      });
    }
    pop();
  }

  goRainbow({
    x = this.x,
    y = this.y,
    len = this.len,
    angle_delta = this.angle_delta,
    mode = "relative",
    show = true
  } = {}) {
    // Go rainbow turtle, go! :D
    push();
    if (mode == "relative") {
      translate(x, y);
    } else if (mode == "absolute") {
      this.lines = [];
    }
    let t = this.instructions.count("F") * 1.05;
    colorMode(HSB, t);

    let count = 0;
    for (let i of this.instructions) {
      stroke(count, t, t);
      this.performInstruction({
        i: i,
        len: len,
        angle_delta: angle_delta,
        mode: mode,
        show: show
      });
      if (i == "F") {
        count++;
      }
    }
    pop();
  }

  goRainbowRemix({
    x = this.x,
    y = this.y,
    len = this.len,
    angle_delta = this.angle_delta,
    colors_ratio = 1 / 7,
    mode = "relative",
    show = true
  } = {}) {
    // Go rainbow turtle, go! :D
    push();
    if (mode == "relative") {
      translate(x, y);
    } else if (mode == "absolute") {
      this.lines = [];
    }

    let t = int(this.instructions.count("F") * 1.05 * colors_ratio);
    colorMode(HSB, t);

    let count = 0;
    for (let i of this.instructions) {
      stroke(count % t, t, t);
      this.performInstruction({
        i: i,
        len: len,
        angle_delta: angle_delta,
        mode: mode,
        show: show
      });
      if (i == "F") {
        count++;
      }
    }
    pop();
  }
}
