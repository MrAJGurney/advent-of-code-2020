import {
	isStringDefined,
	PuzzleSolver,
	isPuzzleSolverDefined
} from './advent-of-code.types';

import puzzles from './puzzles';
import { validateDay, validateStar } from './cliTool/arg-validator';

const adventOfCode = () => {
	const args = process.argv.slice(2);
	const [rawDay, rawStar, ] = args;

	const day = validateDay(rawDay);
	const star = validateStar(rawStar);

	const solver: PuzzleSolver | undefined = puzzles?.[day]?.stars?.[star];
	const title: string | undefined = puzzles?.[day]?.title;

	if (!isPuzzleSolverDefined(solver)) {
		throw new Error(
			`No solution for day ${day} and star ${star}`
		);
	}

	if (!isStringDefined(title)) {
		throw new Error(
			`Missing title for day ${day}`
		);
	}

	const {
		solution,
		executionTime,
	} = solveWithExecutionTime(solver);

	/* eslint-disable no-console */
	console.log(
		JSON.stringify(
			{
				title,
				date: {
					day,
					star,
				},
				executionTime,
				solution,
			},
			null,
			2
		)
	);
	/* eslint-enable no-console */
};

interface ExecutionTime {
	minutes: number;
	seconds: number;
	milliseconds: number;
	microseconds: number;
	nanoseconds: number;
}

const solveWithExecutionTime = (
	solver: PuzzleSolver
): {
	solution: string
	executionTime: ExecutionTime
} => {
	const highResolutionTimeStart = process.hrtime();
	const solution = solver();
	const [seconds, nanoseconds, ] = process.hrtime(highResolutionTimeStart);
	const totalElapsedNanoseconds = seconds * Math.pow(1000, 3) + nanoseconds;
	const totalElapsedMicroseconds = Math.round(
		totalElapsedNanoseconds / Math.pow(1000, 1)
	);
	const totalElapsedMilliseconds = Math.round(
		totalElapsedNanoseconds / Math.pow(1000, 2)
	);
	const totalElapsedSeconds = Math.round(
		totalElapsedNanoseconds / Math.pow(1000, 3)
	);
	const totalElapsedMinutes = Math.round(
		totalElapsedNanoseconds / (Math.pow(1000, 3) * 60)
	);

	return {
		solution,
		executionTime: {
			minutes: totalElapsedMinutes,
			seconds: totalElapsedSeconds,
			milliseconds: totalElapsedMilliseconds,
			microseconds: totalElapsedMicroseconds,
			nanoseconds: totalElapsedNanoseconds,
		},
	};
};

adventOfCode();
