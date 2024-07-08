import { h as ensure_array_like, i as attr, e as escape_html, j as stringify, c as pop, p as push } from "../../chunks/index.js";
function _page($$payload, $$props) {
  push();
  var GameState = /* @__PURE__ */ ((GameState2) => {
    GameState2[GameState2["PLAYING"] = 0] = "PLAYING";
    GameState2[GameState2["GAMEOVER"] = 1] = "GAMEOVER";
    GameState2[GameState2["WON"] = 2] = "WON";
    return GameState2;
  })(GameState || {});
  var GameMode = /* @__PURE__ */ ((GameMode2) => {
    GameMode2[GameMode2["EASY"] = 0] = "EASY";
    GameMode2[GameMode2["MEDIUM"] = 1] = "MEDIUM";
    GameMode2[GameMode2["HARD"] = 2] = "HARD";
    return GameMode2;
  })(GameMode || {});
  const GAME_SETTINGS = {
    [0]: {
      height: 9,
      /* EASY */
      width: 9,
      numberOfBombs: 10
    },
    [1]: {
      height: 16,
      /* MEDIUM */
      width: 16,
      numberOfBombs: 40
    },
    [2]: {
      height: 16,
      /* HARD */
      width: 30,
      numberOfBombs: 99
    }
  };
  let gameMode = 0;
  let height = GAME_SETTINGS[gameMode].height;
  let width = GAME_SETTINGS[gameMode].width;
  let numberOfBombs = GAME_SETTINGS[gameMode].numberOfBombs;
  const DIRECTIONS = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ];
  let squaresToIdentify = height * width - numberOfBombs;
  let remainingFlags = numberOfBombs;
  let score = 0;
  let gameState = 0;
  let board = Array(height).fill(0).map(() => Array(width).fill(0));
  let visitedBoard = Array(height).fill(0).map(() => Array(width).fill(0));
  function placeBombs() {
    const availableSpots = [...Array(height * width).keys()];
    for (let i = 0; i < numberOfBombs; i++) {
      const randomIndex = Math.floor(availableSpots.length * Math.random());
      const spot = availableSpots[randomIndex];
      const lastValue = availableSpots.pop();
      if (randomIndex < availableSpots.length) {
        availableSpots[randomIndex] = lastValue || 0;
      }
      const row = Math.floor(spot / width);
      const col = spot % width;
      board[row][col] = -1;
      addBombWarningCount(board, row, col);
    }
  }
  placeBombs();
  function addBombWarningCount(board2, row, col) {
    for (let [x, y] of DIRECTIONS) {
      const newRow = row + x;
      const newCol = col + y;
      console.log();
      if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width && board2[newRow][newCol] !== -1) {
        board2[newRow][newCol] += 1;
      }
    }
  }
  const each_array = ensure_array_like(board);
  $$payload.out += `<button class="m-auto rounded bg-green-300 px-4 py-2 font-bold text-gray-800 enabled:hover:bg-green-400 disabled:bg-gray-300 disabled:text-gray-400"${attr("disabled", gameMode === GameMode.EASY, true)}>Easy</button> <button class="m-auto rounded bg-yellow-300 px-4 py-2 font-bold text-gray-800 hover:bg-yellow-400 disabled:bg-gray-300 disabled:text-gray-400"${attr("disabled", gameMode === GameMode.MEDIUM, true)}>Medium</button> <button class="m-auto rounded bg-red-300 px-4 py-2 font-bold text-gray-800 hover:bg-red-400 disabled:bg-gray-300 disabled:text-gray-400"${attr("disabled", gameMode === GameMode.HARD, true)}>Hard</button> <div class="align-items-center flex flex-col gap-5 pt-5 text-center"><div class="flex justify-center gap-5"><h1>Score: ${escape_html(score)}/${escape_html(squaresToIdentify)}</h1> <h1>🚩 ${escape_html(remainingFlags)}</h1></div> <div><!--[-->`;
  for (let x = 0; x < each_array.length; x++) {
    const row = each_array[x];
    $$payload.out += "<!--[-->";
    const each_array_1 = ensure_array_like(row);
    $$payload.out += `<div class="whitespace-nowrap"><!--[-->`;
    for (let y = 0; y < each_array_1.length; y++) {
      const value = each_array_1[y];
      $$payload.out += "<!--[-->";
      $$payload.out += `<button${attr("class", `size-8 border align-middle ${stringify(visitedBoard[x][y] === 1 && board[x][y] !== -1 ? " bg-green-200" : visitedBoard[x][y] === 1 ? "bg-red-400" : "")} enabled:hover:bg-slate-100`)}${attr("disabled", gameState !== GameState.PLAYING || visitedBoard[x][y] === 1, true)}><!--[-->`;
      if (visitedBoard[x][y] === 1) {
        $$payload.out += `<!--[-->`;
        if (value === -1) {
          $$payload.out += `💣`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += `<!--[-->`;
          if (value !== 0) {
            $$payload.out += `<p${attr("class", `font-bold ${stringify(value === 1 ? "text-blue-700" : value === 2 ? "text-green-700" : value === 3 ? "text-red-600" : value === 4 ? "text-purple-800" : value === 5 ? "text-purple-950" : value === 6 ? "text-amber-700" : value === 7 ? "text-black" : "text-gray-600")}`)}>${escape_html(value)}</p>`;
            $$payload.out += "<!--]-->";
          } else {
            $$payload.out += "<!--]!-->";
          }
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]-->";
      } else {
        $$payload.out += `<!--[-->`;
        if (visitedBoard[x][y] === -1) {
          $$payload.out += `🚩`;
          $$payload.out += "<!--]-->";
        } else {
          $$payload.out += "<!--]!-->";
        }
        $$payload.out += "<!--]!-->";
      }
      $$payload.out += `</button>`;
      $$payload.out += "<!--]-->";
    }
    $$payload.out += "<!--]-->";
    $$payload.out += `</div>`;
    $$payload.out += "<!--]-->";
  }
  $$payload.out += "<!--]-->";
  $$payload.out += `</div> <!--[-->`;
  if (gameState === GameState.WON) {
    $$payload.out += `<h1>Congrats! You Won!!!</h1>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  if (gameState === GameState.GAMEOVER) {
    $$payload.out += `<h1>Sorry, you lost :(</h1>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += ` <!--[-->`;
  if (gameState !== GameState.PLAYING) {
    $$payload.out += `<button class="m-auto rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400">Restart</button>`;
    $$payload.out += "<!--]-->";
  } else {
    $$payload.out += "<!--]!-->";
  }
  $$payload.out += `</div>`;
  pop();
}
export {
  _page as default
};
