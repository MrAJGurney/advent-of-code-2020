import { Instruction, Operation } from './types';

import isDefined from '../../utils/is-defined';

const buildInstructions = (puzzleInput: string): Instruction[] => (
	puzzleInput
		.trim()
		.split('\n')
		.map(line => {
			const [rawOperation, rawArgument, ] = line
				.trim()
				.split(' ');

			if(!isDefined(rawOperation)) {
				throw new Error(
					`Undefined operation in line ${line} `
				);
			}

			if(!isDefined(rawArgument)) {
				throw new Error(
					`Undefined argument in line ${line} `
				);
			}

			return {
				operation: formatOperation(rawOperation),
				argument: parseInt(rawArgument),
			};
		})
);

const formatOperation = (raw: string): Operation => {
	switch (raw) {
	case 'acc':
		return Operation.Accumulate;
	case 'nop':
		return Operation.NoOperation;
	case 'jmp':
		return Operation.Jump;
	default:
		throw new Error(`Not a valid operation: ${raw}`);
	}
};

export default buildInstructions;