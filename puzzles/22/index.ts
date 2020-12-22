import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const [
		playerOneDeck,
		playerTwoDeck,
	] = puzzleInput
		.trim()
		.split('\n\n')
		.map(
			rawDeck => rawDeck
				.trim()
				.split('\n')
				.slice(1)
				.map(card => parseInt(card))
		);

	const decks = {
		playerOne: guaranteeDefined(playerOneDeck).slice(),
		playerTwo: guaranteeDefined(playerTwoDeck).slice(),
	};

	while(decks.playerOne.length > 0 && decks.playerTwo.length > 0) {
		const cardsToCompare = {
			playerOne: guaranteeDefined(decks.playerOne.shift()),
			playerTwo: guaranteeDefined(decks.playerTwo.shift()),
		};

		if (cardsToCompare.playerOne > cardsToCompare.playerTwo) {
			decks.playerOne.push(cardsToCompare.playerOne);
			decks.playerOne.push(cardsToCompare.playerTwo);
		} else {
			decks.playerTwo.push(cardsToCompare.playerTwo);
			decks.playerTwo.push(cardsToCompare.playerOne);}
	}

	return (
		decks.playerTwo.length === 0 ?
			decks.playerOne :
			decks.playerTwo
	).slice()
		.reverse()
		.reduce(
			(
				score: number,
				card: number,
				index: number
			) => (
				score + (index + 1) * card
			), 0
		).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('\nTODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;