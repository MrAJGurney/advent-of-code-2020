import { Coordinates, TobogganMap, TobogganMapRow } from './types';

import isDefined from '../../utils/is-defined';

const getFeatureOnMap = (
	coordinates: Coordinates,
	tobogganMap: TobogganMap
): string => {
	const tobogganRow = tobogganMap[coordinates.y];
	if (!isDefined(tobogganRow)) {
		throw new Error(
			/* eslint-disable-next-line max-len */
			`Undefined row at position ${coordinates.y} in toboggan map length: ${tobogganMap.length}`
		);
	}
	return getFeatureOnRow(coordinates.x, tobogganRow);
};

const getFeatureOnRow = (x: number, tobogganRow: TobogganMapRow): string =>{
	const index = x % tobogganRow.length;
	const feature = tobogganRow[index];
	if (!isDefined(feature)) {
		throw new Error(
			/* eslint-disable-next-line max-len */
			`Undefined feature at position ${index} in toboggan row: ${tobogganRow}`
		);
	}
	return feature;
};

export default getFeatureOnMap;