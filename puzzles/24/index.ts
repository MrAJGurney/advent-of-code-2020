import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	// Based on the axial coordinate system describe here:
	// - https://www.redblobgames.com/grids/hexagons/#coordinates-axial
	type AxialCoordinate = {
		column: number;
		row: number;
	}

	const puzzleInput = readPuzzleInput(__dirname);

	const paths: string[][] = puzzleInput
		.trim()
		.split('\n')
		.map(path => {
			let newPath = path.trim();
			newPath = newPath.replace(/se/g, '0');
			newPath = newPath.replace(/sw/g, '1');
			newPath = newPath.replace(/ne/g, '2');
			newPath = newPath.replace(/nw/g, '3');
			newPath = newPath.replace(/e/g, '4');
			newPath = newPath.replace(/w/g, '5');
			return newPath;
		})
		.map(tokenisedPath => tokenisedPath
			.split('')
			.map(token => {
				switch (token) {
				case '0': return 'SE';
				case '1': return 'SW';
				case '2': return 'NE';
				case '3': return 'NW';
				case '4':return 'E';
				case '5': return 'W';
				default: throw new Error('Unexpected Token');
				}
			})
		);

	const coordinates: AxialCoordinate[] = paths.map(path => (
		path.reduce(
			(
				coordinate: AxialCoordinate,
				direction: string
			) => {
				switch (direction) {
				case 'E':
					coordinate.column++;
					break;
				case 'W':
					coordinate.column--;
					break;
				case 'SE':
					coordinate.row++;
					break;
				case 'NW':
					coordinate.row--;
					break;
				case 'NE':
					coordinate.column++;
					coordinate.row--;
					break;
				case 'SW':
					coordinate.column--;
					coordinate.row++;
					break;
				default: throw new Error('Unexpected Token');
				}
				return coordinate;
			}, {
				column: 0,
				row: 0,
			})
	));

	const blackTiles: Set<string> = coordinates
		.reduce(
			(
				blackTiles: Set<string>,
				{ row, column, }: AxialCoordinate
			) => {
				const coordinateHash = `r${row},c${column}`;
				if (blackTiles.has(coordinateHash)) {
					blackTiles.delete(coordinateHash);
				} else {
					blackTiles.add(coordinateHash);
				}
				return blackTiles;
			}, new Set());

	return blackTiles.size.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	// Based on the axial coordinate system describe here:
	// - https://www.redblobgames.com/grids/hexagons/#coordinates-axial
	type Tile = {
		column: number;
		row: number;
	}

	const stringifyTile = (
		{ row, column, }: Tile
	): string => `${row} ${column}`;

	const parseTile = (
		stringifiedTile: string
	): Tile => {
		const [rawRow, rawColumn, ] = stringifiedTile.split(' ');
		return {
			row: parseInt(guaranteeDefined(rawRow)),
			column: parseInt(guaranteeDefined(rawColumn)),
		};
	};

	const findVolatileTiles = (
		blackTiles: Set<string>
	): Set<string> => {
		const volatileTiles: Set<string> = new Set();

		blackTiles.forEach(stringifiedTile => {
			const { row, column, } = parseTile(stringifiedTile);
			[-1, 0, 1, ].forEach(rowΔ => {
				[-1, 0, 1, ].forEach(columnΔ => {
					if(
						!(rowΔ === 0 && columnΔ === 0) &&
						!(Math.abs(rowΔ + columnΔ) === 2)
					) {
						volatileTiles.add(
							stringifyTile({
								row: row + rowΔ,
								column: column + columnΔ,
							})
						);
					}
				});
			});
		});
		return volatileTiles;
	};

	const willBeActive = (
		{ row, column, }: Tile,
		blackTiles: Set<string>
	): boolean => {
		let adjacentActiveCount = 0;
		[-1, 0, 1, ].forEach(rowΔ => {
			[-1, 0, 1, ].forEach(columnΔ => {
				if(
					!(rowΔ === 0 && columnΔ === 0) &&
						!(Math.abs(rowΔ + columnΔ) === 2)
				) {
					const stringifiedAdjacentTile =
							stringifyTile({
								row: row + rowΔ,
								column: column + columnΔ,
							});
					if(blackTiles.has(stringifiedAdjacentTile)) {
						adjacentActiveCount++;
					}
				}
			});
		});
		if (blackTiles.has(stringifyTile({ row, column, }))) {
			return !(adjacentActiveCount === 0 || adjacentActiveCount > 2);
		} else {
			return adjacentActiveCount === 2;
		}
	};

	const puzzleInput = readPuzzleInput(__dirname);

	const paths: string[][] = puzzleInput
		.trim()
		.split('\n')
		.map(path => {
			let newPath = path.trim();
			newPath = newPath.replace(/se/g, '0');
			newPath = newPath.replace(/sw/g, '1');
			newPath = newPath.replace(/ne/g, '2');
			newPath = newPath.replace(/nw/g, '3');
			newPath = newPath.replace(/e/g, '4');
			newPath = newPath.replace(/w/g, '5');
			return newPath;
		})
		.map(tokenisedPath => tokenisedPath
			.split('')
			.map(token => {
				switch (token) {
				case '0': return 'SE';
				case '1': return 'SW';
				case '2': return 'NE';
				case '3': return 'NW';
				case '4':return 'E';
				case '5': return 'W';
				default: throw new Error('Unexpected Token');
				}
			})
		);

	const coordinates: Tile[] = paths.map(path => (
		path.reduce(
			(
				tile: Tile,
				direction: string
			) => {
				switch (direction) {
				case 'E':
					tile.column++;
					break;
				case 'W':
					tile.column--;
					break;
				case 'SE':
					tile.row++;
					break;
				case 'NW':
					tile.row--;
					break;
				case 'NE':
					tile.column++;
					tile.row--;
					break;
				case 'SW':
					tile.column--;
					tile.row++;
					break;
				default: throw new Error('Unexpected Token');
				}
				return tile;
			}, {
				column: 0,
				row: 0,
			})
	));

	const initialBlackTiles: Set<string> = coordinates
		.reduce(
			(
				blackTiles: Set<string>,
				tile: Tile
			) => {
				const stringifiedTile = stringifyTile(tile);
				if (blackTiles.has(stringifiedTile)) {
					blackTiles.delete(stringifiedTile);
				} else {
					blackTiles.add(stringifiedTile);
				}
				return blackTiles;
			}, new Set());

	let blackTiles = initialBlackTiles;
	for (let day = 0; day < 100; day++) {
		const volatileTiles = findVolatileTiles(blackTiles);

		const newBlackTiles = new Set([...volatileTiles, ]
			.filter(volatileTile =>
				willBeActive(parseTile(volatileTile), blackTiles)
			)
		);

		blackTiles = newBlackTiles;
	}

	return blackTiles.size.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;