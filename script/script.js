let winningSlots = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
];

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

let gameTable = document.querySelector('table');               
let title = document.querySelector('h1');
let xScore = document.querySelector('#x-score');
let oScore = document.querySelector('#o-score');
let turn, xArr, oArr, winner;
document.querySelector('#start').addEventListener('click', GameStart);

//Start and Restart the Game
function GameStart() {
    turn = 'X';
    xArr = [];
    oArr = [];
    winner = '';
    gameTable.innerHTML = gameBoard;
    title.textContent = "There's no winner yet";
    let tds = document.querySelectorAll('td');
    tds.forEach( td => {
        td.addEventListener('click', e => {
            clickTracker(e);
            checkForWins();
            displayWinner(tds);
        }, {once : true});
    })
};

// Taking Turns
const clickTracker = (e) => {
    let inputSlot = e.target.id[e.target.id.length-1];
             if(turn === 'X') {
                xArr.push(inputSlot);
                e.target.innerHTML = '<div class="user-input-X">X</div>';
                turn = "O";
             } else {
                oArr.push(inputSlot);
                e.target.innerHTML = '<div class="user-input-O">O</div>';
                turn = "X";
             };
};

// Checking for winners
const checkForWins = () => {
    winningSlots.forEach((winningSlot) => {
        if( winningSlot.every(el => {
            return xArr.includes(el);
        })) {
            winner = 'X';
            xScore.textContent = parseInt(xScore.textContent) + 1;
            }
        if( winningSlot.every(el => {
            return oArr.includes(el);
        })) {
            oScore.textContent = parseInt(oScore.textContent) + 1;
            winner = 'O';
        }
     });
};

// Displaying Winner
const displayWinner = (tds) => {
    if (xArr.length + oArr.length === 9) {
        title.textContent = ("It's a Tie !");
    } else {
       if(winner){
           tds.forEach (td => {
               td.classList.add('disabled');
           });
           title.textContent = (`${winner} won in ${winner === 'X'?xArr.length:oArr.length} steps!`);
       } else title.textContent = ("There's no winner yet");
    }
};

// initialization
GameStart();