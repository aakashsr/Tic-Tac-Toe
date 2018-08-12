const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const startScreen = document.getElementById('start');
const header = startScreen.querySelector('header');
const boxes = document.querySelector('.boxes');
const box = document.querySelectorAll('.box');
var count = 0;
const finishScreen = document.getElementById('finish');
const message = finishScreen.querySelector('.message');

//function to create two buttons at the start screen
function createDiv() {
    const divName = document.createElement('div');
    divName.style.display = 'inline-block';
    divName.style.marginTop = '2.5em';
    return divName;
}
// function to create two checkboxes at the start screen
function createCheckbox(idName) {
    const inputName = document.createElement('input');
    inputName.type = 'checkbox';
    inputName.style.margin = '.75em';
    inputName.style.width = '18px';
    inputName.style.height = '18px';
    inputName.id = idName;
    return inputName;
}
// function to create two link at the start screen
function createAnchor(gameType) {
    const anchorName = document.createElement('a');
    anchorName.href = '#';
    anchorName.style.margin = '1em';
    anchorName.textContent = gameType;
    anchorName.className = 'button';
    return anchorName;
}
// Appending the buttons and checkboxes to the header
function gameOptions() {
    const divOne = createDiv();
    divOne.style.paddingLeft = '2em';
    const divTwo = createDiv();
    const checkOne = createCheckbox('firstCheckbox');
    checkOne.style.margin = '0';
    const checkTwo = createCheckbox('secondCheckbox');
    checkTwo.style.margin = '0';
    const anchorOne = createAnchor("Player VS Player");
    const anchorTwo = createAnchor("Player VS Computer");
    divOne.appendChild(checkOne);
    divOne.appendChild(anchorOne);
    divTwo.appendChild(anchorTwo);
    divTwo.appendChild(checkTwo);
    header.appendChild(divOne);
    header.appendChild(divTwo);
}
gameOptions();

// Selecting 'player VS player' button , 'player VS computer' button , 'newGame' button and both checkboxes
const pVsPbutton = document.getElementsByClassName('button')[0];
const pVsCbutton = document.getElementsByClassName('button')[1];
const newGameButton = document.getElementsByClassName('button')[2];
const playerChecked = document.getElementById('firstCheckbox');
const computerChecked = document.getElementById('secondCheckbox');

// Making array list of all the boxes
const listToArray = Array.from(box);

// Initially hide the finish screen
finishScreen.style.display = 'none';

//function to hide the players 'li' in start or finish screen
function hidePlayers() {
    player1.style.display = 'none';
    player2.style.display = 'none';
}
// hide the players initially
hidePlayers();
//function to show the players 'li' in start or finish screen
function showPlayers() {
    player1.style.display = 'block';
    player2.style.display = 'block';
}
//function to create and append 'div', 'input' and 'label' element
function createInputElement() {
    const div = document.createElement('div');
    div.className = 'nameDiv';
    div.style.width = "60%";
    div.style.marginLeft = 'auto';
    div.style.marginRight = 'auto';
    const label = document.createElement('label');
    label.className = 'nameLabel'
    label.textContent = "Please enter your name:";
    label.style.fontSize = '1.25em';
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
    header.appendChild(div);
}
createInputElement();
// Saving the refrence to newly created 'div' , 'label' and 'input' elements
const nameDiv = document.getElementsByClassName('nameDiv')[0];
const nameLabel = document.getElementsByClassName('nameLabel')[0];
const nameInput = document.getElementsByClassName('nameInput')[0];

nameInput.focus(); // Autofocus the name input

// function to check if the name field is not empty
function checkUserInput() {
    if (nameInput.value === "") {
        nameInput.placeholder = '*Your name required';
    }
}

// setting event listener on start button , as soon as game is started , 
// disappear the start screen , show both player <li> and activate player 1 by adding class 'active' 
header.addEventListener('click', (e) => {

    if (e.target.className === 'button') {
        checkUserInput();
        // Making sure to 'hide' start screen and 'display' board screen if and only if userInput is not empty
        if (nameInput.value !== "") {
            startScreen.style.display = 'none';
            showPlayers();
            player1.classList.add('active');
            nameElement();
        }
    }

});
// Initially disabling the pointer events at both the buttons
pVsPbutton.style.pointerEvents = 'none';
pVsCbutton.style.pointerEvents = 'none';
// Making the link active only when checkbox is 'checked'
playerChecked.addEventListener('click', (e) => {
    if (playerChecked.checked) {
        pVsPbutton.style.pointerEvents = 'auto';
        if (nameInput.value !== "") {
            saveName();
        }
    } else {
        pVsPbutton.style.pointerEvents = 'none';
    }
});
computerChecked.addEventListener('click', (e) => {
    if (computerChecked.checked) {
        pVsCbutton.style.pointerEvents = 'auto';
        if (nameInput.value !== "") {
           saveName();
        }
    } else {
        pVsCbutton.style.pointerEvents = 'none';
    }
});

