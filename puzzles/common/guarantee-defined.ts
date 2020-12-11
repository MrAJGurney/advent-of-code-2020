import isDefined from '../../utils/is-defined';

type Defined<T> = Exclude<T, undefined>

const guaranteeDefined = <T>(
	variable: T
): Defined<T> => {
	if (!isDefined(variable)) {
		throw new Error('Variable was undefined, which is unexpected');
	}

	return variable;
};

export default guaranteeDefined;