import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from './guarantee-defined';

type JoltDifferenceDistribution = {
	[difference: string]: number;
}

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const ascendingJoltRatings: number[] = puzzleInput
		.trim()
		.split('\n')
		.map(rawJolt => {
			const jolt = parseInt(guaranteeDefined(rawJolt).trim());
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
					index === 0 ?
						0 :
						guaranteeDefined(ascendingJoltRatings[index - 1]);

				const distributionKey = (
					adaptorJoltRating - previousAdaptorJoltRating
				).toString();

				if (distribution[distributionKey] === undefined) {
					distribution[distributionKey] = 0;
				}

				++distribution[distributionKey];
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
	const puzzleInput = readPuzzleInput(__dirname);

	const ascendingJoltRatings: number[] = puzzleInput
		.trim()
		.split('\n')
		.map(rawJolt => {
			const jolt = parseInt(guaranteeDefined(rawJolt.trim()));
			return jolt;
		})
		.sort((a, b) => a - b);

	const joltStepFromPrevious: number[] = ascendingJoltRatings
		.map((joltRating, index, ascendingJoltRatings) => {
			const previousJoltRating = guaranteeDefined(
				index === 0 ? 0 : ascendingJoltRatings[index - 1]
			);
			return joltRating - previousJoltRating;
		});

	const consecutiveAdjacentsCount: number[] = joltStepFromPrevious
		.reduce(
			(
				consecutiveAdjacentsCount,
				step
			) => {
				if (step === 1) {
					consecutiveAdjacentsCount[0]++;
					return consecutiveAdjacentsCount;
				}

				if (step === 3) {
					consecutiveAdjacentsCount.unshift(0);
					return consecutiveAdjacentsCount;
				}

				throw new Error('Unexpected step size');
			}, [0, ]
		)
		.filter(count => count !== 0)
		.reverse();

	return consecutiveAdjacentsCount
		.map(count => {
			switch (count) {
			case 1: return 1;
			case 2: return 2;
			case 3: return 4;
			case 4: return 7;
			default: return 0;
			}
		})
		.reduce((product: number, count: number) => (product * count), 1)
		.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;