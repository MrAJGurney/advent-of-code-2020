const puzzles = require('./puzzles/puzzles');
const { validateDay, validateStar, } = require('./cliTool/arg-validator');

const adventOfCode = async () => {
	const args = process.argv.slice(2);
	const [day, star, ] = args;

	validateDay(day);
	validateStar(star);

	const solver = puzzles[day].stars[star];
	const title = puzzles[day].title;
	const { solution, executionTime, } = await solveWithExecutionTime(solver);

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

const solveWithExecutionTime = async solver => {
	const highResolutionTimeStart = process.hrtime();
	const solution = await solver();
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
