import { PuzzleSolver, Stars } from '../../types';
import { TobogganMap, Coordinates } from './types';

import readPuzzleInput from '../common/read-puzzle-input';
import getTreeCountForPath from './get-tree-count-for-path';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const tobogganMap = buildTobogganMap(puzzleInput);

	return getTreeCountForPath(
		{ x: 0, y: 0, },
		{ x: 3, y: 1, },
		tobogganMap
	).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const tobogganMap = buildTobogganMap(puzzleInput);

	const paths: Coordinates[] = [
		{ x: 1, y: 1, },
		{ x: 3, y: 1, },
		{ x: 5, y: 1, },
		{ x: 7, y: 1, },
		{ x: 1, y: 2, },
	];

	let productOfTreeCounts = 1;
	for (const path of paths) {
		const treeCount = getTreeCountForPath(
			{ x: 0, y: 0, },
			path,
			tobogganMap
		);
		productOfTreeCounts *= treeCount;
	}
	return productOfTreeCounts.toString();
};

const buildTobogganMap = (puzzleInput: string): TobogganMap =>
	puzzleInput.trim().split('\n').map(row =>
		row.trim().split('')
	);

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;