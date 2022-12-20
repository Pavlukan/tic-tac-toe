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
        return board.slice();
    }

    const setMarker = (marker, index) => {
        return board.splice(index, 1, marker);
    }

    const resetBoard = () => {
        return board.fill("");
    }

    return { 
        getBoard,
        setMarker,
        resetBoard
    }
})();