import { Coordinates } from './types';

const rotate = (angle: number, oldFacing: Coordinates): Coordinates => {
	if (angle % 90 !== 0) {
		throw new Error('Unexpected angle');
	}

	const ninetyDegreeRotationCount = angle / 90;

	const facing = { ...oldFacing, };

	if (ninetyDegreeRotationCount > 0) {
		for (
			let rotations = 0;
			rotations < ninetyDegreeRotationCount;
			rotations++
		) {
			const { north: oldNorth, east: oldEast, } = facing;
			facing.north = -oldEast;
			facing.east = oldNorth;
		}
	} else if (ninetyDegreeRotationCount < 0) {
		for (
			let rotations = 0;
			rotations > ninetyDegreeRotationCount;
			rotations--
		) {
			const { north: oldNorth, east: oldEast, } = facing;
			facing.north = oldEast;
			facing.east = -oldNorth;
		}
	}

	return facing;
};

export default rotate;