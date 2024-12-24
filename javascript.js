function Player(name, symbol) {
  return {
    name,
    symbol,
  };
}
const player2 = Player("must", "O");
const player1 = Player("akram", "X");

gameFlow = (function () {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  let turn = false;

  const displayControler = (e) => {
    turn = !turn;
    if (checkWinner() === null) {
      console.log(e.target.dataset.index);
      playRound(e.target.dataset.index, e);
    }
  };

  const getGameboard = () => {
    return gameboard;
  };
  const playRound = (index, e) => {
    if (checkWinner() === null) {
      console.log("there is no winner");
      if (gameboard[index] === "") {
        console.log("you can edit");
        gameboard[index] = turn ? "O" : "X";
        console.log(getGameboard());
        console.log("the winner is" + checkWinner());
        e.target.style.color = "white";
        e.target.textContent = turn ? "X" : "O";
        e.target.style.backgroundColor = !turn ? "#e70303" : "#00aeff";
        return true;
      }
    } else {
      return false;
    }
  };

  const reset = (elements) => {
    gameboard.forEach((_, index) => {
      gameboard[index] = "";
      turn = false;
    });
    elements.forEach((_, index) => {
      elements[index].textContent = "";
      elements[index].style.backgroundColor = "#e2e2e2";
    });
  };
  const gameOver = () => {
    return gameboard.every((val) => val != "");
  };

  const checkWinner = () => {
    const winning = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winning.length; i++) {
      const [a, b, c] = winning[i];
      if (
        gameboard[a] === gameboard[b] &&
        gameboard[b] === gameboard[c] &&
        gameboard[a] !== ""
      ) {
        return gameboard[a];
      }
    }
    return null;
  };

  return {
    getGameboard,
    playRound,
    reset,
    gameOver,
    checkWinner,
    displayControler,
  };
})();

console.log(gameFlow.getGameboard());

const cells = document.querySelectorAll(".cell");

cells.forEach((_, index) => {
  cells[index].addEventListener("click", (e) => {
    gameFlow.displayControler(e);
  });
});

const reset = document.querySelector(".reset-game");
reset.addEventListener("click", () => {
  gameFlow.reset(cells);
});
