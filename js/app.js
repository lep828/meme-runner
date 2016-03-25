$(function(){
  var $scoreDisplay = $("#score");
  var score = 0;
  var $death = $("#death");

  bindEvents();

  setInterval(function(){
    $death = $("#death");
    $death.each(function(){
      checkCollision($death)
    })
    score++;
    $scoreDisplay.html(score);
  }, 50);

  // $("#playArea").on("load", "#death", function(){
  //   $("#death").parent().prepend($("#death").clone());
  // })
  
  $("#death").animate({
    "right": "850px"
  }, 3000);

  setInterval(function(){
      // var enemy = new createEnemy($death.offset().left, $death.offset().top, 40, 80)
      $("#death").parent().prepend($("#death").clone().css("right", "0"))
      createEnemy($death.offset().left, $death.offset.top, 40, 40)
    }, 3000)
})

// $("main").on("onload", "#death", function(){
//   $(this).parent().prepend($(this).clone());
// })

function bindEvents(){

  if($("#player").position().top === 0){
    $("#player").stop()
  } else {
    $("body").on("keyup", function () {
      $("#player").stop().animate({
        bottom: "+=150px"
      }, 400, function () {
        $("#player").animate({
          bottom: "0"
        }, 600);
      })
    })
  }
}

function createEnemy(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height; 

  $("#death").animate({
    "right": "850px"
  }, 2500);
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
    console.log('boom')
  }
}


