import { PuzzleSolver, Stars } from '../../types';

import isDefined from '../../utils/is-defined';
import readPuzzleInput from '../common/read-puzzle-input';

enum Operation {
	Acc = 'acc',
	Nop = 'nop',
	Jmp = 'jmp',
}

type Instruction = {
	operation: Operation;
	argument: number;
}

type Processor = {
	linesVisited: number[];
	accumulator: number;
}

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = puzzleInput
		.trim()
		.split('\n')
		.map(line => {
			const [rawOperation, rawArgument, ] = line
				.trim()
				.split(' ');

			if(!isDefined(rawOperation)) {
				throw new Error(
					`Undefined operation in line ${line} `
				);
			}

			if(!isDefined(rawArgument)) {
				throw new Error(
					`Undefined argument in line ${line} `
				);
			}

			return {
				operation: formatOperation(rawOperation),
				argument: parseInt(rawArgument),
			};
		});

	const processorAtInfiniteLoop = runCodeUntilInfiniteLoop(instructions);

	return processorAtInfiniteLoop.accumulator.toString();
};

const formatOperation = (raw: string): Operation => {
	switch (raw) {
	case 'acc':
		return Operation.Acc;
	case 'nop':
		return Operation.Nop;
	case 'jmp':
		return Operation.Jmp;
	default:
		throw new Error(`Not a valid operation: ${raw}`);
	}
};

const runCodeUntilInfiniteLoop = (instructions: Instruction[]) => {
	const processor: Processor = {
		linesVisited: [],
		accumulator: 0,
	};

	let instructionIndex = 0;

	while (!processor.linesVisited.includes(instructionIndex)) {
		processor.linesVisited.push(instructionIndex);

		const instruction = instructions[instructionIndex];

		if(!isDefined(instruction)) {
			throw new Error(
				/* eslint-disable-next-line max-len */
				`Undefined instruction at ${instructionIndex} of ${instructions.length} instructions`
			);
		}

		switch (instruction.operation) {
		case Operation.Acc:
			processor.accumulator += instruction.argument;
			instructionIndex += 1;
			break;
		case Operation.Jmp:
			instructionIndex += instruction.argument;
			break;
		case Operation.Nop:
			instructionIndex += 1;
			break;
		default:
			/* eslint-disable-next-line max-len */
			throw new Error(`Unexpected instruction operation ${instruction.operation}`);
		}
	}

	return processor;
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('Unable to find solution');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;