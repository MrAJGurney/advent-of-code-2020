import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

enum SeatMapKey {
	EmptySeat = 'L',
	OccupiedSeat = '#',
	Floor = '.',
}

type Coordinates = {
  row: number;
  column: number;
}

const guaranteeSeatMapKey = (text: string): SeatMapKey => {
	switch (text) {
	case SeatMapKey.EmptySeat:
		return SeatMapKey.EmptySeat;
	case SeatMapKey.OccupiedSeat:
		return SeatMapKey.OccupiedSeat;
	case SeatMapKey.Floor:
		return SeatMapKey.Floor;
	default:
		throw new Error(`Invalid Seat Symbol ${text}`);

	}
};

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	let seatRows: SeatMapKey[][] = puzzleInput
		.trim()
		.split('\n')
		.map(
			rawRow => rawRow
				.trim()
				.split('')
				.map(position => guaranteeSeatMapKey(position))
		);

	while (true) {
		let stateChanged = false;

		const newSeatRows = seatRows.map(
			(row, rowIndex) => row.map(
				(column, columnIndex) => {
					if (column === SeatMapKey.Floor) {
						return SeatMapKey.Floor;
					}

					const adjacentOccupiedSeatCount =
						findAdjacentOccupiedSeatCount(
							{ row: rowIndex, column: columnIndex, },
							seatRows
						);

					if (column === SeatMapKey.OccupiedSeat) {
						if (adjacentOccupiedSeatCount >= 4) {
							stateChanged = true;
							return SeatMapKey.EmptySeat;
						} else {
							return SeatMapKey.OccupiedSeat;
						}
					}

					if (column === SeatMapKey.EmptySeat) {
						if (adjacentOccupiedSeatCount === 0) {
							stateChanged = true;
							return SeatMapKey.OccupiedSeat;
						} else {
							return SeatMapKey.EmptySeat;
						}
					}

					throw new Error('Unexpected column value');
				}
			)
		);

		if (!stateChanged) {
			return seatRows.reduce(
				(countForMap, row) =>
					countForMap + row.reduce(
						(countForRow, column) =>
							countForRow +
								(column === SeatMapKey.OccupiedSeat ? 1 : 0)
						, 0
					)
				, 0
			).toString();
		}

		seatRows = newSeatRows;
	}
};

const findAdjacentOccupiedSeatCount = (
	seatPosition: Coordinates,
	seatRows: SeatMapKey[][]
): number => {
	const positionToCheck: Coordinates[] = [
		{ column: seatPosition.column - 1, row: seatPosition.row - 1, },
		{ column: seatPosition.column + 0, row: seatPosition.row - 1, },
		{ column: seatPosition.column + 1, row: seatPosition.row - 1, },
		{ column: seatPosition.column + 1, row: seatPosition.row + 0, },
		{ column: seatPosition.column + 1, row: seatPosition.row + 1, },
		{ column: seatPosition.column + 0, row: seatPosition.row + 1, },
		{ column: seatPosition.column - 1, row: seatPosition.row + 1, },
		{ column: seatPosition.column - 1, row: seatPosition.row + 0, },
	];

	return positionToCheck
		.reduce((adjacentOccupiedSeatCount, { row, column, }) => {
			if (row < 0 || column < 0) {
				return adjacentOccupiedSeatCount;
			}

			return adjacentOccupiedSeatCount + (
				(
					seatRows?.[row]?.[column] === SeatMapKey.OccupiedSeat
				) ? 1 : 0
			);
		}, 0);
};

const solveSecondPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);
	let seatRows: SeatMapKey[][] = puzzleInput
		.trim()
		.split('\n')
		.map(
			rawRow => rawRow
				.trim()
				.split('')
				.map(position => guaranteeSeatMapKey(position))
		);

	while (true) {
		let stateChanged = false;

		const newSeatRows = seatRows.map(
			(row, rowIndex) => row.map(
				(column, columnIndex) => {
					if (column === SeatMapKey.Floor) {
						return SeatMapKey.Floor;
					}

					const visibleOccupiedSeatCount =
						findVisibleOccupiedSeatCount(
							{ row: rowIndex, column: columnIndex, },
							seatRows
						);

					if (column === SeatMapKey.OccupiedSeat) {
						if (visibleOccupiedSeatCount >= 5) {
							stateChanged = true;
							return SeatMapKey.EmptySeat;
						} else {
							return SeatMapKey.OccupiedSeat;
						}
					}

					if (column === SeatMapKey.EmptySeat) {
						if (visibleOccupiedSeatCount === 0) {
							stateChanged = true;
							return SeatMapKey.OccupiedSeat;
						} else {
							return SeatMapKey.EmptySeat;
						}
					}

					throw new Error('Unexpected column value');
				}
			)
		);

		if (!stateChanged) {
			return seatRows.reduce(
				(countForMap, row) =>
					countForMap + row.reduce(
						(countForRow, column) =>
							countForRow +
								(column === SeatMapKey.OccupiedSeat ? 1 : 0)
						, 0
					)
				, 0
			).toString();
		}

		seatRows = newSeatRows;
	}
};

const findVisibleOccupiedSeatCount = (
	seatPosition: Coordinates,
	seatRows: SeatMapKey[][]
): number => {
	const directionVectorsToCheck: Coordinates[] = [
		/* eslint-disable key-spacing */
		{ column: - 1, row: - 1, },
		{ column:   0, row: - 1, },
		{ column: + 1, row: - 1, },
		{ column: + 1, row:   0, },
		{ column: + 1, row: + 1, },
		{ column:   0, row: + 1, },
		{ column: - 1, row: + 1, },
		{ column: - 1, row:   0, },
		/* eslint-enable key-spacing */
	];

	const rowCount = seatRows.length;
	const columnCount = guaranteeDefined(seatRows[0]).length;
	let visibleOccupiedSeatCount = 0;
	for (const directionVector of directionVectorsToCheck) {
		let row = seatPosition.row + directionVector.row;
		let column = seatPosition.column + directionVector.column;

		while (
			row >= 0 &&
			row < rowCount &&
			column >= 0 &&
			column < columnCount &&
			seatRows?.[row]?.[column] !== SeatMapKey.EmptySeat
		) {
			if (seatRows?.[row]?.[column] === SeatMapKey.OccupiedSeat) {
				visibleOccupiedSeatCount++;
				break;
			}

			row += directionVector.row;
			column += directionVector.column;
		}
	}
	return visibleOccupiedSeatCount;
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;