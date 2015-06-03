$(document).ready(function() {


  var possibleWords = ("jazz rhythm blob mouse moose qwerty quoth word wyvern " +
  "rigged tune town twofold yggdrasil yucky urgent spleen ultra iodine itchy " +
  "octopus ominous pencil porcupine aardvark apple sultan sung down derp duffle " +
  "fungus friend future ghost geist geese goose hungry hugged huge jax juke "+
  "lump loose kingdoms knotted kneesock zero zeus zebra cowboy xenophobia " +
  "axalotle buxomly coexist xenon dewaxed klaxons xenopus vexed agenized " +
  "vulture ventriloquism belittle bemuse nimble neche mulch mystify ghastly " +
  "kilt your york spork corvette communique plebiscite rapprochement mince" +
  "impressionism facade balustrade terrace casserole confit mustard mayonnaise " +
  "caramel custard fondant fondue marmalade meringue mauve appeasement beige " +
  "carmine maroon violet vermilion turquoise").split(" ");


  var word = possibleWords[Math.floor(Math.random() * (possibleWords.length + 1))];
  //console.log("the word is not " + word); //for troubleshooting

  var lettersUsed = [];

  var shownWord = function(){
    return word.split("").map(function(letter){
      return (lettersUsed.indexOf(letter) > -1) ? letter : "_";
    });
  };

  var printWord = function(){
    $("#word").text(shownWord().join(" "));
  };

  var blinkScreen = function(){
    $("body").fadeOut(100).fadeIn(100);
  };


  var endGame = function(message){
    $("div").animate({
        width: ['toggle', 'swing']
    });

    $("#end").text(message);
    $("#sub-end").text("Would you like to play again? (y/n)");

    $("div").animate({
        width: ['toggle', 'swing']
    });
    $("html").keypress(function(key) {
      key = String.fromCharCode(key.which);

      if (key === "y") {
        location.reload(true);;
      } else {
        $("#end").text("'y' not?");
      }
    });
  };

  var win = function(condition){
    return endGame("You win!");
  };

  var lose = function(){
    blinkScreen();
    endGame("Sorry, you lost.");
    blinkScreen();
  };

  var tryLetter = function(letter){
    return word.split("").indexOf(letter) > -1 ? false : true;
  };

  var letterTyped = function(letter){
    acceptableChars = "abcdefghijklmnopqrstuvwxyz".split("");

    if (lettersUsed.indexOf(letter) > -1 || acceptableChars.indexOf(letter) < 0) {
      blinkScreen();
      return false;
    } else {
      lettersUsed.push(letter);
      return tryLetter(letter);
    }
  };


  var initialize = function(){
    difficulty = 0;

    printWord();

    for (var i = 0; i <= difficulty; i++){
      hang(i);
    }

    var idx = difficulty + 1;

    $("html").keypress(function(key) {
      key = String.fromCharCode(key.which);

      if (idx === 9){
        hang(idx);
        return lose();
      }
      else if (letterTyped(key)){
        hang(idx);
        idx++;
      }
      else if (word === shownWord().join("")) {
        printWord();
        return win();
      }
      else {
        printWord();
      }
    });
  };

  var hang = function(lineNumber) {
    var canvas = document.getElementById("hangman");
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');

      if (lineNumber === 0){
        ctx.strokeStyle = "rgb(200,0,0)";
        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.lineTo(0,100);
        ctx.stroke();
      } else if (lineNumber === 1) {
        ctx.lineTo(0,0);
        ctx.stroke();
      } else if (lineNumber === 2) {
        ctx.lineTo(50,0);
        ctx.stroke();
      } else if (lineNumber === 3) {
        ctx.lineTo(50,15);
        ctx.stroke();
      } else if (lineNumber === 4) {
        ctx.arcTo(20, 5, 20, 30, 20);
        ctx.stroke();
      } else if (lineNumber === 5) {
        ctx.quadraticCurveTo(40,50,20,75);
        ctx.stroke();
      } else if (lineNumber === 6) {
        ctx.bezierCurveTo(76,100,40,62.5, 50, 50);
        ctx.stroke();
      } else if (lineNumber === 7) {
        ctx.bezierCurveTo(100,150,70,10, 75, 75);
        ctx.stroke();
      } else if (lineNumber === 8) {
        ctx.bezierCurveTo(100,10,20,70, 50, 15);
        ctx.stroke();
      } else if (lineNumber === 9) {
        ctx.moveTo(40,25);
        ctx.fillStyle = "rgb(200,0,170)";
        ctx.fill();
      }
    }
  };
  initialize();

});
