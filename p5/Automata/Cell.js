class Cell {
  constructor(value, colour) {
    this.colour = colour
    this.value = value
  }
  
  show(x, y, cellWidth) {
    if(this.value == 1) {
      fill(this.colour, 255, 255)
      noStroke()
      square(x, y, cellWidth)
    }
  }
}