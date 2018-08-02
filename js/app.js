const startButton = document.getElementsByClassName('button')[0];
const newGameButton = document.getElementsByClassName('button')[1];
const startScreen = document.getElementById('start');
const finishScreen = document.getElementById('finish');
const finishMessage = finishScreen.querySelector('.message');
const header = startScreen.querySelector('header');
const title = startScreen.querySelector('h1');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const boxes = document.querySelector('.boxes');
const box = document.querySelectorAll('.box');
const firstBox = boxes.querySelectorAll('li')[0];
const secondBox = boxes.querySelectorAll('li')[1]
const thirdBox = boxes.querySelectorAll('li')[2]
const fourthBox = boxes.querySelectorAll('li')[3]
const fifthBox = boxes.querySelectorAll('li')[4]
const sixthBox = boxes.querySelectorAll('li')[5]
const seventhBox = boxes.querySelectorAll('li')[6]
const eighthBox = boxes.querySelectorAll('li')[7]
const ninthBox = boxes.querySelectorAll('li')[8]
var count = 0;

// Initially hide the finish screen
finishScreen.style.display = 'none';
// Initially hide the players <li>
player1.style.display = 'none';
player2.style.display = 'none';
startScreen.style.overflow = 'hidden';

// setting event listener of newGame button after any of the player has won the game
newGameButton.addEventListener('click', (event) => {
    finishScreen.style.display = 'none';
    boxes.style.display = 'block';
    startScreen.style.display = 'none';
    window.location.reload();
    startScreen.style.display = 'none';
});
// setting event listener on start button , as soon as game is started , 
// disappear the start screen , show both player <li> and activate player 1 by adding class 'active' 
startButton.addEventListener('click', (event) => {
    startScreen.style.display = 'none';
    player1.style.display = 'block';
player2.style.display = 'block';
    player1.classList.add('active');
});


boxes.addEventListener('mouseover', (e) => {
// when mouseover event occurs over any of the box , show the background image as per current active player
    if (player1.className === 'players active') {
        e.target.style.backgroundImage = "url('img/o.svg')";
    }
    if (player2.className === 'players active') {
        e.target.style.backgroundImage = "url('img/x.svg')";
    }
// disable the pointer if the box has been filled already
    if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
        e.target.style.pointerEvents = 'none';
    }
});
// remove the bg image form a box as user remove his mouse from that particular box
boxes.addEventListener('mouseout', (e) => {
    e.target.style.backgroundImage = "";
});

boxes.addEventListener('click', (e) => {
    // after clicking a box , using callback to add "active" class to opposite player <li>
    // because we want to change the classname some seconds after the box has been filled with current player bg-image
    // otherwise , if class change first then box will be filled with opposite player bg-image
    setTimeout(checkPlayerActiv, 50);
// when user click on a box , fill the box with color as per current active player
    if (player1.classList.contains('active')) {
        e.target.classList.add('box-filled-1');
        count += 1;
        console.log(count);

    }
    if (player2.classList.contains('active')) {
        e.target.classList.add('box-filled-2');
        count += 1;
        console.log(count);
    }

    // checking if the match was tie
    ifTie();

    // checking if player 1 win
    ifPlayerOneWin();
    // checking if player 2 win
    ifPlayerTwoWin();

});


// adding 'active' class to both the players alternatively on each 'click' event over the box
function checkPlayerActiv() {
    if (player1.classList.contains('active')) {
        player1.classList.remove('active');
        player2.classList.add('active');
    } else {
        player2.classList.remove('active');
        player1.classList.add('active');
    }
}


function ifPlayerOneWin() {
    if (firstBox.classList.contains('box-filled-1') &&
        secondBox.classList.contains('box-filled-1') &&
        thirdBox.classList.contains('box-filled-1') ||

        fourthBox.classList.contains('box-filled-1') &&
        fifthBox.classList.contains('box-filled-1') &&
        sixthBox.classList.contains('box-filled-1') ||

        seventhBox.classList.contains('box-filled-1') &&
        eighthBox.classList.contains('box-filled-1') &&
        ninthBox.classList.contains('box-filled-1') ||

        firstBox.classList.contains('box-filled-1') &&
        fourthBox.classList.contains('box-filled-1') &&
        seventhBox.classList.contains('box-filled-1') ||

        secondBox.classList.contains('box-filled-1') &&
        fifthBox.classList.contains('box-filled-1') &&
        eighthBox.classList.contains('box-filled-1') ||

        thirdBox.classList.contains('box-filled-1') &&
        sixthBox.classList.contains('box-filled-1') &&
        ninthBox.classList.contains('box-filled-1') ||

        firstBox.classList.contains('box-filled-1') &&
        fifthBox.classList.contains('box-filled-1') &&
        ninthBox.classList.contains('box-filled-1') ||

        thirdBox.classList.contains('box-filled-1') &&
        fifthBox.classList.contains('box-filled-1') &&
        seventhBox.classList.contains('box-filled-1')
    ) {

        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-one');
        finishMessage.textContent = "Winner";
        finishScreen.style.display = 'block';
        return true;
    }
}

function ifPlayerTwoWin() {
    if (firstBox.classList.contains('box-filled-2') &&
        secondBox.classList.contains('box-filled-2') &&
        thirdBox.classList.contains('box-filled-2') ||

        fourthBox.classList.contains('box-filled-2') &&
        fifthBox.classList.contains('box-filled-2') &&
        sixthBox.classList.contains('box-filled-2') ||

        seventhBox.classList.contains('box-filled-2') &&
        eighthBox.classList.contains('box-filled-2') &&
        ninthBox.classList.contains('box-filled-2') ||

        firstBox.classList.contains('box-filled-2') &&
        fourthBox.classList.contains('box-filled-2') &&
        seventhBox.classList.contains('box-filled-2') ||

        secondBox.classList.contains('box-filled-2') &&
        fifthBox.classList.contains('box-filled-2') &&
        eighthBox.classList.contains('box-filled-2') ||

        thirdBox.classList.contains('box-filled-2') &&
        sixthBox.classList.contains('box-filled-2') &&
        ninthBox.classList.contains('box-filled-2') ||

        firstBox.classList.contains('box-filled-2') &&
        fifthBox.classList.contains('box-filled-2') &&
        ninthBox.classList.contains('box-filled-2') ||

        thirdBox.classList.contains('box-filled-2') &&
        fifthBox.classList.contains('box-filled-2') &&
        seventhBox.classList.contains('box-filled-2')
    ) {
        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-two');
        finishMessage.textContent = "Winner";
        finishScreen.style.display = 'block';
        return true;
    }
}

function ifTie() {
    if (count === 9 && !ifPlayerOneWin() && !ifPlayerTwoWin()) {
        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-tie');
        finishMessage.textContent = "It's a Tie";
        finishScreen.style.display = 'block';
        return true;
    }
}

// function clearTheBoard() {
//     // firstBox.className = 'box';
//     // secondBox.className = 'box';
//     // thirdBox.className = 'box';
//     // fourthBox.className = 'box';
//     // fifthBox.className = 'box';
//     // sixthBox.className = 'box';
//     // seventhBox.className = 'box';
//     // eighthBox.className = 'box';
//     // ninthBox.className = 'box';
//     window.location.reload();

// }