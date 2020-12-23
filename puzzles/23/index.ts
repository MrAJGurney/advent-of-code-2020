import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	interface Cup {
		value: number;
		isCurrent: boolean;
		isRemoved: boolean;
	}

	interface Game {
		moveCount: number;
		cups: Cup[];
	}

	const puzzleInput = readPuzzleInput(__dirname);

	const cupValues: number[] = puzzleInput
		.trim()
		.split('')
		.map(rawCupValue => parseInt(rawCupValue));

	const game: Game = {
		moveCount: 1,
		cups: cupValues.map(
			(cupValue, index) => ({
				value: cupValue,
				isCurrent: index === 0,
				isRemoved: false,
			})
		),
	};

	while(game.moveCount <= 100) {
		const removedCups: Cup[] = [];

		const currentCupIndex = game
			.cups
			.findIndex(({ isCurrent, }) => isCurrent);

		if(currentCupIndex === -1) throw new Error('Unable to find cup index');

		for (let i = 1; i <= 3; i++) {
			const cupToRemove = guaranteeDefined(
				game.cups[(currentCupIndex + i) % game.cups.length]
			);

			cupToRemove.isRemoved = true;
			removedCups.push(cupToRemove);
		}

		const remainingCups = game.cups.filter(({ isRemoved, }) => !isRemoved);

		const sortedRemainingCupValues = remainingCups
			.map(({ value, }) => value)
			.sort((a, b) => a - b);

		const highestRemainingCupValue = guaranteeDefined(
			sortedRemainingCupValues.slice(-1)[0]
		);
		const lowestRemainingCupValue = guaranteeDefined(
			sortedRemainingCupValues[0]
		);

		let destinationCupValue = guaranteeDefined(
			game.cups[currentCupIndex]
		).value - 1;
		while (
			!remainingCups.map(
				({ value, }) => value
			).includes(destinationCupValue)
		) {
			destinationCupValue--;
			if (destinationCupValue < lowestRemainingCupValue) {
				destinationCupValue = highestRemainingCupValue;
			}
		}
		let newCups: Cup[] = [];
		for (let i = 0; i < remainingCups.length; i++) {
			const cup = guaranteeDefined(remainingCups[i]);
			newCups.push(cup);
			if (cup.value === destinationCupValue) {
				newCups = newCups.concat(removedCups);
			}
		}

		const currentCupIndexInNewCups = newCups
			.findIndex(({ isCurrent, }) => isCurrent);

		if(currentCupIndexInNewCups === -1)
			throw new Error('Unable to find cup index');

		newCups.forEach((cup, index) => {
			cup.isRemoved = false;
			cup.isCurrent = index ===
				(currentCupIndexInNewCups + 1) % game.cups.length;
		});

		game.cups = newCups,
		game.moveCount++;
	}

	const output = game.cups.map(({ value, }) => value);

	while (output[0] !== 1) {
		output.push(
			guaranteeDefined(
				output.shift()
			)
		);
	}

	return output.slice(1).join('');
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('\nTODO');};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;