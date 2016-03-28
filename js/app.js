var doge = doge || {}

doge.$enemy = $(".enemy");
doge.enemySpeed = 1500;
doge.play = true;

$(function(){
  doge.bindEvents();
  var backgroundMusic = $("audio")[1];
  backgroundMusic.volume = 0.2;
  backgroundMusic.play();
})

doge.bindEvents = function(){
  doge.playerMove();
  $("#start").on("click", function(){
    $("#start").fadeOut(1500);
    $("#endScreen").fadeOut(1500);
    doge.play = true;
    doge.startGame();
  });
}

doge.playerMove = function(){
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      doge.playerMovement();
    }
  })
  $(window).on("click", function(){
    doge.playerMovement();
  })
}

doge.playerMovement = function(){
  doge.playJumpAudio();
  if($("#player").position().top <= 0){
    return false 
  } else {
    $("#player").stop().animate({
      bottom: "+=100px"
    }, 300, function () {
      $("#player").animate({
        bottom: " 0"
      }, 600);
    })
  }
}


doge.startGame = function(){
  if(doge.play === true){
    doge.refreshers();
    doge.generateEnemies = setInterval(doge.addEnemy, 1500);
  }
}

doge.refreshers = function(){
  doge.$highScore = $("#highScore");
  doge.$scoreDisplay = $("#score");
  var highScore = 0;
  var score = 0;

  doge.refreshing = 
  setInterval(function(){
    score++;
    doge.$scoreDisplay.html("Score = " + score);
    doge.$enemy = $(".enemy");
    doge.removeEnemy();

    if(doge.checkCollision() === true){
      if(score > highScore){
        highScore = score;
        doge.$highScore.html("Highscore = " + highScore);
      }
      $("#endScreen").html("You scored "+ score +" click Start to play again")
      $("#endScreen").fadeIn(1500);
      $("#start").fadeIn(1500);

      score = 0;
      doge.$scoreDisplay.html("Score = " + score);
      $("audio")[2].play();
      $(".enemy").stop();
      doge.play = false;
      $(".enemy").slice(0).remove();
      clearInterval(doge.generateEnemies);
      clearInterval(doge.refreshing);

    }
  }, 20);
}
//

doge.removeEnemy = function(){
  if($(".enemy").length > 1){
    $(".enemy").slice(1).remove();
  }
}

doge.randomSpawn = function(){
  var randomNum = Math.random()

  if(randomNum < 0.5){
    return "$enemy1";
  } else if(randomNum < 0.625){
    return "$enemy2";
  } else if(randomNum < 0.75){
    return "$enemy3";
  } else if(randomNum < 0.875){
    return "$enemy4"
  } else {
    return "$enemy5"
  }
}

doge.makeEnemy = function(enemyName){
  $("#playArea").prepend("<div class=enemy id=" + enemyName + "></div>");
  $("#"+ enemyName).animate({
    "right": "760px"
  }, doge.enemySpeed);
}

doge.addEnemy = function(){
  var randomEnemy = doge.randomSpawn();

  switch(randomEnemy){
    case "$enemy1":
    doge.makeEnemy("enemy1")
    break;
    case "$enemy2":
    doge.makeEnemy("enemy2")
    break;
    case "$enemy3":
    doge.makeEnemy("enemy3")
    break;
    case "$enemy4":
    doge.makeEnemy("enemy4")
    break;
    case "$enemy5":
    doge.makeEnemy("enemy5")
    break;
  }
}

doge.playJumpAudio = function(){
  var audio = $("audio")[0];
  audio.volume = 1;
  audio.load();
  audio.play();
}

doge.checkCollision = function(){
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

