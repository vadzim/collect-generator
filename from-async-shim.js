/**
 * @template T
 * @param {AsyncIterable<T> | Iterable<T>} iterable
 * @returns {Promise<Awaited<T>[]>}
 */
export const fromAsyncShim = async iterable => {
	const ret = []
	for await (const item of iterable) {
		ret.push(item)
	}
	return ret
}
