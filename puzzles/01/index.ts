import { ExpenseReport } from './types';
import { PuzzleSolver, Stars } from '../../types';

import isDefined from '../../utils/is-defined';
import readPuzzleInput from '../common/read-puzzle-input';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const expenseReport: ExpenseReport = formatPuzzleInput(puzzleInput);

	for (let i = 0; i < expenseReport.length; i++) {
		for (let j = i; j < expenseReport.length; j++) {
			const firstExpense = expenseReport[i];
			const secondExpense = expenseReport[j];
			if (!isDefined(firstExpense)) {
				throw new Error(
					/* eslint-disable-next-line max-len */
					`Unexpected value at position ${i} in array length ${expenseReport.length}: ${firstExpense}`
				);
			}
			if (!isDefined(secondExpense)) {
				throw new Error(
					/* eslint-disable-next-line max-len */
					`Unexpected value at position ${j} in array length ${expenseReport.length}: ${secondExpense}`
				);
			}

			if (firstExpense + secondExpense === 2020) {
				return (firstExpense * secondExpense).toString();
			}
		}
	}

	throw new Error('Unable to find solution');
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const expenseReport: ExpenseReport = formatPuzzleInput(puzzleInput);

	for (let i = 0; i < expenseReport.length; i++) {
		for (let j = i + 1; j < expenseReport.length; j++) {
			for (let k = j + 1; k < expenseReport.length; k++) {
				const firstExpense = expenseReport[i];
				const secondExpense = expenseReport[j];
				const thirdExpense = expenseReport[k];
				if (!isDefined(firstExpense)) {
					throw new Error(
						/* eslint-disable-next-line max-len */
						`Unexpected value at position ${i} in array length ${expenseReport.length}: ${firstExpense}`
					);
				}
				if (!isDefined(secondExpense)) {
					throw new Error(
						/* eslint-disable-next-line max-len */
						`Unexpected value at position ${j} in array length ${expenseReport.length}: ${secondExpense}`
					);
				}
				if (!isDefined(thirdExpense)) {
					throw new Error(
						/* eslint-disable-next-line max-len */
						`Unexpected value at position ${k} in array length ${expenseReport.length}: ${thirdExpense}`
					);
				}

				if (firstExpense + secondExpense + thirdExpense === 2020) {
					return (
						firstExpense * secondExpense * thirdExpense
					).toString();
				}
			}
		}
	}

	throw new Error('Unable to find solution');
};

const formatPuzzleInput = (puzzleInput: string): ExpenseReport => {
	const expensesAsText: string[] = puzzleInput.trim().split('\n');
	const expensesAsNumbers: number[] = expensesAsText.map(
		expense => parseInt(expense)
	);
	return expensesAsNumbers;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;