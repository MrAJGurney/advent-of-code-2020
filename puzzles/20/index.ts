import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	type TileData = {
		id: number;
		clockwiseEdge: {
			north: string;
			east: string;
			south: string;
			west: string;
		}
	}

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
	type BorderKey = 'nw-ne' | 'ne-se' | 'se-sw' | 'sw-nw';

	type Matches = {
		[border in BorderKey]?: number;
	};

	interface ImageTile {
		id: number;
		borders: {
			'nw-ne': string;
			'ne-se': string;
			'se-sw': string;
			'sw-nw': string;
		};
		image: string[];
	}

	interface ImageTileWithMatches extends ImageTile{
		matches: Matches;
	}

	const BORDER_KEYS: BorderKey[] = ['ne-se', 'se-sw', 'sw-nw', 'nw-ne', ];

	interface Coordinate {
		row: number;
		column: number;
	}

	const SEA_MONSTER = [
		'                  # ',
		'#    ##    ##    ###',
		' #  #  #  #  #  #   ',
	].join('\n');

	const rotateImageTileWithMatchesClockwise = (
		{ id, borders, image, matches, }: ImageTileWithMatches
	): ImageTileWithMatches => {
		const rotatedImage = [];
		for (const columnIndex in guaranteeDefined(image[0]).split('')) {
			const columnRotatedIntoRow = [];
			for (const rowIndex in image) {
				columnRotatedIntoRow.unshift(
					guaranteeDefined(
						image?.[rowIndex]?.[columnIndex]
					)
				);
			}
			rotatedImage.push(columnRotatedIntoRow.join(''));
		}

		return {
			id,
			borders: {
				'nw-ne': borders['sw-nw'],
				'ne-se': borders['nw-ne'],
				'se-sw': borders['ne-se'],
				'sw-nw': borders['se-sw'],
			},
			image: rotatedImage,
			matches: {
				...(matches['sw-nw'] ? { 'nw-ne': matches['sw-nw'], } : {}),
				...(matches['nw-ne'] ? { 'ne-se': matches['nw-ne'], } : {}),
				...(matches['ne-se'] ? { 'se-sw': matches['ne-se'], } : {}),
				...(matches['se-sw'] ? { 'sw-nw': matches['se-sw'], } : {}),
			},
		};
	};

	const flipImageTileWithMatchesThroughHorizontalAxis = (
		{ id, borders, image, matches, }: ImageTileWithMatches
	): ImageTileWithMatches => ({
		id,
		borders: {
			'nw-ne': borders['se-sw'].split('').reverse().join(''),
			'ne-se': borders['ne-se'].split('').reverse().join(''),
			'se-sw': borders['nw-ne'].split('').reverse().join(''),
			'sw-nw': borders['sw-nw'].split('').reverse().join(''),
		},
		image: image.map(row => row.slice()).reverse(),
		matches: {
			...(matches['se-sw'] ? { 'nw-ne': matches['se-sw'], } : {}),
			...(matches['ne-se'] ? { 'ne-se': matches['ne-se'], } : {}),
			...(matches['nw-ne'] ? { 'se-sw': matches['nw-ne'], } : {}),
			...(matches['sw-nw'] ? { 'sw-nw': matches['sw-nw'], } : {}),
		},
	});

	const rotateImageClockwise = (image: string[][]): string[][] => {
		const rotatedImage = [];
		for (const columnIndex in guaranteeDefined(image[0])) {
			const columnRotatedIntoRow = [];
			for (const rowIndex in image) {
				columnRotatedIntoRow.unshift(
					guaranteeDefined(
						image?.[rowIndex]?.[columnIndex]
					)
				);
			}
			rotatedImage.push(columnRotatedIntoRow);
		}
		return rotatedImage;
	};

	const flipImageThroughHorizontalAxis = (image: string[][]): string[][] =>
		image.map(row => row.slice()).reverse();

	const puzzleInput = readPuzzleInput(__dirname);
	const tiles: ImageTile[] = puzzleInput
		.trim()
		.split('\n\n')
		.map((rawTile): ImageTile => {
			const rawtileComponents = rawTile.trim().split('\n');

			const rawId = guaranteeDefined(rawtileComponents[0]);
			const tileRows: string[] = rawtileComponents
				.slice(1)
				.map(row => row.trim());

			return {
				id: parseInt(rawId.slice('Tile '.length, -':'.length)),
				borders: {
					'nw-ne': guaranteeDefined(tileRows[0]),
					'ne-se': tileRows
						.map(line => line.slice(-1)[0])
						.join(''),
					'se-sw': guaranteeDefined(tileRows.slice(-1)[0])
						.split('')
						.reverse()
						.join(''),
					'sw-nw': tileRows
						.map(line => line[0])
						.reverse()
						.join(''),
				},
				image: tileRows
					.slice(1, -1)
					.map(tileRow => tileRow.slice(1, -1)),
			};
		});

	const imageTilesWithMatches: ImageTileWithMatches[] = tiles.map(
		(
			currentTile: ImageTile,
			currentTileIndex: number,
			tiles: ImageTile[]
		) => ({
			...currentTile,
			matches: tiles.reduce(
				(
					matches: Matches,
					tileToCheck: ImageTile,
					tileToCheckIndex: number
				) => {
					if (currentTileIndex !== tileToCheckIndex) {
						for (const currentTileBorderKey of BORDER_KEYS) {
							for (const tileToCheckBorderKey of BORDER_KEYS) {
								if (
									[
										tileToCheck
											.borders[tileToCheckBorderKey],
										tileToCheck
											.borders[tileToCheckBorderKey]
											.split('')
											.reverse()
											.join(''),
									].includes(
										currentTile
											.borders[currentTileBorderKey]
									)
								) {
									matches[currentTileBorderKey] =
										tileToCheck.id;
								}
							}
						}
					}

					return matches;
				}, {}
			),
		})
	);

	const northWestCorner = guaranteeDefined(
		imageTilesWithMatches.find(
			tile =>
				tile.matches['ne-se'] &&
				tile.matches['se-sw'] &&
				!tile.matches['sw-nw'] &&
				!tile.matches['nw-ne']
		)
	);

	const tessellatedImageTiles: ImageTileWithMatches[][] = [];
	let tessellatedImageTilesRow: ImageTileWithMatches[] = [northWestCorner, ];

	while (true) {
		while (true) {
			const previousImageTileOnRow =
			guaranteeDefined(tessellatedImageTilesRow.slice(-1)[0]);

			if (previousImageTileOnRow.matches['ne-se'] === undefined) break;

			const nextIdOfImageTileOnRow =
			guaranteeDefined(previousImageTileOnRow.matches['ne-se']);
			let nextImageTileOnRow = guaranteeDefined(
				imageTilesWithMatches.find(
					tile => tile.id === nextIdOfImageTileOnRow
				)
			);

			while (
				!Object.values(nextImageTileOnRow.borders).includes(
					previousImageTileOnRow
						.borders['ne-se']
						.split('')
						.reverse()
						.join('')
				)
			) {
				nextImageTileOnRow =
				flipImageTileWithMatchesThroughHorizontalAxis(
					nextImageTileOnRow
				);
			}

			while (
				previousImageTileOnRow.borders['ne-se'] !==
					nextImageTileOnRow.borders['sw-nw']
						.split('')
						.reverse()
						.join('')
			) {
				nextImageTileOnRow =
				rotateImageTileWithMatchesClockwise(
					nextImageTileOnRow
				);
			}

			tessellatedImageTilesRow.push(nextImageTileOnRow);
		}

		tessellatedImageTiles.push(tessellatedImageTilesRow);

		const firstImageTileOnPreviousRow =
			guaranteeDefined(
				guaranteeDefined(
					tessellatedImageTiles.slice(-1)[0]
				)[0]
			);

		if (firstImageTileOnPreviousRow.matches['se-sw'] === undefined) break;

		const idOfFirstImageTileOnNextRow =
			guaranteeDefined(firstImageTileOnPreviousRow.matches['se-sw']);
		let firstImageTileOnNextRow = guaranteeDefined(
			imageTilesWithMatches.find(
				tile => tile.id === idOfFirstImageTileOnNextRow
			)
		);

		while (
			!Object.values(firstImageTileOnNextRow.borders).includes(
				firstImageTileOnPreviousRow
					.borders['se-sw']
					.split('')
					.reverse()
					.join('')
			)
		) {
			firstImageTileOnNextRow =
				flipImageTileWithMatchesThroughHorizontalAxis(
					firstImageTileOnNextRow
				);
		}

		while (
			firstImageTileOnPreviousRow.borders['se-sw'] !==
				firstImageTileOnNextRow.borders['nw-ne']
					.split('')
					.reverse()
					.join('')
		) {
			firstImageTileOnNextRow =
				rotateImageTileWithMatchesClockwise(
					firstImageTileOnNextRow
				);
		}

		tessellatedImageTilesRow = [firstImageTileOnNextRow, ];
	}

	const image: string[][] = [];
	for (const tessellatedImageTilesRow of tessellatedImageTiles) {
		for (
			const imageTileRowIndex in
			guaranteeDefined(tessellatedImageTilesRow[0]).image
		) {
			let imageRow = '';
			for (const imageTile of tessellatedImageTilesRow) {
				imageRow += (
					guaranteeDefined(imageTile.image[imageTileRowIndex])
				);
			}
			image.push(imageRow.split(''));
		}
	}

	const imageRowCount = image.length;
	const imageColumnCount = guaranteeDefined(
		image[0]
	).length;

	const seaMonsterRowCount = SEA_MONSTER.split('\n').length;
	const seaMonsterColumnCount = guaranteeDefined(
		SEA_MONSTER.split('\n')[0]
	).length;

	const seaMonsterOffsets: Coordinate[] = SEA_MONSTER
		.split('\n')
		.reduce(
			(
				seaMonsterOffsets: Coordinate[],
				row: string,
				rowIndex: number
			) =>
				seaMonsterOffsets.concat(
					row
						.split('')
						.reduce(
							(
								seaMonsterOffsets: Coordinate[],
								character: string,
								columnIndex: number
							) =>
								seaMonsterOffsets.concat(
									(character === '#') ?
										[{
											row: rowIndex,
											column: columnIndex,
										}, ] :
										[]
								)
							, []
						)
				), []
		);

	const state = {
		monsterCount: 0,
		rotations: 0,
		flips: 0,
		image: image,
	};
	while (state.monsterCount === 0) {
		for (
			let rowIndex = 0;
			rowIndex < (imageRowCount - seaMonsterRowCount);
			rowIndex++
		) {
			for (
				let columnIndex = 0;
				columnIndex < (imageColumnCount - seaMonsterColumnCount);
				columnIndex++
			) {
				if (
					seaMonsterOffsets.every(
						({ row, column, }) => state
							.image
							?.[rowIndex + row]
							?.[columnIndex + column] === '#'
					)
				) {
					state.monsterCount++;
				}
			}
		}

		if (state.monsterCount === 0) {
			if ((state.rotations < 4) || (state.flips > 0)) {
				state.image = rotateImageClockwise(state.image);
				state.rotations++;
			} else {
				state.image = flipImageThroughHorizontalAxis(state.image);
				state.flips++;
			}
		}
	}

	for (
		let rowIndex = 0;
		rowIndex < (imageRowCount - seaMonsterRowCount);
		rowIndex++
	) {
		for (
			let columnIndex = 0;
			columnIndex < (imageColumnCount - seaMonsterColumnCount);
			columnIndex++
		) {
			if (
				seaMonsterOffsets.every(
					({ row, column, }) => state
						.image
						?.[rowIndex + row]
						?.[columnIndex + column] === '#'
				)
			) {
				seaMonsterOffsets.forEach(
					({ row, column, }) =>
						guaranteeDefined(
							state.image[rowIndex + row]
						)[columnIndex + column] = 'O'
				);
			}
		}
	}

	return state
		.image
		.flat(2)
		.filter(value => value === '#')
		.length
		.toString();
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;