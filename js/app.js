$(function(){
  var $scoreDisplay = $("#score");
  var $highScore = $("#highScore");
  var highScore = 0;
  var score = 0;
  var $death = $(".death");

  bindEvents();

  setInterval(function(){
    $death = $(".death");
    score++;
    $scoreDisplay.html("Current Score = " +score);
    // checkHeight();
    if(checkCollision($death) === true){
      if(score > highScore){
        highScore = score;
        $highScore.html("Highscore = " +highScore)
      }
      score = 0;
      $scoreDisplay.html("Current Score = " +score);
    }
  }, 100);

  $(".death").animate({
    "right": "800px"
  }, 2500);

  setInterval(function(){
      // var enemy = new createEnemy($death.offset().left, $death.offset().top, 40, 80)
      $(".death").parent().prepend($(".death").clone().css("right", "0"))
      createEnemy($death.offset().left, $death.offset.top, 40, 90)      
      $(".death").slice(1).remove();
    }, 3000)
  function createEnemy(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    $(".death").animate({
      "right": "850px"
    }, 2500);
  }
})

function bindEvents(){
  playerMove();
}

function playerMove(){

  $("body").on("keyup", function () {
    if($("#player").position().top <= 0){
      console.log("boom")
      // $("#player").off("keyup").stop().clearQueue();
      // $("#player").unbind("keyup").clearQueue().stop();
      // $("#player").css("top", "1", "position", "fixed")
      $("#player").stop().animate({bottom: "0"}, 600)
      return false 

    } else {
      $("#player").stop().animate({
        bottom: "+=150px"
      }, 400, function () {
        $("#player").animate({
          bottom: "0"
        }, 600);
      })
    }
  })
}

function checkCollision(death) {
  console.log("running")
  var $player = $("#player");

  var playerSize = {
    x: $player.offset().left,
    y: $player.offset().top,
    width: 40, 
    height: 40
  }

  var deathSize = {
    x: death.offset().left,
    y: death.offset().top,
    width: 40,
    height: 80
  }

  if (playerSize.x < deathSize.x + deathSize.width &&
   playerSize.x + playerSize.width > deathSize.x &&
   playerSize.y < deathSize.y + deathSize.height &&
   playerSize.height + playerSize.y > deathSize.y) {
      // collision detected!
    return true
  }
}


