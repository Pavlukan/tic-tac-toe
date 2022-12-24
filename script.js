// PSEUDOCODE
// In the game of Tic Tac Toe, a player picks a marker (O or X) and the game starts.
// The player places the marker on the game board and the computer responds with its own move.
// They continue to play until one side succeeds in placing three markers in a row horizontally, vertically, or diagonally (need to check that)
// or until they face a tie.
// In that case, the game ends.
// Update the scoreboard.
// If the player won, increase the player's score. If the computer won, increase computer's score.
// Propose another round to the player.

const Gameboard = (() => {
    const board = new Array(9).fill("X");
    
    const getBoard = () => {
        return [...board];
    }
    
    const setMarker = (marker, index) => {
        board.splice(index, 1, marker);
        displayController.updateBoard(); // updates the board when setting a mark
    }
    
    const resetBoard = () => {
        board.fill("");
        displayController.updateBoard(); // updates the board on resetting
    }
    
    return { 
        getBoard,
        setMarker,
        resetBoard
    }
})();
    
const playerFactory = (name, mark) => {
    return {
        name,
        mark
    }
}

const displayController = (() => {
    const cellNodes = document.querySelectorAll(".gameboard-cell");

    const updateBoard = () => {
        for (let i = 0; i < cellNodes.length; i++) {
            cellNodes[i].textContent = Gameboard.getBoard()[i];
        }    
    }
        
    updateBoard(); // updates the board on loading
        
    return {
        updateBoard
    }
})();

