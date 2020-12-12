import { Instruction, Action } from './types';

import guaranteeDefined from '../common/guarantee-defined';

const parseInstructions = (puzzleInput: string): Instruction[] => (
	puzzleInput
		.trim()
		.split('\n')
		.map(instruction => {
			const rawAction = guaranteeDefined(instruction[0]);
			const rawValue = guaranteeDefined(instruction.slice(1));

			return {
				action: parseAction(rawAction),
				value: parseInt(rawValue),
			};
		}
		)
);

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

export default parseInstructions;