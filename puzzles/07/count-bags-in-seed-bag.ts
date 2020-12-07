import { RulesForAllBags, BagContentsRules } from './types';

import isDefined from '../../utils/is-defined';

const countBagsInSeedBag = (
	seedBag: string,
	rulesForAllBags: RulesForAllBags
): number => {
	const bagContents: BagContentsRules | undefined = rulesForAllBags[seedBag];

	if(!isDefined(bagContents)) {
		throw new Error(`Undefined rules for ${seedBag}`);
	}

	const bagsInSeedBag: string[] = Object.keys(bagContents);

	return bagsInSeedBag.reduce((totalBagCount, bagInSeedBag) => {
		const bagCount: number | undefined = bagContents[bagInSeedBag];
		if(!isDefined(bagCount)) {
			/* eslint-disable-next-line max-len */
			throw new Error(`Undefined bag count for ${bagInSeedBag} in ${bagContents}`);
		}

		return totalBagCount + bagCount + (
			bagCount * countBagsInSeedBag(bagInSeedBag, rulesForAllBags)
		);
	}, 0);
};

export default countBagsInSeedBag;