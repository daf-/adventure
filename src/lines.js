// Your browser is currently running this file as an interactive
// processing sketch.
// 
// Lines beginning with "//" like this one are "comments" -- they're just
// here for documentation and don't affect what you see in your
// browser.  Some code is 'commented', meaning it won't be run since
// it begins with two slashes.  Try deleting those slashes.
// Every time you make a change that you want to see, hit Apple-S.
// If you reload (Apple-R) the page your changes will be thrown away.
// (HINT: In Chrome, you can comment out a line by typing Apple-/
//  or selecting multiple lines and then typing Apple-/)
//
// This file uses the processing.js library to generate what you
// see.  The screen is essentially a 2D canvas where x coordinates
// refer to the left-right axis, and y-coorinates refer to the up-down
// axis.  The upper-left corner is (0, 0).
// 
// There are several commented lines throughout this file providing
// guidance and prompting for your adventure.  The adventure consists
// of hacking this file and creating and sharing your resulting art.
// 
// HINT: to save your image as a png, click on the "Console" tab of the developer window
// and enter:
//    p.save("name");
// where "name" is the name of the file you want to save. This will open a
// new window with a .png you can save. (Sometimes this crashes the page... This is a problem
//  with processing!)

function sketchProc(p) {
  var origX = 0;                // x coordinate for beginning of line
  var origY = 0;                // y coordinate for beginning of line
  var lastX;                    // last X position pointed at with the mouse
  var lastY;                    // last Y position pointed at with the mouse
  var prevTime;

  var clickTimes;

  p.setup = function() {
    p.size($(window).width(), $(window).height());

    //    change the background color!
    //    p.background(Red, Green, Blue); sets the color to the
    //    mixture of the Red, Green, and Blue values, where each of those
    //    is a number between 0 and 255.
    //    example: black background:
    p.background(0, 0, 0);

    clickTimes = 0;
    lastX = p.mouseX;
    lastY = p.mouseY;
    prevTime = Date.now();
  };

  p.mouseMoved = function() {
    //    horizontal mouse position is stored in variable curX,
    //    and vertical mouse position is stored in variable curY
    //    Use these values to calculate the distance between every
    //    recorded mouse move event, and use that to modulate line thickness
    var curX = Math.floor(p.mouseX);
    var curY = Math.floor(p.mouseY);
    var curTime = Date.now();
    var dist = Math.sqrt(sqr(lastX - curX) + sqr(lastY - curY));
    var deltaTime = curTime - prevTime;
    var speed = dist / deltaTime;

    //    Change colors!
    //      -> p.stroke(red, green, blue) sets the foreground drawing color
    //      -> where red, green, and blue are all numeric values between 0 and 255, inclusive
    //    White:
    p.stroke(255, 255, 255);
    //    Red:
    // p.stroke(255, 0, 0);
    //    Uncomment the line below and fill in your own (R, G, B) color!
    // p.stroke();
    //    Modulate the color based on mouse position!
    // p.stroke((curX / p.width) * 255, (curY / p.height) * 255, (curX + curY / (p.width) + p.height) * 255);

    //    given two sets of coordinates, (x1, y1) and (x2, y2), p.line(x1, y1, x2, y2)
    //    draws a line from (x1, y1) to (x2, y2)

    //    Modulate the width of each line by how fast the mouse is moving
    p.strokeWeight(speed / 2);
    p.noFill();
    p.line(origX, origY, curX, curY);

    // to draw triangles instead of lines, try uncommenting the following line
    // p.triangle(origX, origY, curX, curY, Math.floor(Math.random() * p.width), Math.floor(Math.random() * p.height));

    lastX = curX;
    lastY = curY;
    prevTime = curTime;
  };

  p.mouseClicked = function () {
    var numSources = 4;
    // To add a source in the center of the image, uncomment the following line:
    // numSources = 5;

    // The code in here is called every time you click inside the sketch!
    // try uncommenting the rest of the code in here.

    // clickTimes++;

    // if (clickTimes === 1) {
    //   p.background(0);
    // }


    // if (clickTimes % numSources == 0) {
    //   origX = 0;
    //   origY = 0;
    // } else if (clickTimes % numSources === 1) {
    //   origX = p.width - 1;
    //   origY = 0;
    // } else if (clickTimes % numSources === 2) {
    //   origX = p.width - 1;
    //   origY = p.height - 1;
    // } else if (clickTimes % numSources === 3) {
    //   origX = 0;
    //   origY = p.height - 1;
    // } else {
    //   origX = p.width / 2;
    //   origY = p.height / 2;
    // }
  };

  // lol
  function sqr(x) { return x * x; }
}

// attaching the sketch to the canvas -- don't change this!
var canvas = document.getElementById("canvas");
var p = new Processing(canvas, sketchProc);
