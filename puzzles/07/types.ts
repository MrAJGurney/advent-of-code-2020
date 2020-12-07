export type BagContentsRules = {
	[bagColour: string]: number;
}

export type RulesForAllBags = {
	[bagColour: string]: BagContentsRules;
}