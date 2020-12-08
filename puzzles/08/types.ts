export enum Operation {
	Accumulate = 'acc',
	NoOperation = 'nop',
	Jump = 'jmp',
}

export type Instruction = {
	operation: Operation;
	argument: number;
}

export enum ProcessorState {
	Running,
	Looping,
	Halted,
}

export type Processor = {
	linesVisited: number[];
	accumulator: number;
	state: ProcessorState;
}