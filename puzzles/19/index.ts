import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

type TeminatorCharacter = 'a' | 'b'

type SubRule = Array<number>

type Rule = TeminatorCharacter | Array<SubRule>

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	const [
		rawValidationRules,
		rawMessages,
	] = puzzleInput.trim().split('\n\n');

	const validationRules: Array<Rule> = guaranteeDefined(rawValidationRules)
		.trim()
		.split('\n')
		.sort(
			(a, b) => {
				const aKey = guaranteeDefined(a.split(':')[0]);
				const bKey = guaranteeDefined(b.split(':')[0]);
				return parseInt(aKey) - parseInt(bKey);
			})
		.map(line => line.split(': ')[1])
		.map(rule => {
			switch (rule) {
			case '"a"':
				return 'a';
			case '"b"':
				return 'b';
			default:
				return guaranteeDefined(rule)
					.split('|')
					.map(
						subRules => subRules
							.trim()
							.split(' ')
							.map(subRule => parseInt(subRule))
					);
			}
		});

	const messageValidation = new RegExp(
		'^' + buildMessageValidation(validationRules) + '$'
	);

	const messages: string[] = guaranteeDefined(rawMessages).trim().split('\n');

	return messages
		.filter(message => message.match(messageValidation))
		.length.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error ('\nTODO');
};

const buildMessageValidation = (
	validationRules: Array<Rule>,
	index = 0
): string => {
	const rule: Rule = guaranteeDefined(validationRules[index]);

	return rule === 'a' || rule === 'b' ?
		rule :
		[
			'(',
			rule.map(
				(
					subRule: SubRule
				) => subRule.map(
					ruleKey => buildMessageValidation(validationRules, ruleKey)
				).join('')
			).join('|'),
			')',
		].join('');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;