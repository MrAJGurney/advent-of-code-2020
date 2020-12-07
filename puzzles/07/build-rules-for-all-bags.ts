import { RulesForAllBags, BagContentsRules } from './types';

import isDefined from '../../utils/is-defined';

const buildRulesForAllBags = (
	puzzleInput: string
): RulesForAllBags => (
	puzzleInput
		.trim()
		.split('\n')
		.reduce((
			rulesForAllBags: RulesForAllBags,
			line: string
		): RulesForAllBags => {
			const [holdingBag, contents, ]: string[] = line
				.trim()
				.split(' bags contain ');

			if(!isDefined(holdingBag)) {
				throw new Error(`Holding bag is undefined for line ${line}`);
			}

			if(!isDefined(contents)) {
				throw new Error(`Contents is undefined for line ${line}`);
			}

			const bagContentsRules =
				contents === 'no other bags.' ?
					{} :
					buildBagContentsRules(contents);

			rulesForAllBags[holdingBag] = bagContentsRules;

			return rulesForAllBags;
		}, {})
);

const buildBagContentsRules = (contents: string): BagContentsRules => (
	contents
		.trim()
		.replace('.', '')
		.split(', ')
		.reduce((
			bagRules: BagContentsRules,
			rule: string
		): BagContentsRules => {
			const parts = rule.split(' ');
			const countPart = parts[0];
			const colourPart = parts.slice(1, -1);

			if(!isDefined(countPart)) {
				throw new Error(`Count is undefined for rule ${rule}`);
			}

			if(!isDefined(colourPart)) {
				throw new Error(`Colour is undefined for rule ${colourPart}`);
			}

			const count = parseInt(countPart);
			const colour = colourPart.join(' ');
			bagRules[colour] = count;

			return bagRules;
		}, {})
);

export default buildRulesForAllBags;