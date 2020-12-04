import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import { Passport } from './types';
import { PASSPORT } from './constants';
import { buildPassports } from './build-passports';
import {
	isValidBirthYear,
	isValidIssueYear,
	isValidExpirationYear,
	isValidHeight,
	isValidHairColor,
	isValidEyeColor,
	isValidPassportId
} from './is-passport-field-valid';

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const passports = buildPassports(puzzleInput);
	return passports
		.filter(passport => passportHasRequiredKeys(passport))
		.length
		.toString();
};

const passportHasRequiredKeys = (passport: Passport): passport is Passport =>
	Object.keys(passport).length === PASSPORT.REQUIRED_FIELDS.length;

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	const passports = buildPassports(puzzleInput);
	return passports
		.filter(passport => passportValuesAreValid(passport))
		.length
		.toString();
};

const passportValuesAreValid = ({
	byr: birthYear,
	iyr: issueYear,
	eyr: expirationYear,
	hgt: height,
	hcl: hairColor,
	ecl: eyeColor,
	pid: passportId,
}: Passport): boolean => {
	if (!isValidBirthYear(birthYear)) return false;
	if (!isValidIssueYear(issueYear)) return false;
	if (!isValidExpirationYear(expirationYear)) return false;
	if (!isValidHeight(height)) return false;
	if (!isValidHairColor(hairColor)) return false;
	if (!isValidEyeColor(eyeColor)) return false;
	if (!isValidPassportId(passportId)) return false;
	return true;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;