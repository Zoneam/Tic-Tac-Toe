// Winning Positions
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
// Game board to draw dinamicly
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
let gameTable = document.querySelector('table');               
let title = document.querySelector('h1');
let xScore = document.querySelector('#x-score');
let oScore = document.querySelector('#o-score');
let turn, xArr, oArr, winner, winArray,slotTracker;
// Restart Button setup
document.querySelector('#start').addEventListener('click', gameStart);

//Start and Restart the Game
function gameStart() {
    // Game Reset / Start
    // Creating arrey that contains only dashes
    slotTracker = slotTracker = new Array(9).fill('-');
    turn = 'X'; // Setting the turn (X always starts first)
    xArr = [];
    oArr = [];
    winner = '';
    // Drawing game board
    gameTable.innerHTML = gameBoard;
    title.textContent = "There's no winner yet";
    // Grabbing all tds and appending event listeners preloaded with functions
    let tds = document.querySelectorAll('td');
    tds.forEach(td => {
        td.addEventListener('click', e => {
            clickTracker(e);
            displayWinner(tds);
        }, { once: true }); // To Run only once
    });
};

// click events
const clickTracker = (e) => {
    // Initializing Local Variables
    let inputSlot = e.target.id[e.target.id.length-1];  // grabbing td ids last character
    let emptyIndexesArray = [];
    let computerMoveIndex;

            xArr.push(String(inputSlot));
            slotTracker[inputSlot] = inputSlot; // ['-','1','-','-','4','-','-','7','-',]
            e.target.innerHTML = '<div class="user-input-X text-color">X</div>';
            
    for (let i = 0; i < slotTracker.length; i++){
        if(slotTracker[i] === "-"){
            emptyIndexesArray.push(String(i)); // keeping track of which slots are still empty so computer can take turn
        };
    };
    // checking for winner, if winner computer will not make next move
    checkForWins();
    // Generating random number from our empty slot array
    // AI will go here compThink()
    computerMoveIndex = compThink(xArr, oArr, emptyIndexesArray);
    if ( emptyIndexesArray.length > 1 && !winner ) {
        // Removing from our empty index array the move computer took
        
        emptyIndexesArray.splice(emptyIndexesArray.indexOf(computerMoveIndex), 1);
        // console.log("emptyIndexesArray",emptyIndexesArray)
        // Keeping track of Computer moves
        // pushing move computer took to our empty slot tracker
        slotTracker[computerMoveIndex] = computerMoveIndex;
        // selecting td slot that computer took and adding O and class disabled
        let tdTarget = document.querySelector(`#slot-${computerMoveIndex}`);
        tdTarget.innerHTML = '<div class="user-input-O text-color comp-move">O</div>';
        tdTarget.classList.add('disabled');
        checkForWins();
    } else if (!emptyIndexesArray.length) {
        checkForWins();
    };
};


//  -------------- AI BRAIN --------------
const compThink = (xArr, oArr, emptyIndexesArray) => {
    let matchingCount
    let move = null;
    let winningMove = null;
    let blockingMove = null;
    console.log("inside compThink-------------------------------------")

    // Check if AI can Win { TOOK MY SATURDAY AWAY }
    for (let i = 0; i < winningSlots.length; i++){
        matchingCount = 0;
        for (let j = 0; j < 3; j++) {
            if (oArr.includes(winningSlots[i][j])) {
                matchingCount++;
                if (matchingCount > 1) {
                    console.log("winning move exists =====", winningMove);
                    if (!winningMove) {
                        winningMove = winningSlots[i].filter((el) => {
                        if(!oArr.includes(el) && !xArr.includes(el)){
                            return el ;
                        }
                    });
                    }
                    console.log("===============")
                    console.log("move" , winningMove[0])
                    console.log("===============")
                    if (emptyIndexesArray.includes(winningMove[0])) {
                        console.log("====inside if=====")
                        winningMove = winningMove[0];
                    } else winningMove = null;
                };
            };
        }; 
    };

    //----------- finding blocking move
    for (let i = 0; i < winningSlots.length; i++){
        matchingCount = 0;
        for (let j = 0; j < 3; j++) {
            if (xArr.includes(winningSlots[i][j])) {
                matchingCount++;
                if (matchingCount > 1) {
                    console.log("found blocking array", winningSlots[i]);
                    // console.log("Xarr: ", xArr)
                    console.log("blockingMove before =====>>",blockingMove)
                    if (!blockingMove) {
                        console.log("inside my iFFFFFFFFFFFFFFFFFFFFFFFF")
                        blockingMove = winningSlots[i].filter((el) => {
                            if (!xArr.includes(el) && !oArr.includes(el)) {
                                return el;
                            };
                        });
                    };
                    console.log("blockingMove===>",blockingMove[0])
                    if (emptyIndexesArray.includes(blockingMove[0])) {
                        blockingMove = blockingMove[0];
                        console.log("Blocking Move: ", blockingMove[0])
                    } else blockingMove = null;
                };
            };
        }; 
    };

    console.log("Blocking move", blockingMove);
    console.log("move Before", move);
    // console.log("emptyIndexesArray", emptyIndexesArray)
    if (winningMove) {
        move = winningMove;
        console.log("WINNING")
    } else if (blockingMove) {
        move = blockingMove;
        console.log("BLOCKING")
    } else move = null;
    
    console.log("move is ===> ", typeof move)
    console.log("move after check", move);
    console.log("emptyIndexesArray",emptyIndexesArray)
    if (emptyIndexesArray.length) {
        if (!emptyIndexesArray.includes(move)) {
            console.log("inside ")
            move = (emptyIndexesArray[Math.floor(Math.random() * emptyIndexesArray.length)]);
        };
        console.log("move", move, typeof (move));
        oArr.push(String(move));
        return move;
    } else return 0;
}


// Checking for winners
const checkForWins = () => {
    winArray = []; // Array to keep track of our winning combination to color winning slots at the end ['1','4','7']
    winningSlots.forEach((winningSlot, i) => { 
        if (winningSlot.every(el => {  
            return xArr.includes(el); // Will return true or false if our xArr contains one of winning arrays
        })) {
            winArray = winningSlots[i]; // winning combination will be assigned here ['1','4','7']
            xScore.textContent = parseInt(xScore.textContent) + 1; // adding to scoreboard
            winner = 'X'; // tracking who is the winner
        };
        if (winningSlot.every(el => {
            return oArr.includes(el); // Will return true or false if our oArr contains one of winning arrays
        })) {
            winArray = winningSlots[i]; // or winning combination will be assigned here ['1','4','7']
            oScore.textContent = parseInt(oScore.textContent) + 1; // adding to scoreboard
            winner = 'O'; // tracking who is the winner
        };
    });
};

// Displaying Winner
const displayWinner = (tds) => { // tds are passed as argument 
       if(winner){
           tds.forEach(td => {
               td.classList.add('disabled');
               if (winArray.includes(td.id[td.id.length - 1])) {
                   td.querySelector('div').classList.replace('comp-move', 'winner');
                   td.querySelector('div').classList.add('winner');
               } else {
                td.querySelector('div')?.classList.add('hide');
               };
           });
           title.textContent = (`${winner} won in ${winner === 'X' ? xArr.length : oArr.length} steps!`);
       } else if (xArr.length + oArr.length === 9) {
           document.querySelector('tbody').classList.add('winner');
        title.textContent = ("It's a Tie !");
    } else title.textContent = ("There's no winner yet");
};

// initialization
gameStart();