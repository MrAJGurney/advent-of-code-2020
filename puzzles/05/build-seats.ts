import { Seat } from './types';

const buildSeats = (puzzleInput: string): Seat[] => (
	puzzleInput
		.trim()
		.split('\n')
		.map(seatInput => buildSeat(seatInput))
);

const buildSeat = (seatInput: string): Seat => {
	const binaryRow: string = seatInput
		.slice(0, 7)
		.split('')
		.map(symbol => {
			if (symbol === 'F') return '0';
			if (symbol === 'B') return '1';
			throw new Error(`Unexpected row symbol ${symbol}`);
		})
		.join('');
	const row: number = parseInt(binaryRow, 2);

	const binaryColumn: string = seatInput
		.slice(7)
		.split('')
		.map(symbol => {
			if (symbol === 'L') return '0';
			if (symbol === 'R') return '1';
			throw new Error(`Unexpected column symbol ${symbol}`);
		})
		.join('');
	const column: number = parseInt(binaryColumn, 2);

	return { row, column, id: 8 * row + column, };
};

export default buildSeats;