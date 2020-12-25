import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const DIVISOR = 20201227;
	const SUBJECT_NUMBER = 7;

	const puzzleInput = readPuzzleInput(__dirname);

	const [
		cardPublicKey,
		doorPublicKey,
	] = puzzleInput.trim().split('\n').map(key => parseInt(key));

	const cardState = {
		loopSize: 0,
		subject: 1,
	};

	while (cardState.subject !== cardPublicKey) {
		cardState.subject = (cardState.subject * SUBJECT_NUMBER) % DIVISOR;
		cardState.loopSize++;
	}

	const encryptionKeyState = {
		loopSize: 0,
		subject: 1,
	};

	while (encryptionKeyState.loopSize < cardState.loopSize) {
		encryptionKeyState.subject = (
			encryptionKeyState.subject * guaranteeDefined(doorPublicKey)
		) % DIVISOR;
		encryptionKeyState.loopSize++;
	}

	return encryptionKeyState.subject.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('\nTODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;