import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const inputComponents = puzzleInput.trim().split('\n\n');
	const rawRules = inputComponents[0];
	const rawNearbyTickets = inputComponents[2];

	const rules = guaranteeDefined(rawRules)
		.trim()
		.split('\n')
		.reduce(
			(
				rules: Array<Array<{min: number, max: number}>>,
				rawRule
			) => {
				const ruleRanges = rawRule.split(': ')[1];
				const rawRanges = guaranteeDefined(ruleRanges)
					.trim()
					.split(' or ');
				rules.push(rawRanges.reduce(
					(
						ranges: Array<{min: number, max: number}>,
						rawRange: string
					) => {
						const [min, max, ] = rawRange
							.trim()
							.split('-')
							.map(value => parseInt(value));
						ranges.push({
							min: guaranteeDefined(min),
							max: guaranteeDefined(max),
						});
						if (guaranteeDefined(max) < guaranteeDefined(min)) {
							throw new Error('Maximum is smaller than minimum');
						}
						return ranges;
					}, []));
				return rules;
			}, []
		)
		.flat();

	const nearbyTickets = guaranteeDefined(rawNearbyTickets)
		.trim()
		.split('\n')
		.slice(1)
		.map(
			ticket => ticket
				.trim()
				.split(',')
				.map(value => parseInt(value))
		);

	const errorRate = nearbyTickets
		.flat()
		.reduce((
			errorRate: number,
			value
		) => (
			errorRate + (isValid(value, rules) ? 0 : value)
		), 0);

	return errorRate.toString();
};

const isValid = (
	value: number,
	rules: Array<{min: number, max: number}>
): boolean => (
	rules.some(rule => (value >= rule.min) && (value <= rule.max))
);

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('TODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;