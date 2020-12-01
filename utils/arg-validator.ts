import { isStringDefined } from './is-defined';

export const validateDay = (day: string | undefined): number => {
	const min = 1;
	const max = 25;
	return validateArg(day, 'day', min, max);
};

export const validateStar = (star: string | undefined): number => {
	const min = 1;
	const max = 2;
	return validateArg(star, 'star', min, max);
};

const validateArg = (
	argValue: string | undefined,
	argName: string,
	min: number,
	max: number): number => {
	const invalidArg = new Error(
	/* eslint-disable-next-line max-len */
		`${argName} must be an integer between ${min} and ${max} inclusive. Incorrect value: ${argValue}`
	);

	if(!isStringDefined(argValue)) {
		throw invalidArg;
	}

	const parsedValue = parseInt(argValue);

	if (!validateInteger(parsedValue)) {
		throw invalidArg;
	}

	if (!validateRange(parsedValue, min, max)) {
		throw invalidArg;
	}
	return parsedValue;
};

const validateInteger = (value: number): boolean => {
	if (isNaN(value)) {
		return false;
	}

	if (value % 1 !== 0) {
		return false;
	}

	return true;
};

const validateRange = (value: number, min: number, max: number): boolean => {
	if (value < min) {
		return false;
	}

	if (value > max) {
		return false;
	}

	return true;
};