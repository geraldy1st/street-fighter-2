var $ken = $(".ken");
var $kenPos, $fireballPos;

var punch = function () {
  $ken.addClass("punch");
  setTimeout(function () {
    $ken.removeClass("punch");
  }, 150);
};

var kick = function () {
  $ken.addClass("kick");
  setTimeout(function () {
    $ken.removeClass("kick");
  }, 500);
};

var rkick = function () {
  $ken.addClass("reversekick");
  setTimeout(function () {
    $ken.removeClass("reversekick");
  }, 500);
};

var tatsumaki = function () {
  $ken.addClass("tatsumaki");
  setTimeout(function () {
    $ken.addClass("down");
  }, 1500);
  setTimeout(function () {
    $ken.removeClass("tatsumaki down");
  }, 2000);
};

var hadoken = function () {
  $ken.addClass("hadoken");
  setTimeout(function () {
    $ken.removeClass("hadoken");
  }, 500);
  setTimeout(function () {
    var $fireball = $("<div/>", { class: "fireball" });
    $fireball.appendTo($ken);

    var isFireballCollision = function () {
      return $fireballPos.left + 75 > $(window).width() ? true : false;
    };

    var explodeIfCollision = setInterval(function () {
      $fireballPos = $fireball.offset();
      // console.log('fireballInterval:', $fireballPos.left);

      if (isFireballCollision()) {
        $fireball
          .addClass("explode")
          .removeClass("moving")
          .css("marginLeft", "+=22px");
        clearInterval(explodeIfCollision);
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
      clearInterval(explodeIfCollision);
    }, 3020);
  }, 250);
};

// Other action functions go here...

// Event handling
$("#a").click(punch);
$("#z").click(kick);
$("#e").click(rkick);
$("#q").click(tatsumaki);
$("#s").click(hadoken);

// Handle key events
$(document).on("keydown keyup", function (e) {
  if (e.type === "keydown") {
    // Use e.key for key identification
    switch (e.key) {
      case "s":
        if (
          !$ken.hasClass("tatsumaki") &&
          !$ken.hasClass("shoryuken") &&
          !$ken.hasClass("hadoken") &&
          !$ken.hasClass("punch") &&
          !$ken.hasClass("kick") &&
          !$ken.hasClass("reversekick")
        ) {
          hadoken();
        }
        break;
      case "d":
        if (
          !$ken.hasClass("tatsumaki") &&
          !$ken.hasClass("shoryuken") &&
          !$ken.hasClass("hadoken") &&
          !$ken.hasClass("punch") &&
          !$ken.hasClass("kick") &&
          !$ken.hasClass("reversekick") &&
          !$ken.hasClass("jump")
        ) {
          shoryuken();
        }
        break;
      // Add cases for other actions...
    }
  } else {
    // keyup
    $ken.removeClass("walk kneel");
  }

  // Prevent default behavior of arrow keys
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
});
