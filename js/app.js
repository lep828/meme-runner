var meme = meme || {}

meme.$enemy = $(".enemy");
meme.enemySpeed = 1500;
meme.play = true;
meme.highScore = 0;

$(function(){
  meme.bindEvents();
  meme.changeMeme();
  
  var backgroundMusic = $("audio")[1];
  backgroundMusic.volume = 0.2;
  backgroundMusic.play();
})

meme.bindEvents = function(){
  meme.playerMove();
  $("#start").on("click", function(){
    if($("#player").hasClass("doge")){
      $("#player").css("background-image", "url(http://i.imgur.com/bxAvTMl.png)");
      $("#sadMeme").fadeOut(1500);
    } else if($("#player").hasClass("nyan")) {
      $("#player").css("background-image", "url(http://i.imgur.com/hgfTVJb.png)")
      $("#sadMeme").fadeOut(1500);
    }
    $("#start").fadeOut(1500);
    $("#endScreen").fadeOut(1500);
    meme.play = true;
    meme.startGame();
  });
}

meme.playerMove = function(){
  $(window).keypress(function (e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      meme.playerMovement();
    }
  })
  
  $("#playArea").on("click", function(){
    meme.playerMovement();
  })
}

meme.playerMovement = function(){
  meme.playJumpAudio();
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

meme.startGame = function(){
  if(meme.play === true){
    meme.refreshers();
    meme.generateEnemies = setInterval(meme.addEnemy, 1500);
  }
}

meme.refreshers = function(){
  meme.$highScore = $("#highScore");
  meme.$scoreDisplay = $("#score");
  var score = 0;

  meme.refreshing = 
  setInterval(function(){
    score++;
    meme.$scoreDisplay.html("Score = " + score);
    meme.$enemy = $(".enemy");
    meme.removeEnemy();

    if(meme.checkCollision() === true){
      if(score > meme.highScore){
        meme.highScore = score;
        meme.$highScore.html("Highscore = " + meme.highScore);
      }
      $("#endScreen").html("You scored "+ score +" click Start to play again");
      $("#endScreen").fadeIn(1500);
      $("#start").fadeIn(1500);
      if($("#player").hasClass("doge")){
        $("#player").css("background-image", "url(http://i.imgur.com/0ZLP1X4.png)");
        $("#sadMeme").fadeIn(1500);
      } else {
        $("#player").css("background-image", "url(http://i.imgur.com/x0aSqCA.png)");
        $("#sadMeme").css("background-image", "url(http://i.imgur.com/x0aSqCA.png)")
        $("#sadMeme").fadeIn(1500);
      }

      score = 0;
      meme.$scoreDisplay.html("Score = " + score);
      $("audio")[2].play();
      $(".enemy").stop();
      meme.play = false;
      $(".enemy").slice(0).remove();
      clearInterval(meme.generateEnemies);
      clearInterval(meme.refreshing);
    }
  }, 20);
}

meme.removeEnemy = function(){
  if($(".enemy").length > 1){
    $(".enemy").slice(1).remove();
  }
}

meme.randomSpawn = function(){
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

meme.makeEnemy = function(enemyName){
  $("#playArea").prepend("<div class=enemy id=" + enemyName + "></div>");
  if($("#player").hasClass("doge")){
    $(".enemy").css("background-image", "url(http://i.imgur.com/TL7332I.png)");
  } else {
    $(".enemy").css("background-image", "url(http://i.imgur.com/C68bMyB.png)");
  }
  $(".enemy")
  $("#"+ enemyName).animate({
    "right": "760px"
  }, meme.enemySpeed);
}

meme.addEnemy = function(){
  var randomEnemy = meme.randomSpawn();

  switch(randomEnemy){
    case "$enemy1":
    meme.makeEnemy("enemy1")
    break;
    case "$enemy2":
    meme.makeEnemy("enemy2")
    break;
    case "$enemy3":
    meme.makeEnemy("enemy3")
    break;
    case "$enemy4":
    meme.makeEnemy("enemy4")
    break;
    case "$enemy5":
    meme.makeEnemy("enemy5")
    break;
  }
}

meme.playJumpAudio = function(){
  if($("#player").hasClass("doge")){
    var $audio = $("audio")[0];
  } else {
    var $audio = $("audio")[3];
  }
  $audio.volume = 1;
  $audio.load();
  $audio.play();
}

meme.checkCollision = function(){
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

meme.changeMeme = function(){
  $("button").on("click", function(){
    meme.changePlayer();
    meme.ChangeEnemy();
  })
}

meme.changePlayer = function(){
  if($("#player").hasClass("doge")){
    $("#player").removeClass("doge");
    $("#player").addClass("nyan");
  } else {
    $("#player").removeClass("nyan");
    $("#player").addClass("doge");
  }
}

meme.ChangeEnemy = function(){
  if($(".enemy").hasClass("doge")){
    $(".enemy").css("background-image", "url(http://i.imgur.com/mDQoJ6z.png)")
  } else {
    $(".enemy").css("background-image", "url(http://i.imgur.com/NNF1YFP.png)")
  }
}
