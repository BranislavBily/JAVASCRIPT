// Rule set https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
// From https://www.youtube.com/watch?v=Ggxt06qSAe4

let width
let height

let cellWidth
let cellCount
let cells = []

let history = []

let arrayOfRules = ([30, 54, 60, 62, 90, 94, 102, 122, 222, 182, 190]).map(number => {
 return number.toString(2).padStart(8, "0") 
})
let randomRule

function setup() {
  width = windowWidth
  height = windowHeight

  cellWidth = 10
  cellCount = width / cellWidth
  createCanvas(width, height);
  background(220);
  colorMode(HSB);
  
  randomRule = pickRandomRule()
  
  cells = initializeStartingRow()
}

function draw() {
  frameRate(30)
  history.push(cells)
  changeRuleRandomly()
  
  let canvasRowCount = height / cellWidth
  if(history.length > canvasRowCount + 1) {
    history.splice(0, 1)
  }
  
  drawSquares()
  calculateNextCells()
  moveColourPicker()
}

function drawSquares() {
  let row = 0
  background(255)
  for(let cellRow of history) {
    for(let i = 0; i < cellRow.length; i++) {
      cellRow[i].show(i * cellWidth, row * cellWidth, cellWidth)
    }
    row++
  }
}


function calculateNextCells() {
  let newCells = new Array(cellCount)
  let colour = getColour()
  
  for(let i = 0; i < cellCount; i++) {
    newCells[i] = new Cell(calculateCellValue(i), colour)
  }
  
  cells = newCells
}

function calculateCellValue(index) {
  let left = cells[(index - 1 + cellCount) % cellCount].value
  let cell = cells[index].value
  let right = cells[(index + 1) % cellCount].value
  
  return valueBasedOnRules(left, cell, right)
}

function valueBasedOnRules(left, middle, right) {
  
  let rule = '' + left + middle + right
  let ruleNumber = parseInt(rule, 2)
  
  return randomRule[7 - ruleNumber]
}

function changeRuleRandomly() {
  if(random() < 0.01) {
    randomRule = pickRandomRule()
    console.log("Actual rule is " + parseInt(randomRule, 2))
    resetRow()
  }
}
  
function pickRandomRule() {
  return random(arrayOfRules)
}

function resetRow() {
  cells = initializeStartingRow()
}
  
function initializeStartingRow() {
  let row = []
  let colour = getColour()
  for(let i = 0; i < cellCount; i++) {
    row.push(new Cell(0, colour))
  }
  
  row[floor(cellCount / 2)] = new Cell(1, colour)
  return row
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}