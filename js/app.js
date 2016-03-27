$(function(){
  bindEvents();
})

function bindEvents(){
  playerMove();
  $("#start").one("click", function(){
    $("#start").fadeOut(1500);
    startGame();
  });
}

function startGame(){

  var $scoreDisplay = $("#score");
  var $highScore = $("#highScore");
  var highScore = 0;
  var score = 0;
  var $enemy = $(".enemy");

  setInterval(function(){
    $enemy = $(".enemy");
    score++;
    $scoreDisplay.html("Current Score = " + score);

    removeEnemy();

    if(checkCollision() === true){
      if(score > highScore){
        highScore = score;
        $highScore.html("Highscore = " + highScore);
      }
      score = 0;
      $scoreDisplay.html("Current Score = 0");
      enemySpeed = 850;
      levelStart = false;
      // $("#start").fadeIn(1500);
      $(".enemy").stop();
    }
  }, 20);

  setInterval(addEnemy, 1500)
}

function removeEnemy(){
  if($(".enemy").length > 1){
    $(".enemy").slice(1).remove();
  }
}

function randomSpawn(){
  var randomNum = Math.random()
  if(randomNum < 0.4){
    return "$enemy1";
  } else if(randomNum < 0.6){
    return "$enemy2";
  } else if(randomNum < 0.75){
    return "$enemy3";
  } else if(randomNum < 0.9){
    return "$enemy4"
  } else {
    return "$enemy5"
  }
}

function addEnemy(){
  var enemySpeed = 1500;
  var randomEnemy = randomSpawn();

  switch(randomEnemy){
    case "$enemy1":
    $("#playArea").prepend("<div class=enemy id=enemy1></div>")
    $("#enemy1").animate({
      "right": "760px"
    }, enemySpeed);
    break;
    case "$enemy2":
    $("#playArea").prepend("<div class=enemy id=enemy2></div>")
    $("#enemy2").animate({
      "right": "760px"
    }, enemySpeed);
    break;
    case "$enemy3":
    $("#playArea").prepend("<div class=enemy id=enemy3></div>")
    $("#enemy3").animate({
      "right": "760px"
    }, enemySpeed);
    break;
    case "$enemy4":
    $("#playArea").prepend("<div class=enemy id=enemy4></div>")
    $("#enemy4").animate({
      "right": "760px"
    }, enemySpeed);
    break;
    case "$enemy5":
    $("#playArea").prepend("<div class=enemy id=enemy5></div>")
    $("#enemy5").animate({
      "right": "760px"
    }, enemySpeed);
    break;
  }
  // *******************************************
  // * NEED TO FIX COLLISION WITH BOTTOM ENEMY *
  // *******************************************
  // $("#playArea").prepend("<div class=enemy id=enemy1></div>")
  // $("#playArea").prepend("<div class=enemy id=enemy3></div>")
  // $(".enemy").animate({
  //   "right": enemySpeed+"px"
  // }, 2500);
  // $(".enemy").slice(2).remove();
}


function playerMove(){
  $(window).keydown(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      $("#space").css("background-image", "url('http://i.imgur.com/3aYa5Y1.png')")
    }
  })

  $(window).keyup(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      $("#space").css("background-image", "url('http://i.imgur.com/EwBCKl7.png')")
      if($("#player").position().top <= 0){
        console.log("boom")
        // fix this ????!?!?!?!?!?!?
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
    }
  })
}

function checkCollision() {
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


