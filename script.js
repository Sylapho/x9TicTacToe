document.addEventListener("DOMContentLoaded", () => {
    /**
     * Represents a collection of cells.
     * @type {NodeListOf<Element>}
     */
    const cells = document.querySelectorAll(".cell");

    /**
     * Represents the current player in the Tic Tac Toe game.
     * @type {string}
     */
    let currentPlayer = "X";

    /**
     * Represents the next grid position.
     * @type {string}
     */
    let nextGrid = "1-1";

    /**
     * The number of cells that have been played.
     * @type {number}
     */
    let playedCells = 0;

    /**
     * Disables all grids by adding the "disabled" class to each cell in the sub-grids.
     */
    const disableAllGrids = () => {
        document.querySelectorAll(".sub-grid").forEach(grid => {
            grid.querySelectorAll(".cell").forEach(cell => {
                cell.classList.add("disabled");
            });
        });
    };

    /**
     * Enables a specific grid position by removing the "disabled" class from its cells.
     * @param {number} gridPosition - The position of the main grid to enable.
     */
    const enableGrid = (gridPosition) => {
        disableAllGrids();
        document.querySelector(`.sub-grid[data-main-cell='${gridPosition}']`).querySelectorAll(".cell").forEach(cell => {
            cell.classList.remove("disabled");
        });
    };

    /**
     * Checks if there is a winning pattern in the given cells.
     * @param {Array} cells - The array of cells representing the game board.
     * @returns {boolean} - True if there is a winning pattern, false otherwise.
     */
    const checkWin = (cells) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    };

    /**
     * Checks if there is a winner in the given grid.
     * @param {Element} grid - The grid element to check.
     * @returns {boolean} - True if there is a winner, false otherwise.
     */
    const checkGridWin = (grid) => {
        const cells = Array.from(grid.querySelectorAll(".cell"));
        return checkWin(cells);
    };

    disableAllGrids();
    enableGrid(nextGrid);

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent === "" && !cell.classList.contains("disabled")) {
                cell.textContent = currentPlayer;
                
                const subGrid = cell.closest(".sub-grid");
                
                if (checkGridWin(subGrid)) {
                    alert(`${currentPlayer} a gagné!`);
                    disableAllGrids();
                    return;
                } else if (playedCells === 81) {
                    alert("Match nul !");
                    resetGame();
                }

                const cellIndex = cell.dataset.cell;
                const nextMainCell = `${Math.floor(cellIndex / 3)}-${cellIndex % 3}`;
                
                enableGrid(nextMainCell);

                const currentGrid = cell.closest(".sub-grid");
                currentGrid.classList.remove("active");

                const nextGridElement = document.querySelector(`.sub-grid[data-main-cell='${nextMainCell}']`);
                nextGridElement.classList.add("active");    
                
                currentPlayer = currentPlayer === "X" ? "O" : "X";

                document.getElementById('status-text').textContent = `C'est au tour de ${currentPlayer}`;
                playedCells++;
            }
        });
    });

    const button = document.querySelector("button");
  
    /**
     * Resets the Tic Tac Toe game.
     */
    function resetGame() {
        const cells = document.querySelectorAll(".cell");
        currentPlayer = "X";
        nextGrid = "1-1";
  
        cells.forEach(cell => {
            cell.textContent = "";
        });
  
        enableGrid(nextGrid);
  
        document.getElementById('status-text').textContent = 'X commence';
  
        const activeGrid = document.querySelector(".sub-grid.active");
        if (activeGrid) {
            activeGrid.classList.remove("active");
        }
        document.querySelector(".sub-grid[data-main-cell='1-1']").classList.add("active");
    }
  
    button.addEventListener("click", resetGame);
});
