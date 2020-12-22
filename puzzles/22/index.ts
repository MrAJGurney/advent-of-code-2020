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
	interface Decks {
		playerOne: number[];
		playerTwo: number[];
	}
	interface Game {
		previousDeckHashes: string[];
		decks: Decks;
	}

	const hashDeckOrder = (
		decks: Decks
	): string => [
		decks.playerOne.join(','),
		decks.playerTwo.join(','),
	].join('|');

	const playGame = (
		initialDecks: Decks
	): {
			winner: 'playerOne' | 'playerTwo',
			winnerDeck: number[]
		} => {
		const game: Game = {
			previousDeckHashes: [],
			decks: {
				playerOne: initialDecks.playerOne.slice(),
				playerTwo: initialDecks.playerTwo.slice(),
			},
		};

		while (
			game.decks.playerOne.length > 0 &&
			game.decks.playerTwo.length > 0
		){
			// If deck state indicates an infinite loop, player one wins
			const deckHash: string = hashDeckOrder(game.decks);
			if (game.previousDeckHashes.includes(deckHash)) {
				return {
					winner: 'playerOne',
					winnerDeck: game.decks.playerOne,
				};
			}
			game.previousDeckHashes.push(deckHash);

			const drawnCards = {
				playerOne: guaranteeDefined(game.decks.playerOne.shift()),
				playerTwo: guaranteeDefined(game.decks.playerTwo.shift()),
			};

			// If cards have a greater value than the size of the deck, the
			// highest value card wins
			//
			// winner's card goes above the losers on the bottom of the deck
			if(
				drawnCards.playerOne > game.decks.playerOne.length ||
				drawnCards.playerTwo > game.decks.playerTwo.length
			) {
				if (drawnCards.playerOne > drawnCards.playerTwo) {
					game.decks.playerOne.push(drawnCards.playerOne);
					game.decks.playerOne.push(drawnCards.playerTwo);
					continue;
				} else {
					game.decks.playerTwo.push(drawnCards.playerTwo);
					game.decks.playerTwo.push(drawnCards.playerOne);
					continue;
				}
			}

			// If neither the game nor round has ended, play a new game with
			// current decks (minus the drawn cards) to determine a winner who
			// wins
			//
			// The subgame is played with a subset of the cards in the main
			// deck
			//
			// winner's card goes above the losers on the bottom of the deck
			const subGame = playGame({
				playerOne: game
					.decks
					.playerOne
					.slice(0, drawnCards.playerOne),
				playerTwo: game
					.decks
					.playerTwo
					.slice(0, drawnCards.playerTwo),
			});
			if (subGame.winner === 'playerOne') {
				game.decks.playerOne.push(drawnCards.playerOne);
				game.decks.playerOne.push(drawnCards.playerTwo);
				continue;
			} else {
				game.decks.playerTwo.push(drawnCards.playerTwo);
				game.decks.playerTwo.push(drawnCards.playerOne);
				continue;
			}
		}

		return game.decks.playerTwo.length === 0 ?
			{
				winner: 'playerOne',
				winnerDeck: game.decks.playerOne,
			} : {
				winner: 'playerTwo',
				winnerDeck: game.decks.playerTwo,
			};
	};

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

	const { winnerDeck, } = playGame({
		playerOne: guaranteeDefined(playerOneDeck),
		playerTwo: guaranteeDefined(playerTwoDeck),
	});

	return winnerDeck
		.slice()
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

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;