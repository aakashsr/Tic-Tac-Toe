const startButton = document.getElementsByClassName('button')[0];
const newGameButton = document.getElementsByClassName('button')[1];
const board = document.getElementsByClassName('board')[0];
const startScreen = document.getElementById('start');
const finishScreen = document.getElementById('finish');
const finishMessage = finishScreen.querySelector('.message');
const header = startScreen.querySelector('header');
const title = startScreen.querySelector('h1');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const boxes = document.querySelector('.boxes');
const box = document.querySelectorAll('.box');
const playersLi = document.querySelectorAll('.players')[0];
playersLi.style.textAlign = 'center';
var count = 0;


// Making array list of all the boxes
const listToArray = Array.from(box);

// Initially hide the finish screen
finishScreen.style.display = 'none';


//function to hide the players 'li' in start or finish screen
function hidePlayers() {
    player1.style.display = 'none';
    player2.style.display = 'none';
}
//function to show the players 'li' in start or finish screen
function showPlayers() {
    player1.style.display = 'block';
    player2.style.display = 'block';
}
// hide the players initially
hidePlayers()

// hide the scrolling part of start screen
startScreen.style.overflow = 'hidden';


function createInputElement() {
    const div = document.createElement('div');
    div.className = 'nameDiv';
    div.style.width = "60%";
    div.style.marginLeft = 'auto';
    div.style.marginRight = 'auto';
    const label = document.createElement('label');
    label.className = 'nameLabel'
    label.textContent = "Please enter your name:";
    label.style.fontSize = '1.5em';
    label.style.marginTop = '1.95em';
    label.style.marginBottom = '1.25em';
    label.style.color = '#fff';
    label.style.display = 'block';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'nameInput';
    nameInput.style.borderRadius = '4px';
    nameInput.style.border = 'none';
    nameInput.style.textIndent = '12px';
    nameInput.style.lineHeight = '2em';
    nameInput.style.color = '#54D17A';
    nameInput.style.fontSize = '1em';
    nameInput.style.marginBottom = '2em';
    div.appendChild(label);
    div.appendChild(nameInput);
    header.insertBefore(div, startButton);
}
createInputElement();

const nameDiv = document.getElementsByClassName('nameDiv')[0];
const nameLabel = document.getElementsByClassName('nameLabel')[0];
const nameInput = document.getElementsByClassName('nameInput')[0];

// function to check if the name field is not empty
function checkNameInput() {
    if (nameInput.value === "") {
        nameInput.placeholder = '*Your name required';
    }
}

// setting event listener on start button , as soon as game is started , 
// disappear the start screen , show both player <li> and activate player 1 by adding class 'active' 
startButton.addEventListener('click', (event) => {
    checkNameInput();
    if (nameInput.value !== "") {
        startScreen.style.display = 'none';
        showPlayers();
        player1.classList.add('active');
        // placing the player's name on the board
        nameElement();
    }
});

// setting event listener of newGame button after any of the player has won the game
newGameButton.addEventListener('click', (event) => {
    finishScreen.style.display = 'none';
    startScreen.style.display = 'none';
    boxes.style.display = 'block';
    // Removing the added classes which got added once a player wins or match tied
    // from the finish screen and starting a new game
    finishScreen.classList.remove('screen-win-one');
    finishScreen.classList.remove('screen-win-two');
    finishScreen.classList.remove('screen-win-tie');
    clearTheBoard();
});

boxes.addEventListener('mouseover', (e) => {
    // when mouseover event occurs over any of the box , show the background image as per current active player
    if (player1.classList.contains('active')) {
        e.target.style.backgroundImage = "url('img/o.svg')";
    }
    if (player2.classList.contains('active')) {
        e.target.style.backgroundImage = "url('img/x.svg')";
    }

    // disable the pointer if the box has been filled already
    if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
        e.target.style.pointerEvents = 'none';
    }
});

// remove the bg image form a box when user remove his mouse from particular box
boxes.addEventListener('mouseout', (e) => {
    e.target.style.backgroundImage = "";
});

