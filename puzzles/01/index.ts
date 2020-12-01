import {
	PuzzleSolver,
	Stars,
	isNumberDefined
} from '../../advent-of-code.types';
import { ExpenseReport } from './report-repair.types';

import fs from 'fs';
import path from 'path';

const solveFirstPuzzle: PuzzleSolver = () => {
	const fileContents = readFile();
	const expenseReport: ExpenseReport = formatExpenseReport(fileContents);

	for (let i = 0; i < expenseReport.length; i++) {
		for (let j = i; j < expenseReport.length; j++) {
			const firstExpense = expenseReport[i];
			const secondExpense = expenseReport[j];
			if(!isNumberDefined(firstExpense)) {
				throw new Error(
					/* eslint-disable-next-line max-len */
					`Unexpected value at position ${i} in array length ${expenseReport.length}: ${firstExpense}`
				);
			}
			if(!isNumberDefined(secondExpense)) {
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
	const fileContents = readFile();
	const expenseReport: ExpenseReport = formatExpenseReport(fileContents);

	for (let i = 0; i < expenseReport.length; i++) {
		for (let j = i+1; j < expenseReport.length; j++) {
			for (let k = j+1; k < expenseReport.length; k++) {
				const firstExpense = expenseReport[i];
				const secondExpense = expenseReport[j];
				const thirdExpense = expenseReport[k];
				if(!isNumberDefined(firstExpense)) {
					throw new Error(
						/* eslint-disable-next-line max-len */
						`Unexpected value at position ${i} in array length ${expenseReport.length}: ${firstExpense}`
					);
				}
				if(!isNumberDefined(secondExpense)) {
					throw new Error(
						/* eslint-disable-next-line max-len */
						`Unexpected value at position ${j} in array length ${expenseReport.length}: ${secondExpense}`
					);
				}
				if(!isNumberDefined(thirdExpense)) {
					throw new Error(
						/* eslint-disable-next-line max-len */
						`Unexpected value at position ${k} in array length ${expenseReport.length}: ${thirdExpense}`
					);
				}

				if (firstExpense + secondExpense +thirdExpense === 2020) {
					return (
						firstExpense * secondExpense * thirdExpense
					).toString();
				}
			}
		}
	}

	throw new Error('Unable to find solution');
};

const readFile = (): string => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	return fileContents;
};

const formatExpenseReport = (fileContents: string): ExpenseReport => {
	const expensesAsText = fileContents.trim().split('\n');
	const expensesAsNumbers = expensesAsText.map(expense => parseInt(expense));
	return expensesAsNumbers;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;