// Module responsible for the mechanics of the board
const Gameboard = (() => {
    const CIRCLE = "O";
    const X = "X";
    
    const board = new Array(9).fill("");

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
    const firstPlayerInput = document.querySelector("#nameFirst");
    const secondPlayerInput = document.querySelector("#nameSecond");

    let circleTurn = false;
    let player1;
    let player2;
    
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

    const startNewGame = () => {
        resetBoard();
        displayController.addEventListenersToGameboardCells();
        createPlayers();
    }

    const createPlayers = () => {
        player1 = playerFactory(firstPlayerInput.value || "John Doe");
        player2 = playerFactory(secondPlayerInput.value || "Jane Doe");
    }

    const getPlayer1 = () => {
        return player1;
    }

    const getPlayer2 = () => {
        return player2;
    }
    
    const resetBoard = () => {
        board.fill("");
        displayController.updateBoard(); // updates the board on resetting
    }

    const swapTurns = () => {
        return circleTurn = !circleTurn;
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
        startNewGame,
        getPlayer1,
        getPlayer2
    }
})();
    
// Factory function responsible for creation of players
const playerFactory = (name) => {
    return {
        name
    }
}

// Module responsible for displaying information
const displayController = (() => {
    const cellNodes = document.querySelectorAll(".gameboard-cell");
    const winningMessage = document.querySelector("#winning-message");
    const startGameBtn = document.querySelector("#startGameButton");
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
              if (!node.getAttribute("listener") || node.getAttribute("listener") === "false") {
                Gameboard.setMarker(+node.getAttribute("data-index"));
                node.setAttribute("listener", "true");
              }
            }, { once: true }
          );
        });
      };

    const addEventListenerToNewGameButton = () => {
        newGameBtn.addEventListener("click", () => {
            Gameboard.resetBoard();
            cellNodes.forEach((cell) => cell.setAttribute("listener", "false"));
            removeClass(winningMessage, "show");
            addEventListenersToGameboardCells();
        });
    }

    const addEventListenerToStartGameButton = () => {
        startGameBtn.addEventListener("click", () => {
            cellNodes.forEach((cell) => cell.setAttribute("listener", "false"));
            Gameboard.startNewGame();
        });
    }

    const updateWinningMessage = (mark) => {
        if (mark === "X") {
            addClass(winningMessage, "show");
            return winningMessageText.textContent = `${Gameboard.getPlayer1().name} has won!`;
        } else if (mark === "O") {
            addClass(winningMessage, "show");
            return winningMessageText.textContent = `${Gameboard.getPlayer2().name} has won!`
        } else {
            addClass(winningMessage, "show");
            return winningMessageText.textContent = "It's a draw :(";
        }
    }

    const updateTurnMessage = (turn) => {
        if (turn == false) {
            return currentTurnMessageText.textContent = `${Gameboard.getPlayer1().name}'s turn`;
        } else {
            return currentTurnMessageText.textContent = `${Gameboard.getPlayer2().name}'s turn`;
        }
    }
     
    addEventListenerToStartGameButton();
    addEventListenerToNewGameButton(); // adds the event listener to the new-game-button on loading
    updateBoard(); // updates the board on loading

    return {
        updateBoard,
        updateWinningMessage,
        updateTurnMessage,
        addEventListenersToGameboardCells
    }
})();