// PSEUDOCODE
// In the game of Tic Tac Toe, a player picks a marker (O or X) and the game starts.
// The player places the marker on the game board and the computer responds with its own move.
// They continue to play until one side succeeds in placing three markers in a row horizontally, vertically, or diagonally (need to check that)
// or until they face a tie.
// In that case, the game ends.
// Update the scoreboard.
// If the player won, increase the player's score. If the computer won, increase computer's score.
// Propose another round to the player.

// Module responsible for the mechanics of the board
const Gameboard = (() => {
    const CIRCLE = "O";
    const X = "X";
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const board = new Array(9).fill("");
    let circleTurn;
    
    const getBoard = () => {
        return [...board];
    }
    
    const setMarker = (index) => {
        if (circleTurn) {
            board.splice(index, 1, CIRCLE);
            displayController.updateBoard(); // updates the board when setting a mark
            if (checkWin(CIRCLE)) {
                return displayController.updateWinningMessage(CIRCLE);
            } else if (isDraw()) {
                return displayController.updateWinningMessage("draw");
            } else {
                swapTurns(); 
                displayController.updateTurnMessage(circleTurn);
            }
        } else {
            board.splice(index, 1, X);
            displayController.updateBoard(); // updates the board when setting a mark
            if (checkWin(X)) {
                return displayController.updateWinningMessage(X);
            } else if (isDraw()) {
                return displayController.updateWinningMessage("draw");
            } else {
                swapTurns(); 
                displayController.updateTurnMessage(circleTurn);
            }
        }
    }
    
    const resetBoard = () => {
        board.fill("");
        displayController.updateBoard(); // updates the board on resetting
    }

    const swapTurns = () => {
        circleTurn = !circleTurn;
    }
    
    const checkWin = (currentMark) => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return getBoard()[index] === currentMark;
            });
        });
    }

    const isDraw = () => {
        return getBoard().every(item => {
            return item === CIRCLE || item === X;
        });
    }

    return { 
        getBoard,
        setMarker,
        resetBoard,
    }
})();
    
// Factory function responsible for creation of players
const playerFactory = (name, mark) => {
    return {
        name,
        mark
    }
}

// Module responsible for displaying information
const displayController = (() => {
    const cellNodes = document.querySelectorAll(".gameboard-cell");
    const winningMessage = document.querySelector("#winning-message");
    const newGameBtn = document.querySelector("#new-game-button");
    const winningMessageText = document.querySelector("#winning-message-text");
    const currentTurnMessageText = document.querySelector("#current-turn-message");

    const updateBoard = () => {
        for (let i = 0; i < cellNodes.length; i++) {
            cellNodes[i].textContent = Gameboard.getBoard()[i];
        }    
    }

    const addClass = (element, className) => {
        element.classList.add(className);
    }

    const removeClass = (element, className) => {
        element.classList.remove(className);
    }

    const addEventListenersToGameboardCells = () => {
        cellNodes.forEach(node => {
            node.addEventListener("click", () => {
                Gameboard.setMarker(+node.getAttribute("data-index"));
            }, {once: true});
        });
    }

    const addEventListenerToNewGameButton = () => {
        newGameBtn.addEventListener("click", () => {
            Gameboard.resetBoard();
            removeClass(winningMessage, "show");
            addEventListenersToGameboardCells();
        });
    }

    const updateWinningMessage = (mark) => {
        if (mark === "O") {
            addClass(winningMessage, "show");
            return winningMessageText.textContent = "Player 1 has won!";
        } else if (mark === "X") {
            addClass(winningMessage, "show");
            return winningMessageText.textContent = "Player 2 has won!";
        } else {
            addClass(winningMessage, "show");
            return winningMessageText.textContent = "It's a draw :(";
        }
    }

    const updateTurnMessage = (turn) => {
        if (turn == false) {
            return currentTurnMessageText.textContent = "X's turn";
        } else {
            return currentTurnMessageText.textContent = "O's turn";
        }
    }
     
    addEventListenersToGameboardCells(); // adds event listeners to gameboard cells on loading 
    addEventListenerToNewGameButton(); // adds the event listener to the new-game-button on loading
    updateBoard(); // updates the board on loading
    updateTurnMessage(false); // shows whose turn it is on loading

    return {
        updateBoard,
        updateWinningMessage,
        updateTurnMessage
    }
})();