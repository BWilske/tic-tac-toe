const gameBoard = (() => {
  return {
    state: [0, 0, 0, 0, 0, 0, 0, 0, 0],

    // updates state of gameboard
    calculate: (space, num) => {
      return gameBoard.state.splice(space - 1, 1, num);
    },

    // changes the gamestate by asking for a new state calculation each time
    update: () => {
      gameBoard.state = gameBoard.calculate(gameSpace, player.num);
    },

    //renders the whole game board each time
    render: () => {
      let square = "";
      for (let i = 0; i < gameBoard.state.length; i++) {
        square = document.getElementById(`square-${i}`);
        if (gameBoard.state[i] == 1) {
          square.innerText = "X";
        } else if (gameBoard.state[i] == -1) {
          square.innerText = "O";
        } else {
          square.innerText = "";
        }
      }
    },
  };
})();

const player = (title, num) => {
  return {
    title,
    num,
  };
};

const gameState = (() => {
  return {
    turn: 1,

    handleTurn: () => {
      if (gameState.turn === 1) {
        gameState.turn = -1;
      } else gameState.turn = 1;
    },

    handleClick: () => {
      // gameBoard.update()
    },
  };
})();

const helperFunctions = (() => {
  return {
    addClick: () => {
      for (let i = 0; i < gameBoard.state.length; i++) {
        square = document.getElementById(`square-${i}`);
        square.addEventListener("click", (e) => console.log(e), false);
      }
    },
  };
})();

const player1 = player("Bronk", 1);
const player2 = player("Puffpuff", -1);
gameBoard.render();
helperFunctions.addClick();
