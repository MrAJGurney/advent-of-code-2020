import { PuzzleSolver, Stars } from '../../types';
import { Seat } from './types';

import readPuzzleInput from '../common/read-puzzle-input';
import isDefined from '../../utils/is-defined';
import buildSeats from './build-seats';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const seats = buildSeats(puzzleInput);
	const seatsSortedById = seats.sort((a, b) => b.id - a.id);
	const seatWithBiggestId: Seat | undefined = seatsSortedById[0];
	if (!isDefined(seatWithBiggestId)) {
		/* eslint-disable-next-line max-len */
		throw new Error(`Undefined at position 0 of array length ${seatsSortedById.length}`);
	}
	return seatWithBiggestId.id.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const seats = buildSeats(puzzleInput);
	const seatsSortedById = seats.sort((a, b) => b.id - a.id);

	for (let i = 0; i < (seatsSortedById.length - 1); i++) {
		const nextSeatIndex = i + 1;
		const seat: Seat | undefined = seatsSortedById[i];
		const nextSeat: Seat | undefined = seatsSortedById[nextSeatIndex];

		if (!isDefined(seat)) {
			/* eslint-disable-next-line max-len */
			throw new Error(`Undefined seat id at position ${i} of ${seatsSortedById.length}`);
		}

		if (!isDefined(nextSeat)) {
			/* eslint-disable-next-line max-len */
			throw new Error(`Undefined seat id at position ${nextSeatIndex} of ${seatsSortedById.length}`);
		}

		const expectedNextSeatId = seat.id - 1;

		if (nextSeat.id !== expectedNextSeatId) {
			return expectedNextSeatId.toString();
		}
	}

	throw new Error('Unable to find solution');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;