boxes.addEventListener('click', (e) => {
    // after clicking a box , using "callback" to add "active" class to opposite player <li>because we want to change
    // the classname some seconds after the box has been filled with current player bg-image otherwise , if class change first then box will be filled with opposite player bg-image
    setTimeout(changePlayer, 50);
    // when user click on a box , fill the box with color as per current active player
    if (player1.classList.contains('active')) {
        e.target.classList.add('box-filled-1');
        count += 1;
    }
    // checking if the match was tie
    ifPlayerOneWin();
    ifTie();
    setTimeout(computerMove, 400);
});

function nameElement() {
    const yourName = document.createElement('span');
    const rivalName = document.createElement('span');
    yourName.style.display = 'block';
    yourName.style.paddingTop = '.25em';
    rivalName.style.paddingTop = '.25em';
    rivalName.style.display = 'block';
    yourName.style.color = '#222';
    rivalName.style.color = '#222';
    yourName.textContent = nameInput.value;
    rivalName.textContent = "Computer";
    player1.appendChild(yourName);
    player2.appendChild(rivalName);
}

// adding 'active' class to both the players alternatively on each 'click' event over the box
function changePlayer() {
    if (player1.classList.contains('active')) {
        player1.classList.remove('active');
        player2.classList.add('active');
    }
}

function playerTwoToOne() {
    player2.classList.remove('active');
    player1.classList.add('active');
}

function isNotFilled(num) {
    if (listToArray[num].classList.contains('box-filled-1') ||
        listToArray[num].classList.contains('box-filled-2')) {
        return true;
    } else {
        return false;
    }
}

function checkWinner(index) {
    listToArray[index].classList.add('box-filled-2');
    ifTie();
    ifPlayerTwoWin();
    count += 1;
    playerTwoToOne();
}

function checkIfFirstPlayerWin(sub) {
    listToArray[sub].classList.add('box-filled-2');
    ifTie();
    ifPlayerOneWin();
    count += 1;
    playerTwoToOne();
}

