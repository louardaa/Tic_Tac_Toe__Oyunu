var currentPlayer = 'X';
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
var gameOver = false;

function makeMove(row, col) {
    if (board[row][col] === '' && !gameOver) {
        board[row][col] = currentPlayer;
        document.getElementById("result").textContent = '';

        var cell = document.getElementsByClassName('cell')[row * 3 + col];
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            document.getElementById("result").textContent = currentPlayer + ' Kazandı!';
            gameOver = true;
        } else if (checkTie()) {
            document.getElementById("result").textContent = 'Berabere!';
            gameOver = true;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (currentPlayer === 'O' && !gameOver) {
            makeComputerMove();
        }
    }
}

function makeComputerMove() {
    // Rastgele bir boş hücre seçilirken daha fazla düşünceye sahip bir yapay zeka algoritması kullanılabilir.
    var emptyCells = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    var randomIndex = Math.floor(Math.random() * emptyCells.length);
    var computerMove = emptyCells[randomIndex];
    makeMove(computerMove.row, computerMove.col);
}

function checkWin(player) {
    for (var i = 0; i < 3; i++) {
        if (
            board[i][0] === player && board[i][1] === player && board[i][2] === player ||
            board[0][i] === player && board[1][i] === player && board[2][i] === player
        ) {
            return true;
        }
    }

    if (
        board[0][0] === player && board[1][1] === player && board[2][2] === player ||
        board[0][2] === player && board[1][1] === player && board[2][0] === player
    ) {
        return true;
    }

    return false;
}

function checkTie() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function resetBoard() {
    currentPlayer = 'X';
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameOver = false;
    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }
    document.getElementById("result").textContent = '';
}
