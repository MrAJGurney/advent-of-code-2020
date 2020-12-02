import { PasswordWithTobogganPolicy } from './types';
import isDefined from '../../utils/is-defined';

export const buildPasswordsWithTobogganPolicy = (
	puzzleInput: string
): PasswordWithTobogganPolicy[] => (
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

			const [rawIndexA, rawIndexB, ] = range.split('-');
			if (!isDefined(rawIndexA)) {
				throw new Error(`IndexA is undefined for line ${line}`);
			}
			if (!isDefined(rawIndexB)) {
				throw new Error(`IndexB is undefined for line ${line}`);
			}

			const indexA = parseInt(rawIndexA) - 1;
			const indexB = parseInt(rawIndexB) - 1;
			if (!isDefined(indexA)) {
				/* eslint-disable-next-line max-len */
				throw new Error(`IndexA is an invalid number for line ${line}`);
			}
			if (!isDefined(indexB)) {
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