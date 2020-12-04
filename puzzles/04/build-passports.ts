import { Passport, PassportKey } from './types';

import isDefined from '../../utils/is-defined';
import { PASSPORT } from './constants';

export const buildPassports = (puzzleInput: string): Passport[] => {
	const rawPassports = puzzleInput.trim().split('\n\n');
	return rawPassports.map(rawPassport => buildPassport(rawPassport));
};

const buildPassport = (rawPassport: string): Passport => {
	const newlineOrSpace = /[\n| ]/;
	const passportParams = rawPassport.split(newlineOrSpace);

	return passportParams.reduce((passport: Passport, param) => {
		const [key, value, ] = param.split(':');
		if (!isDefined(key)) {
			throw new Error(
				`Key is undefined in params list: ${passportParams}`
			);
		}
		if (isPassportKey(key)) {
			passport[key] = value;
		}
		return passport;
	}, {});
};

const isPassportKey = (key: string): key is PassportKey =>
	PASSPORT.REQUIRED_FIELDS.includes(key);