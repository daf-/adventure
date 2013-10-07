function sketchProc(p) {
  var radius;
  var origx = 0;
  var origy = 0;
  var prevx;
  var prevy;

  var clickTimes = 0;

  p.setup = function() {
    p.size($(window).width(), $(window).height());
    p.background(0);

    prevx = p.mouseX;
    prevy = p.mouseY;
  };

  p.draw = function() {
    //
  };

  p.mouseMoved = function() {
    // determine direction
    var curx = Math.floor(p.mouseX);
    var cury = Math.floor(p.mouseY);
    var dx = curx - prevx;
    var dy = cury - prevy;
    var slope = dx / dy;        // rise over run


    // p.stroke(255);
    p.stroke((curx / $(window).width()) * 255, (cury / $(window).height()) * 255, (curx + cury / ($(window).width()) + $(window).height()) * 255);
    p.line(origx, origy, curx, cury);
    prevx = curx;
    prevy = cury;
  };

  p.mouseClicked = function () {
    clickTimes++;
    if (clickTimes % 4 == 0) {
      origx = 0;
      origy = 0;
    } else if (clickTimes % 4 == 1) {
      origx = $(window).width() - 1;
    } else if (clickTimes % 4 == 2) {
      origy = $(window).height() - 1;
    } else if (clickTimes % 4 == 3) {
      origx = 0;
    }
  };
}

// attaching the sketch to the canvas
var canvas = document.getElementById("canvas");
var p = new Processing(canvas, sketchProc);
