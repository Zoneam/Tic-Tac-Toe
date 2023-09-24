// Winning Positions
let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const LOOKUP_TABLE = {
    '1': 'X',
    '-1': 'O',
};
// Game board dynamically
let gameBoard = `<tr>
                <td id="slot-0"></td>
                <td id="slot-1"></td>
                <td id="slot-2"></td>
                </tr>
                <tr>
                <td id="slot-3"></td>
                <td id="slot-4"></td>
                <td id="slot-5"></td>
                </tr>
                <tr>
                <td id="slot-6"></td>
                <td id="slot-7"></td>
                <td id="slot-8"></td>
                </tr>`
// Initializing Global Variables
let title = document.querySelector('h1');
let xScore = document.querySelector('#x-score');
let oScore = document.querySelector('#o-score');
let tie = document.querySelector('#tie');
let gameTable = document.querySelector('table');               
let playAgainButton = document.querySelector('#start');
let turn, winner, board;
let hardness = 'easy';
playAgainButton.addEventListener('click', initialize);
let starter = "player";


//--------------------------- Start and Restart the Game -------------------------------------
function initialize() {
    starter = starter === "player" ? "computer" : "player";
    board = [null, null, null, null, null, null, null, null, null];
    winner = null;
    gameTable.innerHTML = gameBoard; // Drawing game board
    gameTable.addEventListener('click', handleMove);
    // Check who starts first

    if (starter === "player") {
        turn = 1;
    } else {
        turn = -1;
        computerMove();  // If computer starts first, make its move immediately
        turn *= -1;  // Switch turn to the player after computer's move
    }

    render();
};

function handleMove(evt) {
    const idx = parseInt(evt.target.id.replace('slot-', ''));
    
    if (isNaN(idx) || board[idx] || winner) return;
    
    // Update state (board, turn, winner)
    board[idx] = turn;  // Human's move
    turn *= -1;
    winner = getWinner();

    // If no winner and it's the computer's turn
    if (!winner && turn === -1) {
        computerMove();
        turn *= -1;
        winner = getWinner();
    }

    // Render updated state
    render();
    console.log(board);
}

function computerMove() {

    shuffle(winningCombos);

    // With a 20% chance, make a random move
    if (Math.random() < 0.1) {
        let availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        if (availableMoves.length) {
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[randomMove] = -1;
            return;
        }
    }
    // Check if computer can win
    for (let i = 0; i < winningCombos.length; i++) {
        if (checkCombo(winningCombos[i], -1)) {
            return;
        }
    }

    // Check if computer needs to block player from winning
    for (let i = 0; i < winningCombos.length; i++) {
        if (checkCombo(winningCombos[i], 1)) {
            return;
        }
    }

    // Take center if available
    if (board[4] === null) {
        board[4] = -1;
        return;
    }

    // Take opposite corner or an empty corner
    let corners = [0, 2, 6, 8];
    for (let i = 0; i < corners.length; i++) {
        if (board[corners[i]] === null) {
            board[corners[i]] = -1;
            return;
        }
    }

    // Take an empty side
    let sides = [1, 3, 5, 7];
    for (let i = 0; i < sides.length; i++) {
        if (board[sides[i]] === null) {
            board[sides[i]] = -1;
            return;
        }
    }
    winner = getWinner();
}

function checkCombo(combo, player) {
    let potentialMove = null;
    let count = 0;
    for (let i = 0; i < combo.length; i++) {
        if (board[combo[i]] === player) count++;
        if (board[combo[i]] === null) potentialMove = combo[i];
    }
    if (count === 2 && potentialMove !== null) {
        board[potentialMove] = -1; // Computer's move
        return true;
    }
    return false;
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function render() {
    title.textContent = "There's no winner yet!";
    renderBoard();
    renderMessage();
}

function renderBoard() {
    board.forEach(function(sqVal, idx) {
      const squareEl = document.getElementById(`slot-${idx}`);
      squareEl.innerHTML = `<div class="user-input-X text-color">${LOOKUP_TABLE[sqVal] ?? ''}</div>`
    });
  }

function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
    }
    if (board.includes(null)) return null;
    return 'T';
}

function renderMessage() {
    if (winner === 'T') {
        title.innerHTML = "It's a tie!";
        playAgainButton.hidden = false;
    } else if (winner) {
        playAgainButton.hidden = false;
        title.innerHTML = `<span>${LOOKUP_TABLE[winner]} Won</span>!`;
    } else {
        title.innerHTML = `<span>${LOOKUP_TABLE[turn]}</span>'s Turn`;
        playAgainButton.hidden = true;
    }
  }
// initialization
initialize();