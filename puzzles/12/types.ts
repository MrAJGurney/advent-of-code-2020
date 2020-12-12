export enum Action {
	MoveNorth = 'N',
	MoveSouth = 'S',
	MoveEast = 'E',
	MoveWest = 'W',
	TurnLeft = 'L',
	TurnRight = 'R',
	MoveForward = 'F'
}

export type Instruction = {
	action: Action;
	value: number;
}

export type Coordinates = {
	north: number;
	east: number;
}

export type ShipStatus = {
	coordinates: Coordinates,
	facing: Coordinates,
}