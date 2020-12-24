import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';

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
	throw new Error('\nTODO');};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;