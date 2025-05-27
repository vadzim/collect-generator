/**
 * Collects all yielded items from an async iterable and returns the final result.
 *
 * @template T The type of yielded items.
 * @template R The type of the final return value.
 * @param {AsyncIterable<T, R> | Iterable<T | Promise<T>, R | Promise<R>>} iterable - The async iterable to read.
 * @returns {Promise<{ items: T[]; result: R }>} A promise that resolves to an object containing the collected items and the final result.
 */
export async function collectAsyncIterable(iterable) {
	let result = /** @type {R} */ (undefined)
	/** @type {T[]} */
	let items = []

	for await (const item of (async function* () {
		result = yield* iterable
	})()) {
		items.push(item)
	}

	return {
		items,
		result,
	}
}
