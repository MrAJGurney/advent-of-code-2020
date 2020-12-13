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
	const puzzleInput = readPuzzleInput(__dirname);
	const rawBusIds = puzzleInput.trim().split('\n')[1];
	const busses: {multiple: number, offset: number}[] =
		guaranteeDefined(rawBusIds)
			.trim()
			.split(',')
			.map((rawBusId, index) => ({ rawBusId, offset: index, }))
			.filter(({ rawBusId, }) => (rawBusId !== 'x'))
			.map(({ rawBusId, offset, }) => (
				{ multiple: parseInt(guaranteeDefined(rawBusId)), offset, }
			));

	const solution = { ...guaranteeDefined(busses[0]), };
	for (let i = 1; i < busses.length; i++) {
		const bus = guaranteeDefined(busses[i]);
		for (
			let timestamp = solution.offset;
			;
			timestamp += solution.multiple
		) {
			if (
				isValidTimestamp(timestamp, guaranteeDefined(busses[i]))
			) {
				const newMultiple = solution.multiple * bus.multiple;
				solution.multiple = newMultiple;
				const newOffset = timestamp % newMultiple;
				solution.offset = newOffset;

				break;
			}
		}
	}

	return (solution.multiple - solution.offset).toString();
};

const isValidTimestamp = (
	timestamp: number,
	{ multiple, offset, }: {multiple: number, offset: number}
): boolean => (
	(timestamp % multiple) === (offset % multiple)
);

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;