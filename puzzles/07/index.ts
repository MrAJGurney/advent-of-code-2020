import { PuzzleSolver, Stars } from '../../types';
import { RulesForAllBags } from './types';

import readPuzzleInput from '../common/read-puzzle-input';
import buildRulesForAllBags from './build-rules-for-all-bags';
import findBagsThatCanContainSeedBags
	from './find-bags-that-can-contain-seed-bags';
import countBagsInSeedBag from './count-bags-in-seed-bag';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	const rulesForAllBags: RulesForAllBags =
		buildRulesForAllBags(puzzleInput);

	const bagsContainingSeedBags = findBagsThatCanContainSeedBags(
		new Set(['shiny gold', ]),
		rulesForAllBags
	);
	return (bagsContainingSeedBags.size - 1).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	const rulesForAllBags: RulesForAllBags =
		buildRulesForAllBags(puzzleInput);

	const bagsInSeedBagCount =
		countBagsInSeedBag('shiny gold', rulesForAllBags);

	return bagsInSeedBagCount.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;