import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

enum Action {
	MoveNorth = 'N',
	MoveSouth = 'S',
	MoveEast = 'E',
	MoveWest = 'W',
	TurnLeft = 'L',
	TurnRight = 'R',
	MoveForward = 'F'
}

type Instruction = {
	action: Action;
	value: number;
}

type Coordinates = {
	north: number;
	east: number;
}

type ShipStatus = {
	coordinates: Coordinates,
	facing: Coordinates,
}

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const instructions: Instruction[] = puzzleInput
		.trim()
		.split('\n')
		.map(instruction => {
			const rawAction = guaranteeDefined(instruction[0]);
			const rawValue = guaranteeDefined(instruction.slice(1));

			return {
				action: parseAction(rawAction),
				value: parseInt(rawValue),
			};
		});

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

const parseAction = (text: string): Action => {
	switch (text) {
	case Action.MoveNorth:
	case Action.MoveSouth:
	case Action.MoveEast:
	case Action.MoveWest:
	case Action.TurnLeft:
	case Action.TurnRight:
	case Action.MoveForward:
		return text;
	default:
		throw new Error('Unexpected action');
	}
};

const rotate = (angle: number, oldFacing: Coordinates): Coordinates => {
	if (angle % 90 !== 0) {
		throw new Error('Unexpected angle');
	}

	const ninetyDegreeRotationCount = angle / 90;

	const facing = { ...oldFacing, };

	if (ninetyDegreeRotationCount > 0) {
		for (
			let rotations = 0;
			rotations < ninetyDegreeRotationCount;
			rotations++
		) {
			const { north: oldNorth, east: oldEast, } = facing;
			facing.north = -oldEast;
			facing.east = oldNorth;
		}
	} else if (ninetyDegreeRotationCount < 0) {
		for (
			let rotations = 0;
			rotations > ninetyDegreeRotationCount;
			rotations--
		) {
			const { north: oldNorth, east: oldEast, } = facing;
			facing.north = oldEast;
			facing.east = -oldNorth;
		}
	}

	return facing;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;