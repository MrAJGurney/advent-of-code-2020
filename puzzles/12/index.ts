import { PuzzleSolver, Stars } from '../../types';
import { Instruction, Action, ShipVectors } from './types';

import readPuzzleInput from '../common/read-puzzle-input';
import parseInstructions from './parse-instructions';
import rotate from './rotate';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = parseInstructions(puzzleInput);

	const { position: { north, east, }, } = instructions.reduce((
		shipVectors,
		{ action, value, }: Instruction
	): ShipVectors => {
		switch (action) {
		case Action.MoveNorth:
			shipVectors.position.north += value;
			break;
		case Action.MoveSouth:
			shipVectors.position.north -= value;
			break;
		case Action.MoveEast:
			shipVectors.position.east += value;
			break;
		case Action.MoveWest:
			shipVectors.position.east -= value;
			break;
		case Action.TurnLeft:
			shipVectors.direction = rotate(-value, shipVectors.direction);
			break;
		case Action.TurnRight:
			shipVectors.direction = rotate(value, shipVectors.direction);
			break;
		case Action.MoveForward:
			shipVectors.position.north += value * shipVectors.direction.north;
			shipVectors.position.east += value * shipVectors.direction.east;
			break;
		}

		return shipVectors;
	}, {
		position: {
			north: 0,
			east: 0, },
		direction: {
			north: 0,
			east: 1,
		},
	});

	return (Math.abs(north) + Math.abs(east)).toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = parseInstructions(puzzleInput);

	const { position: { north, east, }, } = instructions.reduce((
		shipVectors,
		{ action, value, }: Instruction
	): ShipVectors => {
		switch (action) {
		case Action.MoveNorth:
			shipVectors.direction.north += value;
			break;
		case Action.MoveSouth:
			shipVectors.direction.north -= value;
			break;
		case Action.MoveEast:
			shipVectors.direction.east += value;
			break;
		case Action.MoveWest:
			shipVectors.direction.east -= value;
			break;
		case Action.TurnLeft:
			shipVectors.direction = rotate(-value, shipVectors.direction);
			break;
		case Action.TurnRight:
			shipVectors.direction = rotate(value, shipVectors.direction);
			break;
		case Action.MoveForward:
			shipVectors.position.north += value * shipVectors.direction.north;
			shipVectors.position.east += value * shipVectors.direction.east;
			break;
		}

		return shipVectors;
	}, {
		position: {
			north: 0,
			east: 0, },
		direction: {
			north: 1,
			east: 10,
		},
	});

	return (Math.abs(north) + Math.abs(east)).toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;