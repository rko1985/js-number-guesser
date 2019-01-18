/*
GAME FUNCTION
-play must guess a number between a min and max
-player gets a certain amount of guesses
-notify player of guesses remaining
-notify player of the correct answer if lose
-let player play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}` , 'red');
    }

    //Check if won
    if(guess === winningNum){
        // Game over ,you won
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over ,you lost

           gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);

        } else {
            // Game continues - answer wrong

            //Clear input
            guessInput.value = '';
            //Tell user it's the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
})

//game over
function gameOver(won, msg){
    let color;

    won === true ? color = 'green' : color = 'red'
     //disable input
     guessInput.disabled = true;
     //set text color
     message.style.color = color;
     //change border color
     guessInput.style.borderColor = color;
     //set message
     setMessage(msg);

     //play again?
     guessBtn.value = 'Play again';
     guessBtn.className += 'play-again';
}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1 ) + min);
}

//set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}