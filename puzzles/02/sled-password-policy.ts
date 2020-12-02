import { PasswordWithSledPolicy } from './types';
import isDefined from '../../utils/is-defined';

export const buildPasswordsWithSledPolicy = (
	puzzleInput: string
): PasswordWithSledPolicy[] => (
	puzzleInput
		.trim()
		.split('\n')
		.map(line => {
			const [policy, password, ] = line.split(': ');
			if (!isDefined(policy)) {
				throw new Error(`Policy is undefined for line ${line}`);
			}
			if (!isDefined(password)) {
				throw new Error(`Password is undefined for line ${line}`);
			}

			const [range, character, ] = policy.split(' ');
			if (!isDefined(range)) {
				throw new Error(`Range is undefined for line ${line}`);
			}
			if (!isDefined(character)) {
				throw new Error(`Character is undefined for line ${line}`);
			}

			const [rawMin, rawMax, ] = range.split('-');
			if (!isDefined(rawMin)) {
				throw new Error(`Min is undefined for line ${line}`);
			}
			if (!isDefined(rawMax)) {
				throw new Error(`Max is undefined for line ${line}`);
			}

			const min = parseInt(rawMin);
			const max = parseInt(rawMax);
			if (!isDefined(min)) {
				throw new Error(`Min is an invalid number for line ${line}`);
			}
			if (!isDefined(max)) {
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

	if (characterOccurrences > policy.max) {
		return false;
	}

	if (characterOccurrences < policy.min) {
		return false;
	}

	return true;
};