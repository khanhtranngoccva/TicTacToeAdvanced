# TicTacToeAdvanced

### It's a Tic Tac Toe game, but...

- It's an expansion of the Tic Tac Toe. In Wikipedia, this is called a MxNxK game. https://en.wikipedia.org/wiki/M,n,k-game
- You can pick how big you want the board to be
- You can choose how many tiles a player has to line up to win. For example, player 1 may need to have lined up 5 tiles in order to win.



### Usage ✏️
1. Include the JS and the CSS file.
2. Initialize a new ```Board``` object using a constructor.
```js
const board = new Board(10, 10, 5);
```
3. Use the ```Board``` object's ```render``` method to put the board inside a container. In this case, the board will be put inside the first HTML element that has the ```gameContainer``` class.
```js
board.render(document.querySelector(".gameContainer"));
```

### TODO:
1. Make the board modular. Name mangling, which this repo does not have yet. can be used to avoid global namespace pollution.
For example, the ```gameBoard``` class can be replaced with ```_TicTacToeAdvanced__gameBoard```.
