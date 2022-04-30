// HTMLElement.prototype.delegate = function (eventName, childSelector, callback) {
//     this.addEventListener(eventName, function (e) {
//         const targetElement = e.target.closest(childSelector);
//         if (targetElement !== null && this.contains(targetElement)) {
//             callback.call(targetElement, e);
//         }
//     });
// }

function Board(rowCount = 3, columnCount = 3, winCondition = 3) {
    const EMPTY_TILE_TOKEN = "_";
    let currentPlayer = "X";
    let lockdown = 0;
    if (!new.target) {
        return new Board(rowCount, columnCount, winCondition);
    }
    
    if (rowCount < winCondition || columnCount < winCondition) {
        throw new Error("The board is too small for the win condition.");
    }

    function Tile() {
        if (!new.target) {
            return new Tile();
        }
        let value;
        let SELF = this;
        this.renderElement = document.createElement("button");
        this.renderElement.classList.add("gameTile");
        this.fillIn = function () {
            if (this.value === "_" && !lockdown) {
                SELF.value = currentPlayer;
                checkWin();
                changePlayer();
            }
        };
        this.renderElement.addEventListener("click", () => SELF.fillIn());
        Object.defineProperty(this, "value", {
            get() {
                return value;
            },
            set(data) {
                value = data;
                this.renderElement.innerText = value === EMPTY_TILE_TOKEN ? "" : value;
            }
        });
        this.value = EMPTY_TILE_TOKEN;
    }

    function changePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkLine(line) {
        if (line.includes("X".repeat(winCondition))) {
            alert("Player 1 wins!");
            return true;
        } else if (line.includes("O".repeat(winCondition))) {
            alert("Player 2 wins!");
            return true;
        }
    }

    function traverseDiagonal(yCoords, xCoords, direction = 1) {
        const result = [];
        // console.log(xCoords, yCoords);
        for (null; yCoords < rowCount && xCoords < columnCount && yCoords >= 0 && xCoords >= 0; yCoords++) {
            result.push(tiles[yCoords][xCoords].value);
            xCoords += direction;
        }
        return result.join("");
    }

    function checkWin() {
        // Row analysis
        const rows = tiles.map(row => row.map(tile => tile.value).join(""));
        // Column analysis
        const columns = tiles[0].map((tile, column) => tiles.map((row) => row[column].value).join(""));
        // Diagonal analysis
        const diagonals = [];
        for (let y = rowCount - 1; y >= 0; y--) {
            diagonals.push(traverseDiagonal(y, 0, 1));
            diagonals.push(traverseDiagonal(y, columnCount - 1, -1));
        }
        for (let x = 1; x < columnCount; x++) {
            diagonals.push(traverseDiagonal(0, x, 1));
        }
        for (let x = columnCount - 2; x >= 0; x--) {
            diagonals.push(traverseDiagonal(0, x, -1));
        }
        if ([...rows, ...columns, ...diagonals].some(checkLine)) {
            lockdown = 1;
        } else if (tiles.every(row => row.every(tile => tile.value !== EMPTY_TILE_TOKEN))) {
            alert("It's a tie!");
            lockdown = 1;
        }
    }

    let tiles = Array.from({length: rowCount}, () => Array.from({length: columnCount}, () => new Tile()));
    let renderElement = document.createElement("div");
    renderElement.classList.add("gameBoard");
    renderElement.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;
    renderElement.style.maxWidth = (3 * columnCount) + "em";

    const newGameButton = document.createElement("button");
    newGameButton.innerText = "New game";
    newGameButton.addEventListener("click", ()=>this.newGame());
    newGameButton.classList.add("newGame");
    
    this.render = function (parentNode) {
        renderElement.innerHTML = null;
        const fragment = document.createDocumentFragment();
        tiles.forEach((row, i) => {
            row.forEach((tile, j) => {
                fragment.append(tile.renderElement);
            });
        });
        renderElement.append(fragment);
        parentNode.append(renderElement);
        parentNode.append(newGameButton);
    };
    
    
    
    this.newGame = function() {
        lockdown = 0;
        currentPlayer = "X";
        tiles.forEach(row=>row.forEach(tile=>tile.value=EMPTY_TILE_TOKEN));
    }
}

const board = new Board(10, 10, 5);
board.render(document.querySelector(".gameContainer"));