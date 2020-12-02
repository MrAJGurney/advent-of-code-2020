import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import {
	buildPasswordsWithSledPolicy,
	isValidSledPassword
} from './sled-password-policy';
import {
	buildPasswordsWithTobogganPolicy,
	isValidTobogganPassword
} from './toboggan-password-policy';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const passwordsWithPolicy =
		buildPasswordsWithSledPolicy(puzzleInput);

	return passwordsWithPolicy
		.filter(passwordWithPolicy => isValidSledPassword(passwordWithPolicy))
		.length
		.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const passwordsWithPolicy =
		buildPasswordsWithTobogganPolicy(puzzleInput);

	return passwordsWithPolicy
		.filter(
			passwordWithPolicy => isValidTobogganPassword(passwordWithPolicy)
		)
		.length
		.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;