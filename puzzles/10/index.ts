import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import isDefined from '../../utils/is-defined';

type JoltDifferenceDistribution = {
	[difference: string]: number;
}

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const ascendingJoltRatings: number[] = puzzleInput
		.trim()
		.split('\n')
		.map(rawJolt => {
			if (!isDefined(rawJolt)) {
				throw new Error('Undefined jolt rating');
			}
			const jolt = parseInt(rawJolt);
			return jolt;
		})
		.sort((a, b) => a - b);

	const distribution =
		ascendingJoltRatings.reduce(
			(
				distribution: JoltDifferenceDistribution,
				adaptorJoltRating: number,
				index: number,
				ascendingJoltRatings: number[]
			) => {
				const previousAdaptorJoltRating =
					index === 0 ? 0 : ascendingJoltRatings[index - 1];
				if (!isDefined(previousAdaptorJoltRating)) {
					throw new Error('Undefined jolt rating');
				}

				const distributionKey =
					(adaptorJoltRating - previousAdaptorJoltRating).toString();

				if (distribution[distributionKey] === undefined) {
					distribution[distributionKey] = 0;
				}

				++distribution[
					(adaptorJoltRating - previousAdaptorJoltRating).toString()];
				return distribution;
			}, {}
		);

	++distribution[(3).toString()];

	const a = distribution['1'];
	const b = distribution['3'];

	return (
		(a === undefined ? 0 : a) *
		(b === undefined ? 0 : b)
	).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('TODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;