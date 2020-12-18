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
	throw new Error('TODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;