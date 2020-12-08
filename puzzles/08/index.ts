import { PuzzleSolver, Stars } from '../../types';
import { Instruction } from './types';

import readPuzzleInput from '../common/read-puzzle-input';
import buildInstructions from './build-instructions';
import runCode from './run-code';
import fixCorruptedOperationAndRun from './fix-corrupted-operation-and-run';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = buildInstructions(puzzleInput);

	const processorAtLoop = runCode(instructions);

	return processorAtLoop.accumulator.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = buildInstructions(puzzleInput);

	const processorAtHalt = fixCorruptedOperationAndRun(instructions);

	return processorAtHalt.accumulator.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;