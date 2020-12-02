import fs from 'fs';
import path from 'path';

const readPuzzleInput = (directoryName: string): string => {
	const inputFile = 'input.txt';
	const filePath = path.join(directoryName, inputFile);
	const fileContents = fs.readFileSync(filePath, 'utf-8');
	return fileContents;
};

export default readPuzzleInput;