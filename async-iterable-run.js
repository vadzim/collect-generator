/**
 * Collects all yielded items from an async iterable and returns the final result.
 *
 * @template T The type of yielded items.
 * @template R The type of the final return value.
 * @param {AsyncIterable<T, R> | Iterable<T, R>} iterable - The async iterable to read.
 * @returns {Promise<{ items: Awaited<T>[]; result: Awaited<R> }>} A promise with an object containing the collected items and the final result.
 */
export async function asyncIterableRun(iterable) {
	const fromAsync = Array.fromAsync ?? (await import("./from-async-shim.js")).fromAsyncShim

	let result = /** @type {Awaited<R>} */ (undefined)

	const items = await fromAsync(
		(async function* () {
			result = yield* iterable
		})(),
	)

	return {
		items,
		result,
	}
}
