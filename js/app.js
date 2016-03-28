var bluck = bluck || {}
bluck.$enemy = $(".enemy");
bluck.enemySpeed = 1500;


$(function(){
  bluck.bindEvents();
  $("audio")[1].play();
})

bluck.bindEvents = function(){
  bluck.playerMove();
  $("#start").one("click", function(){
    $("#start").fadeOut(1500);
    bluck.startGame();
  });
}

bluck.startGame = function(){
  bluck.refreshers();
  setInterval(bluck.addEnemy, 1500);
}

bluck.removeEnemy = function(){
  if($(".enemy").length > 1){
    $(".enemy").slice(1).remove();
  }
}

bluck.refreshers = function(){
  bluck.$highScore = $("#highScore");
  bluck.$scoreDisplay = $("#score");
  var highScore = 0;
  var score = 0;

  setInterval(function(){
    score++;
    bluck.$scoreDisplay.html("Current Score = " + score);
    bluck.$enemy = $(".enemy");
    bluck.removeEnemy();

    if(bluck.checkCollision() === true){
      if(score > highScore){
        highScore = score;
        bluck.$highScore.html("Highscore = " + highScore);
      }
      score = 0;
      bluck.$scoreDisplay.html("Current Score = " + score);
      $("audio")[2].play();
      $(".enemy").stop();
    }
  }, 20);
}

bluck.randomSpawn = function(){
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

bluck.makeEnemy = function(enemyName){
  $("#playArea").prepend("<div class=enemy id=" + enemyName + "></div>");
  $("#"+ enemyName).animate({
    "right": "760px"
  }, bluck.enemySpeed);
}

bluck.addEnemy = function(){
  var randomEnemy = bluck.randomSpawn();

  switch(randomEnemy){
    case "$enemy1":
    bluck.makeEnemy("enemy1")
    break;
    case "$enemy2":
    bluck.makeEnemy("enemy2")
    break;
    case "$enemy3":
    bluck.makeEnemy("enemy3")
    break;
    case "$enemy4":
    bluck.makeEnemy("enemy4")
    break;
    case "$enemy5":
    bluck.makeEnemy("enemy5")
    break;
  }
}

bluck.playJumpAudio = function(){
  var audio = $("audio")[0]
  audio.load();
  audio.play();
}

bluck.playerMove = function(){
  $(window).keydown(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      $("#space").css("background-image", "url('http://i.imgur.com/3aYa5Y1.png')")
    }
  })

  $(window).keyup(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault()
      $("#space").css("background-image", "url('http://i.imgur.com/EwBCKl7.png')")
      bluck.playJumpAudio();
      if($("#player").position().top <= 0){
        $("#player").stop().animate({bottom: "0"}, 600)
        return false 
      } else {
        $("#player").stop().animate({
          bottom: "+=100px"
        }, 400, function () {
          $("#player").animate({
            bottom: " 0"
          }, 600);
        })
      }
    }
  })
}

bluck.checkCollision = function(){
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
