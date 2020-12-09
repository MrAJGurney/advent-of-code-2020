import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import isDefined from '../../utils/is-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	const portTransmission: number[] = puzzleInput
		.trim()
		.split('\n')
		.map(line => {
			if (!isDefined(line)) {
				throw new Error(`Undefined line ${line}`);
			}
			return parseInt(line);
		});

	const preambleLength = 25;
	for (let i = preambleLength; i < portTransmission.length; i++) {
		const currentNumber = portTransmission[i];
		if (!isDefined(currentNumber)) {
			/* eslint-disable-next-line max-len */
			throw new Error(`Undefined value at position ${i} of ${portTransmission.length}`);
		}

		if (!canMakeSumFromCollection(
			currentNumber,
			portTransmission.slice(i - preambleLength, i))
		) {
			return currentNumber.toString();
		}
	}

	throw new Error('Unable to find solution');
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('TODO');
};

const canMakeSumFromCollection = (sum:number, array: number[]): boolean => {
	for (let indexA = 0; indexA < array.length - 1; indexA++) {
		for (let indexB = indexA + 1; indexB < array.length; indexB++) {
			const a = array[indexA];
			if (!isDefined(a)) {
				/* eslint-disable-next-line max-len */
				throw new Error(`Undefined value at position ${indexA} of ${array.length}`);
			}

			const b = array[indexB];
			if (!isDefined(b)) {
				/* eslint-disable-next-line max-len */
				throw new Error(`Undefined value at position ${indexB} of ${array.length}`);
			}

			if (a + b === sum) {
				return true;
			}
		}
	}
	return false;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;