import { PasswordWithSledPolicy } from './types';
import { isStringDefined, isNumberDefined } from '../../utils/is-defined';

export const buildPasswordsWithSledPolicy = (
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

export const isValidSledPassword = ({
	password,
	policy,
}: PasswordWithSledPolicy): boolean => {
	const characterOccurrences = (
		password.match((new RegExp(policy.character, 'g'))) || []
	).length;

	if(characterOccurrences > policy.max) {
		return false;
	}

	if(characterOccurrences < policy.min) {
		return false;
	}

	return true;
};