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
var count = 0;


const listToArray = Array.from(box);
// Initially hide the finish screen
finishScreen.style.display = 'none';
// Initially hide the players <li>
player1.style.display = 'none';
player2.style.display = 'none';
startScreen.style.overflow = 'hidden';


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

// setting event listener on start button , as soon as game is started , 
// disappear the start screen , show both player <li> and activate player 1 by adding class 'active' 
startButton.addEventListener('click', (event) => {
    startScreen.style.display = 'none';
    player1.style.display = 'block';
    player2.style.display = 'block';
    player1.classList.add('active');
    nameElement();
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
    setTimeout(changePlayer, 50);
    // when user click on a box , fill the box with color as per current active player
    if (player1.classList.contains('active')) {
        e.target.classList.add('box-filled-1');
        count += 1;
    }
    if (player2.classList.contains('active')) {
        e.target.classList.add('box-filled-2');
        count += 1;
    }

    // checking if the match was tie
    ifTie();
    // checking if player 1 win
    ifPlayerOneWin();
    // checking if player 2 win
    ifPlayerTwoWin();

});

// adding 'active' class to both the players alternatively on each 'click' event over the box
function changePlayer() {
    if (player1.classList.contains('active')) {
        player1.classList.remove('active');
        player2.classList.add('active');
    } else {
        player2.classList.remove('active');
        player1.classList.add('active');
    }
}


function ifPlayerOneWin() {
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

        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-one');
        finishMessage.textContent = nameInput.value + " is winner";
        finishScreen.style.display = 'block';
        return true;
    }
}


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
        finishMessage.textContent = "It's a tie";
        finishScreen.style.display = 'block';
        return true;
    }
}


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

function createInputElement() {
    const div = document.createElement('div');
    div.className = 'nameDiv';
    div.style.marginTop = '6em';
    div.style.width = "60%";
    div.style.marginLeft = 'auto';
    div.style.marginRight = 'auto';
    const label = document.createElement('label');
    label.className = 'nameLabel'
    label.textContent = "Your Name";
    label.style.fontSize = '1.5em';
    label.style.margin = '1em';
    label.style.color = '#fff';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'nameInput';
    nameInput.style.borderRadius = '4px';
    nameInput.style.border = 'none';
    nameInput.style.textIndent = '12px';
    nameInput.style.lineHeight = '2em';
    nameInput.style.color = '#54D17A';
    nameInput.style.fontSize = '2em';
    nameInput.style.marginLeft = '.95em';
    div.appendChild(label);
    div.appendChild(nameInput);
    header.appendChild(div);
}
createInputElement();

const nameDiv = document.getElementsByClassName('nameDiv')[0];
const nameLabel = document.getElementsByClassName('nameLabel')[0];
const nameInput = document.getElementsByClassName('nameInput')[0];

nameInput.focus();

function saveName() {
    const span = document.createElement('span');
    span.textContent = "Hey " + nameInput.value  + " ,let's begin";
    span.className = 'nameSpan';
    span.style.display = 'block';
    span.style.color = '#fff';
    span.style.margin = '2em';
    span.style.fontSize = '3em';
    header.insertBefore(span, nameDiv);
    header.removeChild(nameDiv);
}

header.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        saveName();
        
    }
});

function nameElement(){
    const yourName = document.createElement('span');
    yourName.style.display = 'block';
    yourName.style.fontSize = '2em';
    yourName.style.marginLeft = '7.75em';
    yourName.style.marginTop = '1.5em';
    yourName.style.color = '#FFA000';
    yourName.textContent = nameInput.value;
    board.insertBefore( yourName , boxes);
}