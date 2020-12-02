import { PasswordWithTobogganPolicy } from './types';
import { isStringDefined, isNumberDefined } from '../../utils/is-defined';

export const buildPasswordsWithTobogganPolicy = (
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

export const isValidTobogganPassword = ({
	password,
	policy,
}: PasswordWithTobogganPolicy): boolean => {
	const characterIsInIndexA =
		password[policy.indexA] === policy.character;
	const characterIsInIndexB =
		password[policy.indexB] === policy.character;
	return characterIsInIndexA !== characterIsInIndexB;
};