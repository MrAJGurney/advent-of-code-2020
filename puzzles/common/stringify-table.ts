import guaranteeDefined from './guarantee-defined';

const stringifyTable = <T>(tableRows: T[][]): string =>
{
	const rowLength = guaranteeDefined(tableRows[0]).length;
	return[
		(''),
		('╔' + '═'.repeat(rowLength + 2) + '╗'),
		...(tableRows.map(row => ('║ ' + row.join('') + ' ║'))),
		('╚' + '═'.repeat(rowLength + 2) + '╝'),
		(''),
	].join('\n');
};

export default stringifyTable;