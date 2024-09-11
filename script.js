// script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let currentPlayer = 'X';
let playerNames = ['', ''];
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleCellClick = (index) => {
    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`${playerNames[currentPlayer === 'X' ? 0 : 1]} wins!`);
            isGameActive = false;
            return;
        }
    }
    if (!board.includes('')) {
        alert("It's a draw!");
        isGameActive = false;
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
    });
};

// Get player names
const getPlayerNames = () => {
    playerNames[0] = player1Input.value || 'Player 1';
    playerNames[1] = player2Input.value || 'Player 2';
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        getPlayerNames(); // Update player names on click
        handleCellClick(index);
    });
});

resetButton.addEventListener('click', resetGame);
