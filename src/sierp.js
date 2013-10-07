// Sierpinski triangle

function sketchProc(p) {
  var levels;

  p.setup = function () {
    levels = 0;
  };

  p.draw = function () {
    stroke(255);
    sierpinski(level);
  };

  function sierpinski(level, size) {
    if (level == 0) {

    }
  }
}

// attaching the sketch to the canvas
var canvas = document.getElementById("canvas");
var p = new Processing(canvas, sketchProc);