// setting event listener at newGame button after any of the player has won the game or it's been tied
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

function clearTheBoard() {
    // Once game restarts , reset the counter 
    count = 0;
    // Removing the classes 'box-filled-1' or 'box-filled-2' from each of the boxes
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
    // Activating the first player again
    player1.classList.add('active');
    player2.classList.remove('active');
}

// Adding bg image to the boxes , when user hover over them
boxes.addEventListener('mouseover', (e) => {
    if (player1.classList.contains('active')) {
        e.target.style.backgroundImage = "url('img/o.svg')";
    }
    if (playerChecked.checked) {
        if (player2.classList.contains('active')) {
            e.target.style.backgroundImage = "url('img/x.svg')";
        }
    }
    // disabling the pointers already filled boxes
    if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
        e.target.style.pointerEvents = 'none';
    }
});

// remove the bg image form a box when user remove his mouse from particular box
boxes.addEventListener('mouseout', (e) => {
    e.target.style.backgroundImage = "";
});

// ------------------------- Main Control ------------------------- //

// If 'player VS player' checkbox is checked , then let the second player move his chance
// if 'player VS computer' checkbox is checked , make the second player to move automatically
boxes.addEventListener('click', (e) => {

    if (e.target.className === 'box') {
        setTimeout(changePlayer, 50);
        if (player1.classList.contains('active')) {
            e.target.classList.add('box-filled-1');
            count += 1;
        }
        if (playerChecked.checked) {
            if (player2.classList.contains('active')) {
                e.target.classList.add('box-filled-2');
                count += 1;
            }
            ifPlayerOneWin();
            ifPlayerTwoWin();
            checkIfTie();
        }
        // if 'player vs computer' button is checked
        if (computerChecked.checked) {
            setTimeout(computerMove, 700);
            checkIfTie();
        }
    }
});

// Creating name of both the players
function createName(nameValue) {
    const name = document.createElement('span');
    name.style.display = 'block';
    name.style.paddingTop = '.25em';
    name.style.color = '#222';
    name.textContent = nameValue;
    return name;
}
// Appending the name of both the players
function nameElement() {
    const yourName = createName('Aakash');
    const rivalName = createName('Computer');
    player1.appendChild(yourName);
    player2.appendChild(rivalName);
}
//Changing the active state from player 1 to player 2
function changePlayer() {
    if (player1.classList.contains('active')) {
        player1.classList.remove('active');
        player2.classList.add('active');
    } else{
        player2.classList.remove('active');
        player1.classList.add('active');
    }
}

// Changing the active state from player 2 to player 1
function playerTwoToOne() {
    player2.classList.remove('active');
    player1.classList.add('active');
}

function playerOneMatched(num1, num2, num3) {
    return (listToArray[num1].classList.contains('box-filled-1') &&
        listToArray[num2].classList.contains('box-filled-1') &&
        listToArray[num3].classList.contains('box-filled-1'));
}

function playerTwoMatched(num1, num2, num3) {
    return (listToArray[num1].classList.contains('box-filled-2') &&
        listToArray[num2].classList.contains('box-filled-2') &&
        listToArray[num3].classList.contains('box-filled-2'));
}

// Cases where player first can win
function firstPlayerWin() {
    if (
        playerOneMatched(0, 1, 2) ||
        playerOneMatched(3, 4, 5) ||
        playerOneMatched(6, 7, 8) ||
        playerOneMatched(0, 3, 6) ||
        playerOneMatched(1, 4, 7) ||
        playerOneMatched(2, 5, 8) ||
        playerOneMatched(0, 4, 8) ||
        playerOneMatched(2, 4, 6)
    ) {
        return true;
    }
}

function ifPlayerOneWin() {
    if (firstPlayerWin() === true) {
        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-one');
        message.textContent = "Winner: " + nameInput.value;
        finishScreen.style.display = 'block';
    }
}

