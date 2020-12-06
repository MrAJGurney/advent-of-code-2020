import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import isDefined from '../../utils/is-defined';

type Answer = string;

type PersonAnswers = Answer[];

type GroupAnswers = PersonAnswers[];

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	return puzzleInput
		.trim()
		.split('\n\n')
		.map((rawGroup: string): number => {
			const allAnswersForGroup: Answer[] = rawGroup
				.replace(/[\n| ]/g, '')
				.split('');
			return new Set(allAnswersForGroup).size;
		})
		.reduce((sum, yesCount) => sum + yesCount, 0)
		.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	const groupsAnswers: GroupAnswers[] = puzzleInput
		.trim()
		.split('\n\n')
		.map((rawGroup: string): GroupAnswers =>
			rawGroup
				.trim()
				.split('\n')
				.map((rawPerson: string): PersonAnswers =>
					rawPerson
						.trim()
						.split('')
				)
		);

	return groupsAnswers
		.reduce((sum, groupAnswers) =>
			sum + findCommonYesAnswers(groupAnswers).length, 0)
		.toString();
};

const findCommonYesAnswers = (groupAnswers: GroupAnswers): string[] => {
	const possibleYesAnswers: PersonAnswers | undefined = groupAnswers[0];

	if (!isDefined(possibleYesAnswers)) {
		/* eslint-disable-next-line max-len */
		throw new Error(
			`Undefined at position 0 in array length ${groupAnswers.length}`
		);
	}

	const intersections = possibleYesAnswers
		.reduce((
			intersection: string[],
			yesAnswer: Answer
		): string[] => {
			if (
				groupAnswers.every(personAnswers =>
					personAnswers.includes(yesAnswer))
			) {
				intersection.push(yesAnswer);
			}
			return intersection;
		}, []);

	return intersections;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;