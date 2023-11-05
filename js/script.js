// Variables
var $ken = $(".ken");
var $kenPos, $fireballPos;
var $isFireballColision = false;

// Utility Functions
function addAndRemoveClass(className, duration) {
  $ken.addClass(className);
  setTimeout(function () {
    $ken.removeClass(className);
  }, duration);
}

function isFireballColision() {
  return $fireballPos.left + 75 > $(window).width();
}

function addFireball() {
  var $fireball = $("<div/>", { class: "fireball" });
  $fireball.appendTo($ken);

  $isFireballColision = setInterval(function () {
    $fireballPos = $fireball.offset();

    if (isFireballColision()) {
      $fireball
        .addClass("explode")
        .removeClass("moving")
        .css("marginLeft", "+=22px");
      clearInterval($isFireballColision);

      setTimeout(function () {
        $fireball.remove();
      }, 500);
    }
  }, 50);

  setTimeout(function () {
    $fireball.addClass("moving");
  }, 20);

  setTimeout(function () {
    $fireball.remove();
    clearInterval($isFireballColision);
  }, 3020);
}

// Character Actions
function punch() {
  addAndRemoveClass("punch", 150);
}

function kick() {
  addAndRemoveClass("kick", 500);
}

function rkick() {
  addAndRemoveClass("reversekick", 500);
}

function tatsumaki() {
  addAndRemoveClass("tatsumaki", 2000);
  setTimeout(function () {
    $ken.addClass("down");
  }, 1500);
}

function hadoken() {
  addAndRemoveClass("hadoken", 500);
  setTimeout(addFireball, 250);
}

function shoryuken() {
  addAndRemoveClass("shoryuken", 1000);
  setTimeout(function () {
    $ken.addClass("down");
  }, 500);
}

function jump() {
  addAndRemoveClass("jump", 1000);
  setTimeout(function () {
    $ken.addClass("down");
  }, 500);
}

function kneel() {
  $ken.addClass("kneel");
}

function walkLeft() {
  $ken.addClass("walk").css({ marginLeft: "-=10px" });
}

function walkRight() {
  $ken.addClass("walk").css({ marginLeft: "+=10px" });
}

// Event Handlers
$("#a").click(punch);
$("#z").click(kick);
$("#e").click(rkick);
$("#q").click(tatsumaki);
$("#s").click(hadoken);
$("#d").click(shoryuken);
$("#up").click(jump);
$("#down").on("mousedown mouseup", function (e) {
  if (e.type === "mousedown") {
    kneel();
  } else {
    $ken.removeClass("kneel");
  }
});

$("#left").on("mousedown mouseup", function (e) {
  if (e.type === "mousedown") {
    walkLeft();
  } else {
    $ken.removeClass("walk");
  }
});

$("#right").on("mousedown mouseup", function (e) {
  if (e.type === "mousedown") {
    walkRight();
  } else {
    $ken.removeClass("walk");
  }
});

$(document).on("keydown keyup", function (e) {
  if (e.type === "keydown") {
    // Handle keydown events
    // ...
  } else {
    // Handle keyup events
    $ken.removeClass("walk kneel");
  }
});
