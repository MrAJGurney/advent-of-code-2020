import { Year } from '../types';

import day01 from './01';
import day02 from './02';
import day03 from './03';
import day04 from './04';
import day05 from './05';
import day06 from './06';

const year: Year = {
	'1': {
		title: 'Day 1: Report Repair',
		stars: day01,
	},
	'2': {
		title: 'Day 2: Password Philosophy',
		stars: day02,
	},
	'3': {
		title: 'Day 3: Toboggan Trajectory',
		stars: day03,
	},
	'4': {
		title: 'Day 4: Passport Processing',
		stars: day04,
	},
	'5': {
		title: 'Day 5: Binary Boarding',
		stars: day05,
	},
	'6': {
		title: 'Day 6: Custom Customs',
		stars: day06,
	},
};

export default year;