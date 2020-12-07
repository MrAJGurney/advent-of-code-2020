import { RulesForAllBags, BagContentsRules } from './types';

import isDefined from '../../utils/is-defined';

const findBagsThatCanContainSeedBags = (
	seedBags: Set<string>,
	rulesForAllBags: RulesForAllBags
): Set<string> => {
	const bagsContainingSeedBags = new Set(seedBags);

	seedBags.forEach((seedBag: string) => {
		Object.keys(rulesForAllBags).forEach(containingBag => {
			const rulesForContainingBag: BagContentsRules | undefined =
				rulesForAllBags[containingBag];

			if(!isDefined(rulesForContainingBag)) {
				throw new Error(`Undefined rules for ${containingBag}`);
			}

			if (Object.keys(rulesForContainingBag).includes(seedBag)) {
				bagsContainingSeedBags.add(containingBag);
			}
		});
	});

	return seedBags.size === bagsContainingSeedBags.size ?
		bagsContainingSeedBags :
		findBagsThatCanContainSeedBags(bagsContainingSeedBags, rulesForAllBags);
};

export default findBagsThatCanContainSeedBags;