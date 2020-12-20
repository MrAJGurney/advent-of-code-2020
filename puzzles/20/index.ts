import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

type TileData = {
	id: number;
	clockwiseEdge: {
		north: string;
		east: string;
		south: string;
		west: string;
	}
}

const solveFirstPuzzle: PuzzleSolver = () => {
	const puzzleInput = readPuzzleInput(__dirname);

	const tiles: Array<TileData> = puzzleInput
		.trim()
		.split('\n\n')
		.map(rawTile => {
			const [
				rawId,
				...rawLines
			] = rawTile.trim().split('\n');

			return {
				id: parseInt(
					guaranteeDefined(rawId)
						.slice('Tile '.length, -':'.length)
				),
				clockwiseEdge: {
					north: guaranteeDefined(rawLines[0]),
					east: guaranteeDefined(rawLines)
						.map(line => line.slice(-1)[0])
						.join(''),
					south: guaranteeDefined(rawLines.slice(-1)[0])
						.split('')
						.reverse()
						.join(''),
					west: guaranteeDefined(rawLines)
						.map(line => line[0])
						.reverse()
						.join(''),
				},
			};
		});

	const matches = tiles.map(
		(
			currentTile: TileData,
			currentTileIndex: number,
			tiles: Array<TileData>
		) => ({
			id: currentTile.id,
			matches: {
				north: tiles.reduce((
					matches: Array<string>,
					tile,
					index
				) => {
					if (index !== currentTileIndex) {
						const { clockwiseEdge: { north, }, } = currentTile;
						if (north === tile.clockwiseEdge.north)
							matches.push(`${tile.id}: north`);
						if (
							north === tile
								.clockwiseEdge
								.north
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: north-reversed`);
						if (north === tile.clockwiseEdge.east)
							matches.push(`${tile.id}: east`);
						if (
							north === tile.clockwiseEdge
								.east
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: east-reversed`);
						if (north === tile.clockwiseEdge.south)
							matches.push(`${tile.id}: south`);
						if (
							north === tile
								.clockwiseEdge
								.south
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: south-reversed`);
						if (north === tile.clockwiseEdge.west)
							matches.push(`${tile.id}: west`);
						if (
							north === tile
								.clockwiseEdge
								.west
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: west-reversed`);
					}
					return matches;
				}, []),
				east: tiles.reduce((
					matches: Array<string>,
					tile,
					index
				) => {
					if (index !== currentTileIndex) {
						const { clockwiseEdge: { east, }, } = currentTile;
						if (east === tile.clockwiseEdge.north)
							matches.push(`${tile.id}: north`);
						if (
							east === tile
								.clockwiseEdge
								.north
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: north-reversed`);
						if (east === tile.clockwiseEdge.east)
							matches.push(`${tile.id}: east`);
						if (
							east === tile.clockwiseEdge
								.east
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: east-reversed`);
						if (east === tile.clockwiseEdge.south)
							matches.push(`${tile.id}: south`);
						if (
							east === tile
								.clockwiseEdge
								.south
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: south-reversed`);
						if (east === tile.clockwiseEdge.west)
							matches.push(`${tile.id}: west`);
						if (
							east === tile
								.clockwiseEdge
								.west
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: west-reversed`);
					}
					return matches;
				}, []),
				south: tiles.reduce((
					matches: Array<string>,
					tile,
					index
				) => {
					if (index !== currentTileIndex) {
						const { clockwiseEdge: { south, }, } = currentTile;
						if (south === tile.clockwiseEdge.north)
							matches.push(`${tile.id}: north`);
						if (
							south === tile
								.clockwiseEdge
								.north
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: north-reversed`);
						if (south === tile.clockwiseEdge.east)
							matches.push(`${tile.id}: east`);
						if (
							south === tile.clockwiseEdge
								.east
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: east-reversed`);
						if (south === tile.clockwiseEdge.south)
							matches.push(`${tile.id}: south`);
						if (
							south === tile
								.clockwiseEdge
								.south
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: south-reversed`);
						if (south === tile.clockwiseEdge.west)
							matches.push(`${tile.id}: west`);
						if (
							south === tile
								.clockwiseEdge
								.west
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: west-reversed`);
					}
					return matches;
				}, []),
				west: tiles.reduce((
					matches: Array<string>,
					tile,
					index
				) => {
					if (index !== currentTileIndex) {
						const { clockwiseEdge: { west, }, } = currentTile;
						if (west === tile.clockwiseEdge.north)
							matches.push(`${tile.id}: north`);
						if (
							west === tile
								.clockwiseEdge
								.north
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: north-reversed`);
						if (west === tile.clockwiseEdge.east)
							matches.push(`${tile.id}: east`);
						if (
							west === tile.clockwiseEdge
								.east
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: east-reversed`);
						if (west === tile.clockwiseEdge.south)
							matches.push(`${tile.id}: south`);
						if (
							west === tile
								.clockwiseEdge
								.south
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: south-reversed`);
						if (west === tile.clockwiseEdge.west)
							matches.push(`${tile.id}: west`);
						if (
							west === tile
								.clockwiseEdge
								.west
								.split('')
								.reverse()
								.join('')
						)
							matches.push(`${tile.id}: west-reversed`);
					}
					return matches;
				}, []),
			},
		})
	);

	return matches
		.filter(tileWithMatches => {
			const matchlessEdgeCount =
			(tileWithMatches.matches.north.length > 0 ? 0 : 1) +
			(tileWithMatches.matches.east.length > 0 ? 0 : 1) +
			(tileWithMatches.matches.south.length > 0 ? 0 : 1) +
			(tileWithMatches.matches.west.length > 0 ? 0 : 1);

			return matchlessEdgeCount >= 2;
		})
		.reduce(
			(
				cornerIdProduct: number,
				match
			) => cornerIdProduct * match.id
			, 1
		)
		.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	throw new Error ('TODO');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;