
var level = 1;
var started = false;

var colorPattern = ['red', 'blue', 'green', 'yellow'];
var userClickedPattern = [];

var gamePattern = [];

$('.btn').click(function(){
  var clickedBtn = $(this).attr('id');

  userClickedPattern.push(clickedBtn);

  console.log(userClickedPattern);

  $(this).addClass('pressed');
  setTimeout(function(){
    $('.btn').removeClass('pressed');
  }, 200);

  var index = userClickedPattern.length - 1;

  playSound(clickedBtn);
  checkAnswer(index);
});

function playSound(name){

  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();

}

function checkAnswer(index){
  if(gamePattern[index] === userClickedPattern[index]){

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
      userClickedPattern = [];
      level++;
    }

  } else{

    $('h1').text('Game Over, Press Any Key To Start Over');

    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 500);

    started = false;
    playSound('wrong');
    startOver();
  }
}

function startOver(){
  level = 1;
  gamePattern = [];
  userClickedPattern = [];

}

$(document).keypress(function(e){
  if (!started){
    nextSequence();
    started = true;

  }
});

function nextSequence(){

  $('h1').text('Level ' + level);

  var randomNum = Math.floor(Math.random() * 4);
  var colorName = colorPattern[randomNum];

  $('#' + colorName).addClass('pressed');
  setTimeout(function(){
    $('#' + colorName).removeClass('pressed');
  }, 200);

  gamePattern.push(colorName);
  playSound(colorName);
}