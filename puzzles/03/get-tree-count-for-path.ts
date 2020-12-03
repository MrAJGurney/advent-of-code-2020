import { Coordinates, TobogganMap } from './types';

import getFeatureOnMap from './get-feature-on-map';
import { TREE } from './constants';

const getTreeCountForPath = (
	start: Coordinates,
	path: Coordinates,
	tobogganMap: TobogganMap
): number => {
	let treeCount = 0;
	let x = start.x;
	for (
		let y = start.y;
		y < tobogganMap.length;
		y += path.y
	) {
		if (getFeatureOnMap({ x, y, }, tobogganMap) === TREE) {
			treeCount++;
		}
		x += path.x;
	}
	return treeCount;
};

export default getTreeCountForPath;