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

	const indexOfInvalidNumber = findIndexOfInvalidNumber(25, portTransmission);
	const invalidNumber = portTransmission[indexOfInvalidNumber];

	if (!isDefined(invalidNumber)) {
		/* eslint-disable-next-line max-len */
		throw new Error(`Undefined value at position ${indexOfInvalidNumber} of ${portTransmission.length}`);
	}

	return invalidNumber.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
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

	const indexOfInvalidNumber = findIndexOfInvalidNumber(25, portTransmission);
	const invalidNumber = portTransmission[indexOfInvalidNumber];

	if (!isDefined(invalidNumber)) {
		/* eslint-disable-next-line max-len */
		throw new Error(`Undefined value at position ${indexOfInvalidNumber} of ${portTransmission.length}`);
	}

	const range = findRangeThatSumsToNumber(invalidNumber, portTransmission);

	const sortedRange = range.sort((a, b) => a - b);

	const lowest = sortedRange[0];
	if (!isDefined(lowest)) {
		/* eslint-disable-next-line max-len */
		throw new Error(`Undefined value at position ${0} of ${range.length}`);
	}

	const highest = sortedRange.slice(-1)[0];
	if (!isDefined(highest)) {
		/* eslint-disable-next-line max-len */
		throw new Error(`Undefined value at in array of ${portTransmission.length} length`);
	}

	return (lowest + highest).toString();
};

const findIndexOfInvalidNumber = (
	preambleLength: number,
	portTransmission: number[]
): number => {
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
			return i;
		}
	}

	throw new Error('Unable to find invalid number');
};

const canMakeSumFromCollection = (sum: number, array: number[]): boolean => {
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

const findRangeThatSumsToNumber = (
	invalidNumber: number,
	portTransmission: number[]
) => {

	for (
		let rangeStartIndex = 0;
		rangeStartIndex < portTransmission.length;
		rangeStartIndex++
	) {
		for (
			let rangeEndIndex = rangeStartIndex + 2;
			rangeEndIndex < portTransmission.length;
			rangeEndIndex++
		) {
			const range = portTransmission
				.slice(rangeStartIndex, rangeEndIndex);

			const rangeSum = range.reduce((sum, value) => {
				return sum + value;
			}, 0);

			if (rangeSum === invalidNumber) {
				return range;
			}

			if (rangeSum > invalidNumber) {
				break;
			}
		}
	}

	throw new Error('Unable to find range that sums to number');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;