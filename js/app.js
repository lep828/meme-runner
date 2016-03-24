$(function(){
  $("#death").animate({
    "right": "850px"
  }, 5000);


  $("body").on("keypress", function () {
    $("#player").stop().animate({
      bottom: "+=150px"
    }, 400, function () {
      $("#player").animate({
        bottom: "0"
      }, 600);
    })
  })

  var $death = $("#death");
  var $player = $("#player");
  console.log($death.position().left, $player.position().left)




  if($death.position().left === $player.position().left) {
    console.log('now')
    checkCollision($player, $death);
  }
})

function checkCollision(player, death){
  var $scoreDisplay = $("#score");
  var score = 0;

  var dheight = 320 - death.position().top
  var pheight = 320 - player.position().top

  if(pheight < dheight){
    console.log("collision");
    alive = false;
  } else {
    score++;
    $scoreDisplay.html(score);
  }
}