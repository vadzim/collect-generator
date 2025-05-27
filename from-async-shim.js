/** @type {typeof Array.fromAsync} */
export const fromAsyncShim = async (
	/** @template T @template R @type {AsyncIterable<T, R>|Iterable<T, R>} */ iterable,
) => {
	const ret = []
	for await (const item of iterable) {
		ret.push(item)
	}
	return ret
}
