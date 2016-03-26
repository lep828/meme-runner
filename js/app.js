$(function(){
  var $scoreDisplay = $("#score");
  var $highScore = $("#highScore");
  var highScore = 0;
  var score = 0;
  var $enemy = $(".enemy");
  var enemySpeed = 850;

  bindEvents();

  setInterval(function(){
    $enemy = $(".enemy");
    score++;
    $scoreDisplay.html("Current Score = " +score);

    if(checkCollision() === true){
      if(score > highScore){
        highScore = score;
        $highScore.html("Highscore = " +highScore);
      }
      score = 0;
      $scoreDisplay.html("Current Score = " +score);
      enemySpeed = 850;
    }
  }, 20);

  $("#player").animate({"bottom": "0px"}, 1000)

  setInterval(function(){
    var randomEnemy = randomSpawn();
    if(randomEnemy === "$enemy1"){
      $("#playArea").prepend("<div class=enemy id=enemy1></div>")
      $("#enemy1").animate({
        "right": enemySpeed+"px"
      }, 2500);
      $(".enemy").slice(1).remove();

    } else if(randomEnemy === "$enemy2") {
      $("#playArea").prepend("<div class=enemy id=enemy2></div>")
      $("#enemy2").animate({
        "right": enemySpeed+"px"
      }, 2500);
      $(".enemy").slice(1).remove();

    } else if(randomEnemy === "$enemy3"){
      $("#playArea").prepend("<div class=enemy id=enemy3></div>")
      $("#enemy3").animate({
        "right": enemySpeed+"px"
      }, 2500);
      $(".enemy").slice(1).remove();

    } else {
      // ***************************************
      // NEED TO FIX COLLISION WITH BOTTOM ENEMY
      // ***************************************
      $("#playArea").prepend("<div class=enemy id=enemy1></div>")
      $("#playArea").prepend("<div class=enemy id=enemy3></div>")
      $(".enemy").animate({
        "right": enemySpeed+"px"
      }, 2500);
      $(".enemy").slice(2).remove();
    }
    enemySpeed += 50;
    console.log(enemySpeed)
  }, 2000)
})

function randomSpawn(){
  var randomNum = Math.random()
  if(randomNum < 0.25){
    return "$enemy1";

  } else if(randomNum < 0.5){
    return "$enemy2";

  } else if(randomNum < 0.75){
    return "$enemy3";

  } else {
    return "bonus"
  }
}

function bindEvents(){
  playerMove();
}

function playerMove(){

  $("body").on("keyup", function () {
    if($("#player").position().top <= 0){
      console.log("boom")

      $("#player").stop().animate({bottom: "0"}, 600)
      return false 

    } else {

      $("#player").stop().animate({
        bottom: "+=100px"
      }, 400, function () {
        $("#player").animate({
          bottom: "0"
        }, 600);
      })
    }
  })
}

function checkCollision() {
  console.log("running")
  var $player = $("#player");

  var playerSize = {
    x: $player.offset().left,
    y: $player.offset().top,
    width: 40, 
    height: 40
  }

  var enemySize = {
    x: $(".enemy").offset().left,
    y: $(".enemy").offset().top,
    width: 40,
    height: 120
  }

  if (playerSize.x < enemySize.x + enemySize.width &&
   playerSize.x + playerSize.width > enemySize.x &&
   playerSize.y < enemySize.y + enemySize.height &&
   playerSize.height + playerSize.y > enemySize.y) {
    return true
  }
}


