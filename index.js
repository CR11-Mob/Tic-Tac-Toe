const container = document.getElementById("container");

const head = document.getElementById("head");

const playerX = document.getElementById("X");
const playerO = document.getElementById("O");
const plyXWinCount = document.getElementById("X-win-count");
const plyOWinCount = document.getElementById("O-win-count");
const playerTurn = document.getElementById("player-turn");

const mainContent = document.getElementById("mainContent");

const restartGame = document.getElementById("restart");

const chooseGrid = document.getElementById("choose-grid");

const gameGrid = document.getElementById("gameGrid");
const row1 = document.getElementById("grid-row-1");
const row2 = document.getElementById("grid-row-2");
const row3 = document.getElementById("grid-row-3");

/*************** GAME GRID RENDER FUNCTION ***************/

let userSelectedGrid = chooseGrid.value;

let onGridChange = () => {
  gameGrid.innerHTML = ``;

  turns = 0;
  player1 = true;

  renderGrid();
  playerStatus();

  gameGrid.style.pointerEvents = "auto";

  gameGrid.style.width = `${userSelectedGrid * 10}%`;

  if (userSelectedGrid >= 6) {
    gameGrid.style.fontSize = `1.5rem`;
    gameGrid.style.fontWeight = `500`;
  } else if ((userSelectedGrid = 4)) {
    gameGrid.style.fontSize = `3rem`;
  }
};

let renderGrid = () => {
  userSelectedGrid = chooseGrid.value;

  for (let i = 0; i < userSelectedGrid; i++) {
    let div1 = document.createElement("div");

    div1.id = `grid-row-${i + 1}`;
    div1.className = "grid-row";
    gameGrid.append(div1);

    for (let j = 0; j < userSelectedGrid; j++) {
      let div2 = document.createElement("div");

      div2.id = `grid-item-${i + 1}-${j + 1}`;
      div2.className = "grid-item";
      div1.append(div2);
    }
  }
};
renderGrid();

/**************** CURRENT PLAYER TURN ****************/

let player1 = true;
let turns = 0;

let playerStatus = () => {
  console.log("player before click", player1);
  if (player1 === true) {
    playerO.classList.remove("active");
    playerO.classList.add("disable");

    playerX.classList.remove("disable");
    playerX.classList.add("active");

    playerTurn.innerHTML = `X Turn`;
  } else if (player1 === false) {
    playerX.classList.remove("active");
    playerX.classList.add("disable");

    playerO.classList.remove("disable");
    playerO.classList.add("active");

    playerTurn.innerHTML = `O Turn`;
  }
};
playerStatus();

/*************** PLAYER INPUT & GAME DRAW LOGIC FUNCTION ***************/

let clickFunction = () => {
  gameGrid.addEventListener("click", (e) => {
    // turns++;

    if (player1 === true && e.target.innerText === "") {
      turns++;
      e.target.innerText = `X`;
      e.target.style.color = "rgba(48, 48, 48, 0.8)";

      player1 = false;
    } else if (e.target.innerText === "") {
      turns++;
      e.target.innerText = `O`;
      e.target.style.color = "rgba(243, 235, 211, 0.8)";

      player1 = true;
    }
    // console.log("player after click", player1);
    playerStatus();

    console.log("turns:", turns);

    if (turns === userSelectedGrid * userSelectedGrid) {
      console.log("XO Draw!");

      gameOver();
    }

    checkWinner();
  });
};
clickFunction();

/*************** WINNING LOGIC ***************/

let gameOver = () => {
  playerX.classList.remove("active");
  playerX.classList.add("disable");

  playerO.classList.remove("active");
  playerO.classList.add("disable");

  playerTurn.innerHTML = `Game Over`;
  turns = 0;
};

let playerXWin = 0;
let playerOWin = 0;

