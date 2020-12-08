import { PuzzleSolver, Stars } from '../../types';

import isDefined from '../../utils/is-defined';
import readPuzzleInput from '../common/read-puzzle-input';

enum Operation {
	Accumulate = 'acc',
	NoOperation = 'nop',
	Jump = 'jmp',
}

type Instruction = {
	operation: Operation;
	argument: number;
}

enum ProcessorState {
	Running,
	Looping,
	Halted,
}

type Processor = {
	linesVisited: number[];
	accumulator: number;
	state: ProcessorState;
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

	const processorAtLoop = runCode(instructions);

	return processorAtLoop.accumulator.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
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

	const processorAtHalt = findAndRunWithUncorruptedOperation(instructions);

	return processorAtHalt.accumulator.toString();
};

const formatOperation = (raw: string): Operation => {
	switch (raw) {
	case 'acc':
		return Operation.Accumulate;
	case 'nop':
		return Operation.NoOperation;
	case 'jmp':
		return Operation.Jump;
	default:
		throw new Error(`Not a valid operation: ${raw}`);
	}
};

const findAndRunWithUncorruptedOperation = (
	instructions: Instruction[]
): Processor => {
	const corruptedOperations: Operation[] = [
		Operation.Jump,
		Operation.NoOperation,
	];

	const potentiallyCoruptedIndices: number[] =
		instructions.reduce((
			indices: number[],
			instruction: Instruction,
			index
		) => {
			if (corruptedOperations.includes(instruction.operation)) {
				indices.push(index);
			}

			return indices;
		}, []);

	for (let i = 0; i < potentiallyCoruptedIndices.length; i++) {
		const instructionsWithFix: Instruction[] = instructions
			.map(instruction => ({ ...instruction, }));

		const indexToFix = potentiallyCoruptedIndices[i];

		if(!isDefined(indexToFix)) {
			throw new Error(
				/* eslint-disable-next-line max-len */
				`Undefined index to fix at position ${i} of ${potentiallyCoruptedIndices.length}`
			);
		}

		const instructionToFix = instructionsWithFix[indexToFix];

		if(!isDefined(instructionToFix)) {
			throw new Error(
				/* eslint-disable-next-line max-len */
				`Undefined index to fix at position ${indexToFix} of ${instructionsWithFix.length}`
			);
		}

		instructionToFix.operation =
			instructionToFix.operation === Operation.Jump ?
				Operation.NoOperation :
				Operation.Jump;

		const processor =	runCode(instructionsWithFix);

		if (processor.state === ProcessorState.Halted) {
			return processor;
		}
	}

	throw new Error('Unable to find solution');
};

const runCode = (instructions: Instruction[]): Processor => {
	const processor: Processor = {
		linesVisited: [],
		accumulator: 0,
		state: ProcessorState.Running,
	};

	let instructionIndex = 0;

	while (processor.state === ProcessorState.Running) {
		processor.linesVisited.push(instructionIndex);

		const instruction = instructions[instructionIndex];

		if(!isDefined(instruction)) {
			throw new Error(
				/* eslint-disable-next-line max-len */
				`Undefined instruction at ${instructionIndex} of ${instructions.length} instructions`
			);
		}

		switch (instruction.operation) {
		case Operation.Accumulate:
			processor.accumulator += instruction.argument;
			instructionIndex += 1;
			break;
		case Operation.Jump:
			instructionIndex += instruction.argument;
			break;
		case Operation.NoOperation:
			instructionIndex += 1;
			break;
		default:
			/* eslint-disable-next-line max-len */
			throw new Error(`Unexpected instruction operation ${instruction.operation}`);
		}

		if (instructionIndex === instructions.length) {
			processor.state = ProcessorState.Halted;
		} else if (processor.linesVisited.includes(instructionIndex)) {
			processor.state = ProcessorState.Looping;
		}
	}

	return processor;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;