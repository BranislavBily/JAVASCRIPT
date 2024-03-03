let colour = 127
let adjust = 0;
let xoff = 0;
let xOffsetStep = 0.03

function getColour() {
  colour = noise(xoff) * 360 + adjust;
  if (random() < 0.0001) {
    adjust += 5;
  }

  if (colour > 360) {
    colour = 0;
    adjust = 0;
  }
  return colour
}

function moveColourPicker() {
  xoff += xOffsetStep;
}