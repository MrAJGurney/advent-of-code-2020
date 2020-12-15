import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const gameHistory = puzzleInput
		.trim()
		.split(',')
		.map(value => parseInt(guaranteeDefined(value)));

	for (
		let turn = gameHistory.length + 1;
		turn <= 2020;
		turn++
	) {
		const previousNumber = guaranteeDefined(gameHistory[turn - 2]);
		const lastOccurenceIndex = gameHistory
			.slice(0, -1)
			.lastIndexOf(previousNumber);

		gameHistory.push(
			lastOccurenceIndex === -1 ?
				0 :
				((turn - 2) - lastOccurenceIndex)
		);
	}

	return guaranteeDefined(gameHistory.slice(-1)[0]).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const initialNumbers = puzzleInput
		.trim()
		.split(',')
		.map(value => parseInt(guaranteeDefined(value)));

	const gameState = {
		history: initialNumbers
			.slice(0, -1)
			.reduce((
				history: {
					[numberOccurrence: string]: number,
			},
				value,
				index
			) => {
				history[value.toString()] = index + 1;
				return history;
			}, {}
			),
		lastValue: guaranteeDefined(initialNumbers.slice(-1)[0]),
		turn: initialNumbers.length + 1,
	};

	for (
		let i = gameState.turn + 1;
		i < 30000000 + 2;
		i++
	) {
		const lastValue = gameState.lastValue.toString();
		const value =
			Object.prototype.hasOwnProperty.call(gameState.history, lastValue) ?
				(i - 2 ) - guaranteeDefined(gameState.history[lastValue]) :
				0 ;
		gameState.history[lastValue] = i - 2;
		gameState.lastValue = value;
		gameState.turn = i;
	}

	return gameState.lastValue.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;