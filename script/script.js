let winningSlots = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let turn = 'X';
let inputArray = new Array(9);
let xArr = [];
let oArr = [];
let winner = '';

let title = document.querySelector('h1');
document.querySelector('#start').addEventListener('click', GameStart);

let tds = document.querySelectorAll('td');

tds.forEach((td)=>{
    td.addEventListener('click', (e)=> {
         let inputSlot = e.target.id[e.target.id.length-1];
         if(turn === 'X') {
            inputArray[inputSlot] = 'X';
            e.target.innerHTML = '<div class="user-input-X">X</div>';
            turn = "O";
         } else {
            inputArray[inputSlot] = 'O';
            e.target.innerHTML = '<div class="user-input-O">O</div>';
            turn = "X";
         }
         // putting xs and os into arrays
         inputArray.forEach((input,i)=>{
            if (input === 'X') xArr[i] = i;
            if (input === 'O') oArr[i] = i;
         })
         // checking if there is winner or not
          winningSlots.forEach((winningSlot)=>{
            if(winningSlot.every((el) => {
                 return xArr.includes(el);
            })) return winner = "X"; 
            if(winningSlot.every((el) => {
                return oArr.includes(el);
           })) return winner = "O"; 
         })
         // Winner
         winner?title.textContent = (winner + " Wins !!!"):title.textContent = ("There's no winner yet");

    }, {once : true});
})

function GameStart() {

};

