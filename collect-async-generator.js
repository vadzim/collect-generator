/**
 * Collects all yielded items from an async generator and returns the final result.
 *
 * @template T The type of yielded items.
 * @template R The type of the final return value.
 * @param {() => AsyncIterable<T, R> | Iterable<T | Promise<T>, R | Promise<R>>} generator - The async generator function to run.
 * @returns {Promise<{ items: T[]; result: R }>} A promise that resolves to an object containing the collected items and the final result.
 */
export async function collectAsyncGenerator(generator) {
	let result = /** @type {R} */ (undefined)
	/** @type {T[]} */
	let items = []

	for await (const item of (async function* () {
		result = yield* generator()
	})()) {
		items.push(item)
	}

	return {
		items,
		result,
	}
}
