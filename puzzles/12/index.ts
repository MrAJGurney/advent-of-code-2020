import { PuzzleSolver, Stars } from '../../types';
import { Instruction, Action, ShipStatus } from './types';

import readPuzzleInput from '../common/read-puzzle-input';
import parseInstructions from './parse-instructions';
import rotate from './rotate';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = parseInstructions(puzzleInput);

	const { coordinates:{ north, east, }, } = instructions.reduce((
		shipStatus,
		{ action, value, }: Instruction
	): ShipStatus => {
		switch (action) {
		case Action.MoveNorth:
			shipStatus.coordinates.north += value;
			break;
		case Action.MoveSouth:
			shipStatus.coordinates.north -= value;
			break;
		case Action.MoveEast:
			shipStatus.coordinates.east += value;
			break;
		case Action.MoveWest:
			shipStatus.coordinates.east -= value;
			break;
		case Action.TurnLeft:
			shipStatus.facing = rotate(-value, shipStatus.facing);
			break;
		case Action.TurnRight:
			shipStatus.facing = rotate(value, shipStatus.facing);
			break;
		case Action.MoveForward:
			shipStatus.coordinates.north += value * shipStatus.facing.north;
			shipStatus.coordinates.east += value * shipStatus.facing.east;
			break;
		}

		return shipStatus;
	}, {
		coordinates: {
			north: 0,
			east: 0, },
		facing: {
			north: 0,
			east: 1,
		},
	});

	return (Math.abs(north) + Math.abs(east)).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error('todo');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;