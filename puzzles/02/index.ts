import { PasswordWithSledPolicy, PasswordWithTobogganPolicy } from './types';
import { PuzzleSolver, Stars } from '../../types';

import { isStringDefined, isNumberDefined } from '../../utils/is-defined';

import fs from 'fs';
import path from 'path';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput();
	const passwordsWithPolicy =
		formaPuzzleInputAsSledPasswordValidation(puzzleInput);

	return passwordsWithPolicy
		.filter(passwordWithPolicy => isValidSledPassword(passwordWithPolicy))
		.length
		.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput();
	const passwordsWithPolicy =
		formaPuzzleInputAsTobogganPasswordValidation(puzzleInput);

	return passwordsWithPolicy
		.filter(
			passwordWithPolicy => isValidTobogganPassword(passwordWithPolicy)
		)
		.length
		.toString();
};

const readPuzzleInput = (): string => {
	const inputFile = 'input.txt';
	const filePath = path.join(__dirname, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	return fileContents;
};

const formaPuzzleInputAsSledPasswordValidation = (
	puzzleInput: string
): PasswordWithSledPolicy[] => (
	puzzleInput
		.trim()
		.split('\n')
		.map(line => {
			const [policy, password, ] = line.split(': ');
			if(!isStringDefined(policy)) {
				throw new Error(`Policy is undefined for line ${line}`);
			}
			if(!isStringDefined(password)) {
				throw new Error(`Password is undefined for line ${line}`);
			}

			const [range, character, ] = policy.split(' ');
			if(!isStringDefined(range)) {
				throw new Error(`Range is undefined for line ${line}`);
			}
			if(!isStringDefined(character)) {
				throw new Error(`Character is undefined for line ${line}`);
			}

			const [rawMin, rawMax, ] = range.split('-');
			if(!isStringDefined(rawMin)) {
				throw new Error(`Min is undefined for line ${line}`);
			}
			if(!isStringDefined(rawMax)) {
				throw new Error(`Max is undefined for line ${line}`);
			}

			const min = parseInt(rawMin);
			const max = parseInt(rawMax);
			if(!isNumberDefined(min)) {
				throw new Error(`Min is an invalid number for line ${line}`);
			}
			if(!isNumberDefined(max)) {
				throw new Error(`Max is an invalid number for line ${line}`);
			}

			return {
				password,
				policy: {
					character,
					min,
					max,
				},
			};
		})
);

const isValidSledPassword = ({
	password,
	policy,
}: PasswordWithSledPolicy): boolean => {
	const characterOccurences = (
		password.match((new RegExp(policy.character, 'g'))) || []
	).length;

	if(characterOccurences > policy.max) {
		return false;
	}

	if(characterOccurences < policy.min) {
		return false;
	}

	return true;
};

const formaPuzzleInputAsTobogganPasswordValidation = (
	puzzleInput: string
): PasswordWithTobogganPolicy[] => (
	puzzleInput
		.trim()
		.split('\n')
		.map(line => {
			const [policy, password, ] = line.split(': ');
			if(!isStringDefined(policy)) {
				throw new Error(`Policy is undefined for line ${line}`);
			}
			if(!isStringDefined(password)) {
				throw new Error(`Password is undefined for line ${line}`);
			}

			const [range, character, ] = policy.split(' ');
			if(!isStringDefined(range)) {
				throw new Error(`Range is undefined for line ${line}`);
			}
			if(!isStringDefined(character)) {
				throw new Error(`Character is undefined for line ${line}`);
			}

			const [rawIndexA, rawIndexB, ] = range.split('-');
			if(!isStringDefined(rawIndexA)) {
				throw new Error(`IndexA is undefined for line ${line}`);
			}
			if(!isStringDefined(rawIndexB)) {
				throw new Error(`IndexB is undefined for line ${line}`);
			}

			const indexA = parseInt(rawIndexA) - 1;
			const indexB = parseInt(rawIndexB) - 1;
			if(!isNumberDefined(indexA)) {
				/* eslint-disable-next-line max-len */
				throw new Error(`IndexA is an invalid number for line ${line}`);
			}
			if(!isNumberDefined(indexB)) {
				/* eslint-disable-next-line max-len */
				throw new Error(`IndexB is an invalid number for line ${line}`);
			}

			return {
				password,
				policy: {
					character,
					indexA,
					indexB,
				},
			};
		})
);

const isValidTobogganPassword = ({
	password,
	policy,
}: PasswordWithTobogganPolicy): boolean => {
	const characterIsInIndexA =
		password[policy.indexA] === policy.character;
	const characterIsInIndexB =
		password[policy.indexB] === policy.character;
	return characterIsInIndexA !== characterIsInIndexB;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;