/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board;
let turn = 'X';
let win;

/*----- Variables for stuff -----*/

let loading = document.getElementById('message');
let score = {"X":0,"O":0};

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('closeMessage').addEventListener('click', closeMessage);
document.getElementById('neverShow').addEventListener('click', NeverShow);
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.getElementById('turn');
document.getElementById('reset-button').addEventListener('click', init);



/*----- functions -----*/
if (localStorage.getItem('neverShow')!='true') {
    loading.showModal();
};
//Si score == null score == 0,0 sinon score = localStorage
if (localStorage.getItem('score') == null) {
    localStorage.setItem('score',JSON.stringify(score));
} else {
    score = JSON.parse(localStorage.getItem('score'));
}

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
    });
    //?????
    return winner ? winner : board.includes('') ? null : 'T';
};

function handleTurn() {
    //??????
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    //Si la partie est en cour et la case vide
    if (board[idx] == "" && win == null) {
        //Case = au joueur
        board[idx] = turn;
        // si (turn == X) {turn = O} sinon {turn = X}
        turn = turn === 'X' ? 'O' : 'X';
        win = getWinner();
    }
    render();
};

//Reinitialise le tableau
function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    win = null;
    render();

};
//Ferme le message qui s'affiche au chargement de la page
function closeMessage() {
    loading.close();
}
//Met en mémoire de ne plus montrer le message et le ferme
function NeverShow() {
    localStorage.setItem('neverShow', 'true');
    loading.close();
}

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
    //Excrit le messages en haut du tableau
    messages.textContent = win === 'T' ? `Egalité!` : win ? `${win} a gagner la partie!` : `C'est le tour de ${turn}!`; 
    //Si == T rien Sinon Si == win score[x/o]++
    //Ajoute des points si tu a gagner dependant de win null/X/O/T
    win === 'T' ? '' : win ? score[win]++ : '';
    //Met le score en stockage
    localStorage.setItem('score',JSON.stringify(score));
    //Ecrit le score dans le html
    document.getElementById('scoreX').innerHTML = `Parties X<br>${score['X']}`;
    document.getElementById('score0').innerHTML = `Parties O<br>${score['O']}`
};
init();