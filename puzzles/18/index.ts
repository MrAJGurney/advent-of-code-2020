import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	const solveEquation = (
		rawEquation: string
	): {
		solution: number,
		index: number
	} => {
		const state: {
			value: number;
			operation: '+' | '*';
			solution: number;
			index: number
		} = {
			value: 0,
			operation: '+',
			solution: 0,
			index: 0,
		};

		while (state.index < rawEquation.length) {
			const character = guaranteeDefined(rawEquation[state.index]);
			switch (character) {
			case '(': {
				const subSolution =
				solveEquation(rawEquation.slice(state.index + 1));
				state.index += subSolution.index;
				state.value = subSolution.solution;
				break;
			}
			case ')':
				if (state.operation === '+') state.solution += state.value;
				if (state.operation === '*') state.solution *= state.value;
				return {
					index: state.index + 1,
					solution: state.solution,
				};
			case '+':
				if (state.operation === '+') state.solution += state.value;
				if (state.operation === '*') state.solution *= state.value;
				state.operation = '+';
				state.value = 0;
				break;
			case '*':
				if (state.operation === '+') state.solution += state.value;
				if (state.operation === '*') state.solution *= state.value;
				state.operation = '*';
				state.value = 0;
				break;
			default:
				if (character.match(/\D/)) throw new Error('Expected a digit');
				state.value = state.value * 10 + parseInt(character);
				break;
			}
			state.index++;
		}

		if (state.operation === '+') state.solution += state.value;
		if (state.operation === '*') state.solution *= state.value;

		const { solution, index, } = state;
		return { solution, index, };
	};

	const puzzleInput = readPuzzleInput(__dirname);
	return puzzleInput
		.trim()
		.split('\n')
		.reduce((sum: number, rawEquation: string) => (
			sum + solveEquation(rawEquation.replace(/ /g, '')).solution
		), 0)
		.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	// After multiple failed attempts at part 2, I based a solution on this:
	// https://medium.com/@stoopidguy1992/how-to-write-a-math-expression-parser-in-javascript-b5147bc9466b

	const splitExpression = (
		sourceExpression: string,
		operator: '+' | '*'
	): Array<string> => {
		const state: {
			depth: number;
			expression: string;
			expressions: Array<string>;
		} = {
			depth: 0,
			expression: '',
			expressions: [],
		};

		for(const character of sourceExpression) {
			switch(character) {
			case '(':
				state.depth++;
				state.expression += character;
				break;
			case ')':
				state.depth--;
				state.expression += character;
				break;
			case operator:
				if (state.depth === 0) {
					state.expressions.push(state.expression);
					state.expression = '';
				} else {
					state.expression += operator;
				}
				break;
			default:
				state.expression += character;
				break;
			}
		}

		if (state.expression !== '') state.expressions.push(state.expression);

		return state.expressions;
	};

	const parseAdditionSeparatedExpressions = (
		expression: string
	): number => (
		splitExpression(expression, '+')
			.map((expression: string) => (
				expression.startsWith('(') ?
					parseMultiplicationSeparatedExpressions(
						expression.slice(1, -1)
					) :
					parseInt(expression)
			))
			.reduce((sum: number, value) => sum + value, 0)
	);

	const parseMultiplicationSeparatedExpressions = (
		expression: string
	): number => (
		splitExpression(expression, '*')
			.map((expression: string) => (
				parseAdditionSeparatedExpressions(expression)
			))
			.reduce((product: number, value) => product * value, 1)
	);

	const puzzleInput = readPuzzleInput(__dirname);
	return puzzleInput
		.trim()
		.split('\n')
		.reduce((sum: number, rawEquation: string) => (
			sum +
			parseMultiplicationSeparatedExpressions(
				rawEquation.replace(/ /g, '')
			)
		), 0)
		.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;