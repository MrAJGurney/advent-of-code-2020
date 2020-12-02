const isDefined = <T>(
	value: T
): value is Exclude<typeof value, undefined> =>
		value !== undefined;

export default isDefined;