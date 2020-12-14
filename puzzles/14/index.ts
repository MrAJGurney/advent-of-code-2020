import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

type MemoryWriteInstruction = {
	location: number;
	value: number;
}

type BitmaskInstruction = {
	[position: string]: number;
}

const isMemoryWriteInstruction = (
	instruction: MemoryWriteInstruction | BitmaskInstruction
): instruction is MemoryWriteInstruction => {
	return (instruction as MemoryWriteInstruction).location !== undefined;
};

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const initializationProgram:
		Array< BitmaskInstruction | MemoryWriteInstruction > =
			puzzleInput
				.trim()
				.split('\n')
				.map(rawInstruction => {
					if (rawInstruction.slice(0, 4) === 'mask') {
						const rawComponents = guaranteeDefined(
							rawInstruction.split(' = ')
						);
						const mask = guaranteeDefined(rawComponents[1]).trim();

						return mask
							.split('')
							.reduce((
								bitmaskInstruction: BitmaskInstruction,
								value: string,
								index: number
							) => {
								if (value !== 'X') {
									bitmaskInstruction[index.toString()] =
									parseInt(value);
								}

								return bitmaskInstruction;
							}, {});
					}

					if (rawInstruction.slice(0, 3) === 'mem') {
						const rawComponents = guaranteeDefined(
							rawInstruction.split(' = ')
						);

						const rawLocation = guaranteeDefined(rawComponents[0])
							.replace(/\D/g, '')
							.trim();

						const rawValue = guaranteeDefined(rawComponents[1])
							.trim();

						return {
							location: parseInt(rawLocation),
							value: parseInt(rawValue),
						};
					}

					throw new Error('Unexpected instruction');
				});

	const memory: {[location: string]: number} = {};
	let bitMask: BitmaskInstruction = {};

	for (const instruction of initializationProgram) {

		if (isMemoryWriteInstruction(instruction)) {
			const memoryWriteInstruction: MemoryWriteInstruction = instruction;
			const valueAsBinary = memoryWriteInstruction.value.toString(2);
			const leadingZeros = '0'.repeat(36 - valueAsBinary.length);
			let memoryValue = leadingZeros + valueAsBinary;
			for (const positionToMask of Object.keys(bitMask)) {
				memoryValue = memoryValue.slice(0, parseInt(positionToMask)) +
					guaranteeDefined(bitMask[positionToMask]).toString() +
					memoryValue.slice(parseInt(positionToMask) + 1);
			}

			memory[memoryWriteInstruction.location.toString()] =
				parseInt(memoryValue, 2);
		} else {
			const bitmaskInstruction: BitmaskInstruction = instruction;
			bitMask = bitmaskInstruction;
		}
	}

	return Object
		.values(memory)
		.reduce((total, value) => (total + value), 0)
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