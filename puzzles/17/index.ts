import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	// Start of type definitions

	type Coordinate = {
		x: number;
		y: number;
		z: number;
	  }

	type CubeState = Set<string>

	const stringifyCoordinate = ({
		x, y, z,
	}: Coordinate): string => `${x} ${y} ${z}`;

	// End of type definitions
	// Start of function definitions

	const parseCoordinate = (coordinate: string): Coordinate => {
		const [rawX, rawY, rawZ, ] = coordinate.split(' ');
		return {
			x: parseInt(guaranteeDefined(rawX)),
			y: parseInt(guaranteeDefined(rawY)),
			z: parseInt(guaranteeDefined(rawZ)),
		};
	};

	const findVolatileCoordinates = (
		cubeState: CubeState
	): CubeState => {
		const volatileCoordinates: CubeState = new Set();
		cubeState.forEach(rawCoordinate => {
			const parsedCoordinate = parseCoordinate(rawCoordinate);
			[-1, 0, 1, ].forEach(xΔ => {
				[-1, 0, 1, ].forEach(yΔ => {
					[-1, 0, 1, ].forEach(zΔ => {
						if(
							[xΔ, yΔ, zΔ, ]
								.some(value => Math.abs(value) === 1)
						) {
							volatileCoordinates.add(stringifyCoordinate({
								x: parsedCoordinate.x + xΔ,
								y: parsedCoordinate.y + yΔ,
								z: parsedCoordinate.z + zΔ,
							}));
						}
					});
				});
			});
		});
		return volatileCoordinates;
	};

	const willBeActive = (
		volatileCoordinate: Coordinate,
		cubeState: CubeState
	): boolean => {
		let adjacentActiveCount = 0;
		[-1, 0, 1, ].forEach(xΔ => {
			[-1, 0, 1, ].forEach(yΔ => {
				[-1, 0, 1, ].forEach(zΔ => {
					if([xΔ, yΔ, zΔ, ].some(value => Math.abs(value) === 1)) {
						const stringifiedAdjacentCoordinate =
							stringifyCoordinate({
								x: volatileCoordinate.x + xΔ,
								y: volatileCoordinate.y + yΔ,
								z: volatileCoordinate.z + zΔ,
							});
						if(cubeState.has(stringifiedAdjacentCoordinate)) {
							adjacentActiveCount++;
						}
					}
				});
			});
		});

		if (cubeState.has(stringifyCoordinate(volatileCoordinate))) {
			return adjacentActiveCount === 2 || adjacentActiveCount === 3;
		} else {
			return adjacentActiveCount === 3;
		}
	};

	// End of function definitions
	// Start of logic

	const puzzleInput = readPuzzleInput(__dirname);

	let cubeState: CubeState = puzzleInput
		.trim()
		.split('\n')
		.reduce((
			cubeState: CubeState,
			row: string,
			x: number
		) => {
			row
				.split('')
				.reduce((
					rowState: CubeState,
					value: string,
					y: number
				) => {
					if (value === '#') {
						const key = stringifyCoordinate({
							x,
							y,
							z: 0,
						});
						rowState.add(key);
					}
					return rowState;
				}, new Set()
				)
				.forEach(key => cubeState.add(key));
			return cubeState;
		}, new Set()
		);

	for (let cycle = 0; cycle < 6; cycle++) {

		const volatileCoordinates = findVolatileCoordinates(cubeState);

		const newCubeState = new Set([...volatileCoordinates, ]
			.filter(volatileCoordinate =>
				willBeActive(parseCoordinate(volatileCoordinate), cubeState)
			)
		);

		cubeState = newCubeState;
	}

	return cubeState.size.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('TODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;