function computerMove() {
    if (firstPlayerWin()) {
        playerWins();
    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[1].classList.contains('box-filled-2') &&
        isNotFilled(2) === false) {
        checkWinner(2);
        console.log(1);

    } else if (listToArray[3].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        isNotFilled(5) === false) {
        checkWinner(5);
        console.log(2);

    } else if (listToArray[6].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-2') &&
        isNotFilled(8) === false) {
        checkWinner(8);
        console.log(3);

    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[3].classList.contains('box-filled-2') &&
        isNotFilled(6) === false) {
        checkWinner(6);
        console.log(4);

    } else if (listToArray[1].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        isNotFilled(7) === false) {
        checkWinner(7);
        console.log(5);

    } else if (listToArray[2].classList.contains('box-filled-2') &&
        listToArray[5].classList.contains('box-filled-2') &&
        isNotFilled(8) === false) {
        checkWinner(8);
        console.log(6);

    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        isNotFilled(8) === false) {
        checkWinner(8);
        console.log(7);

    } else if (listToArray[2].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        isNotFilled(6) === false) {
        checkWinner(6);
        console.log(8);

    } else if (listToArray[1].classList.contains('box-filled-2') &&
        listToArray[2].classList.contains('box-filled-2') &&
        isNotFilled(0) === false) {
        checkWinner(0);
        console.log(9);

    } else if (listToArray[5].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        isNotFilled(3) === false) {
        checkWinner(3);
        console.log(10);

    } else if (listToArray[8].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-2') &&
        isNotFilled(6) === false) {
        checkWinner(6);
        console.log(11);

    } else if (listToArray[3].classList.contains('box-filled-2') &&
        listToArray[6].classList.contains('box-filled-2') &&
        isNotFilled(0) === false) {
        checkWinner(0);
        console.log(12);

    } else if (listToArray[4].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-2') &&
        isNotFilled(1) === false) {
        checkWinner(1);
        console.log(13);

    } else if (listToArray[5].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') &&
        isNotFilled(2) === false) {
        checkWinner(2);
        console.log(14);

    } else if (listToArray[4].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') &&
        isNotFilled(0) === false) {
        checkWinner(0);
        console.log(15);

    } else if (listToArray[6].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        isNotFilled(2) === false) {
        checkWinner(2);
        console.log(16);

    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[2].classList.contains('box-filled-2') &&
        isNotFilled(1) === false) {
        checkWinner(1);

    } else if (listToArray[3].classList.contains('box-filled-2') &&
        listToArray[5].classList.contains('box-filled-2') &&
        isNotFilled(4) === false) {
        checkWinner(4);

    } else if (listToArray[6].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') &&
        isNotFilled(7) === false) {
        checkWinner(8);

    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[6].classList.contains('box-filled-2') &&
        isNotFilled(3) === false) {
        checkWinner(3);

    } else if (listToArray[1].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-2') &&
        isNotFilled(4) === false) {
        checkWinner(4);

    } else if (listToArray[2].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') &&
        isNotFilled(5) === false) {
        checkWinner(5);

    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') &&
        isNotFilled(4) === false) {
        checkWinner(4);

    } else if (listToArray[2].classList.contains('box-filled-2') &&
        listToArray[6].classList.contains('box-filled-2') &&
        isNotFilled(4) === false) {
        checkWinner(4);

    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[1].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfFirstPlayerWin(2);

    } else if (listToArray[3].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(5) === false) {
        checkIfFirstPlayerWin(5);

    } else if (listToArray[6].classList.contains('box-filled-1') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(8) === false) {
        checkIfFirstPlayerWin(8);

    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[3].classList.contains('box-filled-1') &&
        isNotFilled(6) === false) {
        checkIfFirstPlayerWin(6);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(7) === false) {
        checkIfFirstPlayerWin(7);

    } else if (listToArray[2].classList.contains('box-filled-1') &&
        listToArray[5].classList.contains('box-filled-1') &&
        isNotFilled(8) === false) {
        checkIfFirstPlayerWin(8);

    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(8) === false) {
        checkIfFirstPlayerWin(8);

    } else if (listToArray[2].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(6) === false) {
        checkIfFirstPlayerWin(6);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        listToArray[2].classList.contains('box-filled-1') &&
        isNotFilled(0) === false) {
        checkIfFirstPlayerWin(0);

    } else if (listToArray[5].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(3) === false) {
        checkIfFirstPlayerWin(3);

    } else if (listToArray[8].classList.contains('box-filled-1') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(6) === false) {
        checkIfFirstPlayerWin(6);

    } else if (listToArray[3].classList.contains('box-filled-1') &&
        listToArray[6].classList.contains('box-filled-1') &&
        isNotFilled(0) === false) {
        checkIfFirstPlayerWin(0);

    } else if (listToArray[4].classList.contains('box-filled-1') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(1) === false) {
        checkIfFirstPlayerWin(1);

    } else if (listToArray[5].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfFirstPlayerWin(2);

    } else if (listToArray[4].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(0) === false) {
        checkIfFirstPlayerWin(0);

    } else if (listToArray[6].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfFirstPlayerWin(2);

    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[2].classList.contains('box-filled-1') &&
        isNotFilled(1) === false) {
        checkIfFirstPlayerWin(1);

    } else if (listToArray[3].classList.contains('box-filled-1') &&
        listToArray[5].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfFirstPlayerWin(4);

    } else if (listToArray[6].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(7) === false) {
        checkIfFirstPlayerWin(7);

    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[6].classList.contains('box-filled-1') &&
        isNotFilled(3) === false) {
        checkIfFirstPlayerWin(3);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfFirstPlayerWin(4);

    } else if (listToArray[2].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(5) === false) {
        checkIfFirstPlayerWin(5);

    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfFirstPlayerWin(4);

    } else if (listToArray[2].classList.contains('box-filled-1') &&
        listToArray[6].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfFirstPlayerWin(4);

        // Miscellenous cases : If player puts 0 in the middle of the box , put the cross in the first block
    } else if (listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(0) === false) {
        checkIfFirstPlayerWin(0);
        // Now if the player 1 puts the 0 in the last box , put the cross in the third box within the row.Rest
        // of the cases will be handled by the previous algo
    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfFirstPlayerWin(2);
        // if the player 1 , put the 0 in the first block at first , put the cross in the middle box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfFirstPlayerWin(4);
        // now if the player moves forward and put the 0 in the sixth box , put the 'X' in the third box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[5].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfFirstPlayerWin(2);
        // or if player put the '0' in the last box , put the 'X' in the second box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(1) === false) {
        checkIfFirstPlayerWin(1);
        // or if player put the '0' in the 7th box , put the 'X' in the 5th box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(5) === false) {
        checkIfFirstPlayerWin(5);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfFirstPlayerWin(2);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        listToArray[2].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfFirstPlayerWin(4);

    } else {
        randomCase();
        console.log("This is else statement");
    }
}