// Cases where player second can win
function ifPlayerTwoWin() {
    if (
        playerTwoMatched(0, 1, 2) ||
        playerTwoMatched(3, 4, 5) ||
        playerTwoMatched(6, 7, 8) ||
        playerTwoMatched(0, 3, 6) ||
        playerTwoMatched(1, 4, 7) ||
        playerTwoMatched(2, 5, 8) ||
        playerTwoMatched(0, 4, 8) ||
        playerTwoMatched(2, 4, 6)
    ) {
        if (playerChecked.checked) {
            playerTwoWins();
        }
        if (computerChecked.checked) {
            setTimeout(playerTwoWins, 400);
        }
        return true;
    }
}
// function to display the winning screen of player two
function playerTwoWins() {
    boxes.style.display = 'none';
    finishScreen.classList.add('screen-win-two');
    message.textContent = "Winner: Computer";
    finishScreen.style.display = 'block';
}
// function to display the winning screen of tie match
function checkIfTie() {
    if (count === 9 && !firstPlayerWin() && !ifPlayerTwoWin()) {
        boxes.style.display = 'none';
        finishScreen.classList.add('screen-win-tie');
        message.textContent = "It's a tie";
        finishScreen.style.display = 'block';
    }
}
// function to check whether the box with provied index number is empty or not
function isNotFilled(num) {
    if (listToArray[num].classList.contains('box-filled-1') ||
        listToArray[num].classList.contains('box-filled-2')) {
        return true;
    } else {
        return false;
    }
}

// function to add 'box-filled-2' class to a new box and check it player two wins the game
function checkIfSecondPlayerWin(index) {
    listToArray[index].classList.add('box-filled-2');
    checkIfTie();
    ifPlayerTwoWin();
    count += 1;
    playerTwoToOne();
}