let checkWinner = () => {
  let lastItem = gameGrid.querySelectorAll(".grid-row").length;
  const gridLength = document.querySelectorAll(".grid-row").length;

  let diagonalRightX = 0;
  let diagonalRightO = 0;

  let diagonalLeftX = 0;
  let diagonalLeftO = 0;

  for (let i = 0; i < gameGrid.querySelectorAll(".grid-row").length; i++) {
    let row = document.getElementById(`grid-row-${i + 1}`);
    let userX = 0;
    let userO = 0;
    let colUserX = 0;
    let colUserO = 0;

    /********** DIAGONAL LEFT-SIDE CHECK **********/

    if (
      document.getElementById(`grid-item-${i + 1}-${i + 1}`).innerText == "X"
    ) {
      diagonalLeftX++;
      // console.log(diagonalLeftX);
      if (diagonalLeftX === gridLength) {
        alert("Diagonal Left X Player Wins!");

        gameGrid.style.pointerEvents = "none";

        gameOver();

        playerXWin++;
        plyXWinCount.innerHTML = playerXWin;
      }
    } else if (
      document.getElementById(`grid-item-${i + 1}-${i + 1}`).innerText == "O"
    ) {
      diagonalLeftO++;
      // console.log(diagonalLeftO);
      if (diagonalLeftO === gridLength) {
        alert("Diagonal Left O Player Wins!");

        gameGrid.style.pointerEvents = "none";

        gameOver();

        playerOWin++;
        plyOWinCount.innerHTML = playerOWin;
      }
    }

    /********** DIAGONAL RIGHT-SIDE CHECK **********/
    // console.log("last item",lastItem--);
    if (
      document.getElementById(`grid-item-${i + 1}-${lastItem}`).innerText == "X"
    ) {
      diagonalRightX++;
      // console.log("cross 2 X:", diagonalRightX);
      if (diagonalRightX === gridLength) {
        alert("Diagonal Right X Player Win!");

        gameGrid.style.pointerEvents = "none";

        gameOver();

        playerXWin++;
        plyXWinCount.innerHTML = playerXWin;
      }
    } else if (
      document.getElementById(`grid-item-${i + 1}-${lastItem}`).innerText == "O"
    ) {
      diagonalRightO++;
      // console.log("cross 2 O:", diagonalRightX);
      if (diagonalRightO === gridLength) {
        alert("Diagonal Right O Player Win!");

        gameGrid.style.pointerEvents = "none";

        gameOver();

        playerOWin++;
        plyOWinCount.innerHTML = playerOWin;
      }
    }
    lastItem--;

    /********** ROW-COLUMN CHECK **********/

    for (let j = 0; j < row.querySelectorAll(".grid-item").length; j++) {
      /********** ROW CHECK **********/
      // console.log(xInputcount);
      if (row.querySelectorAll(".grid-item")[j].innerHTML === "X") {
        userX++;
        // console.log("x input:", userX);
        if (userX === gridLength) {
          alert(`Row${i + 1} X Player Win!`);

          gameGrid.style.pointerEvents = "none";

          gameOver();

          playerXWin++;
          plyXWinCount.innerHTML = playerXWin;
        }
      } else if (row.querySelectorAll(".grid-item")[j].innerHTML === "O") {
        userO++;
        // console.log("x input:", userO);
        if (userO === gridLength) {
          alert(`Row${i + 1} O Player Win!`);

          gameGrid.style.pointerEvents = "none";

          gameOver();

          playerOWin++;
          plyOWinCount.innerHTML = playerOWin;
        }
      }

      /********** COLUMN CHECK **********/

      if (
        document.getElementById(`grid-item-${j + 1}-${i + 1}`).innerText == "X"
      ) {
        colUserX++;
        // console.log(colUserX);
        if (colUserX === gridLength) {
          alert(`Column${i + 1} X Player Win!`);

          gameGrid.style.pointerEvents = "none";

          gameOver();

          playerXWin++;
          plyXWinCount.innerHTML = playerXWin;
        }
      } else if (
        document.getElementById(`grid-item-${j + 1}-${i + 1}`).innerText == "O"
      ) {
        colUserO++;
        // console.log(colUserO);
        if (colUserO === gridLength) {
          alert(`Column${i + 1} O Player Win!`);

          gameGrid.style.pointerEvents = "none";

          gameOver();

          playerOWin++;
          plyOWinCount.innerHTML = playerOWin;
        }
      }
    }
  }
};

/*************** GAME RESTART FUNCTION ***************/

let gameRestart = () => {
  restartGame.innerHTML = `<span id = "restart-btn">PLAY AGAIN</span>`;

  document.getElementById("restart-btn").addEventListener("click", () => {
    gameGrid.innerText = "";

    turns = 0;

    playerStatus();

    renderGrid();

    gameGrid.style.pointerEvents = "auto";
  });
};
gameRestart();
