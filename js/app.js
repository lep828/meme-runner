$(function(){
  var $scoreDisplay = $("#score");
  var $highScore = $("#highScore");
  var highScore = 0;
  var score = 0;
  var $death = $(".death");

  var enemySpeed = 2500;

  bindEvents();

  setInterval(function(){
    $death = $(".death");
    score++;
    $scoreDisplay.html("Current Score = " +score);

    if(checkCollision() === true){
      if(score > highScore){
        highScore = score;
        $highScore.html("Highscore = " +highScore);
        enemySpeed = 2500;
      }
      score = 0;
      $scoreDisplay.html("Current Score = " +score);
    }
  }, 100);

  $("#player").animate({"bottom": "0px"}, 1000)

  setInterval(function(){
    var randomEnemy = randomSpawn();
    if(randomEnemy === "$enemy1"){
      $("#playArea").prepend("<div class=death id=enemy1></div>")
      $("#enemy1").animate({
        "right": "850px"
      }, enemySpeed);
    } else if(randomEnemy === "$enemy2") {
      $("#playArea").prepend("<div class=death id=enemy2></div>")
      $("#enemy2").animate({
        "right": "850px"
      }, enemySpeed);
    } else {
      $("#playArea").prepend("<div class=death id=enemy3></div>")
      $("#enemy3").animate({
        "right": "850px"
      }, enemySpeed);
    }
    $(".death").slice(1).remove();
    enemySpeed -= 25;
  }, 2000)
})

function randomSpawn(){
  var randomNum = Math.random()
  if(randomNum < 0.33){
    return "$enemy1";

  } else if(randomNum < 0.66){
    return "$enemy2";

  } else {
    return "$enemy3";
  }
}

function bindEvents(){
  playerMove();
}

function playerMove(){

  $("body").on("keyup", function () {
    if($("#player").position().top <= 0){
      console.log("boom")

      $("#player").stop().animate({bottom: "0"}, 600) //kinda works need to fix still
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

  var deathSize = {
    x: $(".death").offset().left,
    y: $(".death").offset().top,
    width: 40,
    height: 120
  }

  if (playerSize.x < deathSize.x + deathSize.width &&
   playerSize.x + playerSize.width > deathSize.x &&
   playerSize.y < deathSize.y + deathSize.height &&
   playerSize.height + playerSize.y > deathSize.y) {
    return true
  }
}


