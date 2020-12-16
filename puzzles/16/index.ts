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
	const puzzleInput = readPuzzleInput(__dirname);
	const [
		rawRules,
		rawYourTicket,
		rawNearbyTickets,
	] = puzzleInput.trim().split('\n\n');

	const rules = guaranteeDefined(rawRules)
		.trim()
		.split('\n')
		.reduce(
			(
				rules: {
					[name: string]: Array<{min: number, max: number}>
				},
				rawRule
			) => {
				const [ruleName, ruleRanges, ] = rawRule.split(': ');
				const rawRanges = guaranteeDefined(ruleRanges)
					.trim()
					.split(' or ');

				rules[guaranteeDefined(ruleName)] = rawRanges.reduce(
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
					}, []);

				return rules;
			}, {}
		);

	const yourTicket = guaranteeDefined(rawYourTicket)
		.trim()
		.split('\n')
		.slice(1)
		.map(
			ticket => ticket
				.trim()
				.split(',')
				.map(value => parseInt(value))
		)[0];

	const nearbyTickets = guaranteeDefined(rawNearbyTickets)
		.trim()
		.split('\n')
		.slice(1)
		.map(
			ticket => ticket
				.trim()
				.split(',')
				.map(value => parseInt(value))
		)
		.filter(ticket => ticket
			.every(
				value => isValid(
					value,
					Object.values(rules).flat()
				)
			)
		);

	const rulesWithValidIndices = Object
		.keys(rules)
		.reduce(
			(
				rulesWithValidIndices: { [rule: string]: Array<number>, },
				ruleKey
			) => {
				const validIndices = guaranteeDefined(yourTicket)
					.reduce(
						(
							validIndices: Array<number>,
							yourTicketValue,
							index
						) => {
							const isValidRuleForYourTicket = isValid(
								yourTicketValue,
								guaranteeDefined(rules[ruleKey])
							);
							const isValidRuleForNearbyTickets = nearbyTickets
								.every(
									ticket =>
										isValid(
											guaranteeDefined(ticket[index]),
											guaranteeDefined(rules[ruleKey])
										)
								);
							if (
								isValidRuleForYourTicket &&
									isValidRuleForNearbyTickets
							) {
								validIndices.push(index);
							}
							return validIndices;
						}, []
					);

				rulesWithValidIndices[ruleKey] = validIndices;
				return rulesWithValidIndices;
			}, {}
		);

	const assignedIndices: Array<number> = [];

	const rulesWithIndex: {[ruleKey: string]: number} = Object
		.keys(rulesWithValidIndices)
		.sort((a, b) =>
			guaranteeDefined(rulesWithValidIndices[a]).length -
			guaranteeDefined(rulesWithValidIndices[b]).length
		)
		.reduce(
			(
				rulesWithIndex: {[ruleKey: string]: number},
				ruleKey: string
			) => {
				const validIndex = guaranteeDefined(
					guaranteeDefined(rulesWithValidIndices[ruleKey])
						.find(index => !assignedIndices.includes(index))
				);
				rulesWithIndex[ruleKey] = validIndex;
				assignedIndices.push(validIndex);
				return rulesWithIndex;
			}, {}
		);

	return Object
		.keys(rulesWithIndex)
		.filter(ruleKey => ruleKey.startsWith('departure '))
		.reduce(
			(
				product: number,
				ruleKey: string
			) => {
				const index = guaranteeDefined(rulesWithIndex[ruleKey]);
				const value = guaranteeDefined(
					guaranteeDefined(yourTicket)[index]
				);

				return product * value;
			}, 1)
		.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;