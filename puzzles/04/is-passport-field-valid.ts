import isDefined from '../../utils/is-defined';
import { onlyDigits, onlyDigitsAndLowercaseLetters } from '../common/regex';
import { PASSPORT } from './constants';

const containsOnlyDigits = (text: string): boolean => onlyDigits.test(text);

export const isValidBirthYear = (birthYear: string | undefined): boolean => {
	// byr (Birth Year) - four digits; at least 1920 and at most 2002.
	if (!isDefined(birthYear)) return false;
	if (!containsOnlyDigits(birthYear)) return false;
	const birthYearValue = parseInt(birthYear);
	if (!isDefined(birthYearValue)) return false;
	if (birthYearValue < 1920) return false;
	if (birthYearValue > 2002) return false;

	return true;
};

export const isValidIssueYear = (issueYear: string | undefined): boolean => {
	// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
	if (!isDefined(issueYear)) return false;
	if (!containsOnlyDigits(issueYear)) return false;
	const IssueYearValue = parseInt(issueYear);
	if (!isDefined(IssueYearValue)) return false;
	if (IssueYearValue < 2010) return false;
	if (IssueYearValue > 2020) return false;

	return true;
};

export const isValidExpirationYear = (
	expirationYear: string | undefined
): boolean => {
	// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
	if (!isDefined(expirationYear)) return false;
	if (!containsOnlyDigits(expirationYear)) return false;
	const expirationYearValue = parseInt(expirationYear);
	if (!isDefined(expirationYearValue)) return false;
	if (expirationYearValue < 2020) return false;
	if (expirationYearValue > 2030) return false;

	return true;
};

export const isValidHeight = (height: string | undefined): boolean => {
	// hgt (Height) - a number followed by either cm or in:
	// 	If cm, the number must be at least 150 and at most 193.
	// 	If in, the number must be at least 59 and at most 76.
	if (!isDefined(height)) return false;

	const heightUnit = height.slice(-2);
	if (!isDefined(heightUnit)) return false;

	const rawHeightValue = height.slice(0, -2);
	if (!containsOnlyDigits(rawHeightValue)) return false;
	const heightValue = parseInt(rawHeightValue);
	if (!isDefined(heightValue)) return false;

	if (heightUnit === 'cm') {
		if (heightValue < 150) return false;
		if (heightValue > 193) return false;
		return true;
	}
	if (heightUnit === 'in') {
		if (heightValue < 59) return false;
		if (heightValue > 76) return false;
		return true;
	}

	return false;
};

export const isValidHairColor = (hairColor: string | undefined): boolean => {
	// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
	if (!isDefined(hairColor)) return false;
	if (hairColor.length !== 7) return false;
	if (hairColor[0] !== '#') return false;
	if (!onlyDigitsAndLowercaseLetters.test(hairColor.slice(1))) return false;

	return true;
};

export const isValidEyeColor = (eyeColor: string | undefined): boolean => {
	// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
	if (!isDefined(eyeColor)) return false;
	if (!PASSPORT.EYE_COLORS.includes(eyeColor)) return false;

	return true;
};

export const isValidPassportId = (passportId: string | undefined): boolean => {
	// pid (Passport ID) - a nine-digit number, including leading zeroes.
	if (!isDefined(passportId)) return false;
	if (passportId.length !== 9) return false;
	if (!containsOnlyDigits(passportId)) return false;

	return true;
};