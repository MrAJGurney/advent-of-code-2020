import { PuzzleSolver, Stars } from '../../types';

import readPuzzleInput from '../common/read-puzzle-input';
import guaranteeDefined from '../common/guarantee-defined';

const solveFirstPuzzle: PuzzleSolver = () => {
	interface Food {
		ingredients: string[]
		allergens: string[]
	}

	type IngredientsWithCount = Map<string, number>;

	type AllergensToPotentialIngredients = Map<string, string[]>;

	const puzzleInput = readPuzzleInput(__dirname);

	const foods: Food[] = puzzleInput
		.trim()
		.split('\n')
		.map(stringifiedFood => {
			const [
				rawIngredients,
				rawAllergens,
			] = stringifiedFood.slice(0, -1).split(' (contains ');

			return {
				ingredients: guaranteeDefined(rawIngredients)
					.trim()
					.split(' '),
				allergens: guaranteeDefined(rawAllergens)
					.trim()
					.split(', '),
			};
		});

	const ingredientsWithCount: IngredientsWithCount = new Map();
	foods.forEach(({ ingredients, }) => ingredients.forEach(
		ingredient => {
			if (!ingredientsWithCount.has(ingredient)) {
				ingredientsWithCount.set(ingredient, 0);
			}

			ingredientsWithCount.set(
				ingredient,
				guaranteeDefined(ingredientsWithCount.get(ingredient)) + 1
			);
		}
	));

	const allAllergens: Set<string> = new Set();
	foods.forEach(({ allergens, }) => {
		allergens.forEach(allergen => allAllergens.add(allergen));
	});

	const allergensToPotentialIngredients: AllergensToPotentialIngredients =
		new Map();
	allAllergens.forEach(allergen => {
		const potentialIngredientsPerFood = foods.reduce(
			(
				potentialIngredientsPerFood: string[][],
				food
			) => (
				potentialIngredientsPerFood.concat(
					food.allergens.includes(allergen) ?
						[food.ingredients, ] :
						[]
				)
			), []
		);

		if (potentialIngredientsPerFood.length === 0) return;

		allergensToPotentialIngredients.set(
			allergen,
			guaranteeDefined(
				potentialIngredientsPerFood[0]
			).filter(
				ingredient => potentialIngredientsPerFood
					.every(
						ingredients => ingredients
							.includes(ingredient)
					)
			)
		);
	});

	const ingredientsWithAllergens: Set<string> = new Set();
	allergensToPotentialIngredients.forEach(
		ingredients => ingredients.forEach(
			ingredient => ingredientsWithAllergens.add(
				ingredient
			)
		)
	);

	if(ingredientsWithAllergens.size !== allAllergens.size)
		throw new Error(
			/* eslint-disable-next-line max-len */
			'Additional logic to determine which ingredients are allergen free is required'
		);

	let ingredientsWithoutAllergenCount = 0;
	ingredientsWithCount.forEach((count, ingredient) => {
		if (!ingredientsWithAllergens.has(ingredient)) {
			ingredientsWithoutAllergenCount += count;
		}
	});

	return ingredientsWithoutAllergenCount.toString();
};

const solveSecondPuzzle: PuzzleSolver = () => {
	interface Food {
		ingredients: string[]
		allergens: string[]
	}

	type IngredientsWithCount = Map<string, number>;

	type AllergensToPotentialIngredients = Map<string, string[]>;

	const puzzleInput = readPuzzleInput(__dirname);

	const foods: Food[] = puzzleInput
		.trim()
		.split('\n')
		.map(stringifiedFood => {
			const [
				rawIngredients,
				rawAllergens,
			] = stringifiedFood.slice(0, -1).split(' (contains ');

			return {
				ingredients: guaranteeDefined(rawIngredients)
					.trim()
					.split(' '),
				allergens: guaranteeDefined(rawAllergens)
					.trim()
					.split(', '),
			};
		});

	const ingredientsWithCount: IngredientsWithCount = new Map();
	foods.forEach(({ ingredients, }) => ingredients.forEach(
		ingredient => {
			if (!ingredientsWithCount.has(ingredient)) {
				ingredientsWithCount.set(ingredient, 0);
			}

			ingredientsWithCount.set(
				ingredient,
				guaranteeDefined(ingredientsWithCount.get(ingredient)) + 1
			);
		}
	));

	const allAllergens: Set<string> = new Set();
	foods.forEach(({ allergens, }) => {
		allergens.forEach(allergen => allAllergens.add(allergen));
	});

	const allergensToPotentialIngredients: AllergensToPotentialIngredients =
		new Map();
	allAllergens.forEach(allergen => {
		const potentialIngredientsPerFood = foods.reduce(
			(
				potentialIngredientsPerFood: string[][],
				food
			) => (
				potentialIngredientsPerFood.concat(
					food.allergens.includes(allergen) ?
						[food.ingredients, ] :
						[]
				)
			), []
		);

		if (potentialIngredientsPerFood.length === 0) return;

		allergensToPotentialIngredients.set(
			allergen,
			guaranteeDefined(
				potentialIngredientsPerFood[0]
			).filter(
				ingredient => potentialIngredientsPerFood
					.every(
						ingredients => ingredients
							.includes(ingredient)
					)
			)
		);
	});

	const allergensWithUnassignedPotentialIngredients: {
		allergen: string;
		ingredients: string[];
	}[] = [...allergensToPotentialIngredients, ].map(
		(
			[allergen, ingredients, ]
		) => ({
			allergen: guaranteeDefined(allergen),
			ingredients: guaranteeDefined(ingredients),
		})
	);
	const dangerousIngredients: {
		allergen: string,
		ingredient: string
	}[] = [];

	while (allergensWithUnassignedPotentialIngredients.length > 0) {
		const allergenWithOneIngredientIndex =
			allergensWithUnassignedPotentialIngredients
				.findIndex(x => x.ingredients.length === 1);

		const allergenWIthOneIngredient = guaranteeDefined(
			allergensWithUnassignedPotentialIngredients[
				allergenWithOneIngredientIndex
			]
		);

		dangerousIngredients.push({
			allergen: allergenWIthOneIngredient.allergen,
			ingredient: guaranteeDefined(
				allergenWIthOneIngredient.ingredients[0]
			),
		});

		allergensWithUnassignedPotentialIngredients.splice(
			allergenWithOneIngredientIndex, 1
		);

		allergensWithUnassignedPotentialIngredients.forEach(
			allergen => {
				allergen.ingredients = allergen
					.ingredients
					.filter(
						ingredient =>
							ingredient !==
								allergenWIthOneIngredient.ingredients[0]
					);
			}
		);
	}

	dangerousIngredients.sort(
		(
			{ allergen: a, },
			{ allergen: b, }
		) => a.localeCompare(b));

	return dangerousIngredients
		.map(({ ingredient, }) => ingredient)
		.join(',');
};

const stars: Stars = {
	'1': solveFirstPuzzle,
	'2': solveSecondPuzzle,
};

export default stars;