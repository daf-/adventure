function sketchProc (p) {
  ///////////////////////////////////////////////////////////////////////////////////////
  // to continue paste the following into the "console" tab of the javascript console: //
  //            window.location.href = "lines.html";                                   //
  // then click back to the "Sources" tab, and make sure that lines.js is selected     //
  ///////////////////////////////////////////////////////////////////////////////////////
  var messageIndex;
  var messages = [
    "[click anywhere to continue]",
    "this site has been designed for use with Google Chrome on Mac OS X",
    "[click anywhere to continue]",
    "many web sites encourage the user to passively consume content",
    "[click anywhere to continue]",
    "in doing so many web pages enforce inconvenient use cases\nthrough annoying ads, page access limits, and silly click-to-continue interfaces.",
    "[click to continue]",
    "web browsing involves two-way communication\nin which the user can choose to be an active participant",
    "[...]",
    "despite server-side code being generally inaccessible to the user and usually illegal to access,\nclient-side javascript is simple to hack, even while the page is running.",
    "[...]",
    "to adventure, click View -> Developer -> Javascript Console, then select the \"Sources\" tab.",
  ];

  p.setup = function() {
    p.size($(window).width(), $(window).height());

    messageIndex = 0;

    displayNextMessage();
  };

  p.draw = function () {

  };

  p.mouseClicked = function () {
    displayNextMessage();
  };

  function nextMessage () {
    if (messageIndex > messages.length) {
      return undefined;
    }
    return messages[messageIndex++];
  }

  function displayNextMessage () {
    var message = nextMessage();
    p.background(0);
    p.textSize(24);
    p.textAlign(p.CENTER);
    p.textMode(p.SCREEN);
    if (!message) {
      window.location.href = "lines.html";
    } else {
      p.text(message, p.width / 2, p.height / 2);
    }
  }
}

var canvas = document.getElementById("canvas");
var p = new Processing(canvas, sketchProc);