// function to add 'box-filled-2' class to a new box to prevent player one from winning
function checkIfFirstPlayerWin(sub) {
    listToArray[sub].classList.add('box-filled-2');
    checkIfTie();
    ifPlayerOneWin();
    count += 1;
    playerTwoToOne();
}
// function to check "if two boxes with index 'num1' and 'num2' are filled with 'box-filled-2' class then check if the 
// next box with index 'num3' is empty or not . If empty , return 'true' "
function winGame(num1, num2, num3) {
    if (listToArray[num1].classList.contains('box-filled-2') &&
        listToArray[num2].classList.contains('box-filled-2') &&
        isNotFilled(num3) === false) {
        return true;
    }
}
// function to check "if two boxes with index 'num1' and 'num2' are filled with 'box-filled-1' class then check if the 
// next box with index 'num3' is empty or not . If empty , return 'true' "
function saveGame(num1, num2, num3) {
    if (listToArray[num1].classList.contains('box-filled-1') &&
        listToArray[num2].classList.contains('box-filled-1') &&
        isNotFilled(num3) === false) {
        return true;
    }
}
// Funciton to predict the move of AI
function computerMove() {
    if (firstPlayerWin()) {
        ifPlayerOneWin();
    } else if (winGame(0, 1, 2)) {
        checkIfSecondPlayerWin(2);

    } else if (winGame(3, 4, 5)) {
        checkIfSecondPlayerWin(5);

    } else if (winGame(6, 7, 8)) {
        checkIfSecondPlayerWin(8);

    } else if (winGame(0, 3, 6)) {
        checkIfSecondPlayerWin(6);

    } else if (winGame(1, 4, 7)) {
        checkIfSecondPlayerWin(7);

    } else if (winGame(2, 5, 8)) {
        checkIfSecondPlayerWin(8);

    } else if (winGame(0, 4, 8)) {
        checkIfSecondPlayerWin(8);

    } else if (winGame(2, 4, 6)) {
        checkIfSecondPlayerWin(6);

    } else if (winGame(1, 2, 0)) {
        checkIfSecondPlayerWin(0);

    } else if (winGame(5, 4, 3)) {
        checkIfSecondPlayerWin(3);

    } else if (winGame(8, 7, 6)) {
        checkIfSecondPlayerWin(6);

    } else if (winGame(3, 6, 0)) {
        checkIfSecondPlayerWin(0);

    } else if (winGame(4, 7, 1)) {
        checkIfSecondPlayerWin(1);

    } else if (winGame(5, 8, 2)) {
        checkIfSecondPlayerWin(2);

    } else if (winGame(4, 8, 0)) {
        checkIfSecondPlayerWin(0);

    } else if (winGame(6, 4, 2)) {
        checkIfSecondPlayerWin(2);

    } else if (winGame(0, 2, 1)) {
        checkIfSecondPlayerWin(1);

    } else if (winGame(3, 5, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (winGame(6, 8, 7)) {
        checkIfSecondPlayerWin(7);

    } else if (winGame(0, 6, 3)) {
        checkIfSecondPlayerWin(3);

    } else if (winGame(1, 7, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (winGame(2, 8, 5)) {
        checkIfSecondPlayerWin(5);

    } else if (winGame(0, 8, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (winGame(2, 6, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (saveGame(0, 1, 2)) {
        checkIfSecondPlayerWin(2);

    } else if (saveGame(3, 4, 5)) {
        checkIfSecondPlayerWin(5);

    } else if (saveGame(6, 7, 8)) {
        checkIfSecondPlayerWin(8);

    } else if (saveGame(0, 3, 6)) {
        checkIfSecondPlayerWin(6);

    } else if (saveGame(1, 4, 7)) {
        checkIfSecondPlayerWin(7);

    } else if (saveGame(2, 5, 8)) {
        checkIfSecondPlayerWin(8);

    } else if (saveGame(0, 4, 8)) {
        checkIfSecondPlayerWin(8);

    } else if (saveGame(2, 4, 6)) {
        checkIfSecondPlayerWin(6);

    } else if (saveGame(1, 2, 0)) {
        checkIfSecondPlayerWin(0);

    } else if (saveGame(5, 4, 3)) {
        checkIfSecondPlayerWin(3);

    } else if (saveGame(8, 7, 6)) {
        checkIfSecondPlayerWin(6);

    } else if (saveGame(3, 6, 0)) {
        checkIfSecondPlayerWin(0);

    } else if (saveGame(4, 7, 1)) {
        checkIfSecondPlayerWin(1);

    } else if (saveGame(5, 8, 2)) {
        checkIfSecondPlayerWin(2);

    } else if (saveGame(4, 8, 0)) {
        checkIfSecondPlayerWin(0);

    } else if (saveGame(6, 4, 2)) {
        checkIfSecondPlayerWin(2);

    } else if (saveGame(0, 2, 1)) {
        checkIfSecondPlayerWin(1);

    } else if (saveGame(3, 5, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (saveGame(6, 8, 7)) {
        checkIfSecondPlayerWin(8);

    } else if (saveGame(0, 6, 3)) {
        checkIfSecondPlayerWin(3);

    } else if (saveGame(1, 7, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (saveGame(2, 8, 5)) {
        checkIfSecondPlayerWin(5);

    } else if (saveGame(0, 8, 4)) {
        checkIfSecondPlayerWin(4);

    } else if (saveGame(2, 6, 4)) {
        checkIfSecondPlayerWin(4);
        // Miscellenous cases : If player puts 0 in the middle of the box , put the cross in the first block
    } else if (listToArray[4].classList.contains('box-filled-1') &&
        isNotFilled(0) === false) {
        checkIfSecondPlayerWin(0);
        // Now if the player 1 puts the 0 in the last box , put the cross in the third box within the row.Rest
        // of the cases will be handled by the previous algo
    } else if (listToArray[0].classList.contains('box-filled-2') &&
        listToArray[4].classList.contains('box-filled-1') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfSecondPlayerWin(2);
        // if the player 1 , put the 0 in the first block at first , put the cross in the middle box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfSecondPlayerWin(4);
        // now if the player moves forward and put the 0 in the sixth box , put the 'X' in the third box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[5].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfSecondPlayerWin(2);
        // or if player put the '0' in the last box , put the 'X' in the second box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[8].classList.contains('box-filled-1') &&
        isNotFilled(1) === false) {
        checkIfSecondPlayerWin(1);
        // or if player put the '0' in the 7th box , put the 'X' in the 5th box
    } else if (listToArray[0].classList.contains('box-filled-1') &&
        listToArray[4].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(5) === false) {
        checkIfSecondPlayerWin(5);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        isNotFilled(2) === false) {
        checkIfSecondPlayerWin(2);

    } else if (listToArray[1].classList.contains('box-filled-1') &&
        listToArray[2].classList.contains('box-filled-2') &&
        listToArray[7].classList.contains('box-filled-1') &&
        isNotFilled(4) === false) {
        checkIfSecondPlayerWin(4);

    } else {
        randomCase();
        console.log("This is else statement");
    }
}

// function to create random index if any of the above following cases doesn't match and filled the box with that random
// index with class 'box-filled-2'
function randomCase() {
    var x = Math.floor(Math.random() * 9);
    if (isNotFilled(x) === false) {
        listToArray[x].classList.add('box-filled-2');
        count += 1;
        playerTwoToOne();
    } else {
        while (isNotFilled(x) === true && count !== 9) {
            x = Math.floor(Math.random() * 9);
        }
        listToArray[x].classList.add('box-filled-2');
        count += 1;
        playerTwoToOne();
    }
}

// function to remove the input field and greet the player on the start screen
function saveName() {
    const span = document.createElement('span');
    span.textContent = "Hey " + nameInput.value + " , let's begin";
    span.className = 'nameSpan';
    span.style.display = 'block';
    span.style.color = '#fff';
    span.style.margin = '2em';
    span.style.fontSize = '1.5em';
    header.insertBefore(span, nameDiv);
    header.removeChild(nameDiv);
}