function randomCase() {
    var x = Math.floor(Math.random() * 9);
    console.log(x);
    if (isNotFilled(x) === false) {
        listToArray[x].classList.add('box-filled-2');
        count += 1;
        playerTwoToOne();
    } else {
        while (isNotFilled(x) === true && count !== 9) {
            x = Math.floor(Math.random() * 9);
            console.log(x);
        }
        listToArray[x].classList.add('box-filled-2');
        count += 1;
        playerTwoToOne();
    }
}

function firstPlayerWin() {
    if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[1].classList.contains('box-filled-1') &&
        listToArray[2].classList.contains('box-filled-1') ||

        listToArray[3].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        listToArray[5].classList.contains('box-filled-1') ||

        listToArray[6].classList.contains('box-filled-1') &&
        listToArray[7].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') ||

        listToArray[0].classList.contains('box-filled-1') &&
        listToArray[3].classList.contains('box-filled-1') &&
        listToArray[6].classList.contains('box-filled-1') ||

        listToArray[1].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        listToArray[7].classList.contains('box-filled-1') ||

        listToArray[2].classList.contains('box-filled-1') &&
        listToArray[5].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') ||

        listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') ||

        listToArray[2].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-1') &&
        listToArray[6].classList.contains('box-filled-1')
    ) {
        return true;
    }
}

function ifPlayerOneWin() {
    if (firstPlayerWin() === true) {
        playerWins();
    }
}

function playerWins() {
    boxes.style.display = 'none';
    finishScreen.classList.add('screen-win-one');
    finishMessage.textContent = "Winner: " + nameInput.value;
    finishScreen.style.display = 'block';
}
// function to delay the move of computer a few seconds so that player and computer move don't get overlapped
function ifPlayerTwoWin() {
    if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[1].classList.contains('box-filled-2') &&
        listToArray[2].classList.contains('box-filled-2') ||

        listToArray[3].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[5].classList.contains('box-filled-2') ||

        listToArray[6].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') ||

        listToArray[0].classList.contains('box-filled-2') &&
        listToArray[3].classList.contains('box-filled-2') &&
        listToArray[6].classList.contains('box-filled-2') ||

        listToArray[1].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-2') ||

        listToArray[2].classList.contains('box-filled-2') &&
        listToArray[5].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') ||

        listToArray[0].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-2') ||

        listToArray[2].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[6].classList.contains('box-filled-2')
    ) {
        setTimeout(computerWins, 700);
    }
}

//function to check if the computer wins
function computerWins() {
    boxes.style.display = 'none';
    finishScreen.classList.add('screen-win-two');
    finishMessage.textContent = "Winner: Computer";
    finishScreen.style.display = 'block';
    return true;
}

// function to check if the match wa tie
function ifTie() {
    if (count === 9 && !ifPlayerOneWin() && !ifPlayerTwoWin()) {
        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-tie');
        finishMessage.textContent = "It's a tie";
        finishScreen.style.display = 'block';
        return true;
    }
}

// if the game restarts , start with a new board 
function clearTheBoard() {
    // Once game restart again , reset the counter 
    count = 0;
    for (let i = 0; i < listToArray.length; i++) {
        if (listToArray[i].classList.contains('box-filled-1')) {
            listToArray[i].classList.remove('box-filled-1');
            // Renable the pointer once the game restart
            listToArray[i].style.pointerEvents = 'auto';
        }
        if (listToArray[i].classList.contains('box-filled-2')) {
            listToArray[i].classList.remove('box-filled-2');
            listToArray[i].style.pointerEvents = 'auto';
        }
    }
    player1.classList.add('active');
    player2.classList.remove('active');
}

// make the input element focussed initially
nameInput.focus();

// function to remove the input field and greeting the player on the start screen
function saveName() {
    const span = document.createElement('span');
    span.textContent = "Hey " + nameInput.value + ",let's begin";
    span.className = 'nameSpan';
    span.style.display = 'block';
    span.style.color = '#fff';
    span.style.margin = '2em';
    span.style.fontSize = '1.5em';
    header.insertBefore(span, nameDiv);
    header.removeChild(nameDiv);
}

// calling the above function on pressing 'ENTER' key
header.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        saveName();
    }
});