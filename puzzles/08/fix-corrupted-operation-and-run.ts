import { Operation, Instruction, ProcessorState, Processor } from './types';

import isDefined from '../../utils/is-defined';
import runCode from './run-code';

const fixCorruptedOperationAndRun = (
	instructions: Instruction[]
): Processor => {
	const corruptedOperations: Operation[] = [
		Operation.Jump,
		Operation.NoOperation,
	];

	const potentiallyCoruptedIndices: number[] =
		instructions.reduce((
			indices: number[],
			instruction: Instruction,
			index
		) => {
			if (corruptedOperations.includes(instruction.operation)) {
				indices.push(index);
			}

			return indices;
		}, []);

	for (let i = 0; i < potentiallyCoruptedIndices.length; i++) {
		const instructionsWithFix: Instruction[] = instructions
			.map(instruction => ({ ...instruction, }));

		const indexToFix = potentiallyCoruptedIndices[i];

		if(!isDefined(indexToFix)) {
			throw new Error(
				/* eslint-disable-next-line max-len */
				`Undefined index to fix at position ${i} of ${potentiallyCoruptedIndices.length}`
			);
		}

		const instructionToFix = instructionsWithFix[indexToFix];

		if(!isDefined(instructionToFix)) {
			throw new Error(
				/* eslint-disable-next-line max-len */
				`Undefined index to fix at position ${indexToFix} of ${instructionsWithFix.length}`
			);
		}

		instructionToFix.operation =
			instructionToFix.operation === Operation.Jump ?
				Operation.NoOperation :
				Operation.Jump;

		const processor = runCode(instructionsWithFix);

		if (processor.state === ProcessorState.Halted) {
			return processor;
		}
	}

	throw new Error('Unable to find solution');
};

export default fixCorruptedOperationAndRun;