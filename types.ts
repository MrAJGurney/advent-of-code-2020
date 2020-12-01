export type PuzzleSolver = () => string;

export type Stars = {
		[star: string]: PuzzleSolver
	};

export type Day = {
		title: string;
		stars: Stars;
	};

export type Year = {
		[day: string]: Day;
	};