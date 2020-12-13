import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const [rawCurrentTime, rawBusIds, ] = puzzleInput.trim().split('\n');
	const currentTime: number = parseInt(
		guaranteeDefined(rawCurrentTime).trim()
	);
	const busIds: number[] = guaranteeDefined(rawBusIds)
		.trim()
		.split(',')
		.reduce(
			(
				busIds: number[],
				rawId: string
			) => {
				if (rawId !== 'x') {
					busIds.push(parseInt(guaranteeDefined(rawId)));
				}
				return busIds;
			}, []
		);

	const shortestWaitBusId = busIds
		.reduce(
			(
				shortestWaitBusId: number,
				busId: number
			) => {
				const shortestWaitTime =
					shortestWaitBusId - (currentTime % shortestWaitBusId);
				const waitTime = busId - (currentTime % busId);

				return (waitTime < shortestWaitTime) ?
					busId :
					shortestWaitBusId;
			},
			guaranteeDefined(busIds[0]) -
				(currentTime % guaranteeDefined(busIds[0]))
		);

	return (
		(shortestWaitBusId - (currentTime % shortestWaitBusId)) *
			shortestWaitBusId
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