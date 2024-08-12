function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // wrap around the edges
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  // subtract the current cell value
  sum -= grid[x][y];
  return sum;
}

let grid1;
let grid2;
let currentGrid;
let resolution = 10;
let cols;
let rows;

function setup() {
  createCanvas(800, 800);
  cols = width / resolution;
  rows = height / resolution;
  grid1 = make2DArray(cols, rows);
  grid2 = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid1[i][j] = floor(random(2));
      grid2[i][j] = floor(random(2));
    }
  }
  currentGrid = grid1;
}

function draw() {
  // display current grid
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (currentGrid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  // update other grid based on current grid values
  let nextGrid = currentGrid == grid1 ? grid2 : grid1;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = currentGrid[i][j];
      let neighbors = countNeighbors(currentGrid, i, j);
      if (state == 0 && neighbors == 3) {
        nextGrid[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGrid[i][j] = 0;
      } else {
        nextGrid[i][j] = state;
      }
    }
  }

  // swap grids
  currentGrid = nextGrid;
}
