import { Instruction, Processor, ProcessorState, Operation } from './types';

import isDefined from '../../utils/is-defined';

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

export default runCode;