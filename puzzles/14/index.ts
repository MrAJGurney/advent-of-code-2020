import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	type MemoryWriteInstruction = {
		location: number;
		value: number;
	}

	type BitmaskInstruction = {
		[position: string]: string;
	}

	const isMemoryWriteInstruction = (
		instruction: MemoryWriteInstruction | BitmaskInstruction
	): instruction is MemoryWriteInstruction => {
		return (instruction as MemoryWriteInstruction).location !== undefined;
	};

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
										value;
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
					guaranteeDefined(bitMask[positionToMask]) +
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
	type MemoryWrite = {
		address: number;
		value: number;
	}

	const isMemoryWrite = (
		instruction: MemoryWrite | Bitmask
	): instruction is MemoryWrite => {
		const { address, value, } = (instruction as MemoryWrite);
		return (address !== undefined) && (value !== undefined);
	};

	type Bitmask = {
		'0': Array<number>;
		'1': Array<number>;
		'X': Array<number>;
	}

	const isBitmask = (
		instruction: MemoryWrite | Bitmask
	): instruction is Bitmask => {
		const { '0': zero, '1': one, 'X': x, } = (instruction as Bitmask);
		return (zero !== undefined) && (one !== undefined) && (x !== undefined);
	};

	const puzzleInput = readPuzzleInput(__dirname);
	const initializationProgram:
		Array< Bitmask | MemoryWrite > =
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
								bitmask: Bitmask,
								value: string,
								index: number
							) => {
								switch (value) {
								case '0':
								case '1':
								case 'X':
									bitmask[value].push(index);
									break;
								default:
									throw new Error('Unexpected bit mask');

								}
								return bitmask;
							}, { '0': [], '1': [], 'X': [], });
					}

					if (rawInstruction.slice(0, 3) === 'mem') {
						const rawComponents = guaranteeDefined(
							rawInstruction.split(' = ')
						);

						const rawAddress = guaranteeDefined(rawComponents[0])
							.replace(/\D/g, '')
							.trim();

						const rawValue = guaranteeDefined(rawComponents[1])
							.trim();

						return {
							address: parseInt(rawAddress),
							value: parseInt(rawValue),
						};
					}

					throw new Error('Unexpected instruction');
				});

	const memory: {[location: string]: number} = {};
	let bitmask: Bitmask = { '0': [], '1': [], 'X': [], };

	for (const instruction of initializationProgram) {

		if (isMemoryWrite(instruction)) {
			const addressAsBinary = instruction.address.toString(2);
			const leadingZeros = '0'.repeat(36 - addressAsBinary.length);
			const baseAddress = (leadingZeros + addressAsBinary)
				.split('')
				.map((value, index) =>
					(bitmask['1'].includes(index) ?
						'1' :
						(bitmask['X'].includes(index) ?
							'0' :
							value))
				)
				.join('');

			for (let i = 0; i < Math.pow(2, bitmask['X'].length); i++) {

				const paddingZeroes = '0'.repeat(
					bitmask['X'].length - i.toString(2).length
				);

				const value = i.toString(2);

				const addressOffset: number =
					(paddingZeroes + value)
						.split('')
						.reduce((
							offset,
							value,
							index
						) => (offset + (
							(value === '1') ?
								Math.pow(
									2,
									35 - guaranteeDefined(
										bitmask['X'][index]
									)
								) :
								0
						)
						), 0
						);

				memory[(parseInt(baseAddress, 2) + addressOffset).toString()] =
					instruction.value;
			}
			continue;
		}

		if (isBitmask(instruction)) {
			bitmask = instruction;
			continue;
		}

		throw new Error('Unexpected instruction');
	}

	return Object
		.values(memory)
		.reduce((total, value) => (total + value), 0)
		.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;