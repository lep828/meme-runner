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



  setInterval(function(){
    checkCollision();
  }, 20)



  // if($death.position().left === $player.position().left) {
  //   console.log('now')
  //   checkCollision($player, $death);
  // }
})


function checkCollision() {

  console.log("running")

  var $death = $("#death");
  var $player = $("#player");

  var player = {
    x: $player.offset().left,
    y: $player.offset().top,
    width: 40, 
    height: 40
  }

  var death = {
    x: $death.offset().left,
    y: $death.offset().top,
    width: 40,
    height: 80
  }

  if (player.x < death.x + death.width &&
   player.x + player.width > death.x &&
   player.y < death.y + death.height &&
   player.height + player.y > death.y) {
      // collision detected!
    console.log('boom')
  }
}



// function checkCollision(player, death){
//   var $scoreDisplay = $("#score");
//   var score = 0;

//   var dheight = 320 - death.position().top
//   var pheight = 320 - player.position().top

//   if(pheight < dheight){
//     console.log("collision");
//     alive = false;
//   } else {
//     score++;
//     $scoreDisplay.html(score);
//   }
// }