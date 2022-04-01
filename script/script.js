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

document.querySelector('#start').addEventListener('click', GameStart);

function GameStart() {
    let turn = 'X';
    let xArr = [];
    let oArr = [];
    let winner = '';
    gameTable.innerHTML = gameBoard;
    let tds = document.querySelectorAll('td');
    title.textContent = "There's no winner yet";

    tds.forEach((td)=>{
        td.addEventListener('click', (e)=> {

             let inputSlot = e.target.id[e.target.id.length-1];

             if(turn === 'X') {

                xArr.push(inputSlot);
                e.target.innerHTML = '<div class="user-input-X">X</div>';
                turn = "O";
             } else {

                oArr.push(inputSlot);
                e.target.innerHTML = '<div class="user-input-O">O</div>';
                turn = "X";
             }

              winningSlots.forEach((winningSlot) => {

                if( winningSlot.every((el) => {
                    return xArr.includes(el);
                })) winner = 'X';

                if( winningSlot.every((el) => {
                    return oArr.includes(el);
                })) winner = 'O';

             });
             console.log(xArr.length + oArr.length)
             if (xArr.length + oArr.length === 9) {
                 title.textContent = ("It's a Tie");
             } else {
                 // Winner
                if(winner){
                    tds.forEach (td => {
                        td.classList.add('disabled');
                    })
                    title.textContent = (winner + " Wins !!!")
                } else title.textContent = ("There's no winner yet");
             }
    
        }, {once : true});
    })
};

GameStart();