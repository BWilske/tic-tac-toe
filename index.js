//////gameboard

const gameBoard = (() => {
  return {
    state: [0, 0, 0, 0, 0, 0, 0, 0, 0],

    // updates state of gameboard value
    calculate: (space, num) => {
      gameBoard.state.splice(space, 1, num);
    },

    // changes the gamestate by asking for a new state calculation each time
    update: (space, turn) => {
      gameBoard.state.splice(space, 1, turn);
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
    clearBoard: () => {
      gameBoard.state = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      gameBoard.render();
      gameState.playing = true;
      let gameOver = document.getElementById("gameover");
      gameOver.classList.remove("game-over-visible");
      gameOver.classList.add("game-over-hidden");
    },
  };
})();

/////////player

const player = (title, num) => {
  return {
    title,
    num,
  };
};

/////gamestate

const gameState = (() => {
  return {
    turn: 1,
    playing: false,

    startGame: () => {
      gameBoard.render();
      gameState.playing = true;
    },

    handleTurn: () => {
      if (gameState.turn === 1) {
        gameState.turn = -1;
      } else gameState.turn = 1;
    },

    handleClick: (e) => {
      let space = e.target.id.match(/\d+/)[0];
      if (!gameBoard.state[space] && gameState.playing) {
        gameBoard.update(space, gameState.turn);
        gameBoard.render();
        gameState.testWin();
        gameState.handleTurn();
      }
    },

    handleTie: () => {
      gameState.playing = false;
      setTimeout(gameBoard.clearBoard, 5000);
      let gameOver = document.getElementById("gameover");
      gameOver.innerText = "Tie Game";
      gameOver.classList.remove("game-over-hidden");
      gameOver.classList.add("game-over-visible");
    },

    //todo fix this abomination

    testWin: () => {
      if (gameBoard.state.filter((item) => item == 0).length == 0) {
        gameState.handleTie();
      } else
        switch (3) {
          case Math.abs(
            gameBoard.state[0] + gameBoard.state[1] + gameBoard.state[2]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[3] + gameBoard.state[4] + gameBoard.state[5]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[6] + gameBoard.state[7] + gameBoard.state[8]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[0] + gameBoard.state[3] + gameBoard.state[6]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[1] + gameBoard.state[4] + gameBoard.state[7]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[2] + gameBoard.state[5] + gameBoard.state[8]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[0] + gameBoard.state[4] + gameBoard.state[8]
          ):
            gameState.handleWin(gameState.turn);
            break;
          case Math.abs(
            gameBoard.state[2] + gameBoard.state[4] + gameBoard.state[6]
          ):
            gameState.handleWin(gameState.turn);
            break;
        }
    },

    handleWin: (turn) => {
      gameState.playing = false;
      let gameOver = document.getElementById("gameover");
      if (turn == 1) {
        gameOver.innerText = `You win ${player1.title}`;
      } else if (turn == -1) {
        gameOver.innerText = `You win ${player2.title}`;
      }
      gameOver.classList.remove("game-over-hidden");
      gameOver.classList.add("game-over-visible");
      setTimeout(gameBoard.clearBoard, 5000);
    },
  };
})();

const helperFunctions = (() => {
  return {
    addClick: () => {
      for (let i = 0; i < gameBoard.state.length; i++) {
        square = document.getElementById(`square-${i}`);
        square.addEventListener("click", gameState.handleClick, false);
      }
    },
    addButton: () => {
      const clearButtonEl = document.getElementById("clear-button");
      console.log(clearButtonEl);
      clearButtonEl.addEventListener("click", gameBoard.clearBoard, false);
    },
    getPlayerNames: () => {},
  };
})();

const player1 = player("Bronk", 1);
const player2 = player("Puffpuff", -1);
gameState.startGame();
helperFunctions.addClick();
helperFunctions.addButton();
