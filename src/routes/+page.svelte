<script lang="ts">
	import { derived } from 'svelte/store';

	enum GameState {
		PLAYING,
		GAMEOVER,
		WON
	}
	enum GameMode {
		EASY,
		MEDIUM,
		HARD
	}
	const GAME_SETTINGS = {
		[GameMode.EASY]: { height: 9, width: 9, numberOfBombs: 10 },
		[GameMode.MEDIUM]: { height: 16, width: 16, numberOfBombs: 40 },
		[GameMode.HARD]: { height: 16, width: 30, numberOfBombs: 99 }
	};
	let gameMode = $state(GameMode.EASY);
	let usedFlags = $state(0);
	let height = $derived(GAME_SETTINGS[gameMode].height);
	let width = $derived(GAME_SETTINGS[gameMode].width);
	let numberOfBombs = $derived(GAME_SETTINGS[gameMode].numberOfBombs);
	let remainingFlags = $derived(numberOfBombs - usedFlags);
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
	let squaresToIdentify = $derived(height * width - numberOfBombs);
	let score = $state(0);
	let gameState = $state(GameState.PLAYING);
	let timeout: number;

	let board: number[][] = $state(
		Array(height)
			.fill(0)
			.map(() => Array(width).fill(0))
	);
	let visitedBoard: number[][] = $state(
		Array(height)
			.fill(0)
			.map(() => Array(width).fill(0))
	);

	function resetBoards() {
		console.log(height);
		console.log(gameMode);
		console.log(GAME_SETTINGS[gameMode]);
		board = Array(height)
			.fill(0)
			.map(() => Array(width).fill(0));

		visitedBoard = Array(height)
			.fill(0)
			.map(() => Array(width).fill(0));
	}

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

	function addBombWarningCount(board: number[][], row: number, col: number) {
		for (let [x, y] of DIRECTIONS) {
			const newRow = row + x;
			const newCol = col + y;
			console.log();
			if (
				newRow >= 0 &&
				newRow < height &&
				newCol >= 0 &&
				newCol < width &&
				board[newRow][newCol] !== -1
			) {
				board[newRow][newCol] += 1;
			}
		}
	}

	function checkGameState() {
		if (score === squaresToIdentify && remainingFlags === 0) {
			gameState = GameState.WON;
		}
	}

	function handleClick(x: number, y: number) {
		if (visitedBoard[x][y] !== 0) {
			return;
		}
		visitedBoard[x][y] = 1;
		if (board[x][y] === -1) {
			gameState = GameState.GAMEOVER;
			(function revealBombs(i) {
				timeout = setTimeout(function () {
					while (
						i < width * height &&
						board[Math.floor(i / width)][i % width] !== -1
						// visitedBoard[Math.floor(i / width)][i % width] === 1
					) {
						i++;
					}
					if (i < width * height) {
						visitedBoard[Math.floor(i / width)][i % width] = 1;
						revealBombs(++i);
					}
				}, 150);
			})(0);

			return;
		}
		score += 1;
		if (board[x][y] === 0) {
			visitNeighbors(x, y);
		}

		checkGameState();
	}

	function handleRightClick(event: Event, x: number, y: number) {
		event.preventDefault();
		const visitedValue = visitedBoard[x][y];
		if (visitedValue === 1) {
			return;
		}
		if (visitedValue === 0 && remainingFlags > 0) {
			usedFlags += 1;
			visitedBoard[x][y] = -1;
		} else if (visitedValue === -1) {
			usedFlags -= 1;
			visitedBoard[x][y] = 0;
		}
		checkGameState();
	}

	function visitNeighbors(row: number, col: number) {
		const cellsToCheck = [[row, col]];
		while (cellsToCheck.length > 0) {
			const [rowCheck, colCheck] = cellsToCheck.pop()!;
			for (let [x, y] of DIRECTIONS) {
				const newRow = rowCheck + x;
				const newCol = colCheck + y;
				if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
					if (visitedBoard[newRow][newCol] === 0 && board[newRow][newCol] !== -1) {
						visitedBoard[newRow][newCol] = 1;
						score += 1;
						if (board[newRow][newCol] === 0) {
							cellsToCheck.push([newRow, newCol]);
						}
					}
				}
			}
		}
	}

	function handleRestart() {
		clearTimeout(timeout);
		resetBoards();
		placeBombs();
		score = 0;
		usedFlags = 0;
		gameState = GameState.PLAYING;
	}

	function changeGameMode(mode: GameMode) {
		gameMode = mode;
		handleRestart();
	}
</script>

<button
	class="m-auto rounded bg-green-300 px-4 py-2 font-bold text-gray-800 enabled:hover:bg-green-400 disabled:bg-gray-300 disabled:text-gray-400"
	disabled={gameMode === GameMode.EASY}
	onclick={() => changeGameMode(GameMode.EASY)}>Easy</button
>
<button
	class="m-auto rounded bg-yellow-300 px-4 py-2 font-bold text-gray-800 hover:bg-yellow-400 disabled:bg-gray-300 disabled:text-gray-400"
	disabled={gameMode === GameMode.MEDIUM}
	onclick={() => changeGameMode(GameMode.MEDIUM)}>Medium</button
>
<button
	class="m-auto rounded bg-red-300 px-4 py-2 font-bold text-gray-800 hover:bg-red-400 disabled:bg-gray-300 disabled:text-gray-400"
	disabled={gameMode === GameMode.HARD}
	onclick={() => changeGameMode(GameMode.HARD)}>Hard</button
>

<div class="align-items-center flex flex-col gap-5 pt-5 text-center">
	<div class="flex justify-center gap-5">
		<h1>Score: {score}/{squaresToIdentify}</h1>
		<h1>🚩 {remainingFlags}</h1>
	</div>
	<div>
		{#each board as row, x}
			<div class="whitespace-nowrap">
				{#each row as value, y}
					<button
						class="size-8 border align-middle {visitedBoard[x][y] === 1 && board[x][y] !== -1
							? ' bg-green-200'
							: visitedBoard[x][y] === 1
								? 'bg-red-400'
								: ''} enabled:hover:bg-slate-100"
						disabled={gameState !== GameState.PLAYING || visitedBoard[x][y] === 1}
						onclick={() => handleClick(x, y)}
						oncontextmenu={(event) => handleRightClick(event, x, y)}
					>
						<!-- Button content -->
						{#if visitedBoard[x][y] === 1}
							{#if value === -1}
								💣
							{:else if value !== 0}
								<p
									class="font-bold {value === 1
										? 'text-blue-700'
										: value === 2
											? 'text-green-700'
											: value === 3
												? 'text-red-600'
												: value === 4
													? 'text-purple-800'
													: value === 5
														? 'text-purple-950'
														: value === 6
															? 'text-amber-700'
															: value === 7
																? 'text-black'
																: 'text-gray-600'}"
								>
									{value}
								</p>
							{/if}
						{:else if visitedBoard[x][y] === -1}
							🚩
						{/if}
					</button>
				{/each}
			</div>
		{/each}
	</div>

	{#if gameState === GameState.WON}
		<h1>Congrats! You Won!!!</h1>
	{/if}
	{#if gameState === GameState.GAMEOVER}
		<h1>{'Sorry, you lost :('}</h1>
	{/if}
	{#if gameState !== GameState.PLAYING}
		<button
			class="m-auto rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
			onclick={() => handleRestart()}>Restart</button
		>
	{/if}
</div>
