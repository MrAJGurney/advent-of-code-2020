import { PuzzleSolver } from '../types';

export const isStringDefined = (
	text: string | undefined
): text is Exclude<typeof text, undefined> => (
	text !== undefined
);

export const isNumberDefined = (
	number: number | undefined
): number is Exclude<typeof number, undefined> => (
	number !== undefined
);
export const isPuzzleSolverDefined = (
	solver: PuzzleSolver | undefined
): solver is Exclude<typeof solver, undefined> => (
	solver !== undefined
);