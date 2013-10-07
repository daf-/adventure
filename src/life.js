function sketchProc(p) {
  var cellSize;                 // width/height of a cell in pixels
  var cols;
  var rows;
  var density;           // helps determine size of initial population
  var board;
  var lastX,                    // most recent mouse position
      lastY;
  var lastTime;
  var SPEEDCONST;

  p.setup = function() {
    // set canvas size
    p.size($(window).width(), $(window).height());

    // initialize globals
    cellSize = 5;
    cols = Math.floor(p.width / cellSize);
    rows = Math.floor(p.height / cellSize);
    density = 0.30;
    lastX = -1;
    lastY = -1;
    lastTime = Date.now();
    SPEEDCONST = 12;

    // initialize 3D board array
    // index in [col][row][buf] order
    board = new Array(cols);
    for (var i = 0; i < board.length; i++) {
      board[i] = new Array(rows);
      for (var j = 0; j < board[i].length; j++) {
        board[i][j] = new Array(2);
      }
    }

    // get started!
    clearBoard();

    p.noStroke();
    p.frameRate(12);
  };

  function makeRandomBoard() {
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        board[col][row][0] = 0;
        board[col][row][1] = 0;
        if (Math.random() < density) {
          board[col][row][0] = 1;
        }
      }
    }
  }

  function clearBoard() {
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        board[col][row][0] = 0;
        board[col][row][1] = 0;
      }
    }
  }

  function countNeighbors(col, row) {
    return board[(col + 1) % cols][row][0]
      + board[col][(row + 1) % rows][0]
      + board[(col + cols - 1) % cols][row][0]
      + board[col][(row + rows - 1) % rows][0]
      + board[(col + 1) % cols][(row + 1) % rows][0]
      + board[(col + cols - 1) % cols][(row + 1) % rows][0]
      + board[(col + cols - 1) % cols][(row + rows - 1) % rows][0]
      + board[(col + 1) % cols][(row + rows - 1) % rows][0];
  }

  // lol
  function sqr(x) {
    return x * x;
  }

  p.draw = function() {
    p.background(0);
    // p.fill(255);

    /* Update current board to current state based on buffer generated
     * last iteration.  Draw as we update.
     *  --> buffer as 3D array inspired by Mike Davis' implementation
     *          http://processingjs.org/learning/topic/conway/
     *
     * Buffer values:
     * -> 1 means cell is alive
     * -> 0 means cell stays the same
     * -> -1 means cell dies
     */
    for (var col = 0; col < cols; col++) {
      for (var row = 0; row < rows; row++) {
        if ( (board[col][row][1] === 1)
             || (board[col][row][1] === 0 && board[col][row][0] === 1) )
        {
          board[col][row][0] = 1;
          p.fill(Math.floor(Math.random() * 255),
                 Math.floor(Math.random() * 255),
                 Math.floor(Math.random() * 255));
          p.rect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
        else if (board[col][row][1] === -1)
        {
          board[col][row][0] = 0;
        }

        // reset the buffer to be calculated below
        board[col][row][1] = 0;
      }
    }

    // Fill in buffer for next iteration
    for (col = 0; col < cols; col++) {
      for (row = 0; row < rows; row++) {
        var neighbors = countNeighbors(col, row);

        if (board[col][row][0] === 0 && neighbors === 3)
          board[col][row][1] = 1;
        else if (board[col][row][0] === 1 && (neighbors < 2 || neighbors > 3))
          board[col][row][1] = -1;
      }
    }
  };

  p.mouseMoved = function() {
    var curTime = Date.now();
    var curX = Math.floor(p.mouseX / cellSize);
    var curY = Math.floor(p.mouseY / cellSize);

    // handle initial move
    if (lastX < 0)
      lastX = curX;
    if (lastY < 0)
      lastY = curY;

    // determine 'radius' (region of randomly spawned new cells
    // surrounding mouse) HEURISTICALLY based on speed of mouse
    // movement

    var dist = Math.sqrt(sqr(lastX - curX) +
                         sqr(lastY - curY));
    var deltaTime = curTime - lastTime;
    if (deltaTime === 0) {
      console.log( "deltaTime is 0; return before divide by zero" );
      return;
    }

    var speed = (dist / deltaTime) * SPEEDCONST;
    var radius = Math.floor(speed);

    for (var i = -radius; i < radius; i++) {
      for (var j = -radius; j < radius; j++) {
        if (Math.random() < 0.2) {
          board[(curX + i + cols) % cols][(curY + j + rows) % rows][1] = 1;
        }
      }
    }

    lastTime = curTime;
    lastX = curX;
    lastY = curY;
  };

  p.mousePressed = function () {
    clearBoard();
  };
}

// attaching the sketch to the canvas
var canvas = document.getElementById("canvas");
var p = new Processing(canvas, sketchProc);
