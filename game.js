var userClickedPattern=[];
var gamepattern=[];
var buttonColours=["red","blue","green","yellow"];


var level=0;
var start=false;
$(document).keypress(function(){
    if(start!=true){       
    $("#level-title").text("Level:"+level);
    nextsequence();
    start=true;
    }        
});


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextsequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level:"+level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamepattern[currentLevel]=== userClickedPattern[currentLevel]){
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){
            nextsequence();
            },1000);
        }
    }else{
        $("#level-title").text("Press any Key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },2000);
       
        startOver();
    }
}

function startOver(){
    level=0;
    gamepattern=[];
    start=false;
    $("#level-title").text("Press any Key to start");
}




